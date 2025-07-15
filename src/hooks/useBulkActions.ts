import { useState, useCallback } from 'react';
import { toast } from 'sonner';

type BulkAction = {
  label: string;
  action: (ids: string[]) => Promise<void>;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  icon?: React.ReactNode;
  confirm?: {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
  };
};

export function useBulkActions<T extends { id: string }>(
  data: T[] = [],
  actions: BulkAction[],
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }
) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  // Toggle selection for a single item
  const toggleSelection = useCallback((id: string) => {
    setSelectedIds(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  }, []);

  // Toggle select all items
  const toggleSelectAll = useCallback(() => {
    if (selectAll || selectedIds.size > 0) {
      setSelectedIds(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(data.map(item => item.id));
      setSelectedIds(allIds);
      setSelectAll(true);
    }
  }, [data, selectAll, selectedIds.size]);

  // Check if an item is selected
  const isSelected = useCallback((id: string) => {
    return selectedIds.has(id);
  }, [selectedIds]);

  // Clear all selections
  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
    setSelectAll(false);
  }, []);

  // Execute a bulk action
  const executeAction = useCallback(async (action: BulkAction) => {
    if (selectedIds.size === 0) {
      toast.warning('No items selected');
      return;
    }

    // If action requires confirmation
    if (action.confirm) {
      const confirmed = window.confirm(
        `${action.confirm.title}\n\n${action.confirm.description}`
      );
      if (!confirmed) return;
    }

    const ids = Array.from(selectedIds);
    setIsProcessing(prev => ({ ...prev, [action.label]: true }));

    try {
      await action.action(ids);
      toast.success(`Successfully completed ${action.label.toLowerCase()} for ${ids.length} items`);
      clearSelection();
      options?.onSuccess?.();
    } catch (error) {
      console.error(`Error executing ${action.label.toLowerCase()}:`, error);
      options?.onError?.(error as Error);
      toast.error(`Failed to complete ${action.label.toLowerCase()}`);
    } finally {
      setIsProcessing(prev => ({ ...prev, [action.label]: false }));
    }
  }, [selectedIds, clearSelection, options]);

  // Check if all items on the current page are selected
  const allSelected = selectedIds.size > 0 && 
    data.length > 0 && 
    data.every(item => selectedIds.has(item.id));

  // Check if some but not all items are selected
  const someSelected = !allSelected && 
    data.some(item => selectedIds.has(item.id));

  // Check if any items are selected
  const hasSelection = selectedIds.size > 0;

  return {
    selectedIds: Array.from(selectedIds),
    isSelected,
    toggleSelection,
    toggleSelectAll,
    clearSelection,
    executeAction,
    isProcessing,
    allSelected,
    someSelected,
    hasSelection,
    selectedCount: selectedIds.size,
    totalCount: data.length,
  };
}

export default useBulkActions;
