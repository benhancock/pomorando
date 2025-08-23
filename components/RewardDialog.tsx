import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

interface RewardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hasReward: boolean;
  onComplete: () => void;
}

export const RewardDialog: React.FC<RewardDialogProps> = ({
  isOpen,
  onClose,
  hasReward,
  onComplete,
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
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
            onPress={onComplete}
            className="rounded-full border-2 border-primary-600"
            style={{ backgroundColor: 'transparent' }}
          >
            <Text className="text-typography-900 font-medium">Got it!</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
