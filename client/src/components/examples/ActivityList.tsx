import { ActivityList } from "../ActivityList";

export default function ActivityListExample() {
  const mockActivities = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      type: "Online Class" as const,
      status: "In Progress" as const,
      date: "2025-10-25",
      duration: "1h 30m",
      program: "AI Fundamentals",
      week: "Week 2",
    },
    {
      id: 2,
      title: "Quiz on Neural Networks",
      type: "Quiz" as const,
      status: "Not Started" as const,
      dueDate: "2025-10-31",
      program: "AI Fundamentals",
      week: "Week 2",
    },
    {
      id: 3,
      title: "Build a Classification Model",
      type: "Assignment" as const,
      status: "Completed" as const,
      dueDate: "2025-11-05",
      program: "AI Fundamentals",
      week: "Week 2",
    },
  ];

  return (
    <ActivityList 
      activities={mockActivities}
      onActivityAction={(activity) => console.log("Action clicked:", activity.title)}
    />
  );
}
