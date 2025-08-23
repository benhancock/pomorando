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
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  onClaimBreak,
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
        <AlertDialogBody></AlertDialogBody>
        <AlertDialogFooter>
          <Button
            variant="solid"
            action="primary"
            onPress={onClaimBreak}
            className="rounded-full border-2 border-primary-600"
            style={{ backgroundColor: 'transparent' }}
          >
            <Text className="text-typography-900 font-medium">Claim Break</Text>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
