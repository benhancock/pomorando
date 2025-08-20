import React, { useState, useEffect, useRef } from "react";
import { Box } from "@/components/ui/box";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { InfoIcon, CalendarDaysIcon, SettingsIcon } from "@/components/ui/icon";

import { useRouter } from "expo-router";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(25 * 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused]);

  return (
    <Box className="items-center mb-8">
      <Box className="bg-background-template py-8 px-12 rounded-3xl mb-6">
        <Text className="text-typography-white text-6xl font-mono font-bold">
          {formatTime(timeLeft)}
        </Text>
      </Box>
      
      <Box className="flex-row gap-4">
        {!isRunning ? (
          <Button
            onPress={startTimer}            
          >
            <Text className="text-black font-medium text-lg">Start</Text>
          </Button>
        ) : (
          <>
            {isPaused ? (
              <Button
                onPress={startTimer}
              >
                <Text className="text-black font-medium text-lg">Resume</Text>
              </Button>
            ) : (
              <Button
                onPress={pauseTimer}
                
              >
                <Text className="text-black font-medium text-lg">Pause</Text>
              </Button>
            )}
            <Button
              onPress={resetTimer}
              variant="outline"
            >
              <Text className="text-typography-white font-medium text-lg">Reset</Text>
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Box className="flex-1 bg-black h-[100vh]">
      
        <Box className="flex flex-1 items-center mx-5 lg:mx-32">
          <Box className="gap-3 flex-row md:self-start">
            <Button
              onPress={() => router.push("/stats")}
              className="bg-background-template py-2 px-6 rounded-full"
            >
              <Icon as={InfoIcon} size="sm" className="text-typography-white" />
              <Text className="text-typography-white font-medium">
                Stats
              </Text>
            </Button>
            <Button
              onPress={() => router.push("/schedule")}
              className="bg-background-template py-2 px-6 rounded-full"
            >
              <Icon as={CalendarDaysIcon} size="sm" className="text-typography-white" />
              <Text className="text-typography-white font-medium">
                Schedule
              </Text>
            </Button>
            <Button
              onPress={() => router.push("/settings")}
              className="bg-background-template py-2 px-6 rounded-full"
            >
              <Icon as={SettingsIcon} size="sm" className="text-typography-white" />
              <Text className="text-typography-white font-medium">
                Settings
              </Text>
            </Button>
          </Box>
          
          <Timer />
        </Box>
    </Box>
    </SafeAreaView>
  );
}
