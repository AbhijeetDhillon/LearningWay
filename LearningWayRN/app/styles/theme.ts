import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#da7756',
  primaryHover: '#bd5d3a',
  primaryActive: '#a84d2f',
  background: '#eeece2',
  surface: '#ffffff',
  text: '#3d3929',
  textSecondary: '#6b5d47',
  accent: '#bd5d3a',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  border: 'rgba(61, 57, 41, 0.15)',
  borderLight: 'rgba(61, 57, 41, 0.08)',
  cardShadow: 'rgba(61, 57, 41, 0.08)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontSizeXs: 12,
  fontSizeSm: 14,
  fontSizeBase: 16,
  fontSizeLg: 18,
  fontSizeXl: 20,
  fontSize2xl: 24,
  fontSize3xl: 30,
  fontSize4xl: 36,
  fontWeightNormal: '400' as const,
  fontWeightMedium: '500' as const,
  fontWeightSemibold: '600' as const,
  fontWeightBold: '700' as const,
  lineHeightTight: 1.25,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.625,
};

export const borderRadius = {
  sm: 4,
  base: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
    padding: spacing.md,
  },
  contentWrapper: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    ...shadows.sm,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightMedium,
  },
  buttonTextPrimary: {
    color: colors.surface,
  },
  buttonTextOutline: {
    color: colors.text,
  },
  heading1: {
    fontSize: typography.fontSize4xl,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    lineHeight: typography.fontSize4xl * typography.lineHeightTight,
  },
  heading2: {
    fontSize: typography.fontSize3xl,
    fontWeight: typography.fontWeightSemibold,
    color: colors.text,
    lineHeight: typography.fontSize3xl * typography.lineHeightTight,
  },
  heading3: {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightSemibold,
    color: colors.text,
    lineHeight: typography.fontSize2xl * typography.lineHeightTight,
  },
  heading4: {
    fontSize: typography.fontSizeXl,
    fontWeight: typography.fontWeightSemibold,
    color: colors.text,
    lineHeight: typography.fontSizeXl * typography.lineHeightNormal,
  },
  bodyText: {
    fontSize: typography.fontSizeBase,
    color: colors.text,
    lineHeight: typography.fontSizeBase * typography.lineHeightRelaxed,
  },
  bodyTextSecondary: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    lineHeight: typography.fontSizeBase * typography.lineHeightRelaxed,
  },
  leadText: {
    fontSize: typography.fontSizeLg,
    color: colors.textSecondary,
    lineHeight: typography.fontSizeLg * typography.lineHeightRelaxed,
  },
  stepIndicator: {
    alignSelf: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: `${colors.primary}20`,
    borderRadius: borderRadius.full,
    marginBottom: spacing.lg,
  },
  stepIndicatorText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeightMedium,
  },
  stepCurrentText: {
    color: colors.primary,
    fontWeight: typography.fontWeightSemibold,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  gridItemHalf: {
    width: '48%',
    marginBottom: spacing.sm,
  },
  gridItemThird: {
    width: '31%',
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: `${colors.primary}30`,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  marginBottomSm: {
    marginBottom: spacing.sm,
  },
  marginBottomMd: {
    marginBottom: spacing.md,
  },
  marginBottomLg: {
    marginBottom: spacing.lg,
  },
  marginBottomXl: {
    marginBottom: spacing.xl,
  },
});

export const responsive = {
  isTablet: width >= 768,
  isDesktop: width >= 1024,
  screenWidth: width,
  screenHeight: height,
};