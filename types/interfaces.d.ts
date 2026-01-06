export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
}

export interface Habit {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  weekDays: number[]; // Array of weekday indices (0=Monday, 6=Sunday)
}

export interface Tracking {
  id: string;
  habitId: string;
  userId: string;
  checked: boolean;
  trackedAt: Date;
}

export interface AppContextType {
  currentUser: User | null;
  habits: Habit[];
  trackingRecords: Tracking[];
  login: (username: string, password: string) => void;
  logout: () => void;
  createHabit: (name: string, weekDays: number[]) => void;
  deleteHabit: (habitId: string) => void;
  toggleHabitTracking: (habitId: string, date: Date) => void;
  getWeeklyProgress: (habitId: string, weekStart: Date) => number;
  getHabitTrackingForDate: (habitId: string, date: Date) => Tracking | undefined;
  getTodaysPendingHabits: () => Habit[];
  getMonthlyCompletedCount: () => number;
}

