import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_REWARD_CHANCE } from '../constants/Constants';

interface PomodoroStats {
  totalSessions: number;
  totalTimeSpent: number;
  rewardChance: number;
}

interface PomodoroContextType {
  stats: PomodoroStats;
  addCompletedSession: (durationInSeconds: number) => void;
  resetStats: () => void;
  updateRewardChance: (chance: number) => void;
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
    rewardChance: DEFAULT_REWARD_CHANCE,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const savedStats = await AsyncStorage.getItem('pomodoroStats');
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        if (parsedStats.rewardChance === undefined) {
          parsedStats.rewardChance = DEFAULT_REWARD_CHANCE;
        }
        setStats(parsedStats);
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
      rewardChance: stats.rewardChance,
    };
    setStats(newStats);
    saveStats(newStats);
  };

  const resetStats = () => {
    const newStats = {
      totalSessions: 0,
      totalTimeSpent: 0,
      rewardChance: DEFAULT_REWARD_CHANCE,
    };
    setStats(newStats);
    saveStats(newStats);
  };

  const updateRewardChance = (chance: number) => {
    const newStats = {
      ...stats,
      rewardChance: chance,
    };
    setStats(newStats);
    saveStats(newStats);
  };

  return (
    <PomodoroContext.Provider
      value={{ stats, addCompletedSession, resetStats, updateRewardChance }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
