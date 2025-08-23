import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_REWARD_CHANCE } from '../constants/Constants';
import {
  getActiveAchievements,
  calculateBalancedRewardChance,
  DEFAULT_POMODORO_LENGTH,
} from '../constants/Achievements';

interface PomodoroStats {
  totalSessions: number;
  totalTimeSpent: number;
  rewardChance: number;
  currentStreak: number;
  dailyStreak: number;
  lastSessionDate: string;
  lastSessionLength: number;
  consumedAchievements: string[];
}

interface PomodoroContextType {
  stats: PomodoroStats;
  addCompletedSession: (durationInSeconds: number) => void;
  resetStats: () => void;
  updateRewardChance: (chance: number) => void;
  getActiveAchievements: () => any[];
  getActiveAchievementsForSession: (currentSessionLength: number) => any[];
  getCurrentRewardChance: (sessionLength: number) => number;
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
    currentStreak: 0,
    dailyStreak: 0,
    lastSessionDate: '',
    lastSessionLength: DEFAULT_POMODORO_LENGTH,
    consumedAchievements: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const savedStats = await AsyncStorage.getItem('pomodoroStats');
      if (savedStats) {
        const parsedStats = JSON.parse(savedStats);
        const enhancedStats = {
          totalSessions: parsedStats.totalSessions || 0,
          totalTimeSpent: parsedStats.totalTimeSpent || 0,
          rewardChance: parsedStats.rewardChance || DEFAULT_REWARD_CHANCE,
          currentStreak: parsedStats.currentStreak || 0,
          dailyStreak: parsedStats.dailyStreak || 0,
          lastSessionDate: parsedStats.lastSessionDate || '',
          lastSessionLength:
            parsedStats.lastSessionLength || DEFAULT_POMODORO_LENGTH,
          consumedAchievements: parsedStats.consumedAchievements || [],
        };
        setStats(enhancedStats);
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

  const updateDailyStreak = (currentDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = stats.lastSessionDate
      ? new Date(stats.lastSessionDate).toISOString().split('T')[0]
      : '';

    if (lastDate === today) {
      return stats.dailyStreak;
    }

    if (
      lastDate ===
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    ) {
      return stats.dailyStreak + 1;
    } else {
      return 1;
    }
  };

  const addCompletedSession = (durationInSeconds: number) => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = stats.lastSessionDate
      ? new Date(stats.lastSessionDate).toISOString().split('T')[0]
      : '';

    let newCurrentStreak = stats.currentStreak;
    if (lastDate === today) {
      newCurrentStreak += 1;
    } else if (
      lastDate ===
      new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    ) {
      newCurrentStreak += 1;
    } else {
      newCurrentStreak = 1;
    }

    const newDailyStreak = updateDailyStreak(today);

    const activeAchievements = getActiveAchievements(
      stats.totalSessions,
      stats.currentStreak,
      stats.dailyStreak,
      stats.lastSessionLength,
      stats.consumedAchievements
    );
    const newConsumedAchievements = [...stats.consumedAchievements];

    activeAchievements.forEach(achievement => {
      if (
        achievement.isConsumable &&
        !stats.consumedAchievements.includes(achievement.id)
      ) {
        newConsumedAchievements.push(achievement.id);
      }
    });

    const newStats = {
      totalSessions: stats.totalSessions + 1,
      totalTimeSpent: stats.totalTimeSpent + durationInSeconds,
      rewardChance: stats.rewardChance,
      currentStreak: newCurrentStreak,
      dailyStreak: newDailyStreak,
      lastSessionDate: today,
      lastSessionLength: durationInSeconds,
      consumedAchievements: newConsumedAchievements,
    };
    setStats(newStats);
    saveStats(newStats);
  };

  const resetStats = () => {
    const newStats = {
      totalSessions: 0,
      totalTimeSpent: 0,
      rewardChance: DEFAULT_REWARD_CHANCE,
      currentStreak: 0,
      dailyStreak: 0,
      lastSessionDate: '',
      lastSessionLength: DEFAULT_POMODORO_LENGTH,
      consumedAchievements: [],
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

  const getActiveAchievementsList = () => {
    return getActiveAchievements(
      stats.totalSessions,
      stats.currentStreak,
      stats.dailyStreak,
      stats.lastSessionLength,
      stats.consumedAchievements
    );
  };

  const getActiveAchievementsForSession = (currentSessionLength: number) => {
    return getActiveAchievements(
      stats.totalSessions,
      stats.currentStreak,
      stats.dailyStreak,
      currentSessionLength,
      stats.consumedAchievements
    );
  };

  const getCurrentRewardChance = (sessionLength: number) => {
    const activeAchievements = getActiveAchievementsForSession(sessionLength);
    return calculateBalancedRewardChance(
      stats.rewardChance,
      sessionLength,
      activeAchievements
    );
  };

  return (
    <PomodoroContext.Provider
      value={{
        stats,
        addCompletedSession,
        resetStats,
        updateRewardChance,
        getActiveAchievements: getActiveAchievementsList,
        getActiveAchievementsForSession,
        getCurrentRewardChance,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
