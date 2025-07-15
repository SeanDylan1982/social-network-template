'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Mail, MailCheck, MailWarning, Bell, UserPlus, Lock, MessageSquare, ThumbsUp, User, Users, MessageCircle } from 'lucide-react';

const emailTemplateSchema = z.object({
  welcomeEmail: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  passwordReset: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  newFollower: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  newComment: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  postLiked: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  mention: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  directMessage: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  groupInvite: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
  newsletter: z.object({
    enabled: z.boolean(),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Email body is required'),
  }),
});

type EmailTemplateFormValues = z.infer<typeof emailTemplateSchema>;

const defaultTemplates: EmailTemplateFormValues = {
  welcomeEmail: {
    enabled: true,
    subject: 'Welcome to {siteName}!',
    body: `Hi {userName},

Welcome to {siteName}! We're excited to have you on board.

Get started by completing your profile and connecting with friends.

Best regards,
The {siteName} Team`
  },
  passwordReset: {
    enabled: true,
    subject: 'Reset your password',
    body: `Hi {userName},

We received a request to reset your password. Click the link below to set a new password:

{resetLink}

If you didn't request this, you can safely ignore this email.

Best regards,
The {siteName} Team`
  },
  newFollower: {
    enabled: true,
    subject: '{followerName} is now following you on {siteName}',
    body: `Hi {userName},

{followerName} is now following you on {siteName}.

View their profile: {followerProfileLink}

Best regards,
The {siteName} Team`
  },
  newComment: {
    enabled: true,
    subject: '{commenterName} commented on your post',
    body: `Hi {userName},

{commenterName} commented on your post:

"{commentPreview}..."

View the comment: {postLink}

Best regards,
The {siteName} Team`
  },
  postLiked: {
    enabled: true,
    subject: '{likerName} liked your post',
    body: `Hi {userName},

{likerName} liked your post: "{postPreview}..."

View the post: {postLink}

Best regards,
The {siteName} Team`
  },
  mention: {
    enabled: true,
    subject: 'You were mentioned by {mentionerName}',
    body: `Hi {userName},

{mentionerName} mentioned you in a {postType}:

"{contentPreview}..."

View the {postType}: {postLink}

Best regards,
The {siteName} Team`
  },
  directMessage: {
    enabled: true,
    subject: 'New message from {senderName}',
    body: `Hi {userName},

You have a new message from {senderName}:

"{messagePreview}..."

Read and reply: {messageLink}

Best regards,
The {siteName} Team`
  },
  groupInvite: {
    enabled: true,
    subject: 'You\'ve been invited to join {groupName}',
    body: `Hi {userName},

{inviterName} has invited you to join the group "{groupName}" on {siteName}.

Group description: {groupDescription}

Click below to view the group and accept the invitation:
{groupLink}

Best regards,
The {siteName} Team`
  },
  newsletter: {
    enabled: true,
    subject: 'Your {siteName} Weekly Digest',
    body: `Hi {userName},

Here's what you missed on {siteName} this week:

- {newFollowersCount} new followers
- {newLikesCount} new likes on your posts
- {newCommentsCount} new comments on your posts
- {newMentionsCount} new mentions

Check out what's new: {dashboardLink}

Best regards,
The {siteName} Team`
  },
};

const templateIcons = {
  welcomeEmail: <MailCheck className="h-4 w-4" />,
  passwordReset: <Lock className="h-4 w-4" />,
  newFollower: <UserPlus className="h-4 w-4" />,
  newComment: <MessageSquare className="h-4 w-4" />,
  postLiked: <ThumbsUp className="h-4 w-4" />,
  mention: <User className="h-4 w-4" />,
  directMessage: <MessageCircle className="h-4 w-4" />,
  groupInvite: <Users className="h-4 w-4" />,
  newsletter: <Mail className="h-4 w-4" />,
};

const templateNames = {
  welcomeEmail: 'Welcome Email',
  passwordReset: 'Password Reset',
  newFollower: 'New Follower',
  newComment: 'New Comment',
  postLiked: 'Post Liked',
  mention: 'Mention',
  directMessage: 'Direct Message',
  groupInvite: 'Group Invite',
  newsletter: 'Newsletter',
};

const templateDescriptions = {
  welcomeEmail: 'Sent when a new user signs up',
  passwordReset: 'Sent when a user requests a password reset',
  newFollower: 'Sent when someone follows a user',
  newComment: 'Sent when someone comments on a user\'s post',
  postLiked: 'Sent when someone likes a user\'s post',
  mention: 'Sent when someone mentions a user in a post or comment',
  directMessage: 'Sent when a user receives a direct message',
  groupInvite: 'Sent when a user is invited to join a group',
  newsletter: 'Weekly digest of activity',
};

