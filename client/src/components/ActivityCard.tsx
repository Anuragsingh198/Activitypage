import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity } from "@shared/schema";
import { Calendar, Clock, ChevronRight, Eye, Video, ClipboardCheck, FileText, MessageSquare } from "lucide-react";
import { format } from "date-fns";

interface ActivityCardProps {
  activity: Activity;
  onAction?: (activity: Activity) => void;
}

const typeConfig = {
  "Online Class": {
    color: "bg-activity-class text-white",
    icon: Video,
  },
  "Quiz": {
    color: "bg-activity-quiz text-white",
    icon: ClipboardCheck,
  },
  "Assignment": {
    color: "bg-activity-assignment text-white",
    icon: FileText,
  },
  "Discussion": {
    color: "bg-activity-discussion text-white",
    icon: MessageSquare,
  },
};

const statusConfig = {
  "Not Started": {
    label: "Not Started",
    dotClass: "border-2 border-activity-status-not-started",
    textClass: "text-activity-status-not-started",
  },
  "In Progress": {
    label: "In Progress",
    dotClass: "bg-activity-status-in-progress animate-pulse",
    textClass: "text-activity-status-in-progress",
  },
  "Completed": {
    label: "Completed",
    dotClass: "bg-activity-status-completed",
    textClass: "text-activity-status-completed",
  },
};

const actionConfig = {
  "Not Started": {
    label: "Start Activity",
    icon: ChevronRight,
    variant: "default" as const,
  },
  "In Progress": {
    label: "Continue Learning",
    icon: ChevronRight,
    variant: "default" as const,
  },
  "Completed": {
    label: "Review & Reflect",
    icon: Eye,
    variant: "secondary" as const,
  },
};

export function ActivityCard({ activity, onAction }: ActivityCardProps) {
  const TypeIcon = typeConfig[activity.type].icon;
  const statusInfo = statusConfig[activity.status];
  const actionInfo = actionConfig[activity.status];
  const ActionIcon = actionInfo.icon;

  const displayDate = activity.date 
    ? format(new Date(activity.date), "MMM dd, yyyy")
    : activity.dueDate 
    ? format(new Date(activity.dueDate), "MMM dd, yyyy")
    : null;

  const dateLabel = activity.date ? "Date" : "Due Date";

  return (
    <Card 
      className="p-6 hover-elevate transition-all duration-200 hover:shadow-md"
      data-testid={`card-activity-${activity.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge 
          className={`${typeConfig[activity.type].color} px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider flex items-center gap-1.5`}
          data-testid={`badge-type-${activity.id}`}
        >
          <TypeIcon className="h-3 w-3" />
          {activity.type}
        </Badge>
        
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${statusInfo.dotClass}`} />
          <span className={`text-sm font-medium ${statusInfo.textClass}`} data-testid={`text-status-${activity.id}`}>
            {statusInfo.label}
          </span>
        </div>
      </div>

      <h3 className="text-lg font-medium text-card-foreground mb-4 line-clamp-2" data-testid={`text-title-${activity.id}`}>
        {activity.title}
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
        {displayDate && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <div>
              <div className="text-xs">{dateLabel}</div>
              <div className="font-medium text-foreground">{displayDate}</div>
            </div>
          </div>
        )}
        
        {activity.duration && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <div>
              <div className="text-xs">Duration</div>
              <div className="font-medium text-foreground">{activity.duration}</div>
            </div>
          </div>
        )}
        
        {activity.program && (
          <div className="flex items-center gap-2 text-muted-foreground col-span-2">
            <div>
              <div className="text-xs">Program</div>
              <div className="font-medium text-foreground">{activity.program} {activity.week && `• ${activity.week}`}</div>
            </div>
          </div>
        )}
      </div>

      <Button 
        variant={actionInfo.variant}
        className="w-full"
        onClick={() => onAction?.(activity)}
        data-testid={`button-action-${activity.id}`}
      >
        {actionInfo.label}
        <ActionIcon className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}
