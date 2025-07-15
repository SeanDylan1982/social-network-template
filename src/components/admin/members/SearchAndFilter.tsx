'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterOptions = {
  status?: 'active' | 'suspended' | 'inactive';
  role?: 'admin' | 'moderator' | 'user';
  sort?: 'newest' | 'oldest' | 'name-asc' | 'name-desc';
};

export function SearchAndFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const status = params.get('status') as FilterOptions['status'];
    const role = params.get('role') as FilterOptions['role'];
    const sort = params.get('sort') as FilterOptions['sort'];
    const search = params.get('search') || '';

    setSearchTerm(search);
    setFilters({
      ...(status && { status }),
      ...(role && { role }),
      ...(sort && { sort }),
    });
  }, [searchParams]);

  const updateUrlParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to first page when filters change
    params.set('page', '1');
    
    router.push(`?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams({ search: searchTerm.trim() || null });
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string | null) => {
    updateUrlParams({ [key]: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
    router.push('?page=1');
  };

  const hasActiveFilters = Object.values(filters).some(Boolean) || searchTerm;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit" variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.role || ''}
          onValueChange={(value) => handleFilterChange('role', value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status || ''}
          onValueChange={(value) => handleFilterChange('status', value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sort || ''}
          onValueChange={(value) => handleFilterChange('sort', value || null)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-muted-foreground"
          >
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <div className="flex items-center rounded-full border px-3 py-1 text-sm">
              <span className="text-muted-foreground">Search:</span>
              <span className="ml-1 font-medium">{searchTerm}</span>
              <button
                onClick={() => {
                  setSearchTerm('');
                  updateUrlParams({ search: null });
                }}
                className="ml-2 rounded-full p-0.5 hover:bg-muted"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <div
                key={key}
                className="flex items-center rounded-full border px-3 py-1 text-sm"
              >
                <span className="text-muted-foreold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>
                <span className="ml-1 font-medium">
                  {value.toString().charAt(0).toUpperCase() + value.toString().slice(1)}
                </span>
                <button
                  onClick={() => handleFilterChange(key as keyof FilterOptions, null)}
                  className="ml-2 rounded-full p-0.5 hover:bg-muted"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
