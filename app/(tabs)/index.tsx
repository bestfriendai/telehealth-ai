import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../../src/ui/theme";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Card */}
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcomeTitle}>Welcome to TeleHealth AI</Text>
          <Text style={styles.welcomeSubtitle}>Your AI-powered healthcare companion</Text>
        </View>
        <View style={styles.welcomeIcon}>
          <Text style={{ fontSize: 48 }}>🩺</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push("/symptom-checker")}
        >
          <Text style={styles.actionIcon}>🤒</Text>
          <Text style={styles.actionTitle}>Symptom Checker</Text>
          <Text style={styles.actionDesc}>Check your symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push("/appointment")}
        >
          <Text style={styles.actionIcon}>📹</Text>
          <Text style={styles.actionTitle}>Telehealth</Text>
          <Text style={styles.actionDesc}>Video consultation</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push("/appointment")}
        >
          <Text style={styles.actionIcon}>📅</Text>
          <Text style={styles.actionTitle}>Book Visit</Text>
          <Text style={styles.actionDesc}>Schedule appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push("/records")}
        >
          <Text style={styles.actionIcon}>💊</Text>
          <Text style={styles.actionTitle}>Medications</Text>
          <Text style={styles.actionDesc}>Track prescriptions</Text>
        </TouchableOpacity>
      </View>

      {/* Health Tips */}
      <Text style={styles.sectionTitle}>Today's Health Tips</Text>
      <View style={styles.tipCard}>
        <View style={styles.tipHeader}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipTitle}>Stay Hydrated</Text>
        </View>
        <Text style={styles.tipText}>
          Drink at least 8 glasses of water today. Proper hydration supports immune function and energy levels.
        </Text>
      </View>

      {/* Upcoming Appointments */}
      <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>📅</Text>
        <Text style={styles.emptyTitle}>No upcoming appointments</Text>
        <Text style={styles.emptySubtitle}>Book a consultation to get started</Text>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => router.push("/appointment")}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Premium Banner */}
      <TouchableOpacity style={styles.premiumBanner}>
        <View style={styles.premiumContent}>
          <Text style={styles.premiumTitle}>⚡ Go Premium</Text>
          <Text style={styles.premiumText}>Unlimited consultations & AI analysis</Text>
        </View>
        <Text style={styles.premiumArrow}>→</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  welcomeCard: {
    backgroundColor: colors.primary,
    margin: spacing.lg,
    padding: spacing.xl,
    borderRadius: radius.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: fontSize.body,
    color: "rgba(255,255,255,0.8)",
  },
  welcomeIcon: {
    marginLeft: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  actionCard: {
    width: "47%",
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  actionDesc: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  tipCard: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  tipHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  tipIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  tipTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  tipText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  emptyState: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    padding: spacing.xxl,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  bookButtonText: {
    color: colors.textInverse,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.body,
  },
  premiumBanner: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  premiumText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  premiumArrow: {
    fontSize: 24,
    color: colors.primary,
  },
  spacer: {
    height: spacing.xxxl,
  },
});
