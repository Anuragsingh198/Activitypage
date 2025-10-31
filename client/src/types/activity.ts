export type ActivityType = "Online Class" | "Quiz" | "Assignment" | "Discussion";
export type ActivityStatus = "Not Started" | "In Progress" | "Completed";

export type Activity = {
  id: number;
  title: string;
  type: ActivityType;
  status: ActivityStatus;
  date?: string;
  dueDate?: string;
  duration?: string;
  program?: string;
  week?: string;
  description?: string;
  instructorName?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  points?: number;
  resources?: { type: "PDF" | "Link"; title: string; url: string }[];
  progress?: number; 
  lastAccessed?: string;
  recordingUrl?: string; 
  joinUrl?: string; 
  quizUrl?: string; 
  assignmentUrl?: string; 
  submitUrl?: string; 
  discussionUrl?: string; 
};

