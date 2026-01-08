import React from 'react';
import { ComponentProps } from '@/core/types/component';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T = any> extends Omit<ComponentProps, 'color'> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  loading?: boolean;
  emptyMessage?: string;
}

const sizeClasses = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
};

const paddingClasses = {
  small: 'px-3 py-2',
  medium: 'px-4 py-3',
  large: 'px-6 py-4',
};

const Table = <T extends Record<string, any>>({
  columns,
  data,
  striped = false,
  hoverable = true,
  bordered = false,
  size = 'medium',
  loading = false,
  emptyMessage = 'Veri bulunamadı',
  className = '',
}: TableProps<T>) => {
  const getAlignment = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="border-t-primary-500 mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-200"></div>
            <p className="text-sm text-gray-500">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto rounded-md ${className}`}>
      <table
        className={`w-full ${sizeClasses[size]} ${bordered ? 'border border-gray-200' : ''}`}
      >
        <thead className="bg-gray-50">
          <tr className={bordered ? 'border-b border-gray-200' : ''}>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`${paddingClasses[size]} font-semibold text-gray-700 ${getAlignment(column.align)} ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}`}
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className={`${paddingClasses[size]} text-center text-gray-500`}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={` ${striped && rowIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'} ${hoverable ? 'hover:bg-gray-100' : ''} ${bordered ? 'border-b border-gray-200' : ''} transition-colors duration-150`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`${paddingClasses[size]} ${getAlignment(column.align)} ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}`}
                  >
                    {column.render
                      ? column.render(row[column.key], row, rowIndex)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
