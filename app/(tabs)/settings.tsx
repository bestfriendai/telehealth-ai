import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../../src/ui/theme";

type MenuItemRoute = { icon: string; label: string; route: string; toggle?: never; value?: never; setValue?: never };
type MenuItemToggle = { icon: string; label: string; toggle: boolean; value: boolean; setValue: Dispatch<SetStateAction<boolean>>; route?: never };
type MenuItem = MenuItemRoute | MenuItemToggle;

type MenuSection = {
  title: string;
  items: MenuItem[];
};

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const menuSections: MenuSection[] = [
    {
      title: "Account",
      items: [
        { icon: "👤", label: "Profile", route: "/settings" },
        { icon: "💳", label: "Payment Methods", route: "/settings" },
        { icon: "🏥", label: "Insurance", route: "/settings" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: "🔔", label: "Notifications", toggle: true, value: notifications, setValue: setNotifications },
        { icon: "⏰", label: "Medication Reminders", toggle: true, value: reminders, setValue: setReminders },
        { icon: "🌙", label: "Dark Mode", toggle: true, value: darkMode, setValue: setDarkMode },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: "❓", label: "Help Center", route: "/settings" },
        { icon: "📞", label: "Contact Support", route: "/settings" },
        { icon: "⭐", label: "Rate App", route: "/settings" },
      ],
    },
    {
      title: "Legal",
      items: [
        { icon: "📄", label: "Privacy Policy", route: "/settings" },
        { icon: "📋", label: "Terms of Service", route: "/settings" },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Card */}
      <TouchableOpacity style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@email.com</Text>
        </View>
        <Text style={styles.profileArrow}>›</Text>
      </TouchableOpacity>

      {/* Premium Banner */}
      <TouchableOpacity 
        style={styles.premiumBanner}
        onPress={() => router.push("/paywall")}
      >
        <View style={styles.premiumIcon}>
          <Text style={{ fontSize: 24 }}>⚡</Text>
        </View>
        <View style={styles.premiumContent}>
          <Text style={styles.premiumTitle}>Upgrade to Premium</Text>
          <Text style={styles.premiumText}>Unlock unlimited consultations</Text>
        </View>
        <Text style={styles.premiumArrow}>→</Text>
      </TouchableOpacity>

      {/* Menu Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex} 
                style={[
                  styles.menuItem,
                  itemIndex === section.items.length - 1 && styles.menuItemLast
                ]}
                onPress={() => "route" in item && item.route && router.push(item.route)}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {"toggle" in item && item.toggle ? (
                  <Switch
                    value={item.value}
                    onValueChange={item.setValue}
                    trackColor={{ false: colors.border, true: colors.primaryLight }}
                    thumbColor={colors.background}
                  />
                ) : (
                  <Text style={styles.menuArrow}>›</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Version */}
      <Text style={styles.version}>TeleHealth AI v1.0.0</Text>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  profileCard: {
    backgroundColor: colors.background,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  profileEmail: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  profileArrow: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  premiumBanner: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
  },
  premiumIcon: {
    marginRight: spacing.md,
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  premiumText: {
    fontSize: fontSize.caption,
    color: "rgba(255,255,255,0.8)",
    marginTop: spacing.xs,
  },
  premiumArrow: {
    fontSize: 24,
    color: colors.textInverse,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textTertiary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  },
  sectionContent: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.textPrimary,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  version: {
    textAlign: "center",
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.lg,
  },
  spacer: {
    height: spacing.xxxl,
  },
});
