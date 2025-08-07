import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAssessment } from '../../contexts/AssessmentContext';
import { globalStyles, colors, spacing, typography, borderRadius, shadows } from '../../styles/theme';

interface StepItemProps {
  number: number;
  text: string;
}

const StepItem: React.FC<StepItemProps> = ({ number, text }) => (
  <View style={styles.stepItem}>
    <View style={styles.stepNumber}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <Text style={styles.stepText}>{text}</Text>
  </View>
);

interface WelcomeScreenProps {
  startAssessment: () => void;
  navigateToScreen: (screen: string) => void;
  restartAssessment: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ startAssessment }) => {
  const { state, clearProgress } = useAssessment();
  const { progress } = state;

  const hasProgress = progress.selectedTopic || progress.varkCompleted || Object.keys(progress.moduleProgress).length > 0;

  const continueAssessment = () => {
    if (progress.completed) {
      // Will auto-navigate via useEffect in main app
    } else if (Object.keys(progress.moduleProgress).length > 0) {
      // Will auto-navigate via useEffect in main app
    } else if (progress.varkCompleted) {
      // Will auto-navigate via useEffect in main app
    } else if (progress.selectedTopic) {
      // Will auto-navigate via useEffect in main app
    } else {
      startAssessment();
    }
  };

  const startFresh = () => {
    Alert.alert(
      'Start Fresh',
      'Are you sure you want to clear your saved progress and start over?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, Start Fresh',
          style: 'destructive',
          onPress: async () => {
            await clearProgress();
            startAssessment();
          },
        },
      ]
    );
  };

  const clearAllProgress = () => {
    Alert.alert(
      'Clear Progress',
      'Are you sure you want to clear all saved progress?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearProgress,
        },
      ]
    );
  };

  const getProgressSummary = () => {
    const completedModules = Object.values(progress.moduleProgress).filter(p => p.completed).length;
    const totalModules = 4; // visual, auditory, reading, kinesthetic
    
    return {
      topic: progress.selectedTopic,
      varkCompleted: progress.varkCompleted,
      modulesCompleted: completedModules,
      totalModules,
      overallCompleted: progress.completed,
    };
  };

  const progressSummary = getProgressSummary();

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={styles.welcomeContent}>
            <Text style={[globalStyles.heading1, globalStyles.textCenter, globalStyles.marginBottomMd]}>
              Discover Your Learning Style
            </Text>
            
            <Text style={[globalStyles.leadText, globalStyles.textCenter, globalStyles.marginBottomXl]}>
              This scientifically-based assessment combines learning preferences with retention testing to identify how you learn most effectively.
            </Text>

            {hasProgress && (
              <View style={styles.progressRecovery}>
                <Text style={[globalStyles.heading3, styles.recoveryTitle]}>
                  Welcome Back!
                </Text>
                <Text style={[globalStyles.bodyText, globalStyles.textCenter, globalStyles.marginBottomMd]}>
                  We found your previous progress. Would you like to continue where you left off?
                </Text>
                
                <View style={styles.progressSummary}>
                  <Text style={[globalStyles.heading4, globalStyles.marginBottomSm]}>
                    Progress Summary
                  </Text>
                  <View style={styles.progressDetails}>
                    {progressSummary.topic && (
                      <Text style={globalStyles.bodyTextSecondary}>
                        • Topic: {progressSummary.topic.replace('_', ' ')}
                      </Text>
                    )}
                    <Text style={globalStyles.bodyTextSecondary}>
                      • VARK Survey: {progressSummary.varkCompleted ? '✓ Completed' : 'Not started'}
                    </Text>
                    <Text style={globalStyles.bodyTextSecondary}>
                      • Learning Modules: {progressSummary.modulesCompleted}/{progressSummary.totalModules} completed
                    </Text>
                    {progressSummary.overallCompleted && (
                      <Text style={globalStyles.bodyTextSecondary}>
                        • Assessment: ✓ Completed
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.recoveryActions}>
                  <TouchableOpacity
                    style={[globalStyles.button, globalStyles.buttonPrimary, styles.recoveryButton]}
                    onPress={continueAssessment}
                  >
                    <Text style={[globalStyles.buttonText, globalStyles.buttonTextPrimary]}>
                      Continue Previous Session
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[globalStyles.button, globalStyles.buttonOutline, styles.recoveryButton]}
                    onPress={startFresh}
                  >
                    <Text style={[globalStyles.buttonText, globalStyles.buttonTextOutline]}>
                      Start Fresh
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.assessmentOverview}>
              <Text style={[globalStyles.heading3, globalStyles.textCenter, globalStyles.marginBottomLg]}>
                Assessment Process (7 Steps)
              </Text>
              
              <View style={styles.stepsGrid}>
                <StepItem number={1} text="Choose unfamiliar topic" />
                <StepItem number={2} text="Complete VARK survey" />
                <StepItem number={3} text="Visual learning module" />
                <StepItem number={4} text="Auditory learning module" />
                <StepItem number={5} text="Reading/Writing module" />
                <StepItem number={6} text="Kinesthetic module" />
                <StepItem number={7} text="View your results" />
              </View>
            </View>

            <TouchableOpacity
              style={[globalStyles.button, globalStyles.buttonPrimary, styles.startButton]}
              onPress={startAssessment}
            >
              <Text style={[globalStyles.buttonText, globalStyles.buttonTextPrimary]}>
                Start Assessment
              </Text>
            </TouchableOpacity>

            <Text style={[globalStyles.bodyTextSecondary, globalStyles.textCenter, globalStyles.marginBottomLg]}>
              ⏱️ Estimated time: 15-20 minutes
            </Text>

            {hasProgress && (
              <View style={styles.progressManagement}>
                <TouchableOpacity
                  style={[globalStyles.button, globalStyles.buttonOutline, styles.clearButton]}
                  onPress={clearAllProgress}
                >
                  <Text style={[globalStyles.buttonText, globalStyles.buttonTextOutline, styles.clearButtonText]}>
                    Clear Saved Progress
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  welcomeContent: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  progressRecovery: {
    backgroundColor: `${colors.primary}10`,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: 'center',
    width: '100%',
  },
  recoveryTitle: {
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  progressSummary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.base,
    padding: spacing.sm,
    marginVertical: spacing.sm,
    width: '100%',
  },
  progressDetails: {
    paddingLeft: spacing.sm,
  },
  recoveryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.sm,
  },
  recoveryButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  assessmentOverview: {
    marginVertical: spacing.xl,
    width: '100%',
  },
  stepsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  stepItem: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    alignItems: 'center',
    width: '30%',
    marginBottom: spacing.sm,
    minHeight: 100,
    justifyContent: 'center',
    ...shadows.sm,
  },
  stepNumber: {
    width: 32,
    height: 32,
    backgroundColor: colors.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  stepNumberText: {
    color: colors.surface,
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightBold,
  },
  stepText: {
    fontSize: typography.fontSizeSm,
    color: colors.textSecondary,
    fontWeight: typography.fontWeightMedium,
    textAlign: 'center',
  },
  startButton: {
    width: '100%',
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  progressManagement: {
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    width: '100%',
    alignItems: 'center',
  },
  clearButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  clearButtonText: {
    fontSize: typography.fontSizeSm,
  },
});

export default WelcomeScreen;