import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@/components/ui/box';
import { SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { InfoIcon, CalendarDaysIcon, SettingsIcon } from '@/components/ui/icon';
import { usePomodoroStats } from '../contexts/PomodoroContext';
import { DEFAULT_REWARD_CHANCE } from '../constants/Constants';
import { AchievementChips } from '../components/AchievementChips';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

import { useRouter } from 'expo-router';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetSectionHeaderText,
} from '@/components/ui/actionsheet';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showTimerSelector, setShowTimerSelector] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showRewardDialog, setShowRewardDialog] = useState(false);
  const [hasReward, setHasReward] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const {
    addCompletedSession,
    stats,
    getActiveAchievements,
    getActiveAchievementsForSession,
    getCurrentRewardChance,
  } = usePomodoroStats();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      setIsCompleted(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
    setTimeLeft(25 * 60);
    setInitialTime(25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const showTimerLengthSelector = () => {
    setShowTimerSelector(true);
  };

  const handleTimerLengthChange = (value: string) => {
    const minutes = parseInt(value);
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setShowTimerSelector(false);
    setIsRunning(false);
    setIsPaused(false);
    setIsCompleted(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleClaimBreak = () => {
    const random = Math.random();
    const currentRewardChance = getCurrentRewardChance(initialTime);
    const rewardChance = currentRewardChance / 100;
    const gotReward = random < rewardChance;
    setHasReward(gotReward);
    setShowCompletionModal(false);
    setShowRewardDialog(true);
    addCompletedSession(initialTime);
  };

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            setIsCompleted(true);
            setShowCompletionModal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  return (
    <Box className="items-center">
      <Box className="mt-8 mb-2">
        <Pressable
          onPress={showTimerLengthSelector}
          className="active:opacity-70"
        >
          <Text className="text-typography-900 text-8xl font-mono font-bold">
            {formatTime(timeLeft)}
          </Text>
        </Pressable>
      </Box>

      <Actionsheet
        isOpen={showTimerSelector}
        onClose={() => setShowTimerSelector(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicator />
          <ActionsheetSectionHeaderText size="md" className="normal-case pt-5">
            Select Timer Length
          </ActionsheetSectionHeaderText>
          <ActionsheetItem onPress={() => handleTimerLengthChange('15')}>
            <ActionsheetItemText size="md">15 minutes</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleTimerLengthChange('20')}>
            <ActionsheetItemText size="md">20 minutes</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleTimerLengthChange('25')}>
            <ActionsheetItemText size="md">25 minutes</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleTimerLengthChange('30')}>
            <ActionsheetItemText size="md">30 minutes</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleTimerLengthChange('45')}>
            <ActionsheetItemText size="md">45 minutes</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleTimerLengthChange('60')}>
            <ActionsheetItemText size="md">60 minutes</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      <Box className="mb-4">
        <Text className="text-typography-600 text-sm text-center">
          Reward chance: {getCurrentRewardChance(initialTime).toFixed(3)}%
        </Text>
      </Box>

      <Box className="flex-row gap-4 items-center">
        {isCompleted ? (
          <Button
            variant="solid"
            action="primary"
            size="lg"
            onPress={() => setShowCompletionModal(true)}
            className="rounded-full active:scale-40"
          >
            <Text className="text-typography-900 font-medium text-lg">
              Claim Break
            </Text>
          </Button>
        ) : !isRunning ? (
          <>
            <Button
              variant="solid"
              action="primary"
              size="lg"
              onPress={startTimer}
              className="rounded-full active:scale-40"
            >
              <Text className="text-typography-900 font-medium text-lg">
                Start
              </Text>
            </Button>
            <AchievementChips
              achievements={getActiveAchievementsForSession(initialTime)}
              currentRewardChance={getCurrentRewardChance(initialTime)}
            />
          </>
        ) : (
          <>
            {isPaused ? (
              <Button
                variant="solid"
                action="primary"
                size="lg"
                onPress={startTimer}
                className="rounded-full active:bg-primary-300"
              >
                <Text className="text-typography-900 font-medium text-lg">
                  Resume
                </Text>
              </Button>
            ) : (
              <Button
                variant="solid"
                action="primary"
                size="lg"
                onPress={pauseTimer}
                className="rounded-full"
              >
                <Text className="text-typography-900 font-medium text-lg">
                  Pause
                </Text>
              </Button>
            )}
            <Button
              variant="solid"
              action="primary"
              size="lg"
              onPress={resetTimer}
              className="rounded-full"
            >
              <Text className="text-typography-900 font-medium text-lg">
                Reset
              </Text>
            </Button>
          </>
        )}
      </Box>

      <AlertDialog
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text className="text-typography-900 text-xl font-semibold">
              Session Complete
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody></AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="solid"
              action="primary"
              onPress={handleClaimBreak}
              className="rounded-full"
            >
              <Text className="text-typography-900 font-medium">
                Claim Break
              </Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        isOpen={showRewardDialog}
        onClose={() => setShowRewardDialog(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          {hasReward && (
            <Box className="absolute inset-0 pointer-events-none overflow-hidden">
              <Box
                className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: '0s' }}
              />
              <Box
                className="absolute top-2 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <Box
                className="absolute top-4 left-1/2 w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.4s' }}
              />
              <Box
                className="absolute top-1 left-2/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.6s' }}
              />
              <Box
                className="absolute top-3 left-3/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.8s' }}
              />
              <Box
                className="absolute top-5 left-1/5 w-3 h-3 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay: '1s' }}
              />
            </Box>
          )}
          <AlertDialogHeader>
            <Text className="text-typography-900 text-xl font-semibold">
              {hasReward ? '🎉 You Got a Reward!' : 'Take a break'}
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody></AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="solid"
              action="primary"
              onPress={() => {
                setShowRewardDialog(false);
                setIsCompleted(false);
                setTimeLeft(0.05 * 60);
                setInitialTime(0.05 * 60);
              }}
              className="rounded-full"
            >
              <Text className="text-typography-900 font-medium">Got it!</Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1 bg-background-0 h-[100vh]">
        <Box className="flex flex-1 items-center mx-5 lg:mx-32">
          <Box className="gap-3 flex-row md:self-start">
            <Button
              onPress={() => router.push('/stats')}
              className="px-5"
              variant="link"
            >
              <Icon as={InfoIcon} size="sm" className="text-typography-900" />
              <Text className="text-typography-900 font-medium">Stats</Text>
            </Button>
            <Button
              onPress={() => router.push('/schedule')}
              className="px-5"
              variant="link"
            >
              <Icon
                as={CalendarDaysIcon}
                size="sm"
                className="text-typography-900"
              />
              <Text className="text-typography-900 font-medium">Schedule</Text>
            </Button>
            <Button
              onPress={() => router.push('/settings')}
              className="px-5"
              variant="link"
            >
              <Icon
                as={SettingsIcon}
                size="sm"
                className="text-typography-900"
              />
              <Text className="text-typography-900 font-medium">Settings</Text>
            </Button>
          </Box>

          <Timer />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
