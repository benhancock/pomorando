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
  const { stats, resetStats, getActiveAchievements } = usePomodoroStats();
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
                <Text
                  style={{ fontFamily: 'DepartureMono' }}
                  className="text-4xl font-bold text-typography-600 mb-2"
                >
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
                <Text
                  style={{ fontFamily: 'DepartureMono' }}
                  className="text-4xl font-bold text-typography-600 mb-2"
                >
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
                <Text
                  style={{ fontFamily: 'DepartureMono' }}
                  className="text-4xl font-bold text-typography-600 mb-2"
                >
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
                <Text
                  style={{ fontFamily: 'DepartureMono' }}
                  className="text-4xl font-bold text-typography-600 mb-2"
                >
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
                  <Text
                    style={{ fontFamily: 'DepartureMono' }}
                    className="text-4xl font-bold text-typography-600 mb-2"
                  >
                    {formatTime(
                      Math.round(stats.totalTimeSpent / stats.totalSessions)
                    )}
                  </Text>
                  <Text className="text-typography-600 text-sm">
                    Average length per session
                  </Text>
                </Box>
              )}

              <Box className="bg-background-50 dark:bg-background-0 rounded-xl p-6">
                <Text className="text-2xl font-bold text-typography-900 mb-2">
                  Skip Claims
                </Text>
                <Text
                  style={{ fontFamily: 'DepartureMono' }}
                  className="text-4xl font-bold text-typography-600 mb-2"
                >
                  {stats.totalSkipClaims}
                </Text>
                <Text className="text-typography-600 text-sm">
                  Total claims skipped (temporary bonuses for next session)
                </Text>
                {stats.skipClaimModifier > 0 && (
                  <Box className="mt-3 p-3 bg-green-50 rounded-lg">
                    <Text className="text-green-800 text-sm font-medium text-center">
                      Next session bonus: +
                      {Math.round(
                        (Math.pow(1.1, stats.skipClaimModifier) - 1) * 100
                      )}
                      % reward chance
                    </Text>
                  </Box>
                )}
              </Box>

              <Box className="bg-background-50 dark:bg-background-0 rounded-xl p-6">
                <Text className="text-2xl font-bold text-typography-900 mb-2">
                  Active Achievements
                </Text>
                <Box className="gap-3">
                  {getActiveAchievements().length > 0 ? (
                    getActiveAchievements().map(achievement => (
                      <Box
                        key={achievement.id}
                        className="flex-row items-center justify-between p-3 bg-background-0 rounded-lg"
                      >
                        <Box className="flex-row items-center">
                          <Text className="text-2xl mr-3">
                            {achievement.icon}
                          </Text>
                          <Box>
                            <Text className="text-base font-bold text-typography-800">
                              {achievement.name}
                            </Text>
                            <Text className="text-sm text-typography-600">
                              {achievement.description}
                            </Text>
                          </Box>
                        </Box>
                        <Box className="px-2 py-1 rounded-full bg-primary-600">
                          <Text className="text-white text-xs font-medium">
                            {achievement.rewardMultiplier >= 1
                              ? `+${Math.round((achievement.rewardMultiplier - 1) * 100)}%`
                              : `${Math.round(achievement.rewardMultiplier * 100)}%`}
                          </Text>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Text className="text-typography-500 text-center py-4">
                      No active achievements yet. Complete more pomodoros to
                      unlock achievements!
                    </Text>
                  )}
                </Box>
              </Box>

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
