import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../src/ui/theme";

export default function PaywallScreen() {
  const router = useRouter();

  const features = [
    { icon: "📹", title: "Unlimited Video Consultations", desc: "No limits on telehealth visits" },
    { icon: "🤖", title: "AI Symptom Analysis", desc: "Advanced AI-powered diagnostics" },
    { icon: "📊", title: "Health Insights", desc: "Personalized health recommendations" },
    { icon: "💾", title: "Cloud Records", desc: "Unlimited health record storage" },
    { icon: "🔔", title: "Priority Support", desc: "Skip the queue for appointments" },
    { icon: "📱", title: "Family Plan", desc: "Up to 5 family members" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>⚡</Text>
        <Text style={styles.headerTitle}>TeleHealth Premium</Text>
        <Text style={styles.headerSubtitle}>Unlock full access to all features</Text>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>What's Included</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text>{feature.icon}</Text>
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Pricing */}
      <View style={styles.pricingSection}>
        <TouchableOpacity style={styles.planCard}>
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>BEST VALUE</Text>
          </View>
          <View style={styles.planHeader}>
            <Text style={styles.planName}>Annual</Text>
            <View style={styles.priceRow}>
              <Text style={styles.priceAmount}>$49.99</Text>
              <Text style={styles.pricePeriod}>/year</Text>
            </View>
            <Text style={styles.priceSavings}>Save 58% vs monthly</Text>
          </View>
          <View style={styles.checkmarks}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.checkmarkText}>All Premium features included</Text>
          </View>
          <View style={styles.checkmarks}>
            <Text style={styles.checkmark}>✓</Text>
            <Text style={styles.checkmarkText}>14-day free trial</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.monthlyCard}>
          <View style={styles.planHeader}>
            <Text style={styles.monthlyName}>Monthly</Text>
            <View style={styles.priceRow}>
              <Text style={styles.monthlyAmount}>$9.99</Text>
              <Text style={styles.pricePeriod}>/month</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Start Free Trial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.restoreButton}>
        <Text style={styles.restoreButtonText}>Restore Purchases</Text>
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>
        By subscribing, you agree to our Terms of Service and Privacy Policy. Subscription auto-renews monthly/yearly unless cancelled.
      </Text>

      {/* Skip */}
      <TouchableOpacity style={styles.skipButton} onPress={() => router.back()}>
        <Text style={styles.skipButtonText}>Maybe Later</Text>
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
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xxl,
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.header,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  headerSubtitle: {
    fontSize: fontSize.body,
    color: "rgba(255,255,255,0.8)",
    marginTop: spacing.xs,
  },
  featuresSection: {
    padding: spacing.lg,
  },
  featuresTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  featureDesc: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  pricingSection: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  planCard: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    borderRadius: radius.lg,
    position: "relative",
  },
  planBadge: {
    position: "absolute",
    top: -10,
    right: spacing.lg,
    backgroundColor: colors.warning,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  planBadgeText: {
    fontSize: 10,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  planHeader: {
    marginBottom: spacing.md,
  },
  planName: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: spacing.xs,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  pricePeriod: {
    fontSize: fontSize.body,
    color: "rgba(255,255,255,0.8)",
    marginLeft: spacing.xs,
  },
  priceSavings: {
    fontSize: fontSize.caption,
    color: "rgba(255,255,255,0.7)",
    marginTop: spacing.xs,
  },
  checkmarks: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  checkmark: {
    fontSize: 14,
    color: colors.textInverse,
    marginRight: spacing.sm,
  },
  checkmarkText: {
    fontSize: fontSize.body,
    color: colors.textInverse,
  },
  monthlyCard: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  monthlyName: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  monthlyAmount: {
    fontSize: 28,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  ctaButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  restoreButton: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  restoreButtonText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  terms: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    textAlign: "center",
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    lineHeight: 18,
  },
  skipButton: {
    alignItems: "center",
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  skipButtonText: {
    fontSize: fontSize.body,
    color: colors.textTertiary,
  },
  spacer: {
    height: spacing.xxxl,
  },
});
