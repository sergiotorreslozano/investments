import { useState, useEffect, useCallback, useMemo } from 'react';

interface TreeItem {
  name: string;
  path: string;
  type: 'folder' | 'file';
  slug?: string;
  children?: TreeItem[];
  tags?: string[];
}

interface UseFolderStateReturn {
  expanded: Set<string>;
  toggle: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  allTags: string[];
  filteredItems: TreeItem[];
  openTo: (slug: string) => void;
  isHydrated: boolean;
}

const STORAGE_KEY = 'investments-folder-tree-expanded';

export function useFolderState(
  items: TreeItem[],
  currentSlug?: string
): UseFolderStateReturn {
  // Initialize with empty Set on BOTH server and client
  // This ensures SSR and initial client render match
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  // Read from localStorage AFTER first render (client-only)
  useEffect(() => {
    setIsHydrated(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setExpanded(new Set(JSON.parse(stored)));
      }
    } catch {
      // Ignore errors
    }
  }, []);

  // Persist expanded state (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...expanded]));
    }
  }, [expanded, isHydrated]);

  // Auto-expand to current file on mount (after hydration)
  useEffect(() => {
    if (isHydrated && currentSlug) {
      openTo(currentSlug);
    }
  }, [currentSlug, isHydrated]);

  const toggle = useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }, []);

  const openTo = useCallback((slug: string) => {
    const pathParts = slug.split('/');
    let currentPath = '';
    const toExpand = new Set<string>();

    for (let i = 0; i < pathParts.length - 1; i++) {
      currentPath = currentPath ? `${currentPath}/${pathParts[i]}` : pathParts[i];
      toExpand.add(currentPath);
    }

    if (toExpand.size > 0) {
      setExpanded((prev) => new Set([...prev, ...toExpand]));
    }
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    const collect = (nodes: TreeItem[]) => {
      nodes.forEach((node) => {
        if (node.tags) node.tags.forEach((t) => tags.add(t));
        if (node.children) collect(node.children);
      });
    };
    collect(items);
    return Array.from(tags).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!searchQuery && selectedTags.length === 0) return items;

    const matches = (node: TreeItem): boolean => {
      const nameMatch =
        !searchQuery ||
        node.name.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch =
        selectedTags.length === 0 ||
        (node.tags && selectedTags.some((t) => node.tags!.includes(t)));
      return nameMatch && tagMatch;
    };

    const filterTree = (nodes: TreeItem[]): TreeItem[] => {
      return nodes
        .map((node) => {
          if (node.type === 'file') {
            return matches(node) ? node : null;
          }
          const filteredChildren = filterTree(node.children || []);
          const selfMatches = matches(node);
          if (filteredChildren.length > 0 || selfMatches) {
            return { ...node, children: filteredChildren };
          }
          return null;
        })
        .filter((n): n is TreeItem => n !== null);
    };

    return filterTree(items);
  }, [items, searchQuery, selectedTags]);

  return {
    expanded,
    toggle,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    allTags,
    filteredItems,
    openTo,
    isHydrated,
  };
}