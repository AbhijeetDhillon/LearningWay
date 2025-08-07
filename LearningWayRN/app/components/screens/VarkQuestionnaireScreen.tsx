import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useAssessment } from '../../contexts/AssessmentContext';
import { globalStyles, colors, spacing, typography, borderRadius } from '../../styles/theme';
import { varkQuestions } from '../../data/varkQuestions';
import { VarkResults } from '../../types';

interface VarkQuestionnaireScreenProps {
  completeVark: () => void;
}

const VarkQuestionnaireScreen: React.FC<VarkQuestionnaireScreenProps> = ({ completeVark }) => {
  const { dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = varkQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === varkQuestions.length - 1;
  const canGoNext = selectedOption !== null;
  const canGoPrev = currentQuestionIndex > 0;

  useEffect(() => {
    // Reset selected option when question changes
    const currentAnswer = answers[currentQuestion.id];
    setSelectedOption(currentAnswer || null);
  }, [currentQuestionIndex, answers]);

  const selectOption = (optionId: string) => {
    setSelectedOption(optionId);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const goToNextQuestion = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      // Calculate VARK scores
      const results: VarkResults = {
        visual: 0,
        auditory: 0,
        reading: 0,
        kinesthetic: 0
      };

      Object.entries(answers).forEach(([questionId, optionId]) => {
        const question = varkQuestions.find(q => q.id === questionId);
        const option = question?.options.find(o => o.id === optionId);
        if (option) {
          results[option.style]++;
        }
      });

      dispatch({ type: 'COMPLETE_VARK', payload: results });
      completeVark();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (canGoPrev) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / varkQuestions.length) * 100;

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={globalStyles.stepIndicator}>
            <Text style={globalStyles.stepIndicatorText}>
              <Text style={globalStyles.stepCurrentText}>Step 2 of 7:</Text> Learning Preferences Survey
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
          </View>

          <Text style={styles.questionCounter}>
            Question {currentQuestionIndex + 1} of {varkQuestions.length}
          </Text>

          <View style={styles.questionContainer}>
            <Text style={[globalStyles.heading3, styles.questionText]}>
              {currentQuestion.question}
            </Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selectedOption === option.id && styles.optionButtonSelected
                  ]}
                  onPress={() => selectOption(option.id)}
                >
                  <View style={[
                    styles.optionLetter,
                    selectedOption === option.id && styles.optionLetterSelected
                  ]}>
                    <Text style={[
                      styles.optionLetterText,
                      selectedOption === option.id && styles.optionLetterTextSelected
                    ]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text style={styles.optionText}>{option.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                globalStyles.button,
                globalStyles.buttonOutline,
                styles.navButton,
                !canGoPrev && styles.disabledButton
              ]}
              onPress={goToPrevQuestion}
              disabled={!canGoPrev}
            >
              <Text style={[
                globalStyles.buttonText,
                globalStyles.buttonTextOutline,
                !canGoPrev && styles.disabledButtonText
              ]}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                globalStyles.button,
                globalStyles.buttonPrimary,
                styles.navButton,
                !canGoNext && styles.disabledButton
              ]}
              onPress={goToNextQuestion}
              disabled={!canGoNext}
            >
              <Text style={[
                globalStyles.buttonText,
                globalStyles.buttonTextPrimary,
                !canGoNext && styles.disabledButtonText
              ]}>
                {isLastQuestion ? 'Complete Survey' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: `${colors.primary}30`,
    borderRadius: borderRadius.full,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  questionCounter: {
    textAlign: 'center',
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    fontWeight: typography.fontWeightMedium,
  },
  questionContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  questionText: {
    marginBottom: spacing.lg,
    lineHeight: typography.fontSizeXl * 1.4,
  },
  optionsContainer: {
    gap: spacing.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.base,
    minHeight: 60,
  },
  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  optionLetter: {
    width: 28,
    height: 28,
    backgroundColor: colors.textSecondary,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  optionLetterSelected: {
    backgroundColor: colors.primary,
  },
  optionLetterText: {
    color: colors.surface,
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightBold,
  },
  optionLetterTextSelected: {
    color: colors.surface,
  },
  optionText: {
    flex: 1,
    fontSize: typography.fontSizeBase,
    color: colors.text,
    lineHeight: typography.fontSizeBase * 1.4,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  navButton: {
    flex: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    opacity: 0.5,
  },
});

export default VarkQuestionnaireScreen;