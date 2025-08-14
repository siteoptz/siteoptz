/**
 * Interactive Comparison Table Component
 * 
 * Sortable, filterable table with sticky headers and micro-interactions.
 * Supports tool comparison with live filtering and sorting capabilities.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronUp, 
  ChevronDown, 
  Filter, 
  Search, 
  Star, 
  DollarSign, 
  Users, 
  Zap,
  ExternalLink,
  Heart
} from 'lucide-react';

const ComparisonTable = ({ 
  tools = [], 
  initialColumns = ['name', 'rating', 'pricing', 'features', 'category'],
  stickyHeader = true,
  showFilters = true,
  showSearch = true,
  highlightBest = true,
  onToolSelect = null,
  className = ""
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTools, setSelectedTools] = useState(new Set());
  const [visibleColumns, setVisibleColumns] = useState(new Set(initialColumns));

  // Define sortable columns configuration
  const columns = {
    name: {
      label: 'Tool Name',
      icon: Zap,
      sortKey: 'name',
      width: '200px',
      sticky: true
    },
    rating: {
      label: 'Rating',
      icon: Star,
      sortKey: 'rating',
      width: '120px',
      numeric: true
    },
    pricing: {
      label: 'Starting Price',
      icon: DollarSign,
      sortKey: 'startingPrice',
      width: '140px',
      numeric: true
    },
    users: {
      label: 'Active Users',
      icon: Users,
      sortKey: 'activeUsers',
      width: '130px',
      numeric: true
    },
    features: {
      label: 'Key Features',
      icon: null,
      sortKey: null,
      width: '250px'
    },
    category: {
      label: 'Category',
      icon: null,
      sortKey: 'category',
      width: '150px'
    }
  };

  // Process and filter tools data
  const processedTools = useMemo(() => {
    return tools.map(tool => ({
      ...tool,
      startingPrice: tool.pricing?.length ? 
        Math.min(...tool.pricing.filter(p => p.price > 0).map(p => p.price)) : 0,
      ratingValue: parseFloat(tool.rating) || 0,
      activeUsers: tool.stats?.activeUsers || 0
    }));
  }, [tools]);

  // Apply search and filters
  const filteredTools = useMemo(() => {
    let filtered = processedTools;

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(search) ||
        tool.description?.toLowerCase().includes(search) ||
        tool.category?.toLowerCase().includes(search) ||
        tool.features?.some(feature => feature.toLowerCase().includes(search))
      );
    }

    // Apply filters
    Object.entries(filterConfig).forEach(([key, value]) => {
      if (value && value !== 'all') {
        filtered = filtered.filter(tool => {
          switch (key) {
            case 'category':
              return tool.category === value;
            case 'priceRange':
              const price = tool.startingPrice;
              switch (value) {
                case 'free': return price === 0;
                case 'low': return price > 0 && price <= 20;
                case 'medium': return price > 20 && price <= 100;
                case 'high': return price > 100;
                default: return true;
              }
            case 'rating':
              return tool.ratingValue >= parseInt(value);
            default:
              return true;
          }
        });
      }
    });

    return filtered;
  }, [processedTools, searchTerm, filterConfig]);

  // Apply sorting
  const sortedTools = useMemo(() => {
    if (!sortConfig.key) return filteredTools;

    return [...filteredTools].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Handle different data types
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTools, sortConfig]);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle tool selection
  const handleToolSelect = (toolId) => {
    const newSelected = new Set(selectedTools);
    if (newSelected.has(toolId)) {
      newSelected.delete(toolId);
    } else {
      newSelected.add(toolId);
    }
    setSelectedTools(newSelected);
    
    if (onToolSelect) {
      onToolSelect(Array.from(newSelected));
    }
  };

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = [...new Set(tools.map(tool => tool.category).filter(Boolean))];
    return cats.sort();
  }, [tools]);

  return (
    <div className={`comparison-table-container ${className}`}>
      {/* Search and Filters Bar */}
      {(showSearch || showFilters) && (
        <motion.div 
          className="table-controls"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {showSearch && (
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search tools, features, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          )}

          {showFilters && (
            <div className="filters-container">
              <div className="filter-group">
                <label>Category:</label>
                <select
                  value={filterConfig.category || 'all'}
                  onChange={(e) => setFilterConfig(prev => ({ ...prev, category: e.target.value }))}
                  className="filter-select"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range:</label>
                <select
                  value={filterConfig.priceRange || 'all'}
                  onChange={(e) => setFilterConfig(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="filter-select"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="low">$1-20</option>
                  <option value="medium">$21-100</option>
                  <option value="high">$100+</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Min Rating:</label>
                <select
                  value={filterConfig.rating || 'all'}
                  onChange={(e) => setFilterConfig(prev => ({ ...prev, rating: e.target.value }))}
                  className="filter-select"
                >
                  <option value="all">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>
            </div>
          )}

          <div className="results-count">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
          </div>
        </motion.div>
      )}

      {/* Table Container */}
      <div className="table-wrapper">
        <table className={`comparison-table ${stickyHeader ? 'sticky-header' : ''}`}>
          {/* Table Header */}
          <thead>
            <tr>
              <th className="select-column">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTools(new Set(sortedTools.map(t => t.id)));
                    } else {
                      setSelectedTools(new Set());
                    }
                  }}
                  checked={selectedTools.size === sortedTools.length && sortedTools.length > 0}
                />
              </th>
              
              {Array.from(visibleColumns).map(columnKey => {
                const column = columns[columnKey];
                const isSortable = column.sortKey;
                const isSorted = sortConfig.key === column.sortKey;
                
                return (
                  <th
                    key={columnKey}
                    className={`column-header ${isSortable ? 'sortable' : ''} ${isSorted ? 'sorted' : ''}`}
                    onClick={() => isSortable && handleSort(column.sortKey)}
                    style={{ width: column.width }}
                  >
                    <div className="header-content">
                      {column.icon && <column.icon size={16} />}
                      <span>{column.label}</span>
                      {isSortable && (
                        <div className="sort-indicator">
                          {isSorted && sortConfig.direction === 'asc' ? (
                            <ChevronUp size={14} />
                          ) : isSorted && sortConfig.direction === 'desc' ? (
                            <ChevronDown size={14} />
                          ) : (
                            <div className="sort-arrows">
                              <ChevronUp size={12} />
                              <ChevronDown size={12} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <AnimatePresence>
              {sortedTools.map((tool, index) => {
                const isSelected = selectedTools.has(tool.id);
                const isBest = highlightBest && tool.badge === 'Best Overall';
                
                return (
                  <motion.tr
                    key={tool.id}
                    className={`table-row ${isSelected ? 'selected' : ''} ${isBest ? 'best-choice' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300
                    }}
                    whileHover={{ 
                      backgroundColor: "var(--blue-50)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Selection Column */}
                    <td className="select-cell">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToolSelect(tool.id)}
                      />
                    </td>

                    {/* Dynamic Columns */}
                    {Array.from(visibleColumns).map(columnKey => (
                      <td key={columnKey} className={`cell cell-${columnKey}`}>
                        {renderCell(tool, columnKey)}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Empty State */}
        {sortedTools.length === 0 && (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Search size={48} />
            <h3>No tools found</h3>
            <p>Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Selected Tools Summary */}
      {selectedTools.size > 0 && (
        <motion.div 
          className="selection-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="summary-content">
            <span>{selectedTools.size} tools selected</span>
            <div className="summary-actions">
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  // Handle compare action
                  console.log('Compare tools:', Array.from(selectedTools));
                }}
              >
                Compare Selected
              </button>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedTools(new Set())}
              >
                Clear Selection
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Component Styles */}
      <style jsx>{`
        .comparison-table-container {
          background: white;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        .table-controls {
          padding: var(--space-6);
          background: var(--gray-50);
          border-bottom: 1px solid var(--gray-200);
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
          align-items: center;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-icon {
          position: absolute;
          left: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400);
        }

        .search-input {
          width: 100%;
          padding: var(--space-3) var(--space-10);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-lg);
          font-size: var(--text-base);
          transition: var(--transition-base);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .filters-container {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);
        }

        .filter-group label {
          font-size: var(--text-sm);
          font-weight: var(--font-medium);
          color: var(--gray-700);
        }

        .filter-select {
          padding: var(--space-2) var(--space-3);
          border: 1px solid var(--gray-300);
          border-radius: var(--radius-md);
          font-size: var(--text-sm);
          min-width: 120px;
        }

        .results-count {
          font-size: var(--text-sm);
          color: var(--gray-600);
          margin-left: auto;
        }

        .table-wrapper {
          overflow-x: auto;
          max-height: 600px;
          overflow-y: auto;
        }

        .comparison-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }

        .sticky-header thead th {
          position: sticky;
          top: 0;
          z-index: 10;
          background: white;
          box-shadow: 0 1px 0 var(--gray-200);
        }

        .column-header {
          padding: var(--space-4);
          text-align: left;
          font-weight: var(--font-semibold);
          color: var(--gray-700);
          background: var(--gray-50);
          border-bottom: 1px solid var(--gray-200);
          white-space: nowrap;
        }

        .column-header.sortable {
          cursor: pointer;
          transition: var(--transition-base);
        }

        .column-header.sortable:hover {
          background: var(--gray-100);
        }

        .column-header.sorted {
          background: var(--blue-50);
          color: var(--color-primary);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .sort-indicator {
          margin-left: auto;
          color: var(--gray-400);
        }

        .sort-arrows {
          display: flex;
          flex-direction: column;
          gap: -2px;
        }

        .table-row {
          transition: var(--transition-base);
          border-bottom: 1px solid var(--gray-200);
        }

        .table-row.selected {
          background: var(--blue-50);
          border-color: var(--blue-200);
        }

        .table-row.best-choice {
          background: linear-gradient(90deg, var(--green-50), transparent);
          border-left: 4px solid var(--green-500);
        }

        .cell {
          padding: var(--space-4);
          vertical-align: top;
          border-bottom: 1px solid var(--gray-200);
        }

        .select-column,
        .select-cell {
          width: 40px;
          text-align: center;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--space-20);
          text-align: center;
          color: var(--gray-500);
        }

        .empty-state h3 {
          margin: var(--space-4) 0 var(--space-2) 0;
          font-size: var(--text-xl);
          color: var(--gray-700);
        }

        .selection-summary {
          position: fixed;
          bottom: var(--space-6);
          left: 50%;
          transform: translateX(-50%);
          background: var(--gray-900);
          color: white;
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          z-index: var(--z-sticky);
        }

        .summary-content {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .summary-actions {
          display: flex;
          gap: var(--space-2);
        }

        @media (max-width: 768px) {
          .table-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-container {
            min-width: auto;
          }

          .filters-container {
            justify-content: space-between;
          }

          .results-count {
            margin-left: 0;
            text-align: center;
          }

          .comparison-table {
            font-size: var(--text-sm);
          }

          .cell {
            padding: var(--space-2);
          }
        }
      `}</style>
    </div>
  );
};

// Helper function to render individual cells
const renderCell = (tool, columnKey) => {
  switch (columnKey) {
    case 'name':
      return (
        <div className="tool-name-cell">
          <div className="tool-info">
            {tool.logo && (
              <img src={tool.logo} alt={tool.name} className="tool-logo" />
            )}
            <div>
              <div className="tool-name">{tool.name}</div>
              {tool.badge && (
                <div className={`tool-badge badge-${tool.badge.toLowerCase().replace(' ', '-')}`}>
                  {tool.badge}
                </div>
              )}
            </div>
          </div>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      );

    case 'rating':
      return (
        <div className="rating-cell">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(tool.ratingValue) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="rating-value">{tool.ratingValue.toFixed(1)}</span>
        </div>
      );

    case 'pricing':
      return (
        <div className="pricing-cell">
          {tool.startingPrice === 0 ? (
            <span className="price-free">Free</span>
          ) : (
            <span className="price-paid">${tool.startingPrice}/mo</span>
          )}
        </div>
      );

    case 'users':
      return (
        <div className="users-cell">
          {tool.activeUsers ? `${(tool.activeUsers / 1000000).toFixed(1)}M` : 'N/A'}
        </div>
      );

    case 'features':
      return (
        <div className="features-cell">
          {tool.features?.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">
              {feature}
            </span>
          ))}
          {tool.features?.length > 3 && (
            <span className="more-features">+{tool.features.length - 3} more</span>
          )}
        </div>
      );

    case 'category':
      return (
        <div className="category-cell">
          <span className="category-tag">{tool.category}</span>
        </div>
      );

    default:
      return tool[columnKey] || 'N/A';
  }
};

export default ComparisonTable;