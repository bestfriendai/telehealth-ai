import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../src/ui/theme";

type SymptomResult = {
  condition: string;
  probability: string;
  description: string;
  recommendations: string[];
};

export default function SymptomCheckerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [severity, setSeverity] = useState("moderate");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SymptomResult | null>(null);

  const analyzeSymptoms = () => {
    if (!symptoms.trim()) return;
    
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        condition: "Common Cold",
        probability: "78%",
        description: "Your symptoms are consistent with a viral upper respiratory infection. Rest and hydration are recommended.",
        recommendations: [
          "Rest for 2-3 days",
          "Drink plenty of fluids",
          "Take over-the-counter pain relievers if needed",
          "Monitor temperature",
          "Consult a doctor if symptoms worsen",
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  const severityLevels = [
    { id: "mild", label: "Mild", color: colors.success },
    { id: "moderate", label: "Moderate", color: colors.warning },
    { id: "severe", label: "Severe", color: colors.error },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🤖</Text>
        <Text style={styles.headerTitle}>AI Symptom Analysis</Text>
        <Text style={styles.headerSubtitle}>
          Describe your symptoms for AI-powered insights
        </Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Describe your symptoms</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g., headache, sore throat, fatigue..."
          placeholderTextColor={colors.textTertiary}
          value={symptoms}
          onChangeText={setSymptoms}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Duration */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>How long have you had these symptoms?</Text>
        <View style={styles.optionsRow}>
          {["Today", "2-3 days", "4-7 days", "1+ week"].map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.optionChip, duration === d && styles.optionChipActive]}
              onPress={() => setDuration(d)}
            >
              <Text style={[styles.optionChipText, duration === d && styles.optionChipTextActive]}>
                {d}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Severity */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>Severity</Text>
        <View style={styles.severityRow}>
          {severityLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.severityButton,
                severity === level.id && { backgroundColor: level.color + "20", borderColor: level.color },
              ]}
              onPress={() => setSeverity(level.id)}
            >
              <View style={[styles.severityDot, { backgroundColor: level.color }]} />
              <Text style={[styles.severityLabel, severity === level.id && { color: level.color }]}>
                {level.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Analyze Button */}
      <TouchableOpacity
        style={[styles.analyzeButton, !symptoms.trim() && styles.analyzeButtonDisabled]}
        onPress={analyzeSymptoms}
        disabled={!symptoms.trim() || analyzing}
      >
        <Text style={styles.analyzeButtonText}>
          {analyzing ? "Analyzing..." : "Analyze Symptoms"}
        </Text>
      </TouchableOpacity>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerIcon}>⚠️</Text>
        <Text style={styles.disclaimerText}>
          This is not a medical diagnosis. Always consult a healthcare professional for medical advice.
        </Text>
      </View>

      {/* Results */}
      {result && (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Analysis Results</Text>
          
          <View style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultCondition}>{result.condition}</Text>
              <View style={styles.probabilityBadge}>
                <Text style={styles.probabilityText}>{result.probability} match</Text>
              </View>
            </View>
            
            <Text style={styles.resultDescription}>{result.description}</Text>
            
            <Text style={styles.recommendationsTitle}>Recommendations</Text>
            {result.recommendations.map((rec, index) => (
              <View key={index} style={styles.recommendationItem}>
                <Text style={styles.recommendationIcon}>✓</Text>
                <Text style={styles.recommendationText}>{rec}</Text>
              </View>
            ))}
          </View>

          {/* Actions */}
          <View style={styles.resultActions}>
            <TouchableOpacity 
              style={styles.bookAppointmentButton}
              onPress={() => router.push("/appointment")}
            >
              <Text style={styles.bookAppointmentText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Save Results</Text>
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
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    alignItems: "center",
  },
  headerIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  headerSubtitle: {
    fontSize: fontSize.body,
    color: "rgba(255,255,255,0.8)",
    marginTop: spacing.xs,
    textAlign: "center",
  },
  inputSection: {
    padding: spacing.lg,
  },
  label: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  textInput: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.body,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  optionChip: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionChipText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  optionChipTextActive: {
    color: colors.textInverse,
  },
  severityRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  severityButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  severityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  severityLabel: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textSecondary,
  },
  analyzeButton: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  analyzeButtonDisabled: {
    backgroundColor: colors.textTertiary,
  },
  analyzeButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
  },
  disclaimer: {
    flexDirection: "row",
    alignItems: "flex-start",
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.warning + "15",
    borderRadius: radius.md,
  },
  disclaimerIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  disclaimerText: {
    flex: 1,
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  resultSection: {
    padding: spacing.lg,
  },
  resultTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  resultCard: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  resultCondition: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
  },
  probabilityBadge: {
    backgroundColor: colors.primary + "20",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  probabilityText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  resultDescription: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  recommendationsTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  recommendationIcon: {
    fontSize: 14,
    color: colors.success,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: fontSize.body,
    color: colors.textSecondary,
  },
  resultActions: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  bookAppointmentButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
  },
  bookAppointmentText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textInverse,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
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
  spacer: {
    height: spacing.xxxl,
  },
});
