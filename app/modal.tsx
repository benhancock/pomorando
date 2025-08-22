import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export default function ModalScreen() {
  return (
    <Box className="flex flex-1 items-center justify-center bg-background-0">
      <Text className="text-xl font-bold text-typography-900">Modal</Text>
      <Box className="my-[30px] h-1 w-[80%] bg-background-200" />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </Box>
  );
}
