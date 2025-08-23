import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PomodoroStats {
  totalSessions: number;
  totalTimeSpent: number;
}

interface PomodoroContextType {
  stats: PomodoroStats;
  addCompletedSession: (durationInSeconds: number) => void;
  resetStats: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export const usePomodoroStats = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoroStats must be used within a PomodoroProvider');
  }
  return context;
};

export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stats, setStats] = useState<PomodoroStats>({
    totalSessions: 0,
    totalTimeSpent: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const savedStats = await AsyncStorage.getItem('pomodoroStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (error) {
      console.error('Error loading pomodoro stats:', error);
    }
  };

  const saveStats = async (newStats: PomodoroStats) => {
    try {
      await AsyncStorage.setItem('pomodoroStats', JSON.stringify(newStats));
    } catch (error) {
      console.error('Error saving pomodoro stats:', error);
    }
  };

  const addCompletedSession = (durationInSeconds: number) => {
    const newStats = {
      totalSessions: stats.totalSessions + 1,
      totalTimeSpent: stats.totalTimeSpent + durationInSeconds,
    };
    setStats(newStats);
    saveStats(newStats);
  };

  const resetStats = () => {
    const newStats = {
      totalSessions: 0,
      totalTimeSpent: 0,
    };
    setStats(newStats);
    saveStats(newStats);
  };

  return (
    <PomodoroContext.Provider
      value={{ stats, addCompletedSession, resetStats }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
