'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save } from 'lucide-react';

const policySchema = z.object({
  termsOfService: z.string().min(1, 'Terms of Service is required'),
  privacyPolicy: z.string().min(1, 'Privacy Policy is required'),
  cookiePolicy: z.string().min(1, 'Cookie Policy is required'),
  communityGuidelines: z.string().min(1, 'Community Guidelines are required'),
});

type PolicyFormValues = z.infer<typeof policySchema>;

const defaultPolicies: PolicyFormValues = {
  termsOfService: `# Terms of Service

## 1. Acceptance of Terms
By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.

## 2. User Responsibilities
You are responsible for maintaining the confidentiality of your account and password.

## 3. Content
You own the content you post on our platform, but you grant us a license to use it.

## 4. Termination
We may terminate or suspend your account immediately for any violation of these terms.`,
  privacyPolicy: `# Privacy Policy

## 1. Information We Collect
We collect information you provide directly to us, such as your name, email address, and any other information you choose to provide.

## 2. How We Use Your Information
We use the information we collect to provide, maintain, and improve our services.

## 3. Sharing Your Information
We do not share your personal information with third parties except as described in this policy.`,
  cookiePolicy: `# Cookie Policy

## 1. What Are Cookies
Cookies are small text files stored on your device when you visit our website.

## 2. How We Use Cookies
We use cookies to understand how you use our site and to improve your experience.

## 3. Managing Cookies
You can control or delete cookies through your browser settings.`,
  communityGuidelines: `# Community Guidelines

## 1. Be Respectful
Treat all community members with respect.

## 2. No Harassment
Harassment, hate speech, and bullying are not tolerated.

## 3. No Spam
Do not post spam or engage in promotional activities without permission.

## 4. Report Violations
Help us keep the community safe by reporting any violations.`,
};

export function SitePolicies() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('terms');
  const [isEditing, setIsEditing] = useState(false);

  // Form setup
  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: defaultPolicies,
  });

  // Fetch current policies
  const { data: currentPolicies, isLoading } = useQuery<PolicyFormValues>({
    queryKey: ['site-policies'],
    queryFn: async () => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/settings/policies');
      // if (!response.ok) throw new Error('Failed to fetch policies');
      // return response.json();
      
      // For demo purposes, return default policies with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return defaultPolicies;
    },
  });

  // Update form with current policies when they're loaded
  useEffect(() => {
    if (currentPolicies) {
      form.reset(currentPolicies);
    }
  }, [currentPolicies, form]);

  // Save policies
  const { mutate: savePolicies, isPending: isSaving } = useMutation({
    mutationFn: async (values: PolicyFormValues) => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/settings/policies', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // if (!response.ok) throw new Error('Failed to save policies');
      // return response.json();
      
      // For demo purposes, just return the values with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return values;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['site-policies'], data);
      setIsEditing(false);
      toast.success('Policies updated successfully');
    },
    onError: () => {
      toast.error('Failed to update policies');
    },
  });

  const onSubmit = (data: PolicyFormValues) => {
    savePolicies(data);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">Site Policies</h3>
            <p className="text-sm text-muted-foreground">
              Manage your site's legal and community guidelines
            </p>
          </div>
          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Policies
            </Button>
          ) : (
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset(currentPolicies);
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
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
            <TabsTrigger value="guidelines">Community Guidelines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms" className="mt-4">
            <FormField
              control={form.control}
              name="termsOfService"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[400px] font-mono text-sm"
                      disabled={!isEditing}
                      placeholder="Enter your Terms of Service here (Markdown supported)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-4">
            <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[400px] font-mono text-sm"
                      disabled={!isEditing}
                      placeholder="Enter your Privacy Policy here (Markdown supported)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          <TabsContent value="cookies" className="mt-4">
            <FormField
              control={form.control}
              name="cookiePolicy"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[400px] font-mono text-sm"
                      disabled={!isEditing}
                      placeholder="Enter your Cookie Policy here (Markdown supported)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
          
          <TabsContent value="guidelines" className="mt-4">
            <FormField
              control={form.control}
              name="communityGuidelines"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="min-h-[400px] font-mono text-sm"
                      disabled={!isEditing}
                      placeholder="Enter your Community Guidelines here (Markdown supported)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset(currentPolicies);
                setIsEditing(false);
              }}
              disabled={isSaving}
            >
              Discard Changes
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
                  Save All Policies
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
