import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePomodoroStats } from '../contexts/PomodoroContext';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

export default function Stats() {
  const router = useRouter();
  const { stats, resetStats } = usePomodoroStats();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const handleResetStats = () => {
    setShowResetConfirm(true);
  };

  const confirmResetStats = () => {
    resetStats();
    setShowResetConfirm(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1 bg-background-0">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="p-6">
            <Box className="flex-row items-center mb-6">
              <Button
                variant="link"
                onPress={() => router.back()}
                className="mr-8"
              >
                <Text className="text-typography-900">← Back</Text>
              </Button>
              <Text className="text-2xl font-bold text-typography-900">
                Statistics
              </Text>
            </Box>

            <Box className="gap-6">
              <Box className="bg-background-50 dark:bg-background-0 p-6 border">
                <Text className="text-2xl font-bold text-typography-900 mb-2">
                  Total Sessions
                </Text>
                <Text className="text-6xl font-bold text-typography-600 mb-2">
                  {stats.totalSessions}
                </Text>
                <Text className="text-typography-600 text-sm">
                  Pomodoro sessions completed
                </Text>
              </Box>

              <Box className="bg-background-50 dark:bg-background-0 rounded-xl p-6">
                <Text className="text-2xl font-bold text-typography-900 mb-2">
                  Total Time Spent
                </Text>
                <Text className="text-4xl font-bold text-typography-600 mb-2">
                  {formatTime(stats.totalTimeSpent)}
                </Text>
                <Text className="text-typography-600 text-sm">
                  Time spent on pomodoros
                </Text>
              </Box>

              <Box className="bg-background-50 dark:bg-background-0 rounded-xl p-6">
                <Text className="text-2xl font-bold text-typography-900 mb-2">
                  Current Streak
                </Text>
                <Text className="text-4xl font-bold text-typography-600 mb-2">
                  {stats.currentStreak}
                </Text>
                <Text className="text-typography-600 text-sm">
                  Pomodoros completed in a row
                </Text>
              </Box>

              <Box className="bg-background-50 dark:bg-background-0 rounded-xl p-6">
                <Text className="text-2xl font-bold text-typography-900 mb-2">
                  Daily Streak
                </Text>
                <Text className="text-4xl font-bold text-typography-600 mb-2">
                  {stats.dailyStreak}
                </Text>
                <Text className="text-typography-600 text-sm">
                  Days in a row with pomodoros
                </Text>
              </Box>

              {stats.totalSessions > 0 && (
                <Box className="bg-background-50 dark:bg-background-0 rounded-xl p-6">
                  <Text className="text-2xl font-bold text-typography-900 mb-2">
                    Average Session
                  </Text>
                  <Text className="text-4xl font-bold text-typography-600 mb-2">
                    {formatTime(
                      Math.round(stats.totalTimeSpent / stats.totalSessions)
                    )}
                  </Text>
                  <Text className="text-typography-600 text-sm">
                    Average length per session
                  </Text>
                </Box>
              )}

              <Box className="mt-4 items-center">
                <Button
                  variant="outline"
                  action="negative"
                  size="lg"
                  onPress={handleResetStats}
                  className="rounded-full"
                >
                  <Text className="text-typography-900 font-medium">
                    Reset All Stats
                  </Text>
                </Button>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </Box>

      <AlertDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text className="text-typography-900 text-xl font-semibold">
              Reset All Stats?
            </Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text className="text-typography-600">
              This will permanently delete all your pomodoro statistics. This
              action cannot be undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onPress={() => setShowResetConfirm(false)}
              className="rounded-full mr-2"
            >
              <Text className="text-typography-900 font-medium">Cancel</Text>
            </Button>
            <Button
              variant="solid"
              action="negative"
              onPress={confirmResetStats}
              className="rounded-full"
            >
              <Text className="text-typography-900 font-medium">Reset</Text>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
}
