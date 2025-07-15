'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Save } from 'lucide-react';

const generalSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string().optional(),
  siteUrl: z.string().url('Must be a valid URL'),
  contactEmail: z.string().email('Must be a valid email'),
  maintenanceMode: z.boolean().default(false),
  registrationEnabled: z.boolean().default(true),
  defaultUserRole: z.enum(['user', 'moderator']).default('user'),
  maxFileSize: z.number().min(1, 'File size must be at least 1MB'),
  allowedFileTypes: z.string().min(1, 'At least one file type is required'),
});

type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>;

const defaultValues: Partial<GeneralSettingsFormValues> = {
  siteName: 'Social Network',
  siteDescription: 'A modern social networking platform',
  siteUrl: 'https://example.com',
  contactEmail: 'admin@example.com',
  maintenanceMode: false,
  registrationEnabled: true,
  defaultUserRole: 'user',
  maxFileSize: 5,
  allowedFileTypes: 'image/jpeg,image/png,image/gif',
};

export function GeneralSettings() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Form setup
  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues,
  });

  // Fetch current settings
  const { data: currentSettings, isLoading } = useQuery<GeneralSettingsFormValues>({
    queryKey: ['general-settings'],
    queryFn: async () => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/settings/general');
      // if (!response.ok) throw new Error('Failed to fetch settings');
      // return response.json();
      
      // For demo purposes, return default values with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return defaultValues as GeneralSettingsFormValues;
    },
  });

  // Update form with current settings when they're loaded
  useEffect(() => {
    if (currentSettings) {
      form.reset(currentSettings);
    }
  }, [currentSettings, form]);

  // Save settings
  const { mutate: saveSettings, isPending: isSaving } = useMutation({
    mutationFn: async (values: GeneralSettingsFormValues) => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/settings/general', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // if (!response.ok) throw new Error('Failed to save settings');
      // return response.json();
      
      // For demo purposes, just return the values with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return values;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['general-settings'], data);
      setIsEditing(false);
      toast.success('Settings saved successfully');
    },
    onError: () => {
      toast.error('Failed to save settings');
    },
  });

  const onSubmit = (data: GeneralSettingsFormValues) => {
    saveSettings(data);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Site Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site URL</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="siteDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Site Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={!isEditing}
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormDescription>
                    This will be used in search engines and social sharing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!isEditing} type="email" />
                  </FormControl>
                  <FormDescription>
                    This email will be used for contact forms and notifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">User Registration</h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="registrationEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Registration</FormLabel>
                      <FormDescription>
                        Allow new users to create accounts on your site.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultUserRole"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Default User Role</FormLabel>
                      <FormDescription>
                        The default role assigned to new users.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <select
                          value={field.value}
                          onChange={field.onChange}
                          disabled={!isEditing}
                          className="rounded-md border p-2 text-sm disabled:opacity-50"
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                        </select>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">File Uploads</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="maxFileSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum File Size (MB)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={1}
                        disabled={!isEditing}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowedFileTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowed File Types</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!isEditing}
                        placeholder="image/jpeg,image/png,image/gif"
                      />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of MIME types
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-lg font-medium">Maintenance Mode</h3>
            <FormField
              control={form.control}
              name="maintenanceMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Maintenance Mode</FormLabel>
                    <FormDescription>
                      When enabled, only administrators can access the site.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset(currentSettings);
                  setIsEditing(false);
                }}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
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
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Settings
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