const availableVariables = {
  welcomeEmail: ['{userName}', '{siteName}', '{signInLink}'],
  passwordReset: ['{userName}', '{siteName}', '{resetLink}', '{expirationTime}'],
  newFollower: ['{userName}', '{followerName}', '{followerProfileLink}', '{siteName}'],
  newComment: ['{userName}', '{commenterName}', '{postLink}', '{commentPreview}', '{postPreview}', '{siteName}'],
  postLiked: ['{userName}', '{likerName}', '{postLink}', '{postPreview}', '{siteName}'],
  mention: ['{userName}', '{mentionerName}', '{postLink}', '{contentPreview}', '{postType}', '{siteName}'],
  directMessage: ['{userName}', '{senderName}', '{messageLink}', '{messagePreview}', '{siteName}'],
  groupInvite: ['{userName}', '{inviterName}', '{groupName}', '{groupDescription}', '{groupLink}', '{siteName}'],
  newsletter: [
    '{userName}',
    '{siteName}',
    '{dashboardLink}',
    '{newFollowersCount}',
    '{newLikesCount}',
    '{newCommentsCount}',
    '{newMentionsCount}',
    '{topPosts}',
    '{trendingTopics}'
  ],
};

export function EmailTemplates() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('welcomeEmail');
  const [isEditing, setIsEditing] = useState(false);

  // Form setup
  const form = useForm<EmailTemplateFormValues>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: defaultTemplates,
  });

  // Fetch current templates
  const { data: currentTemplates, isLoading } = useQuery<EmailTemplateFormValues>({
    queryKey: ['email-templates'],
    queryFn: async () => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/settings/email-templates');
      // if (!response.ok) throw new Error('Failed to fetch email templates');
      // return response.json();
      
      // For demo purposes, return default templates with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return defaultTemplates;
    },
  });

  // Update form with current templates when they're loaded
  useEffect(() => {
    if (currentTemplates) {
      form.reset(currentTemplates);
    }
  }, [currentTemplates, form]);

  // Save templates
  const { mutate: saveTemplates, isPending: isSaving } = useMutation({
    mutationFn: async (values: EmailTemplateFormValues) => {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/settings/email-templates', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // if (!response.ok) throw new Error('Failed to save email templates');
      // return response.json();
      
      // For demo purposes, just return the values with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return values;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['email-templates'], data);
      setIsEditing(false);
      toast.success('Email templates updated successfully');
    },
    onError: () => {
      toast.error('Failed to update email templates');
    },
  });

  const onSubmit = (data: EmailTemplateFormValues) => {
    saveTemplates(data);
  };

  const renderTemplateTab = (templateKey: keyof EmailTemplateFormValues) => {
    const Icon = templateIcons[templateKey];
    const name = templateNames[templateKey];
    const description = templateDescriptions[templateKey];
    
    return (
      <div key={templateKey} className="flex items-center space-x-2">
        <div className="rounded-md bg-primary/10 p-1.5">
          {Icon}
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
    );
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
            <h3 className="text-lg font-medium">Email Templates</h3>
            <p className="text-sm text-muted-foreground">
              Customize the email notifications sent to your users
            </p>
          </div>
          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Edit Templates
            </Button>
          ) : (
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset(currentTemplates);
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

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
          orientation="vertical"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <TabsList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 h-auto p-2 gap-1 w-full md:w-80 flex-shrink-0">
              {Object.keys(templateNames).map((key) => (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="justify-start h-auto py-2 px-3 text-left"
                >
                  {renderTemplateTab(key as keyof EmailTemplateFormValues)}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex-1">
              {Object.entries(templateNames).map(([key]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <FormField
                        control={form.control}
                        name={`${key}.enabled`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                {templateNames[key as keyof typeof templateNames]}
                              </FormLabel>
                              <FormDescription>
                                {templateDescriptions[key as keyof typeof templateDescriptions]}
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

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`${key}.subject`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Subject</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={!isEditing}
                                placeholder="Email subject"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`${key}.body`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex justify-between items-center">
                              <FormLabel>Email Body</FormLabel>
                              <div className="text-sm text-muted-foreground">
                                Available variables: {availableVariables[key as keyof typeof availableVariables].join(', ')}
                              </div>
                            </div>
                            <FormControl>
                              <Textarea
                                {...field}
                                className="min-h-[300px] font-mono text-sm"
                                disabled={!isEditing}
                                placeholder="Enter your email template here"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>

        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset(currentTemplates);
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
                  Save All Templates
                </>
              )}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
