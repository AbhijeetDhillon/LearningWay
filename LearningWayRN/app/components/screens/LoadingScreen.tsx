import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { globalStyles, colors, spacing, typography } from '../../styles/theme';

const LoadingScreen: React.FC = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );

    // Pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();
    pulseAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
    };
  }, [spinValue, pulseValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[globalStyles.container, styles.loadingContainer]}>
      <View style={styles.loadingContent}>
        <View style={styles.spinnerContainer}>
          <Animated.View
            style={[
              styles.spinner,
              {
                transform: [{ rotate: spin }, { scale: pulseValue }],
              },
            ]}
          >
            <View style={styles.spinnerRing} />
            <View style={[styles.spinnerRing, styles.spinnerRingInner]} />
          </Animated.View>
        </View>

        <Text style={[globalStyles.heading2, styles.loadingTitle]}>
          Analyzing Your Results...
        </Text>
        
        <Text style={[globalStyles.bodyText, styles.loadingDescription]}>
          Processing your learning preferences and performance data
        </Text>

        <View style={styles.dotsContainer}>
          <Text style={styles.dots}>⚡ Calculating VARK scores</Text>
          <Text style={styles.dots}>📊 Analyzing retention performance</Text>
          <Text style={styles.dots}>🎯 Generating personalized recommendations</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingContent: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    maxWidth: 400,
  },
  spinnerContainer: {
    marginBottom: spacing.xl,
  },
  spinner: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerRing: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.borderLight,
    borderTopColor: colors.primary,
  },
  spinnerRingInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.borderLight,
    borderBottomColor: colors.secondary,
  },
  loadingTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
    color: colors.text,
  },
  loadingDescription: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: typography.fontSizeBase * 1.4,
  },
  dotsContainer: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  dots: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default LoadingScreen;