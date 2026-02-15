import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../src/ui/theme";

const specialties = [
  { id: "gp", name: "General Practitioner", icon: "👨‍⚕️" },
  { id: "cardio", name: "Cardiologist", icon: "❤️" },
  { id: "derm", name: "Dermatologist", icon: "🩺" },
  { id: "neuro", name: "Neurologist", icon: "🧠" },
  { id: "ortho", name: "Orthopedist", icon: "🦴" },
  { id: "peds", name: "Pediatrician", icon: "👶" },
];

const doctors = [
  { id: "1", name: "Dr. Sarah Chen", specialty: "General Practitioner", rating: 4.9, reviews: 128, available: true },
  { id: "2", name: "Dr. Michael Ross", specialty: "Cardiologist", rating: 4.8, reviews: 95, available: true },
  { id: "3", name: "Dr. Emily Watson", specialty: "Dermatologist", rating: 4.9, reviews: 156, available: true },
  { id: "4", name: "Dr. James Lee", specialty: "Neurologist", rating: 4.7, reviews: 82, available: false },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export default function AppointmentScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [visitType, setVisitType] = useState<"video" | "in-person">("video");

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate().toString(),
      full: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  });

  const handleBook = () => {
    // In a real app, this would save the appointment
    router.back();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Progress */}
      <View style={styles.progress}>
        {[1, 2, 3, 4].map((s) => (
          <View key={s} style={[styles.progressStep, s <= step && styles.progressStepActive]} />
        ))}
      </View>

      {/* Step 1: Specialty */}
      {step === 1 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>Select Specialty</Text>
          <View style={styles.specialtyGrid}>
            {specialties.map((spec) => (
              <TouchableOpacity
                key={spec.id}
                style={[styles.specialtyCard, selectedSpecialty === spec.id && styles.specialtyCardActive]}
                onPress={() => setSelectedSpecialty(spec.id)}
              >
                <Text style={styles.specialtyIcon}>{spec.icon}</Text>
                <Text style={[styles.specialtyName, selectedSpecialty === spec.id && styles.specialtyNameActive]}>
                  {spec.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.nextButton, !selectedSpecialty && styles.nextButtonDisabled]}
            onPress={() => setStep(2)}
            disabled={!selectedSpecialty}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Step 2: Doctor */}
      {step === 2 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>Select Doctor</Text>
          {doctors.map((doctor) => (
            <TouchableOpacity
              key={doctor.id}
              style={[styles.doctorCard, selectedDoctor === doctor.id && styles.doctorCardActive, !doctor.available && styles.doctorCardUnavailable]}
              onPress={() => doctor.available && setSelectedDoctor(doctor.id)}
              disabled={!doctor.available}
            >
              <View style={styles.doctorAvatar}>
                <Text style={styles.doctorAvatarText}>
                  {doctor.name.split(" ").map(n => n[0]).join("")}
                </Text>
              </View>
              <View style={styles.doctorInfo}>
                <Text style={[styles.doctorName, !doctor.available && styles.doctorNameUnavailable]}>
                  {doctor.name}
                </Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                <View style={styles.doctorRating}>
                  <Text style={styles.ratingStar}>⭐</Text>
                  <Text style={styles.ratingText}>{doctor.rating}</Text>
                  <Text style={styles.reviewText}>({doctor.reviews} reviews)</Text>
                </View>
              </View>
              {!doctor.available && (
                <View style={styles.unavailableBadge}>
                  <Text style={styles.unavailableText}>Unavailable</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.nextButton, !selectedDoctor && styles.nextButtonDisabled]}
              onPress={() => setStep(3)}
              disabled={!selectedDoctor}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Step 3: Date & Time */}
      {step === 3 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>Select Date & Time</Text>
          
          {/* Visit Type */}
          <Text style={styles.label}>Visit Type</Text>
          <View style={styles.visitTypeRow}>
            <TouchableOpacity
              style={[styles.visitTypeButton, visitType === "video" && styles.visitTypeActive]}
              onPress={() => setVisitType("video")}
            >
              <Text style={styles.visitTypeIcon}>📹</Text>
              <Text style={[styles.visitTypeText, visitType === "video" && styles.visitTypeTextActive]}>
                Video Call
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.visitTypeButton, visitType === "in-person" && styles.visitTypeActive]}
              onPress={() => setVisitType("in-person")}
            >
              <Text style={styles.visitTypeIcon}>🏥</Text>
              <Text style={[styles.visitTypeText, visitType === "in-person" && styles.visitTypeTextActive]}>
                In-Person
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date */}
          <Text style={styles.label}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesScroll}>
            <View style={styles.datesRow}>
              {dates.map((d, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.dateCard, selectedDate === d.full && styles.dateCardActive]}
                  onPress={() => setSelectedDate(d.full)}
                >
                  <Text style={[styles.dateDay, selectedDate === d.full && styles.dateDayActive]}>
                    {d.day}
                  </Text>
                  <Text style={[styles.dateNum, selectedDate === d.full && styles.dateNumActive]}>
                    {d.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Time */}
          <Text style={styles.label}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, selectedTime === time && styles.timeSlotActive]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeText, selectedTime === time && styles.timeTextActive]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setStep(2)}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.nextButton, (!selectedDate || !selectedTime) && styles.nextButtonDisabled]}
              onPress={() => setStep(4)}
              disabled={!selectedDate || !selectedTime}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <View style={styles.step}>
          <Text style={styles.stepTitle}>Confirm Appointment</Text>
          
          <View style={styles.confirmCard}>
            <View style={styles.confirmRow}>
              <Text style={styles.confirmLabel}>Doctor</Text>
              <Text style={styles.confirmValue}>
                {doctors.find(d => d.id === selectedDoctor)?.name}
              </Text>
            </View>
            <View style={styles.confirmRow}>
              <Text style={styles.confirmLabel}>Specialty</Text>
              <Text style={styles.confirmValue}>
                {specialties.find(s => s.id === selectedSpecialty)?.name}
              </Text>
            </View>
            <View style={styles.confirmRow}>
              <Text style={styles.confirmLabel}>Date</Text>
              <Text style={styles.confirmValue}>{selectedDate}</Text>
            </View>
            <View style={styles.confirmRow}>
              <Text style={styles.confirmLabel}>Time</Text>
              <Text style={styles.confirmValue}>{selectedTime}</Text>
            </View>
            <View style={styles.confirmRow}>
              <Text style={styles.confirmLabel}>Type</Text>
              <Text style={styles.confirmValue}>{visitType === "video" ? "Video Call" : "In-Person"}</Text>
            </View>
          </View>

          {/* Notes */}
          <Text style={styles.label}>Additional Notes (Optional)</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Describe your symptoms or reason for visit..."
            placeholderTextColor={colors.textTertiary}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setStep(3)}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={handleBook}>
              <Text style={styles.nextButtonText}>Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  progress: {
    flexDirection: "row",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressStepActive: {
    backgroundColor: colors.primary,
  },
  step: {
    padding: spacing.lg,
  },
  stepTitle: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  specialtyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  specialtyCard: {
    width: "48%",
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  specialtyCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  specialtyIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  specialtyName: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
    textAlign: "center",
  },
  specialtyNameActive: {
    color: colors.primary,
  },
  doctorCard: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  doctorCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  doctorCardUnavailable: {
    opacity: 0.5,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  doctorAvatarText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  doctorNameUnavailable: {
    color: colors.textTertiary,
  },
  doctorSpecialty: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  doctorRating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  ratingStar: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  reviewText: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginLeft: spacing.xs,
  },
  unavailableBadge: {
    backgroundColor: colors.error + "20",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
  },
  unavailableText: {
    fontSize: 11,
    fontWeight: fontWeight.medium,
    color: colors.error,
  },
  visitTypeRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  visitTypeButton: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  visitTypeActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + "10",
  },
  visitTypeIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  visitTypeText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  visitTypeTextActive: {
    color: colors.primary,
  },
  datesScroll: {
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  datesRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  dateCard: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    width: 60,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dateDay: {
    fontSize: 11,
    color: colors.textTertiary,
    fontWeight: fontWeight.medium,
  },
  dateDayActive: {
    color: colors.textInverse,
  },
  dateNum: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  dateNumActive: {
    color: colors.textInverse,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  timeSlot: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.sm,
    width: "30%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  timeSlotActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  timeText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  timeTextActive: {
    color: colors.textInverse,
  },
  confirmCard: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  confirmLabel: {
    fontSize: fontSize.body,
    color: colors.textTertiary,
  },
  confirmValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
  },
  notesInput: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.body,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 80,
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  backButton: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: colors.textTertiary,
  },
  nextButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
  },
  spacer: {
    height: spacing.xxxl,
  },
});
