import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Box className="p-6">
            <Box className="flex-row items-center mb-6">
              <Button
                variant="link"
                onPress={() => router.back()}
                className="mr-8"
              >
                <Text>← Back</Text>
              </Button>
              <Text className="text-2xl font-bold text-typography-900">
                Settings
              </Text>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
