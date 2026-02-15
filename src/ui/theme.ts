// TeleHealth AI - Theme
// Professional medical app with trustworthy teal branding

export const colors = {
  // Brand colors - Teal (trustworthy, medical)
  primary: "#008B8B",
  primaryLight: "#20B2AA",
  primaryDark: "#006666",
  
  // Semantic
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  info: "#007AFF",
  
  // Neutrals
  background: "#FFFFFF",
  surface: "#F2F2F7",
  surfaceSecondary: "#E5E5EA",
  border: "#D1D1D6",
  
  // Text
  textPrimary: "#000000",
  textSecondary: "#3C3C43",
  textTertiary: "#8E8E93",
  textInverse: "#FFFFFF",
  
  // Dark mode support
  dark: {
    background: "#000000",
    surface: "#1C1C1E",
    surfaceSecondary: "#2C2C2E",
    border: "#38383A",
    textPrimary: "#FFFFFF",
    textSecondary: "#EBEBF5",
    textTertiary: "#8E8E93",
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const fontSize = {
  caption: 13,
  body: 17,
  subtitle: 20,
  title: 22,
  header: 34,
};

export const fontWeight = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};
