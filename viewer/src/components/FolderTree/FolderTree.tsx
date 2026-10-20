import { useMemo } from 'react';
import { useFolderState, type TreeItem } from './useFolderState';
import { FolderNode } from './FolderNode';

interface FolderTreeProps {
  items: TreeItem[];
  currentSlug?: string;
}

export function FolderTree({ items, currentSlug }: FolderTreeProps) {
  const {
    expanded,
    toggle,
    searchQuery,
    setSearchQuery,
    selectedTags,
    toggleTag,
    allTags,
    filteredItems,
  } = useFolderState(items, currentSlug);

  const noResults = filteredItems.length === 0 && (searchQuery || selectedTags.length > 0);

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0 }}>
      {/* Search */}
      <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
        <label htmlFor="folder-search" style={{ display: 'block', marginBottom: '0.375rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Search
        </label>
        <input
          id="folder-search"
          type="search"
          placeholder="Filter analyses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontSize: '0.875rem',
            fontFamily: 'inherit',
            outline: 'none',
            boxSizing: 'border-box',
          }}
          aria-label="Filter analyses by name"
        />
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tags
            </span>
            {selectedTags.length > 0 && (
              <button
                onClick={() => selectedTags.forEach((t) => toggleTag(t))}
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Clear all
              </button>
            )}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '0.25rem 0.5rem',
                  borderRadius: '999px',
                  border: '1px solid var(--border)',
                  background: selectedTags.includes(tag) ? 'var(--accent)' : 'var(--bg-elevated)',
                  color: selectedTags.includes(tag) ? 'var(--bg)' : 'var(--text-muted)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                }}
                aria-pressed={selectedTags.includes(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tree */}
      <ul
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '0.75rem',
          margin: 0,
          listStyle: 'none',
        }}
        role="tree"
        aria-label="Analyses"
      >
        {noResults ? (
          <li style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            No analyses match your filters
          </li>
        ) : (
          filteredItems.map((item) => (
            <FolderNode
              key={item.path}
              item={item}
              expanded={expanded}
              onToggle={toggle}
              currentSlug={currentSlug}
            />
          ))
        )}
      </ul>
    </nav>
  );
}