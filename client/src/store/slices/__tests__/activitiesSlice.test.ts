import { describe, it, expect } from 'vitest';
import activitiesReducer, {
  setActivities,
  setFilters,
  clearFilters,
  selectFilteredActivities,
} from '../activitiesSlice';
import { Activity } from '@/types/activity';

const mockActivities: Activity[] = [
  {
    id: 1,
    title: 'React Basics',
    type: 'Online Class',
    status: 'Not Started',
    date: '2024-01-15',
  },
  {
    id: 2,
    title: 'JavaScript Quiz',
    type: 'Quiz',
    status: 'In Progress',
    dueDate: '2024-01-20',
    progress: 50,
  },
  {
    id: 3,
    title: 'Final Assignment',
    type: 'Assignment',
    status: 'Completed',
    dueDate: '2024-01-25',
    progress: 100,
  },
];

describe('activitiesSlice', () => {
  const initialState = {
    items: [],
    filters: { type: 'All', status: 'All', search: '' },
  };

  it('should return initial state', () => {
    expect(activitiesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setActivities', () => {
    const action = setActivities(mockActivities);
    const state = activitiesReducer(initialState, action);

    expect(state.items).toEqual(mockActivities);
    expect(state.items.length).toBe(3);
  });

  it('should handle setFilters for type', () => {
    const stateWithActivities = {
      ...initialState,
      items: mockActivities,
    };

    const action = setFilters({ type: 'Online Class' });
    const state = activitiesReducer(stateWithActivities, action);

    expect(state.filters.type).toBe('Online Class');
    expect(state.filters.status).toBe('All');
    expect(state.filters.search).toBe('');
  });

  it('should handle setFilters for status', () => {
    const stateWithActivities = {
      ...initialState,
      items: mockActivities,
    };

    const action = setFilters({ status: 'Completed' });
    const state = activitiesReducer(stateWithActivities, action);

    expect(state.filters.status).toBe('Completed');
    expect(state.filters.type).toBe('All');
  });

  it('should handle setFilters for search', () => {
    const stateWithActivities = {
      ...initialState,
      items: mockActivities,
    };

    const action = setFilters({ search: 'React' });
    const state = activitiesReducer(stateWithActivities, action);

    expect(state.filters.search).toBe('React');
  });

  it('should handle clearFilters', () => {
    const stateWithFilters = {
      items: mockActivities,
      filters: { type: 'Online Class', status: 'Not Started', search: 'React' },
    };

    const action = clearFilters();
    const state = activitiesReducer(stateWithFilters, action);

    expect(state.filters).toEqual({ type: 'All', status: 'All', search: '' });
  });

  it('should filter activities by type', () => {
    const state = {
      items: mockActivities,
      filters: { type: 'Online Class', status: 'All', search: '' },
    };

    const filtered = selectFilteredActivities({
      activities: state,
    } as any);

    expect(filtered.length).toBe(1);
    expect(filtered[0].type).toBe('Online Class');
  });

  it('should filter activities by status', () => {
    const state = {
      items: mockActivities,
      filters: { type: 'All', status: 'Completed', search: '' },
    };

    const filtered = selectFilteredActivities({
      activities: state,
    } as any);

    expect(filtered.length).toBe(1);
    expect(filtered[0].status).toBe('Completed');
  });

  it('should filter activities by search term', () => {
    const state = {
      items: mockActivities,
      filters: { type: 'All', status: 'All', search: 'React' },
    };

    const filtered = selectFilteredActivities({
      activities: state,
    } as any);

    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toContain('React');
  });

  it('should filter activities by multiple criteria', () => {
    const state = {
      items: mockActivities,
      filters: { type: 'Quiz', status: 'In Progress', search: 'JavaScript' },
    };

    const filtered = selectFilteredActivities({
      activities: state,
    } as any);

    expect(filtered.length).toBe(1);
    expect(filtered[0].type).toBe('Quiz');
    expect(filtered[0].status).toBe('In Progress');
  });

  it('should return all activities when filters are "All"', () => {
    const state = {
      items: mockActivities,
      filters: { type: 'All', status: 'All', search: '' },
    };

    const filtered = selectFilteredActivities({
      activities: state,
    } as any);

    expect(filtered.length).toBe(3);
  });
});

