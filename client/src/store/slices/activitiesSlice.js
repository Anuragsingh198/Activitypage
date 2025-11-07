import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filters: { type: "All", status: "All", search: "" , difficulty: "All" },
};

const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    setActivities(state, action) {
      state.items = action.payload;
    },
    setFilters(state, action) {
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
export const selectActivitiesState = (state) => state.activities;
export const selectFilters = (state) => state.activities.filters;
export const selectActivities = (state) => state.activities.items;

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
      return matchesType && matchesStatus && matchesSearch ;
    });
  }
);

