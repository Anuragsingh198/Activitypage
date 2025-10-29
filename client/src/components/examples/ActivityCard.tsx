import { ActivityCard } from "../ActivityCard";

export default function ActivityCardExample() {
  const mockActivity = {
    id: 1,
    title: "Introduction to Machine Learning",
    type: "Online Class" as const,
    status: "In Progress" as const,
    date: "2025-10-25",
    duration: "1h 30m",
    program: "AI Fundamentals",
    week: "Week 2",
  };

  return (
    <div className="max-w-md">
      <ActivityCard 
        activity={mockActivity} 
        onAction={(activity) => console.log("Action clicked:", activity.title)}
      />
    </div>
  );
}
