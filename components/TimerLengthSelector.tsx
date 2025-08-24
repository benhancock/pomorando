import React from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetSectionHeaderText,
} from '@/components/ui/actionsheet';

interface TimerLengthSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onTimerLengthChange: (value: string) => void;
}

export const TimerLengthSelector: React.FC<TimerLengthSelectorProps> = ({
  isOpen,
  onClose,
  onTimerLengthChange,
}) => {
  const timerOptions = [
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
    { value: '25', label: '25 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' },
  ];

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicator />
        <ActionsheetSectionHeaderText size="md" className="normal-case pt-5">
          Select Timer Length
        </ActionsheetSectionHeaderText>
        {timerOptions.map(option => (
          <ActionsheetItem
            key={option.value}
            onPress={() => onTimerLengthChange(option.value)}
          >
            <ActionsheetItemText size="md">{option.label}</ActionsheetItemText>
          </ActionsheetItem>
        ))}
      </ActionsheetContent>
    </Actionsheet>
  );
};
