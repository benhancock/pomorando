import React, { useState, useEffect } from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePomodoroStats } from '../contexts/PomodoroContext';
import { DEFAULT_REWARD_CHANCE } from '../constants/Constants';

export default function Schedule() {
  const router = useRouter();
  const { stats, updateRewardChance } = usePomodoroStats();
  const [rewardChanceInput, setRewardChanceInput] = useState(
    (stats?.rewardChance || DEFAULT_REWARD_CHANCE).toString()
  );

  useEffect(() => {
    if (stats?.rewardChance !== undefined) {
      setRewardChanceInput(stats.rewardChance.toString());
    }
  }, [stats?.rewardChance]);

  if (stats?.rewardChance === undefined) {
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
                  Reward Schedule
                </Text>
              </Box>
              <Box className="bg-background-50 rounded-none p-6 shadow-sm border border-border-200">
                <Text className="text-typography-700">Loading...</Text>
              </Box>
            </Box>
          </ScrollView>
        </Box>
      </SafeAreaView>
    );
  }

  const handleRewardChanceChange = (value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    setRewardChanceInput(cleanValue);

    const numValue = parseInt(cleanValue);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      updateRewardChance(numValue);
    }
  };

  const handleRewardChanceBlur = () => {
    const numValue = parseInt(rewardChanceInput);
    if (isNaN(numValue) || numValue < 1 || numValue > 100) {
      setRewardChanceInput(
        (stats?.rewardChance || DEFAULT_REWARD_CHANCE).toString()
      );
    }
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
                Reward Schedule
              </Text>
            </Box>

            <Box className="bg-background-0 rounded-none p-6 shadow-sm border border-border-200">
              <Text className="text-lg font-semibold text-typography-900 mb-4">
                Reward Chance Settings
              </Text>

              <Box className="mb-4">
                <Text className="text-sm text-typography-700 mb-2">
                  Set your desired reward chance percentage (1-100%)
                </Text>
                <Box className="flex-row items-center space-x-3">
                  <Input className="flex-1">
                    <InputField
                      value={rewardChanceInput}
                      onChangeText={setRewardChanceInput}
                      onBlur={handleRewardChanceBlur}
                      keyboardType="numeric"
                      placeholder="50"
                      maxLength={3}
                    />
                  </Input>
                  <Text className="text-typography-700 font-medium">%</Text>
                </Box>
                <Text className="text-xs text-typography-500 mt-1">
                  Current setting:{' '}
                  {stats?.rewardChance || DEFAULT_REWARD_CHANCE}% chance of
                  reward
                </Text>
              </Box>

              <Button
                variant="solid"
                action="primary"
                onPress={() => handleRewardChanceChange(rewardChanceInput)}
                className="rounded-none self-start"
              >
                <Text className="text-typography-900 font-medium">Update</Text>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
