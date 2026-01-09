import React, { useState, useMemo } from 'react';
import { ComponentProps } from '@/core/types/component';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import Checkbox from '../Checkbox';
import IconButton from '@/components/ui/IconButton';

export interface DataTableColumn<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  searchable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'number' | 'date';
  filterOptions?: { value: string; label: string }[];
}

interface DataTableProps<T = any> extends Omit<ComponentProps, 'color'> {
  columns: DataTableColumn<T>[];
  data: T[];

  // Başlık ve açıklama
  title?: string;
  description?: string;

  // Arama özellikleri
  searchable?: boolean;
  searchPlaceholder?: string;

  // Sıralama özellikleri
  sortable?: boolean;

  // Filtreleme özellikleri
  filterable?: boolean;

  // Sayfalama özellikleri
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];

  // Seçim özellikleri
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;

  // Görünüm özellikleri
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;

  // Durum
  loading?: boolean;
  emptyMessage?: string;

  // Özel işlemler
  actions?: (row: T, index: number) => React.ReactNode;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
  key: string;
  direction: SortDirection;
}

const sizeClasses = {
  small: 'text-xs',
  medium: 'text-sm',
  large: 'text-base',
};

const paddingClasses = {
  small: 'px-3 py-2',
  medium: 'px-4 py-3',
  large: 'px-5 py-3.5',
};

