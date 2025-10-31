import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Activity, ActivityStatus, ActivityType } from "@/types/activity";
import type { RootState } from "../index";

type Filters = {
  type: ActivityType | "All";
  status: ActivityStatus | "All";
  search: string;
};

type ActivitiesState = {
  items: Activity[];
  filters: Filters;
};

const initialState: ActivitiesState = {
  items: [],
  filters: { type: "All", status: "All", search: "" },
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities(state, action: PayloadAction<Activity[]>) {
      state.items = action.payload;
    },
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = { type: "All", status: "All", search: "" };
    },
  },
});

export const { setActivities, setFilters, clearFilters } = activitiesSlice.actions;

export default activitiesSlice.reducer;

// selectors
export const selectActivitiesState = (state: RootState) => state.activities;
export const selectFilters = (state: RootState) => state.activities.filters;
export const selectActivities = (state: RootState) => state.activities.items;

export const selectFilteredActivities = createSelector(
  [selectActivities, selectFilters],
  (activities, filters) => {
    const searchLower = filters.search.toLowerCase();
    return activities.filter((activity) => {
      const matchesType = filters.type === "All" || activity.type === filters.type;
      const matchesStatus = filters.status === "All" || activity.status === filters.status;
      const matchesSearch =
        filters.search === "" ||
        activity.title.toLowerCase().includes(searchLower) ||
        activity.type.toLowerCase().includes(searchLower);
      return matchesType && matchesStatus && matchesSearch;
    });
  }
);

