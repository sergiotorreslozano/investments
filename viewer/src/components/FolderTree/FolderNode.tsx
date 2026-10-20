import { useMemo } from 'react';
import type { TreeItem } from './useFolderState';

interface FolderNodeProps {
  item: TreeItem;
  expanded: Set<string>;
  onToggle: (path: string) => void;
  currentSlug?: string;
  level?: number;
}

export function FolderNode({
  item,
  expanded,
  onToggle,
  currentSlug,
  level = 0,
}: FolderNodeProps) {
  const isExpanded = expanded.has(item.path);
  const isActive = item.slug === currentSlug;
  const hasChildren = item.children && item.children.length > 0;
  const indent = level * 16;

  const folderStyle = useMemo(
    () => ({
      paddingLeft: `${indent}px`,
      display: 'flex',
      flexDirection: 'column' as const,
    }),
    [indent]
  );

  const itemStyle = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem',
      padding: '0.375rem 0.5rem',
      borderRadius: '4px',
      cursor: hasChildren ? 'pointer' : 'default',
      color: isActive ? 'var(--accent)' : 'var(--text)',
      fontWeight: isActive ? 600 : 400,
      fontSize: '0.875rem',
      background: isActive ? 'rgba(88, 166, 255, 0.1)' : 'transparent',
      textDecoration: 'none',
      transition: 'background 0.1s, color 0.1s',
      userSelect: 'none',
    }),
    [isActive, hasChildren]
  );

  const nestedStyle = useMemo(
    () => ({
      overflow: 'hidden',
      transition: 'max-height 0.2s ease, opacity 0.15s',
      maxHeight: isExpanded ? '1000px' : '0',
      opacity: isExpanded ? 1 : 0,
    }),
    [isExpanded]
  );

  if (item.type === 'file') {
    return (
      <li style={{ paddingLeft: `${indent + 16}px`, listStyle: 'none' }}>
        <a
          href={`/analysis/${item.slug}`}
          style={{
            ...itemStyle,
            cursor: 'pointer',
            opacity: isActive ? 1 : 0.8,
          }}
          aria-current={isActive ? 'page' : undefined}
        >
          {item.name}
        </a>
      </li>
    );
  }

  return (
    <li style={{ listStyle: 'none' }}>
      <div style={folderStyle}>
        <button
          onClick={() => onToggle(item.path)}
          style={{
            ...itemStyle,
            background: 'none',
            border: 'none',
            font: 'inherit',
            textAlign: 'left',
            width: '100%',
          }}
          aria-expanded={isExpanded}
          aria-controls={`${item.path}-children`}
        >
          <span
            style={{
              display: 'inline-block',
              width: '1rem',
              transition: 'transform 0.15s',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            ▸
          </span>
          <span>{item.name}</span>
        </button>
        <ul
          id={`${item.path}-children`}
          role="group"
          aria-label={`${item.name} contents`}
          style={nestedStyle}
        >
          {item.children?.map((child) => (
            <FolderNode
              key={child.path}
              item={child}
              expanded={expanded}
              onToggle={onToggle}
              currentSlug={currentSlug}
              level={level + 1}
            />
          ))}
        </ul>
      </div>
    </li>
  );
}