import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ActivityCard } from '../ActivityCard';
import { Activity } from '@/types/activity';
import activitiesReducer from '@/store/slices/activitiesSlice';

const mockActivity: Activity = {
  id: 1,
  title: 'Introduction to React',
  type: 'Online Class',
  status: 'Not Started',
  date: '2024-01-15',
  duration: '2 hours',
  description: 'Learn the basics of React',
  progress: 0,
};

const createMockStore = () => {
  return configureStore({
    reducer: {
      activities: activitiesReducer,
    },
  });
};

describe('ActivityCard', () => {
  it('renders activity title', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();

    render(
      <Provider store={store}>
        <ActivityCard activity={mockActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText('Introduction to React')).toBeInTheDocument();
  });

  it('renders activity type badge', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();

    render(
      <Provider store={store}>
        <ActivityCard activity={mockActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText('Online Class')).toBeInTheDocument();
  });

  it('renders activity status', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();

    render(
      <Provider store={store}>
        <ActivityCard activity={mockActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText('Not Started')).toBeInTheDocument();
  });

  it('renders correct action button label for Not Started status', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();

    render(
      <Provider store={store}>
        <ActivityCard activity={mockActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText('Start Activity')).toBeInTheDocument();
  });

  it('renders correct action button label for In Progress status', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();
    const inProgressActivity = { ...mockActivity, status: 'In Progress' as const, progress: 50 };

    render(
      <Provider store={store}>
        <ActivityCard activity={inProgressActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText('Continue Learning')).toBeInTheDocument();
  });

  it('renders correct action button label for Completed status', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();
    const completedActivity = { ...mockActivity, status: 'Completed' as const, progress: 100 };

    render(
      <Provider store={store}>
        <ActivityCard activity={completedActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText('Review & Reflect')).toBeInTheDocument();
  });

  it('displays activity date when available', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();

    render(
      <Provider store={store}>
        <ActivityCard activity={mockActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText(/Date/i)).toBeInTheDocument();
  });

  it('displays activity duration when available', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();

    render(
      <Provider store={store}>
        <ActivityCard activity={mockActivity} onAction={mockOnAction} />
      </Provider>
    );

    expect(screen.getByText('2 hours')).toBeInTheDocument();
  });

  it('calls onAction when action button is clicked', () => {
    const store = createMockStore();
    const mockOnAction = vi.fn();

    render(
      <Provider store={store}>
        <ActivityCard activity={mockActivity} onAction={mockOnAction} />
      </Provider>
    );

    const actionButton = screen.getByText('Start Activity');
    actionButton.click();

    expect(mockOnAction).toHaveBeenCalledWith(mockActivity);
  });
});

