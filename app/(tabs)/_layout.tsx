import { Tabs } from "expo-router";
import { colors } from "../../src/ui/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.textInverse,
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 17,
        },
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerTitle: "TeleHealth AI",
        }}
      />
      <Tabs.Screen
        name="symptoms"
        options={{
          title: "Symptoms",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerTitle: "Symptom Checker",
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: "Appointments",
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          headerTitle: "My Appointments",
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: "Records",
          tabBarIcon: ({ color }) => <TabBarIcon name="folder" color={color} />,
          headerTitle: "Health Records",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
          headerTitle: "Settings",
        }}
      />
    </Tabs>
  );
}

import { View, Text } from "react-native";

function TabBarIcon({ name, color }: { name: string; color: string }) {
  const icons: Record<string, string> = {
    home: "🏠",
    search: "🔍",
    calendar: "📅",
    folder: "📁",
    settings: "⚙️",
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22 }}>{icons[name] || "•"}</Text>
    </View>
  );
}
