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
          <Text className="text-typography-900 text-xl font-semibold">
            Session Complete
          </Text>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text className="text-typography-700 text-base text-center mb-4">
            Session complete! Choose your reward option.
          </Text>
          {skipClaimModifier > 0 && (
            <Text className="text-primary-600 text-sm text-center mb-4 font-medium">
              You have {skipClaimModifier} skip bonus(es) active for your next
              session!
            </Text>
          )}
          {skipClaimModifier > 0 && (
            <Text className="text-green-600 text-sm text-center mb-4 font-medium">
              Next session reward chance: +
              {Math.round((Math.pow(1.1, skipClaimModifier) - 1) * 100)}%
            </Text>
          )}
          <Text className="text-gray-600 text-sm text-center mb-4">
            Total skip claims: {totalSkipClaims}
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Box className="flex-row gap-3 w-full">
            <Button
              variant="outline"
              action="secondary"
              onPress={onSkipClaim}
              className="flex-1 rounded-full border-2 border-typography-300"
            >
              <Text className="text-typography-700 font-medium">
                Skip Claim
              </Text>
            </Button>
            <Button
              variant="solid"
              action="primary"
              onPress={onClaimBreak}
              className="flex-1 rounded-full border-2 border-primary-600"
              style={{ backgroundColor: 'transparent' }}
            >
              <Text className="text-typography-900 font-medium">
                Claim Break
              </Text>
            </Button>
          </Box>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
