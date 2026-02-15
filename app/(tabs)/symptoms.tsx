import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { colors, spacing, radius, fontSize, fontWeight } from "../../src/ui/theme";

const symptomCategories = [
  { id: "head", icon: "🤕", name: "Head & Neurological", symptoms: ["Headache", "Dizziness", "Nausea"] },
  { id: "chest", icon: "❤️", name: "Chest & Heart", symptoms: ["Chest pain", "Shortness of breath", "Palpitations"] },
  { id: "abdomen", icon: "🫃", name: "Abdomen & Digestion", symptoms: ["Stomach pain", "Nausea", "Bloating"] },
  { id: "skin", icon: "🩹", name: "Skin & Rash", symptoms: ["Rash", "Itching", "Swelling"] },
  { id: "joint", icon: "🦴", name: "Joints & Muscles", symptoms: ["Joint pain", "Muscle ache", "Stiffness"] },
  { id: "respiratory", icon: "🫁", name: "Respiratory", symptoms: ["Cough", "Sore throat", "Congestion"] },
];

export default function SymptomsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search symptoms..."
          placeholderTextColor={colors.textTertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Quick Check */}
      <TouchableOpacity 
        style={styles.quickCheckCard}
        onPress={() => router.push("/symptom-checker")}
      >
        <View style={styles.quickCheckContent}>
          <Text style={styles.quickCheckIcon}>🤖</Text>
          <View style={styles.quickCheckText}>
            <Text style={styles.quickCheckTitle}>AI Symptom Analysis</Text>
            <Text style={styles.quickCheckDesc}>Describe your symptoms for AI-powered insights</Text>
          </View>
        </View>
        <Text style={styles.quickCheckArrow}>→</Text>
      </TouchableOpacity>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Browse by Category</Text>
      
      {symptomCategories.map((category) => (
        <TouchableOpacity 
          key={category.id}
          style={styles.categoryCard}
          onPress={() => router.push({ pathname: "/symptom-checker", params: { category: category.id } })}
        >
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <View style={styles.categoryContent}>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categorySymptoms}>
              {category.symptoms.join(" • ")}
            </Text>
          </View>
          <Text style={styles.categoryArrow}>›</Text>
        </TouchableOpacity>
      ))}

      {/* Common Conditions */}
      <Text style={styles.sectionTitle}>Common Conditions</Text>
      <View style={styles.conditionsGrid}>
        {[
          { name: "Cold & Flu", icon: "🤧", color: "#FF6B6B" },
          { name: "Allergies", icon: "🤧", color: "#4ECDC4" },
          { name: "Migraine", icon: "😫", color: "#9B59B6" },
          { name: "Anxiety", icon: "😰", color: "#F39C12" },
          { name: "Acid Reflux", icon: "🔥", color: "#E74C3C" },
          { name: "Insomnia", icon: "😴", color: "#3498DB" },
        ].map((condition, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.conditionCard}
            onPress={() => router.push("/symptom-checker")}
          >
            <Text style={styles.conditionIcon}>{condition.icon}</Text>
            <Text style={styles.conditionName}>{condition.name}</Text>
          </TouchableOpacity>
        ))}
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
  searchContainer: {
    padding: spacing.lg,
  },
  searchInput: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.body,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickCheckCard: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
  },
  quickCheckContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  quickCheckIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  quickCheckText: {
    flex: 1,
  },
  quickCheckTitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.textInverse,
  },
  quickCheckDesc: {
    fontSize: fontSize.caption,
    color: "rgba(255,255,255,0.8)",
    marginTop: spacing.xs,
  },
  quickCheckArrow: {
    fontSize: 24,
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
  categoryCard: {
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
  categoryIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
  },
  categorySymptoms: {
    fontSize: fontSize.caption,
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  categoryArrow: {
    fontSize: 24,
    color: colors.textTertiary,
  },
  conditionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  conditionCard: {
    width: "31%",
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  conditionIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  conditionName: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    color: colors.textPrimary,
    textAlign: "center",
  },
  spacer: {
    height: spacing.xxxl,
  },
});
