import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
import { Checkbox } from './checkbox';
import { Button } from './button';
import { Loader2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

type ColumnDef<T> = {
  id: string;
  header: string | React.ReactNode;
  cell: (row: T) => React.ReactNode;
  size?: number;
  enableSorting?: boolean;
};

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  keyField: string;
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  bulkActions?: {
    label: string;
    action: (ids: string[]) => Promise<void>;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    icon?: React.ReactNode;
  }[];
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  showPagination?: boolean;
  pageSize?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  showCheckboxes?: boolean;
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T) => string);
};

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  bulkActions = [],
  selectedIds = [],
  onSelectionChange,
  showPagination = false,
  pageSize = 10,
  totalCount = 0,
  onPageChange,
  currentPage = 1,
  showCheckboxes = true,
  className = '',
  headerClassName = '',
  rowClassName = '',
}: DataTableProps<T>) {
  const allSelected = selectedIds.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange?.(data.map(item => item[keyField]));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selectedIds, id]);
    } else {
      onSelectionChange?.(selectedIds.filter(selectedId => selectedId !== id));
    }
  };

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      {bulkActions.length > 0 && selectedIds.length > 0 && (
        <div className="flex items-center space-x-2 bg-accent p-2 rounded-md">
          <span className="text-sm text-muted-foreground">
            {selectedIds.length} selected
          </span>
          {bulkActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              size="sm"
              className="h-8"
              onClick={() => action.action(selectedIds)}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 ml-auto"
            onClick={() => onSelectionChange?.([])}
          >
            Clear selection
          </Button>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader className={headerClassName}>
            <TableRow>
              {showCheckboxes && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className={cn(
                      'translate-y-[2px]',
                      someSelected && 'data-[state=checked]:bg-primary/50'
                    )}
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead 
                  key={column.id}
                  style={{ width: column.size }}
                  className={!column.enableSorting ? 'cursor-default' : ''}
                >
                  {column.header}
                </TableHead>
              ))}
              {onRowClick && <TableHead className="w-10" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (showCheckboxes ? 1 : 0) + (onRowClick ? 1 : 0)}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (showCheckboxes ? 1 : 0) + (onRowClick ? 1 : 0)}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => {
                const rowId = row[keyField];
                return (
                  <TableRow
                    key={rowId}
                    className={cn(
                      onRowClick && 'cursor-pointer hover:bg-accent/50',
                      typeof rowClassName === 'function' 
                        ? rowClassName(row) 
                        : rowClassName
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {showCheckboxes && (
                      <TableCell 
                        className="w-10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={selectedIds.includes(rowId)}
                          onCheckedChange={(checked) => 
                            handleSelectRow(rowId, checked === true)
                          }
                          aria-label={`Select row ${rowId}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => (
                      <TableCell key={`${rowId}-${column.id}`}>
                        {column.cell(row)}
                      </TableCell>
                    ))}
                    {onRowClick && (
                      <TableCell className="w-10">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRowClick?.(row);
                          }}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
