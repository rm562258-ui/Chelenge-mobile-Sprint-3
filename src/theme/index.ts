export const theme = {
  colors: {
    primary: '#16A34A',
    teal: '#0F766E',
    white: '#FFFFFF',
    black: '#0F172A',
    gray50: '#F8FAFC',
    gray100: '#F1F5F9',
    gray200: '#E2E8F0',
    gray300: '#CBD5E1',
    gray500: '#64748B',
    gray700: '#334155',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#22C55E',
    info: '#3B82F6',
  },
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
  },
  shadow: {
    soft: {
      shadowColor: '#0F766E',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 4,
    },
  },
  typography: {
    title: { fontSize: 32, fontWeight: '700' as const, lineHeight: 38 },
    h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
    h2: { fontSize: 22, fontWeight: '700' as const, lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
    body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
    caption: { fontSize: 12, fontWeight: '500' as const, lineHeight: 16 },
  },
};

export type AppTheme = typeof theme;
