import React, { useState } from 'react';
import { ScrollView, Pressable, Modal } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { AchievementRule } from '../constants/Achievements';

interface AchievementChipsProps {
  achievements: AchievementRule[];
  currentRewardChance: number;
  skipClaimModifier?: number;
}

export const AchievementChips: React.FC<AchievementChipsProps> = ({
  achievements,
  currentRewardChance,
  skipClaimModifier = 0,
}) => {
  const [showModal, setShowModal] = useState(false);

  const formatMultiplier = (multiplier: number) => {
    if (multiplier >= 1) {
      return `+${Math.round((multiplier - 1) * 100)}%`;
    } else {
      return `${Math.round(multiplier * 100)}%`;
    }
  };

  const getChipColor = (multiplier: number) => {
    if (multiplier >= 1.5) {
      return 'bg-purple-600';
    } else if (multiplier >= 1.2) {
      return 'bg-primary-600';
    } else if (multiplier >= 1.0) {
      return 'bg-success-600';
    } else if (multiplier >= 0.8) {
      return 'bg-warning-600';
    } else {
      return 'bg-error-600';
    }
  };

  const getOverallAchievementStatus = () => {
    if (achievements.length === 0) {
      return {
        baseColor: 'bg-typography-500/30',
        count: 0,
        totalModifier: 0,
      };
    }

    const totalMultiplier = achievements.reduce(
      (acc, achievement) => acc * achievement.rewardMultiplier,
      1
    );

    let baseColor = 'bg-typography-500/30';

    if (totalMultiplier >= 1.5) {
      baseColor = 'bg-purple-500/30';
    } else if (totalMultiplier >= 1.2) {
      baseColor = 'bg-primary-500/30';
    } else if (totalMultiplier >= 1.0) {
      baseColor = 'bg-success-500/30';
    } else if (totalMultiplier >= 0.8) {
      baseColor = 'bg-warning-500/30';
    } else {
      baseColor = 'bg-error-500/30';
    }

    return {
      baseColor,
      count: achievements.length,
      totalModifier: Math.round((totalMultiplier - 1) * 100),
    };
  };

  const status = getOverallAchievementStatus();

  const handleChipPress = () => {
    setShowModal(true);
  };

  return (
    <>
      <Pressable onPress={handleChipPress}>
        <Box
          style={{ backgroundColor: 'transparent' }}
          className={`w-10 h-10 rounded-full items-center justify-center border-2 border-primary-600 ${status.baseColor}`}
        >
          <Text
            style={{ fontFamily: 'DepartureMono' }}
            className="text-white text-xl"
          >
            %
          </Text>
        </Box>
      </Pressable>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setShowModal(false)}
        >
          <Pressable className="bg-background-0 rounded-lg p-4 mx-4 max-w-96 border-2 border-primary-600">
            <Box>
              <Text className="text-xl font-bold text-typography-900 mb-4 text-center">
                Active Achievements
              </Text>

              <Box className="mb-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
                <Text className="text-sm font-medium text-primary-800 text-center">
                  Current Reward Chance: {Math.round(currentRewardChance)}%
                  {status.totalModifier !== 0 && (
                    <Text className="text-sm font-medium text-primary-800">
                      {status.totalModifier > 0
                        ? ` (+${status.totalModifier}%)`
                        : ` (${status.totalModifier}%)`}
                    </Text>
                  )}
                </Text>
                {skipClaimModifier > 0 && (
                  <Text className="text-sm font-medium text-success-800 text-center mt-2">
                    Skip claim bonus: +
                    {Math.round((Math.pow(1.1, skipClaimModifier) - 1) * 100)}%
                  </Text>
                )}
              </Box>

              {achievements.length > 0 ? (
                <Box className="max-h-64">
                  {achievements.map(achievement => (
                    <Box
                      key={achievement.id}
                      className="mb-3 p-3 bg-background-50 rounded-lg border border-border-100"
                    >
                      <Box className="flex-row items-center mb-2">
                        <Text className="text-2xl mr-3">
                          {achievement.icon}
                        </Text>
                        <Text className="text-base font-bold text-typography-800 flex-1">
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
                      <Text className="text-sm text-typography-600">
                        {achievement.description}
                      </Text>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box className="p-4 bg-background-50 rounded-lg border border-border-100">
                  <Text className="text-typography-500 text-center">
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
