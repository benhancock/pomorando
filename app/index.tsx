import React from 'react';
import { Box } from '@/components/ui/box';
import { SafeAreaView } from 'react-native';
import { Timer } from '../components/Timer';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1 bg-background-0 h-[100vh]">
        <Box className="flex flex-1 items-center mx-5 lg:mx-32 mt-6">
          <Header />
          <Timer />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
