// Crecimos brand design system — clean, modern, blue-dominant
export const theme = {
  colors: {
    // Backgrounds
    bg: "#FFFFFF",
    bgSubtle: "hsl(220, 14%, 96%)",
    bgCard: "#FFFFFF",
    bgCardAlt: "hsl(210, 95%, 96%)",
    bgGradient:
      "linear-gradient(180deg, #FFFFFF 0%, hsl(210, 95%, 92%) 10%, hsl(212, 98%, 82%) 30%, hsl(215, 100%, 58%) 50%, hsl(210, 100%, 70%) 80%, hsl(204, 100%, 85%) 100%)",
    bgDark: "hsl(220, 18%, 12%)",

    // Text
    text: "hsl(220, 18%, 20%)", // soft dark navy
    textSecondary: "hsl(220, 9%, 46%)",
    textMuted: "hsl(220, 13%, 65%)",

    // Primary blue
    primary: "hsl(209, 100%, 44%)", // #0070E0
    primaryLight: "hsl(210, 100%, 60%)",
    primaryDark: "hsl(220, 90%, 35%)",
    gradientText: "linear-gradient(135deg, hsl(220, 90%, 35%), hsl(210, 100%, 60%))",
    gradientButton: "linear-gradient(135deg, hsl(220, 90%, 56%), hsl(210, 100%, 70%))",
    gradientHero:
      "linear-gradient(180deg, #FFFFFF 0%, hsl(210, 95%, 92%) 15%, hsl(215, 100%, 58%) 60%, hsl(204, 100%, 85%) 100%)",

    // Accents
    success: "#22C55E",
    danger: "#EF4444",
    warning: "#F59E0B",
    orange: "#F97316",
    cyan: "hsl(190, 90%, 50%)",
    purple: "hsl(260, 70%, 58%)",

    // Borders
    border: "hsl(220, 13%, 91%)",
    borderSubtle: "rgba(0,0,0,0.06)",
  },
  fonts: {
    display:
      '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"SF Mono", "Fira Code", Consolas, monospace',
  },
  radius: {
    sm: 12,
    md: 16,
    lg: 24,
    xl: 28,
    full: 9999,
  },
  shadows: {
    card: "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    cardLg: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
    glow: "0 0 60px rgba(0,112,224,0.15)",
    button: "0 6px 18px rgba(0,0,0,0.08)",
  },
};
