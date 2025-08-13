import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { ArrowUpDown, Star, ExternalLink, Check, X } from 'lucide-react';

const columnHelper = createColumnHelper();

export default function ComparisonTable({ tools, selectedTools = [], onToolSelect }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Tool',
        cell: ({ row }) => {
          const tool = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <img 
                  src={tool.logo} 
                  alt={`${tool.name} logo`}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/images/placeholder-logo.png';
                  }}
                />
              </div>
              <div>
                <div className="font-semibold text-gray-900">{tool.name}</div>
                <div className="text-sm text-gray-500">{tool.description.substring(0, 30)}...</div>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-1">
                  AI Tool
                </span>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('pricingPlans', {
        header: 'Starting Price',
        cell: ({ getValue }) => {
          const plans = getValue();
          const startingPrice = plans.find(plan => plan.monthlyPrice > 0)?.monthlyPrice || 0;
          return (
            <div className="text-sm">
              <div className="font-semibold">${startingPrice}/mo</div>
              <div className="text-gray-500 text-xs">
                {plans.length} plans available
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('features', {
        header: 'Features',
        cell: ({ getValue }) => {
          const features = getValue();
          return (
            <div className="text-sm text-gray-600">
              <div className="font-medium">{features.length} features</div>
              <div className="text-xs text-gray-500 mt-1">
                {features.slice(0, 3).join(', ')}
                {features.length > 3 && ` +${features.length - 3} more`}
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('pros', {
        header: 'Pros',
        cell: ({ getValue }) => {
          const pros = getValue();
          return (
            <div className="space-y-1">
              {pros.slice(0, 2).map((pro, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{pro}</span>
                </div>
              ))}
              {pros.length > 2 && (
                <div className="text-xs text-blue-600">
                  +{pros.length - 2} more
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('cons', {
        header: 'Cons',
        cell: ({ getValue }) => {
          const cons = getValue();
          return (
            <div className="space-y-1">
              {cons.slice(0, 2).map((con, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{con}</span>
                </div>
              ))}
              {cons.length > 2 && (
                <div className="text-xs text-blue-600">
                  +{cons.length - 2} more
                </div>
              )}
            </div>
          );
        },
      }),
      columnHelper.accessor('id', {
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-auto p-0 font-medium hover:bg-gray-100 px-2 py-1 rounded"
            >
              Rating
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          );
        },
        cell: ({ getValue }) => {
          return (
            <div className="text-sm">
              <div className="font-semibold">4.5/5</div>
              <div className="text-gray-500 text-xs">user rating</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('slug', {
        header: ({ column }) => {
          return (
            <button
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-auto p-0 font-medium hover:bg-gray-100 px-2 py-1 rounded"
            >
              Free Trial
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
          );
        },
        cell: ({ getValue }) => {
          return (
            <div className="text-sm">
              <div className="font-semibold text-green-600">Yes</div>
              <div className="text-gray-500 text-xs">available</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('slug', {
        header: 'Actions',
        cell: ({ getValue, row }) => {
          const toolSlug = getValue();
          const tool = row.original;
          const isSelected = selectedTools.some(t => t.slug === toolSlug);
          
          return (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onToolSelect && onToolSelect(tool)}
                className={`w-full px-3 py-1 text-sm rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isSelected ? 'Selected' : 'Compare'}
              </button>
              <a
                href={`/compare/${tool.slug}`}
                className="w-full px-3 py-1 text-sm bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors inline-flex items-center justify-center gap-1"
              >
                View Details
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          );
        },
      }),
    ],
    [selectedTools, onToolSelect]
  );

  const filteredData = useMemo(() => {
    let filtered = tools;
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(tool => tool.category === categoryFilter);
    }
    
    if (globalFilter) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        tool.description.toLowerCase().includes(globalFilter.toLowerCase())
      );
    }
    
    return filtered;
  }, [tools, categoryFilter, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const categories = useMemo(() => {
    return ['all', 'AI Assistant', 'Search Engine', 'Content Creation'];
  }, []);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            placeholder="Search tools..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select 
          value={categoryFilter} 
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-[180px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-md border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                  No tools found.
                </td>
              </tr>
            )}
          </tbody>
                </table>
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {filteredData.length} of {tools.length} tools
          </span>
          <div className="flex gap-4">
            <span>
              Avg Price: ${(filteredData.reduce((sum, tool) => {
                const price = tool.pricingPlans.find(plan => plan.monthlyPrice > 0)?.monthlyPrice || 0;
                return sum + price;
              }, 0) / Math.max(filteredData.length, 1)).toFixed(0)}/mo
            </span>
            <span>
              Total Searches: {filteredData.reduce((sum, tool) => sum + (tool.searchVolume || 0), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
