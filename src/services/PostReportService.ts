import { useWebSocket } from '@/contexts/WebSocketContext';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/contexts/UserContext';

interface ReportPostOptions {
  postId: string;
  reason: string;
}

export class PostReportService {
  private toast = useToast();
  private webSocket = useWebSocket();
  private user = useUser();

  async reportPost({ postId, reason }: ReportPostOptions) {
    try {
      // Send report to WebSocket
      await this.webSocket.sendNotification({
        type: 'post_report',
        data: {
          postId,
          reason,
          reporterId: this.user.id,
          reporterName: this.user.name,
          timestamp: new Date().toISOString(),
          priority: 'high',
        },
      });

      // Check if post has been reported more than 2 times
      const reports = await this.webSocket.getPostReports(postId);
      if (reports.length >= 2) {
        // Send high-priority notification to admin
        await this.webSocket.sendNotification({
          type: 'admin_alert',
          data: {
            postId,
            reason,
            reportCount: reports.length,
            actionRequired: true,
            timestamp: new Date().toISOString(),
            priority: 'critical',
          },
        });

        // Temporarily hide the post
        await this.webSocket.sendNotification({
          type: 'post_hide',
          data: {
            postId,
            reason: 'Multiple reports pending admin review',
            timestamp: new Date().toISOString(),
          },
        });

        this.toast({
          title: 'Post Reported',
          description: 'This post has been temporarily hidden due to multiple reports. It will be reviewed by an admin.',
          variant: 'warning',
        });
      } else {
        this.toast({
          title: 'Post Reported',
          description: 'Thank you for reporting this post. It will be reviewed by our team.',
          variant: 'success',
        });
      }
    } catch (error) {
      console.error('Error reporting post:', error);
      this.toast({
        title: 'Error',
        description: 'Failed to report post. Please try again later.',
        variant: 'destructive',
      });
      throw error;
    }
  }
}
