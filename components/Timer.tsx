import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Pressable } from 'react-native';
import { usePomodoroStats } from '../contexts/PomodoroContext';
import { TimerLengthSelector } from './TimerLengthSelector';
import { CompletionModal } from './CompletionModal';
import { RewardDialog } from './RewardDialog';
import { AchievementChips } from './AchievementChips';
import { useThemeColor } from '../hooks/useThemeColor';

export const Timer: React.FC = () => {
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
    getActiveAchievementsForSession,
    getCurrentRewardChance,
    skipClaim,
    stats,
  } = usePomodoroStats();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: mins.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
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

  const handleSkipClaim = () => {
    skipClaim();
    setShowCompletionModal(false);
    setIsCompleted(false);
    setTimeLeft(25 * 60);
    setInitialTime(25 * 60);
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
          return prev - 100; //1
        });
      }, 0); //1000
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
      <Box className="mt-20 mb-2">
        <Pressable
          onPress={showTimerLengthSelector}
          className="active:opacity-70"
        >
          <Box className="flex-row items-center">
            <Box className="w-16 h-30 rounded-xl items-center justify-center mx-0.5">
              <Text
                style={{ fontFamily: 'DepartureMono' }}
                className="text-typography-900 text-8xl font-bold text-center"
              >
                {formatTime(timeLeft).minutes[0]}
              </Text>
            </Box>

            <Box className="w-16 h-30 rounded-xl items-center justify-center mx-0.5">
              <Text
                style={{ fontFamily: 'DepartureMono' }}
                className="text-typography-900 text-8xl font-bold text-center"
              >
                {formatTime(timeLeft).minutes[1]}
              </Text>
            </Box>

            <Box className="pb-7 -mx-4 mt-2">
              <Text
                style={{ fontFamily: 'DepartureMono' }}
                className="text-typography-900 text-8xl font-bold text-center"
              >
                :
              </Text>
            </Box>

            <Box className="w-16 h-30 rounded-xl items-center justify-center mx-0.5">
              <Text
                style={{ fontFamily: 'DepartureMono' }}
                className="text-typography-900 text-8xl font-bold text-center"
              >
                {formatTime(timeLeft).seconds[0]}
              </Text>
            </Box>

            <Box className="w-16 h-30 rounded-xl items-center justify-center mx-0.5">
              <Text
                style={{ fontFamily: 'DepartureMono' }}
                className="text-typography-900 text-8xl font-bold text-center"
              >
                {formatTime(timeLeft).seconds[1]}
              </Text>
            </Box>
          </Box>
        </Pressable>
      </Box>

      <TimerLengthSelector
        isOpen={showTimerSelector}
        onClose={() => setShowTimerSelector(false)}
        onTimerLengthChange={handleTimerLengthChange}
      />

      <Box className="flex-row gap-4 items-center mt-4">
        {isCompleted ? (
          <Button
            variant="solid"
            action="primary"
            size="lg"
            onPress={() => setShowCompletionModal(true)}
            className="rounded-full active:scale-40 border-2 border-primary-600"
            style={{ backgroundColor: 'transparent' }}
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
              className="rounded-full active:scale-40 border-2 border-primary-600"
              style={{ backgroundColor: 'transparent' }}
            >
              <Text className="text-typography-900 font-medium text-lg">
                Start
              </Text>
            </Button>
            <AchievementChips
              achievements={getActiveAchievementsForSession(initialTime)}
              currentRewardChance={getCurrentRewardChance(initialTime)}
              skipClaimModifier={stats.skipClaimModifier}
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
                className="rounded-full active:bg-primary-300 border-2 border-primary-600"
                style={{ backgroundColor: 'transparent' }}
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
                className="rounded-full border-2 border-primary-600"
                style={{ backgroundColor: 'transparent' }}
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
              className="rounded-full border-2 border-primary-600"
              style={{ backgroundColor: 'transparent' }}
            >
              <Text className="text-typography-900 font-medium text-lg">
                Reset
              </Text>
            </Button>
            <AchievementChips
              achievements={getActiveAchievementsForSession(initialTime)}
              currentRewardChance={getCurrentRewardChance(initialTime)}
              skipClaimModifier={stats.skipClaimModifier}
            />
          </>
        )}
      </Box>

      <CompletionModal
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onClaimBreak={handleClaimBreak}
        onSkipClaim={handleSkipClaim}
        skipClaimModifier={stats.skipClaimModifier}
        totalSkipClaims={stats.totalSkipClaims}
      />

      <RewardDialog
        isOpen={showRewardDialog}
        onClose={() => setShowRewardDialog(false)}
        hasReward={hasReward}
        onComplete={() => {
          setShowRewardDialog(false);
          setIsCompleted(false);
          setTimeLeft(25 * 60);
          setInitialTime(25 * 60);
        }}
      />
    </Box>
  );
};
