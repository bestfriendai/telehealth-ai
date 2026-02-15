import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../../src/ui/theme";

type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: "video" | "in-person";
};

const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Sarah Chen",
    specialty: "General Practitioner",
    date: "Feb 15, 2026",
    time: "10:00 AM",
    status: "upcoming",
    type: "video",
  },
  {
    id: "2",
    doctor: "Dr. Michael Ross",
    specialty: "Cardiologist",
    date: "Feb 18, 2026",
    time: "2:30 PM",
    status: "upcoming",
    type: "in-person",
  },
];

export default function AppointmentsScreen() {
  const router = useRouter();
  const [appointments] = useState<Appointment[]>(mockAppointments);

  const upcomingAppointments = appointments.filter(a => a.status === "upcoming");
  const pastAppointments = appointments.filter(a => a.status === "completed");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return colors.primary;
      case "completed": return colors.success;
      case "cancelled": return colors.error;
      default: return colors.textTertiary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming": return "Confirmed";
      case "completed": return "Completed";
      case "cancelled": return "Cancelled";
      default: return status;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Book Button */}
      <TouchableOpacity 
        style={styles.bookButton}
        onPress={() => router.push("/appointment")}
      >
        <Text style={styles.bookButtonIcon}>+</Text>
        <Text style={styles.bookButtonText}>Book New Appointment</Text>
      </TouchableOpacity>

      {/* Upcoming Appointments */}
      <Text style={styles.sectionTitle}>Upcoming</Text>
      
      {upcomingAppointments.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📅</Text>
          <Text style={styles.emptyTitle}>No upcoming appointments</Text>
          <Text style={styles.emptySubtitle}>Book a consultation to get started</Text>
        </View>
      ) : (
        upcomingAppointments.map((appointment) => (
          <TouchableOpacity 
            key={appointment.id}
            style={styles.appointmentCard}
            onPress={() => router.push({ pathname: "/consultation/[id]", params: { id: appointment.id } })}
          >
            <View style={styles.appointmentHeader}>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{appointment.doctor}</Text>
                <Text style={styles.specialty}>{appointment.specialty}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) + "20" }]}>
                <Text style={[styles.statusText, { color: getStatusColor(appointment.status) }]}>
                  {getStatusText(appointment.status)}
                </Text>
              </View>
            </View>
            
            <View style={styles.appointmentDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>📅</Text>
                <Text style={styles.detailText}>{appointment.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>🕐</Text>
                <Text style={styles.detailText}>{appointment.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailIcon}>{appointment.type === "video" ? "📹" : "🏥"}</Text>
                <Text style={styles.detailText}>{appointment.type === "video" ? "Video Call" : "In-Person"}</Text>
              </View>
            </View>

            <View style={styles.appointmentActions}>
              {appointment.type === "video" && (
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join Video</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.rescheduleButtonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Past Appointments</Text>
          {pastAppointments.map((appointment) => (
            <TouchableOpacity 
              key={appointment.id}
              style={[styles.appointmentCard, styles.pastCard]}
            >
              <View style={styles.appointmentHeader}>
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{appointment.doctor}</Text>
                  <Text style={styles.specialty}>{appointment.specialty}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: colors.success + "20" }]}>
                  <Text style={[styles.statusText, { color: colors.success }]}>Completed</Text>
                </View>
              </View>
              <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={styles.detailText}>{appointment.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  bookButton: {
    backgroundColor: colors.primary,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonIcon: {
    fontSize: 24,
    color: colors.textInverse,
    marginRight: spacing.sm,
    fontWeight: fontWeight.bold,
  },
  bookButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
  },
  sectionTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
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
  appointmentCard: {
    backgroundColor: colors.background,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pastCard: {
    opacity: 0.7,
  },
  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  specialty: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
  },
  appointmentDetails: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  detailText: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  appointmentActions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  joinButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.sm,
    alignItems: "center",
  },
  joinButtonText: {
    color: colors.textInverse,
    fontWeight: fontWeight.semibold,
    fontSize: fontSize.body,
  },
  rescheduleButton: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.sm,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  rescheduleButtonText: {
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.body,
  },
  spacer: {
    height: spacing.xxxl,
  },
});
