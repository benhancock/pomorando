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
