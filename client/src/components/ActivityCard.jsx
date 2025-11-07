import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronRight, Eye, Video, ClipboardCheck, FileText, MessageSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";

/**
 * @param {Object} props
 * @param {Object} props.activity
 * @param {Function} [props.onAction]
 */
export function ActivityCard({ activity, onAction }) {
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
      variant: "default",
    },
    "In Progress": {
      label: "Continue Learning",
      icon: ChevronRight,
      variant: "default",
    },
    "Completed": {
      label: "Review & Reflect",
      icon: Eye,
      variant: "secondary",
    },
  };

  const TypeIcon = typeConfig[activity.type].icon;
  const statusInfo = statusConfig[activity.status];
  const actionInfo = actionConfig[activity.status];
  const ActionIcon = actionInfo.icon;
  const progress = typeof activity.progress === "number" ? activity.progress : undefined;

  /**
   * @param {Object} props
   * @param {number} props.value
   */
  function ProgressRing({ value }) {
    const radius = 18;
    const stroke = 4;
    const normalized = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalized;
    const v = Math.max(0, Math.min(100, value));
    const offset = circumference - (v / 100) * circumference;
    return (
      <svg width={radius * 2} height={radius * 2} className="shrink-0">
        <circle cx={radius} cy={radius} r={normalized} stroke="#E5E7EB" strokeWidth={stroke} fill="transparent" />
        <circle
          cx={radius}
          cy={radius}
          r={normalized}
          stroke="#3B82F6"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: offset, transition: "stroke-dashoffset 400ms ease" }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="text-[9px] fill-foreground">
          {v}%
        </text>
      </svg>
    );
  }

  const displayDate = activity.date 
    ? format(new Date(activity.date), "MMM dd, yyyy")
    : activity.dueDate 
    ? format(new Date(activity.dueDate), "MMM dd, yyyy")
    : null;

  const dateLabel = activity.date ? "Date" : "Due Date";

  return (
    <Card 
      className="p-5 md:p-6 hover-elevate transition-all duration-200 hover:translate-y-[1px] ring-1 ring-transparent hover:ring-primary/10 hover:bg-muted/30 bg-white dark:bg-card dark:hover:bg-muted/20"
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
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${statusInfo.dotClass}`} />
            <span className={`text-xs font-medium ${statusInfo.textClass}`} data-testid={`text-status-${activity.id}`}>
              {statusInfo.label}
            </span>
          </div>
          {typeof progress === "number" && <ProgressRing value={progress} />}
        </div>
      </div>

      <h3 className="text-base font-medium text-card-foreground mb-3 line-clamp-2" data-testid={`text-title-${activity.id}`}>
        {activity.title}
      </h3>

      {activity.description && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2 cursor-help">
                {activity.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm whitespace-pre-wrap">
              {activity.description}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        {displayDate && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <div>
              <div className="text-xs">{dateLabel}</div>
              <div className="font-medium text-foreground">{displayDate}</div>
            </div>
          </div>
        )}
        
        {activity.duration && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3 w-3" />
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

      <div className="h-px bg-border mb-4" />

      <Button 
        variant={actionInfo.variant}
        size="sm"
        className="w-full"
        onClick={() => onAction && onAction(activity)}
        data-testid={`button-action-${activity.id}`}
      >
        {actionInfo.label}
        <ActionIcon className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}

