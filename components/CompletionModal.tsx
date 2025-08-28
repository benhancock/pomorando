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
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Icon, CloseIcon } from '@/components/ui/icon';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClaimBreak: () => void;
  onSkipClaim: () => void;
  skipClaimModifier: number;
  totalSkipClaims: number;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  onClaimBreak,
  onSkipClaim,
  skipClaimModifier,
  totalSkipClaims,
}) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Box className="flex-row items-center justify-center">
            <Text className="text-typography-900 text-xl font-semibold">
              Session Complete
            </Text>
          </Box>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Box
            className="outline rounded-lg px-4 pt-3 relative my-4"
            style={{
              borderWidth: 1,
              borderColor: 'grey',
              backgroundColor: '#b0b0b030',
            }}
          >
            <Box className="absolute top-1 right-1">
              <Icon as={CloseIcon} />
            </Box>

            <Box className="flex-row items-center justify-center">
              <MaterialCommunityIcons
                name="gift-outline"
                size={50}
                color="white"
                className="mb-4 mt-2"
              />
            </Box>

            <Text className="text-typography-700 text-base mb-4 text-center">
              You had a ___% chance of earning a reward. Would you like to:{' '}
              {'\n'}
              <Box className="pt-2">
                <Text
                  className="text-success-600 px-1 -mb-2 rounded-lg"
                  style={{ borderWidth: 1, borderColor: 'green' }}
                >
                  Claim
                </Text>
              </Box>{' '}
              your possible reward now, or
              {'\n'}
              <Box className="pt-4">
                <Text
                  className="text-warning-600 px-1 -mb-2 rounded-lg"
                  style={{ borderWidth: 1, borderColor: 'orange' }}
                >
                  Skip
                </Text>
              </Box>{' '}
              it this time in exchange for a greater chance at a reward next
              time?
            </Text>
          </Box>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Box className="flex-col items-center gap-3 w-full">
            <Button
              variant="solid"
              action="primary"
              onPress={onClaimBreak}
              className="rounded-full border-2 border-primary-600 inline-flex"
              style={{ backgroundColor: 'transparent', borderColor: 'green' }}
            >
              <Text className="text-success-600 font-medium">
                Claim Chance at Reward
              </Text>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={onSkipClaim}
              className="rounded-full border-2 border-typography-300 inline-flex"
              style={{ backgroundColor: 'transparent', borderColor: 'orange' }}
            >
              <Text className="text-warning-600 font-medium">Skip Reward</Text>
            </Button>
          </Box>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
