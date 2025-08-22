import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@/components/ui/box';
import { SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { InfoIcon, CalendarDaysIcon, SettingsIcon } from '@/components/ui/icon';

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
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimerSelector, setShowTimerSelector] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
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
    setTimeLeft(25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const showTimerLengthSelector = () => {
    setShowTimerSelector(true);
  };

  const handleTimerLengthChange = (value: string) => {
    const minutes = parseInt(value);
    setTimeLeft(minutes * 60);
    setShowTimerSelector(false);
    setIsRunning(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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

      <Box className="flex-row gap-4">
        {!isRunning ? (
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
