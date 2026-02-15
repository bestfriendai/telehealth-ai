import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../../src/ui/theme";

type Record = {
  id: string;
  title: string;
  date: string;
  type: "prescription" | "lab" | "visit" | "vaccine";
  icon: string;
};

const mockRecords: Record[] = [
  { id: "1", title: "Blood Test Results", date: "Feb 10, 2026", type: "lab", icon: "🩸" },
  { id: "2", title: "Prescription - Amoxicillin", date: "Feb 8, 2026", type: "prescription", icon: "💊" },
  { id: "3", title: "Annual Physical", date: "Jan 15, 2026", type: "visit", icon: "🏥" },
  { id: "4", title: "Flu Vaccine", date: "Dec 20, 2025", type: "vaccine", icon: "💉" },
];

export default function RecordsScreen() {
  const router = useRouter();
  const [records] = useState<Record[]>(mockRecords);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "prescription": return colors.primary;
      case "lab": return colors.info;
      case "visit": return colors.success;
      case "vaccine": return colors.warning;
      default: return colors.textTertiary;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "prescription": return "Prescription";
      case "lab": return "Lab Result";
      case "visit": return "Doctor Visit";
      case "vaccine": return "Vaccination";
      default: return type;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickAction}>
          <Text style={styles.quickActionIcon}>📷</Text>
          <Text style={styles.quickActionText}>Scan Document</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction}>
          <Text style={styles.quickActionIcon}>📤</Text>
          <Text style={styles.quickActionText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction}>
          <Text style={styles.quickActionIcon}>🔗</Text>
          <Text style={styles.quickActionText}>Connect</Text>
        </TouchableOpacity>
      </View>

      {/* Health Summary */}
      <Text style={styles.sectionTitle}>Health Summary</Text>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>5</Text>
            <Text style={styles.summaryLabel}>Visits</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>Prescriptions</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>2</Text>
            <Text style={styles.summaryLabel}>Lab Results</Text>
          </View>
        </View>
      </View>

      {/* Records List */}
      <Text style={styles.sectionTitle}>All Records</Text>
      
      {records.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📁</Text>
          <Text style={styles.emptyTitle}>No records yet</Text>
          <Text style={styles.emptySubtitle}>Your medical records will appear here</Text>
        </View>
      ) : (
        records.map((record) => (
          <TouchableOpacity key={record.id} style={styles.recordCard}>
            <View style={[styles.recordIcon, { backgroundColor: getTypeColor(record.type) + "20" }]}>
              <Text style={styles.recordEmoji}>{record.icon}</Text>
            </View>
            <View style={styles.recordContent}>
              <Text style={styles.recordTitle}>{record.title}</Text>
              <View style={styles.recordMeta}>
                <Text style={styles.recordDate}>{record.date}</Text>
                <View style={[styles.typeBadge, { backgroundColor: getTypeColor(record.type) + "20" }]}>
                  <Text style={[styles.typeText, { color: getTypeColor(record.type) }]}>
                    {getTypeLabel(record.type)}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.recordArrow}>›</Text>
          </TouchableOpacity>
        ))
      )}

      {/* Premium Section */}
      <TouchableOpacity style={styles.premiumCard}>
        <View style={styles.premiumIcon}>
          <Text style={{ fontSize: 24 }}>🔒</Text>
        </View>
        <View style={styles.premiumContent}>
          <Text style={styles.premiumTitle}>Unlock Full Records</Text>
          <Text style={styles.premiumText}>Get unlimited cloud storage and AI analysis</Text>
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
  quickActions: {
    flexDirection: "row",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  quickAction: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  quickActionText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  sectionTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: spacing.md,
  },
  summaryCard: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontSize: fontSize.header,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  summaryLabel: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
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
  },
  recordCard: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  recordIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  recordEmoji: {
    fontSize: 24,
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  recordMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  recordDate: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginRight: spacing.sm,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  typeText: {
    fontSize: 11,
    fontWeight: fontWeight.medium,
  },
  recordArrow: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  premiumCard: {
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
  premiumIcon: {
    marginRight: spacing.md,
  },
  premiumContent: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
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
