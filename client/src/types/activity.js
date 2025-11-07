/**
 * Activity Type Definitions
 * 
 * @typedef {"Online Class" | "Quiz" | "Assignment" | "Discussion"} ActivityType
 * @typedef {"Not Started" | "In Progress" | "Completed"} ActivityStatus
 * 
 * @typedef {Object} Activity
 * @property {number} id
 * @property {string} title
 * @property {ActivityType} type
 * @property {ActivityStatus} status
 * @property {string} [date]
 * @property {string} [dueDate]
 * @property {string} [duration]
 * @property {string} [program]
 * @property {string} [week]
 * @property {string} [description]
 * @property {string} [instructorName]
 * @property {"Beginner" | "Intermediate" | "Advanced"} [difficulty]
 * @property {number} [points]
 * @property {Array<{type: "PDF" | "Link", title: string, url: string}>} [resources]
 * @property {number} [progress]
 * @property {string} [lastAccessed]
 * @property {string} [recordingUrl]
 * @property {string} [joinUrl]
 * @property {string} [quizUrl]
 * @property {string} [assignmentUrl]
 * @property {string} [submitUrl]
 * @property {string} [discussionUrl]
 */

// Export constants for activity types and statuses
export const ActivityTypes = {
  ONLINE_CLASS: "Online Class",
  QUIZ: "Quiz",
  ASSIGNMENT: "Assignment",
  DISCUSSION: "Discussion"
};

export const ActivityStatuses = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed"
};

