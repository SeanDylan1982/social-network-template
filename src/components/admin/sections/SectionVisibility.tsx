'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';

type Section = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  required?: boolean;
};

const defaultSections: Section[] = [
  {
    id: 'feed',
    name: 'Feed',
    description: 'The main social feed where users can see posts from others',
    enabled: true,
    required: true,
  },
  {
    id: 'messages',
    name: 'Messages',
    description: 'Private messaging between users',
    enabled: true,
  },
  {
    id: 'events',
    name: 'Events',
    description: 'Event creation and management',
    enabled: true,
  },
  {
    id: 'groups',
    name: 'Groups',
    description: 'User groups and communities',
    enabled: true,
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'Buy and sell items in the marketplace',
    enabled: true,
  },
  {
    id: 'videos',
    name: 'Videos',
    description: 'Video sharing and streaming',
    enabled: true,
  },
  {
    id: 'stories',
    name: 'Stories',
    description: '24-hour disappearing stories',
    enabled: true,
  },
  {
    id: 'polls',
    name: 'Polls',
    description: 'Create and participate in polls',
    enabled: true,
  },
];

export function SectionVisibility() {
  const queryClient = useQueryClient();
  const [sections, setSections] = useState<Section[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch current section visibility settings
  const { data, isLoading } = useQuery<Section[]>({
    queryKey: ['sections'],
    queryFn: async () => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/sections');
      // if (!response.ok) throw new Error('Failed to fetch sections');
      // return response.json();
      
      // For demo purposes, return default sections with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return defaultSections;
    },
  });

  // Update local state when data is loaded
  useEffect(() => {
    if (data) {
      setSections(data);
    }
  }, [data]);

  // Save changes to the server
  const { mutate: saveChanges, isPending: isSaving } = useMutation({
    mutationFn: async (updatedSections: Section[]) => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/sections', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ sections: updatedSections }),
      // });
      // if (!response.ok) throw new Error('Failed to save sections');
      // return response.json();
      
      // For demo purposes, just return the updated sections with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return updatedSections;
    },
    onSuccess: (savedSections) => {
      setSections(savedSections);
      setHasChanges(false);
      queryClient.setQueryData(['sections'], savedSections);
      toast.success('Section visibility updated successfully');
    },
    onError: () => {
      toast.error('Failed to update section visibility');
    },
  });

  const toggleSection = (sectionId: string, enabled: boolean) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId ? { ...section, enabled } : section
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    saveChanges(sections);
  };

  const handleReset = () => {
    if (data) {
      setSections(data);
      setHasChanges(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-medium">Site Sections</h3>
          <p className="text-sm text-muted-foreground">
            Toggle the visibility of different sections of the site
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`section-${section.id}`} className="font-medium">
                    {section.name}
                  </Label>
                  {section.required && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
              <Switch
                id={`section-${section.id}`}
                checked={section.enabled}
                onCheckedChange={(checked) => toggleSection(section.id, checked)}
                disabled={section.required || isSaving}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges || isSaving}
          >
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Preview</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections
            .filter((section) => section.enabled)
            .map((section) => (
              <div
                key={section.id}
                className="flex items-center space-x-3 rounded-md border p-3"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {section.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{section.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {section.required ? 'Always visible' : 'Visible to users'}
                  </p>
                </div>
              </div>
            ))}
          {sections.filter((section) => section.enabled).length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
              No sections are currently enabled
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
