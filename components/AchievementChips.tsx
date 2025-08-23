import React, { useState } from 'react';
import { ScrollView, Pressable, Modal } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { AchievementRule } from '../constants/Achievements';

interface AchievementChipsProps {
  achievements: AchievementRule[];
  currentRewardChance: number;
}

export const AchievementChips: React.FC<AchievementChipsProps> = ({
  achievements,
  currentRewardChance,
}) => {
  const [showModal, setShowModal] = useState(false);

  if (achievements.length === 0) {
    return null;
  }

  const formatMultiplier = (multiplier: number) => {
    if (multiplier >= 1) {
      return `+${Math.round((multiplier - 1) * 100)}%`;
    } else {
      return `${Math.round(multiplier * 100)}%`;
    }
  };

  const getChipColor = (multiplier: number) => {
    if (multiplier >= 1.5) {
      return 'bg-purple-500';
    } else if (multiplier >= 1.2) {
      return 'bg-blue-500';
    } else if (multiplier >= 1.0) {
      return 'bg-green-500';
    } else if (multiplier >= 0.8) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  const getOverallAchievementStatus = () => {
    if (achievements.length === 0) return null;

    const totalMultiplier = achievements.reduce(
      (acc, achievement) => acc * achievement.rewardMultiplier,
      1
    );

    let baseColor = 'bg-gray-500/30';

    if (totalMultiplier >= 1.5) {
      baseColor = 'bg-purple-500/30';
    } else if (totalMultiplier >= 1.2) {
      baseColor = 'bg-blue-500/30';
    } else if (totalMultiplier >= 1.0) {
      baseColor = 'bg-green-500/30';
    } else if (totalMultiplier >= 0.8) {
      baseColor = 'bg-yellow-500/30';
    } else {
      baseColor = 'bg-red-500/30';
    }

    return {
      baseColor,
      count: achievements.length,
    };
  };

  const status = getOverallAchievementStatus();
  if (!status) return null;

  const handleChipPress = () => {
    setShowModal(true);
  };

  return (
    <>
      <Pressable onPress={handleChipPress}>
        <Box
          className={`w-10 h-10 rounded-full items-center justify-center ${status.baseColor}`}
        >
          <Text className="text-white text-lg font-bold">{status.count}</Text>
        </Box>
      </Pressable>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          className="flex-1 bg-black bg-opacity-50 justify-center items-center"
          onPress={() => setShowModal(false)}
        >
          <Pressable className="bg-white rounded-lg p-4 mx-4 max-w-96">
            <Box>
              <Text className="text-xl font-bold text-gray-800 mb-4 text-center">
                Active Achievements
              </Text>

              <Box className="mb-4 p-3 bg-blue-50 rounded-lg">
                <Text className="text-sm font-medium text-blue-800 text-center">
                  Current Reward Chance: {Math.round(currentRewardChance)}%
                </Text>
              </Box>

              {achievements.length > 0 ? (
                <Box className="max-h-64">
                  {achievements.map(achievement => (
                    <Box
                      key={achievement.id}
                      className="mb-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Box className="flex-row items-center mb-2">
                        <Text className="text-2xl mr-3">
                          {achievement.icon}
                        </Text>
                        <Text className="text-base font-bold text-gray-800 flex-1">
                          {achievement.name}
                        </Text>
                        <Box
                          className={`px-2 py-1 rounded-full ${getChipColor(achievement.rewardMultiplier)}`}
                        >
                          <Text className="text-white text-xs font-medium">
                            {formatMultiplier(achievement.rewardMultiplier)}
                          </Text>
                        </Box>
                      </Box>
                      <Text className="text-sm text-gray-600">
                        {achievement.description}
                      </Text>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className="p-4 bg-gray-50 rounded-lg">
                  <Text className="text-gray-500 text-center">
                    No active achievements yet. Complete more pomodoros to
                    unlock achievements!
                  </Text>
                </Box>
              )}
            </Box>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