const headerPaddingClasses = {
  small: 'px-3 py-2.5',
  medium: 'px-4 py-3',
  large: 'px-5 py-3.5',
};

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  title,
  description,
  searchable = false,
  searchPlaceholder = 'Ara...',
  sortable = false,
  filterable = false,
  pagination = false,
  pageSize = 10,
  pageSizeOptions = [5, 10, 25, 50, 100],
  selectable = false,
  onSelectionChange,
  striped = false,
  hoverable = true,
  bordered = false,
  size = 'medium',
  loading = false,
  emptyMessage = 'Veri bulunamadı',
  actions,
  className = '',
}: DataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Arama fonksiyonu
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;

    return data.filter((row) => {
      return columns.some((column) => {
        if (column.searchable === false) return false;
        const value = row[column.key];
        if (value == null) return false;

        // Türkçe karakter dönüşümü
        const normalizeText = (text: string) => {
          return text
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c');
        };

        return normalizeText(String(value)).includes(normalizeText(searchTerm));
      });
    });
  }, [data, searchTerm, searchable, columns]);

  // Filtreleme fonksiyonu
  const filterData = useMemo(() => {
    if (!filterable || Object.keys(filters).length === 0) return filteredData;

    return filteredData.filter((row) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;

        const column = columns.find((col) => col.key === key);
        if (!column || column.filterable === false) return true;

        const rowValue = row[key];
        if (rowValue == null) return false;

        const normalizeText = (text: string) => {
          return text
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c');
        };

        // Filtre tipine göre karşılaştırma
        switch (column.filterType) {
          case 'select':
            return String(rowValue) === filterValue;
          case 'number':
            return Number(rowValue) === Number(filterValue);
          case 'date':
            return String(rowValue).includes(filterValue);
          default:
            return normalizeText(String(rowValue)).includes(normalizeText(filterValue));
        }
      });
    });
  }, [filteredData, filters, filterable, columns]);

  // Sıralama fonksiyonu
  const sortedData = useMemo(() => {
    if (!sortConfig) return filterData;

    return [...filterData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Sayı kontrolü
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }

      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();

      if (aString < bString) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aString > bString) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filterData, sortConfig]);

  // Sayfalama
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const start = (currentPage - 1) * currentPageSize;
    const end = start + currentPageSize;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, currentPageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / currentPageSize);

  // Sıralama işlemi
  const handleSort = (key: string) => {
    if (!sortable) return;

    const column = columns.find((col) => col.key === key);
    if (column?.sortable === false) return;

    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  // Seçim işlemleri
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndexes = new Set(
        paginatedData.map((_, idx) => (currentPage - 1) * currentPageSize + idx),
      );
      setSelectedRows(allIndexes);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  // Seçim değişikliğini bildir
  React.useEffect(() => {
    if (onSelectionChange) {
      const selected = Array.from(selectedRows).map((idx) => sortedData[idx]);
      onSelectionChange(selected);
    }
  }, [selectedRows, sortedData, onSelectionChange]);

  // Sayfa değiştirme
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: string | number | (string | number)[]) => {
    const newSize = Number(value);
    setCurrentPageSize(newSize);
    setCurrentPage(1);
  };

  // Hizalama sınıfı
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

  // Sıralama ikonu
  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <i className="ki-outline ki-arrow-up-down h-4 w-4 text-gray-400"></i>;
    }
    return sortConfig.direction === 'asc' ? (
      <i className="ki-outline ki-up text-primary-600 h-4 w-4"></i>
    ) : (
      <i className="ki-outline ki-down text-primary-600 h-4 w-4"></i>
    );
  };

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((_, idx) =>
      selectedRows.has((currentPage - 1) * currentPageSize + idx),
    );

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
    <div className={`w-full ${className}`}>
      {/* Üst Başlık ve Bilgi */}
      {(title || description) && (
        <div className="mb-6">
          {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
        </div>
      )}

      {/* Üst Bilgi ve Arama/Filtre Çubuğu */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          {sortedData.length > 0 && (
            <span>
              Toplam <span className="font-semibold text-gray-900">{data.length}</span>{' '}
              veriden{' '}
              <span className="font-semibold text-gray-900">{sortedData.length}</span>{' '}
              gösteriliyor
            </span>
          )}
        </div>

        {/* Sağ: Arama ve Filtre */}
        <div className="flex items-center gap-2">
          {searchable && (
            <div className="w-64">
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                size="small"
                leftIcon={
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />
            </div>
          )}

          {filterable && (
            <div className="relative">
              <Button
                size="small"
                color="primary"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                leftIcon={
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                }
              >
                Filtrele
              </Button>

              {/* Filtre Dropdown */}
              {isFilterOpen && (
                <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900">Filtreler</h3>
                    <IconButton
                      icon={<i className="ki-outline ki-cross"></i>}
                      size="small"
                      variant="ghost"
                      onClick={() => setIsFilterOpen(false)}
                    />
                  </div>

                  <div className="space-y-3">
                    {columns
                      .filter((col) => col.filterable !== false)
                      .map((column) => (
                        <div key={`filter-${column.key}`}>
                          <label className="mb-1 block text-xs font-medium text-gray-700">
                            {column.header}
                          </label>
                          {column.filterType === 'select' && column.filterOptions ? (
                            <Select
                              value={filters[column.key] || ''}
                              onChange={(value) => {
                                setFilters((prev) => ({
                                  ...prev,
                                  [column.key]: String(value),
                                }));
                                setCurrentPage(1);
                              }}
                              options={[
                                { value: '', label: 'Tümü' },
                                ...column.filterOptions,
                              ]}
                              size="small"
                              className="w-full"
                            />
                          ) : (
                            <Input
                              type={
                                column.filterType === 'number'
                                  ? 'number'
                                  : column.filterType === 'date'
                                    ? 'date'
                                    : 'text'
                              }
                              placeholder={`${column.header} filtrele...`}
                              value={filters[column.key] || ''}
                              onChange={(e) => {
                                setFilters((prev) => ({
                                  ...prev,
                                  [column.key]: e.target.value,
                                }));
                                setCurrentPage(1);
                              }}
                              size="small"
                              className="w-full"
                            />
                          )}
                        </div>
                      ))}
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="small"
                      color="danger"
                      onClick={() => {
                        setFilters({});
                        setCurrentPage(1);
                      }}
                      className="flex-1"
                    >
                      Temizle
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1"
                    >
                      Uygula
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tablo */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className={`w-full ${sizeClasses[size]}`}>
          <thead className="border-b border-gray-200 bg-gray-50/80">
            <tr>
              {selectable && (
                <th
                  className={`${headerPaddingClasses[size]} w-12 font-medium text-gray-700`}
                >
                  <Checkbox
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`${headerPaddingClasses[size]} font-semibold text-gray-700 ${getAlignment(column.align)} ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''} ${sortable && column.sortable !== false ? 'cursor-pointer transition-colors select-none hover:bg-gray-100/80' : ''}`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{column.header}</span>
                    {sortable && column.sortable !== false && (
                      <span className="shrink-0">{getSortIcon(column.key)}</span>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th
                  className={`${headerPaddingClasses[size]} text-center font-semibold text-gray-700`}
                >
                  <span className="text-sm font-semibold">İşlemler</span>
                </th>
              )}
            </tr>

            {/* Filtreleme satırı - Şimdilik gizli */}
            {/* {filterable && (
              <tr className="border-b border-gray-200 bg-white">
                {selectable && <th className={`${paddingClasses[size]} w-12`}></th>}
                {columns.map((column) => (
                  <th
                    key={`filter-${column.key}`}
                    className={`${paddingClasses[size]} ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''}`}
                  >
                    {column.filterable !== false && (
                      <div className="flex items-center">
                        {column.filterType === 'select' && column.filterOptions ? (
                          <Select
                            value={filters[column.key] || ''}
                            onChange={(value) => {
                              setFilters((prev) => ({
                                ...prev,
                                [column.key]: String(value),
                              }));
                              setCurrentPage(1);
                            }}
                            options={[
                              { value: '', label: 'Tümü' },
                              ...column.filterOptions,
                            ]}
                            size="small"
                            className="w-full"
                          />
                        ) : (
                          <Input
                            type={
                              column.filterType === 'number'
                                ? 'number'
                                : column.filterType === 'date'
                                  ? 'date'
                                  : 'text'
                            }
                            placeholder="Filtrele..."
                            value={filters[column.key] || ''}
                            onChange={(e) => {
                              setFilters((prev) => ({
                                ...prev,
                                [column.key]: e.target.value,
                              }));
                              setCurrentPage(1);
                            }}
                            size="small"
                            className="w-full"
                          />
                        )}
                      </div>
                    )}
                  </th>
                ))}
                {actions && <th className={`${paddingClasses[size]}`}></th>}
              </tr>
            )} */}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                  className={`${paddingClasses[size]} py-12 text-center text-gray-500`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="mb-3 h-12 w-12 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-sm font-medium">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const actualIndex = (currentPage - 1) * currentPageSize + rowIndex;
                const isSelected = selectedRows.has(actualIndex);

                return (
                  <tr
                    key={rowIndex}
                    className={`${striped && rowIndex % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'} ${hoverable ? 'transition-colors hover:bg-gray-50' : ''} ${isSelected ? 'bg-primary-50/50' : ''}`}
                  >
                    {selectable && (
                      <td className={`${paddingClasses[size]}`}>
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(actualIndex, e.target.checked)}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${paddingClasses[size]} ${getAlignment(column.align)} ${bordered ? 'border-r border-gray-200 last:border-r-0' : ''} text-gray-700`}
                      >
                        {column.render
                          ? column.render(row[column.key], row, actualIndex)
                          : row[column.key]}
                      </td>
                    ))}
                    {actions && (
                      <td className={`${paddingClasses[size]} text-center`}>
                        {actions(row, actualIndex)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Alt bilgi ve sayfalama */}
      {pagination && sortedData.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Göster</span>
            <Select
              value={currentPageSize}
              onChange={handlePageSizeChange}
              options={pageSizeOptions.map((size) => ({
                value: size,
                label: String(size),
              }))}
              size="small"
              className="w-20"
            />
            <span className="text-gray-600">kayıt</span>
          </div>

          {/* Sağ: Sayfa aralığı ve sayfa numaraları */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) * currentPageSize + 1}-
                  {Math.min(currentPage * currentPageSize, sortedData.length)}
                </span>{' '}
                of <span className="font-medium text-gray-900">{sortedData.length}</span>
              </div>
              {selectedRows.size > 0 && (
                <div className="text-primary-600 text-sm font-medium">
                  {selectedRows.size} seçili
                </div>
              )}
            </div>

            {/* Sayfa numaraları */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <IconButton
                  icon={<i className="ki-outline ki-double-left"></i>}
                  size="small"
                  color="neutral"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="bg-transparent px-2 text-gray-600 hover:bg-gray-100 disabled:bg-transparent"
                />
                <IconButton
                  icon={<i className="ki-outline ki-left"></i>}
                  size="small"
                  color="neutral"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-transparent px-2 text-gray-600 hover:bg-gray-100 disabled:bg-transparent"
                />

                {/* Sayfa numaraları */}
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        size="small"
                        color={currentPage === pageNum ? 'neutral' : 'neutral'}
                        onClick={() => handlePageChange(pageNum)}
                        className={
                          currentPage === pageNum
                            ? 'max-h-8 min-w-8 bg-neutral-500 text-white hover:bg-neutral-600'
                            : 'max-h-8 min-w-8 bg-neutral-300 text-gray-600 hover:bg-neutral-100'
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <IconButton
                  icon={<i className="ki-outline ki-right"></i>}
                  size="small"
                  color="neutral"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-transparent px-2 text-gray-600 hover:bg-gray-100 disabled:bg-transparent"
                />
                <IconButton
                  icon={<i className="ki-outline ki-double-right"></i>}
                  size="small"
                  color="neutral"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="bg-transparent px-2 text-gray-600 hover:bg-gray-100 disabled:bg-transparent"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
