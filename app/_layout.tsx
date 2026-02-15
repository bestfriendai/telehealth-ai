import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../src/ui/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.primary} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textInverse,
          headerTitleStyle: { fontWeight: "600" },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="symptom-checker" 
          options={{ 
            title: "Symptom Checker",
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.textInverse,
          }} 
        />
        <Stack.Screen 
          name="appointment" 
          options={{ 
            title: "Book Appointment",
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.textInverse,
          }} 
        />
        <Stack.Screen 
          name="consultation/[id]" 
          options={{ 
            title: "Consultation",
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.textInverse,
          }} 
        />
        <Stack.Screen 
          name="paywall" 
          options={{ 
            title: "Premium",
            presentation: "modal",
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.textInverse,
          }} 
        />
        <Stack.Screen 
          name="settings" 
          options={{ 
            title: "Settings",
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.textInverse,
          }} 
        />
      </Stack>
    </>
  );
}
