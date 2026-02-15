import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../src/ui/theme";

export default function ConsultationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock consultation data
  const consultation = {
    id,
    doctor: "Dr. Sarah Chen",
    specialty: "General Practitioner",
    date: "Feb 15, 2026",
    time: "10:00 AM",
    type: "video",
    status: "upcoming",
    notes: "Follow-up for cold symptoms",
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Consultation Header */}
      <View style={styles.header}>
        <View style={styles.doctorAvatar}>
          <Text style={styles.doctorAvatarText}>
            {consultation.doctor.split(" ").map(n => n[0]).join("")}
          </Text>
        </View>
        <Text style={styles.doctorName}>{consultation.doctor}</Text>
        <Text style={styles.specialty}>{consultation.specialty}</Text>
        
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {consultation.status === "upcoming" ? "Upcoming" : "Completed"}
          </Text>
        </View>
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Appointment Details</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📅</Text>
          <View>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{consultation.date}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>🕐</Text>
          <View>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{consultation.time}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>{consultation.type === "video" ? "📹" : "🏥"}</Text>
          <View>
            <Text style={styles.detailLabel}>Type</Text>
            <Text style={styles.detailValue}>
              {consultation.type === "video" ? "Video Consultation" : "In-Person Visit"}
            </Text>
          </View>
        </View>
        
        {consultation.notes && (
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📝</Text>
            <View>
              <Text style={styles.detailLabel}>Notes</Text>
              <Text style={styles.detailValue}>{consultation.notes}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>💊</Text>
          <Text style={styles.actionTitle}>Request Prescription</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>🧪</Text>
          <Text style={styles.actionTitle}>Lab Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionTitle}>Medical Certificate</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionTitle}>Chat with Doctor</Text>
        </TouchableOpacity>
      </View>

      {/* Join Button (if upcoming) */}
      {consultation.status === "upcoming" && (
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join Video Call</Text>
        </TouchableOpacity>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.destructiveButton}>
          <Text style={styles.destructiveButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

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
    padding: spacing.xl,
    alignItems: "center",
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  doctorAvatarText: {
    fontSize: 28,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  doctorName: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  specialty: {
    fontSize: fontSize.body,
    color: "rgba(255,255,255,0.8)",
    marginTop: spacing.xs,
  },
  statusBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    marginTop: spacing.md,
  },
  statusText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textInverse,
  },
  card: {
    backgroundColor: colors.background,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  detailLabel: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
  },
  detailValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  actionCard: {
    width: "48%",
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textAlign: "center",
  },
  joinButton: {
    backgroundColor: colors.success,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  joinButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
  },
  buttonRow: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  destructiveButton: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.error,
  },
  destructiveButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.error,
  },
  spacer: {
    height: spacing.xxxl,
  },
});
