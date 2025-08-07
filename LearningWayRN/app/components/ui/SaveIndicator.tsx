import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAssessment } from '../../contexts/AssessmentContext';
import { colors, spacing, typography, borderRadius } from '../../styles/theme';

const SaveIndicator: React.FC = () => {
  const { state } = useAssessment();

  const getSaveStatus = () => {
    if (state.error) {
      return { text: '⚠️ Save Error', style: styles.error };
    }
    if (state.isLoading) {
      return { text: '💾 Saving...', style: styles.saving };
    }
    return { text: '✓ Progress Auto-Saved', style: styles.saved };
  };

  const status = getSaveStatus();

  return (
    <View style={styles.container}>
      <Text style={[styles.statusText, status.style]}>
        {status.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.sm,
    zIndex: 1000,
    pointerEvents: 'none',
  },
  statusText: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.full,
    fontSize: typography.fontSizeXs,
    fontWeight: typography.fontWeightMedium,
    color: 'white',
  },
  saved: {
    backgroundColor: colors.success,
  },
  saving: {
    backgroundColor: colors.warning,
  },
  error: {
    backgroundColor: colors.error,
  },
});

export default SaveIndicator;