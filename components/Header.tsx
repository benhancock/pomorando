import React from 'react';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { InfoIcon, CalendarDaysIcon, SettingsIcon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';

export const Header: React.FC = () => {
  const router = useRouter();

  return (
    <Box className="gap-3 flex-row md:self-start">
      <Button
        onPress={() => router.push('/stats')}
        className="px-5"
        variant="link"
      >
        <Icon as={InfoIcon} size="sm" className="text-typography-900" />
        <Text className="text-typography-900 font-medium">Stats</Text>
      </Button>
      <Button
        onPress={() => router.push('/schedule')}
        className="px-5"
        variant="link"
      >
        <Icon as={CalendarDaysIcon} size="sm" className="text-typography-900" />
        <Text className="text-typography-900 font-medium">Schedule</Text>
      </Button>
      <Button
        onPress={() => router.push('/settings')}
        className="px-5"
        variant="link"
      >
        <Icon as={SettingsIcon} size="sm" className="text-typography-900" />
        <Text className="text-typography-900 font-medium">Settings</Text>
      </Button>
    </Box>
  );
};
