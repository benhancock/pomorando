export interface AchievementRule {
  id: string;
  name: string;
  description: string;
  icon: string;
  trigger: AchievementTrigger;
  rewardMultiplier: number;
  category: 'streak' | 'session' | 'milestone' | 'time';
  priority: number;
  isConsumable: boolean;
  appliesToCurrentSession: boolean;
}

export interface AchievementTrigger {
  type: 'streak' | 'session_count' | 'total_time' | 'session_length' | 'daily_streak' | 'time_of_day';
  value: number;
  additionalData?: any;
}

export const DEFAULT_POMODORO_LENGTH = 25 * 60;

export const ACHIEVEMENT_RULES: AchievementRule[] = [
  {
    id: 'streak_3',
    name: 'Hot Streak',
    description: 'Complete 3 pomodoros in a row',
    icon: '🔥',
    trigger: { type: 'streak', value: 3 },
    rewardMultiplier: 1.2,
    category: 'streak',
    priority: 100,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'streak_5',
    name: 'On Fire',
    description: 'Complete 5 pomodoros in a row',
    icon: '🔥🔥',
    trigger: { type: 'streak', value: 5 },
    rewardMultiplier: 1.5,
    category: 'streak',
    priority: 90,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'streak_10',
    name: 'Unstoppable',
    description: 'Complete 10 pomodoros in a row',
    icon: '🔥🔥🔥',
    trigger: { type: 'streak', value: 10 },
    rewardMultiplier: 2.0,
    category: 'streak',
    priority: 80,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'daily_3',
    name: 'Consistent',
    description: 'Complete pomodoros for 3 days in a row',
    icon: '📅',
    trigger: { type: 'daily_streak', value: 3 },
    rewardMultiplier: 1.1,
    category: 'streak',
    priority: 70,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'daily_7',
    name: 'Week Warrior',
    description: 'Complete pomodoros for 7 days in a row',
    icon: '📅📅',
    trigger: { type: 'daily_streak', value: 7 },
    rewardMultiplier: 1.3,
    category: 'streak',
    priority: 60,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'daily_14',
    name: 'Fortnight Fighter',
    description: 'Complete pomodoros for 14 days in a row',
    icon: '📅📅📅',
    trigger: { type: 'daily_streak', value: 14 },
    rewardMultiplier: 1.6,
    category: 'streak',
    priority: 50,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'short_session',
    name: 'Quick Focus',
    description: 'Currently doing a short pomodoro (< 20 min)',
    icon: '⚡',
    trigger: { type: 'session_length', value: 20 * 60, additionalData: { comparison: 'less' } },
    rewardMultiplier: 0.8,
    category: 'session',
    priority: 40,
    isConsumable: false,
    appliesToCurrentSession: true,
  },
  {
    id: 'long_session',
    name: 'Deep Work',
    description: 'Currently doing a long pomodoro (> 45 min)',
    icon: '🧠',
    trigger: { type: 'session_length', value: 45 * 60, additionalData: { comparison: 'greater' } },
    rewardMultiplier: 1.4,
    category: 'session',
    priority: 30,
    isConsumable: false,
    appliesToCurrentSession: true,
  },
  {
    id: 'marathon_session',
    name: 'Marathon',
    description: 'Currently doing a very long pomodoro (> 60 min)',
    icon: '🏃',
    trigger: { type: 'session_length', value: 60 * 60, additionalData: { comparison: 'greater' } },
    rewardMultiplier: 1.8,
    category: 'session',
    priority: 20,
    isConsumable: false,
    appliesToCurrentSession: true,
  },
  {
    id: 'first_10',
    name: 'Getting Started',
    description: 'Complete your first 10 pomodoros',
    icon: '🎯',
    trigger: { type: 'session_count', value: 10 },
    rewardMultiplier: 1.1,
    category: 'milestone',
    priority: 10,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'first_50',
    name: 'Dedicated',
    description: 'Complete your first 50 pomodoros',
    icon: '🎯🎯',
    trigger: { type: 'session_count', value: 50 },
    rewardMultiplier: 1.2,
    category: 'milestone',
    priority: 5,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
  {
    id: 'first_100',
    name: 'Century Club',
    description: 'Complete your first 100 pomodoros',
    icon: '🎯🎯🎯',
    trigger: { type: 'session_count', value: 100 },
    rewardMultiplier: 1.3,
    category: 'milestone',
    priority: 1,
    isConsumable: true,
    appliesToCurrentSession: false,
  },
];

export function calculateBalancedRewardChance(
  baseChance: number,
  sessionLength: number,
  activeAchievements: AchievementRule[]
): number {
  let finalChance = baseChance;
  
  activeAchievements.forEach(achievement => {
    finalChance *= achievement.rewardMultiplier;
  });
  
  const timeRatio = sessionLength / DEFAULT_POMODORO_LENGTH;
  finalChance *= timeRatio;
  
  return Math.max(0, Math.min(100, finalChance));
}

export function getActiveAchievements(
  totalSessions: number,
  currentStreak: number,
  dailyStreak: number,
  lastSessionLength: number,
  consumedAchievements: string[] = []
): AchievementRule[] {
  const active: AchievementRule[] = [];
  
  ACHIEVEMENT_RULES.forEach(rule => {
    if (rule.isConsumable && consumedAchievements.includes(rule.id)) {
      return;
    }
    
    let isActive = false;
    
    switch (rule.trigger.type) {
      case 'streak':
        isActive = currentStreak >= rule.trigger.value;
        break;
      case 'daily_streak':
        isActive = dailyStreak >= rule.trigger.value;
        break;
      case 'session_count':
        isActive = totalSessions >= rule.trigger.value;
        break;
      case 'session_length':
        if (rule.trigger.additionalData?.comparison === 'less') {
          isActive = lastSessionLength < rule.trigger.value;
        } else if (rule.trigger.additionalData?.comparison === 'greater') {
          isActive = lastSessionLength > rule.trigger.value;
        }
        break;
    }
    
    if (isActive) {
      active.push(rule);
    }
  });
  
  return active.sort((a, b) => b.priority - a.priority);
}
