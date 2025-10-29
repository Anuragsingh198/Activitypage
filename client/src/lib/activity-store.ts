import { create } from 'zustand';
import { Activity, ActivityType, ActivityStatus } from '@shared/schema';

interface ActivityFilters {
  type: ActivityType | "All";
  status: ActivityStatus | "All";
  search: string;
}

interface ActivityStore {
  activities: Activity[];
  filters: ActivityFilters;
  setActivities: (activities: Activity[]) => void;
  setFilters: (filters: Partial<ActivityFilters>) => void;
  clearFilters: () => void;
  getFilteredActivities: () => Activity[];
}

const defaultFilters: ActivityFilters = {
  type: "All",
  status: "All",
  search: "",
};

export const useActivityStore = create<ActivityStore>((set, get) => ({
  activities: [],
  filters: defaultFilters,
  
  setActivities: (activities) => set({ activities }),
  
  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  
  clearFilters: () => set({ filters: defaultFilters }),
  
  getFilteredActivities: () => {
    const { activities, filters } = get();
    
    return activities.filter((activity) => {
      const matchesType = filters.type === "All" || activity.type === filters.type;
      const matchesStatus = filters.status === "All" || activity.status === filters.status;
      const matchesSearch = 
        filters.search === "" ||
        activity.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.type.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesStatus && matchesSearch;
    });
  },
}));
