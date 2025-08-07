import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAssessment } from '../../contexts/AssessmentContext';
import { globalStyles, colors, spacing, typography, borderRadius } from '../../styles/theme';

interface RetentionTestScreenProps {
  currentModule: string | null;
  completeTest: () => void;
}

const RetentionTestScreen: React.FC<RetentionTestScreenProps> = ({
  currentModule,
  completeTest,
}) => {
  const { state, dispatch } = useAssessment();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getTestQuestions = () => {
    const topic = state.progress.selectedTopic;
    
    if (!topic || !currentModule) {
      return [];
    }

    // Sample retention test questions for marine bioluminescence
    const questionsMap: Record<string, Record<string, any[]>> = {
      marine_bioluminescence: {
        visual: [
          {
            id: 'visual_q1',
            question: 'Which chemical compounds are essential for bioluminescent reactions?',
            options: [
              { id: 'a', text: 'Chlorophyll and Oxygen' },
              { id: 'b', text: 'Luciferin and Luciferase' },
              { id: 'c', text: 'Hemoglobin and Carbon' },
              { id: 'd', text: 'Protein and Glucose' }
            ],
            correct: 'b'
          },
          {
            id: 'visual_q2',
            question: 'What color of bioluminescent light travels furthest in ocean water?',
            options: [
              { id: 'a', text: 'Red light' },
              { id: 'b', text: 'Yellow light' },
              { id: 'c', text: 'Blue-green light' },
              { id: 'd', text: 'Purple light' }
            ],
            correct: 'c'
          },
          {
            id: 'visual_q3',
            question: 'Which marine organism uses bioluminescence as a hunting lure?',
            options: [
              { id: 'a', text: 'Jellyfish' },
              { id: 'b', text: 'Anglerfish' },
              { id: 'c', text: 'Seahorse' },
              { id: 'd', text: 'Starfish' }
            ],
            correct: 'b'
          }
        ],
        auditory: [
          {
            id: 'auditory_q1',
            question: 'At what ocean depth does sunlight typically stop penetrating?',
            options: [
              { id: 'a', text: '50 meters' },
              { id: 'b', text: '100 meters' },
              { id: 'c', text: '200 meters' },
              { id: 'd', text: '500 meters' }
            ],
            correct: 'c'
          },
          {
            id: 'auditory_q2',
            question: 'What is the primary purpose of counter-illumination in marine animals?',
            options: [
              { id: 'a', text: 'Attracting mates' },
              { id: 'b', text: 'Hunting prey' },
              { id: 'c', text: 'Camouflage from predators' },
              { id: 'd', text: 'Communication' }
            ],
            correct: 'c'
          },
          {
            id: 'auditory_q3',
            question: 'Which organisms create the "blue tears" bioluminescent effect?',
            options: [
              { id: 'a', text: 'Ostracod Crustaceans' },
              { id: 'b', text: 'Deep-sea fish' },
              { id: 'c', text: 'Coral polyps' },
              { id: 'd', text: 'Sea anemones' }
            ],
            correct: 'a'
          }
        ],
        reading: [
          {
            id: 'reading_q1',
            question: 'Who first systematically studied marine bioluminescence during the HMS Beagle voyage?',
            options: [
              { id: 'a', text: 'Isaac Newton' },
              { id: 'b', text: 'Charles Darwin' },
              { id: 'c', text: 'Marie Curie' },
              { id: 'd', text: 'Alexander Fleming' }
            ],
            correct: 'b'
          },
          {
            id: 'reading_q2',
            question: 'What percentage of the ocean exists in perpetual darkness?',
            options: [
              { id: 'a', text: '50%' },
              { id: 'b', text: '70%' },
              { id: 'c', text: '80%' },
              { id: 'd', text: '90%' }
            ],
            correct: 'd'
          },
          {
            id: 'reading_q3',
            question: 'What does the term "bios" mean in bioluminescence?',
            options: [
              { id: 'a', text: 'Light' },
              { id: 'b', text: 'Living' },
              { id: 'c', text: 'Ocean' },
              { id: 'd', text: 'Chemical' }
            ],
            correct: 'b'
          }
        ],
        kinesthetic: [
          {
            id: 'kinesthetic_q1',
            question: 'In the chemical reaction simulation, what happens when you clap your hands together?',
            options: [
              { id: 'a', text: 'Oxygen is removed' },
              { id: 'b', text: 'Oxygen is added to start the reaction' },
              { id: 'c', text: 'Light is absorbed' },
              { id: 'd', text: 'Temperature decreases' }
            ],
            correct: 'b'
          },
          {
            id: 'kinesthetic_q2',
            question: 'Which zone in the ocean memory palace represents the bioluminescence hub?',
            options: [
              { id: 'a', text: 'Sunlight zone' },
              { id: 'b', text: 'Twilight zone' },
              { id: 'c', text: 'Midnight zone' },
              { id: 'd', text: 'Abyssal zone' }
            ],
            correct: 'c'
          },
          {
            id: 'kinesthetic_q3',
            question: 'What type of movement pattern represents jellyfish bioluminescence?',
            options: [
              { id: 'a', text: 'Quick darting movements' },
              { id: 'b', text: 'Slow deliberate movements' },
              { id: 'c', text: 'Pulsing rhythmic motions' },
              { id: 'd', text: 'Steady continuous motion' }
            ],
            correct: 'c'
          }
        ]
      }
    };

    return questionsMap[topic]?.[currentModule] || [];
  };

  const questions = getTestQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canGoNext = selectedOption !== null;
  const canGoPrev = currentQuestionIndex > 0;

  useEffect(() => {
    // Reset selected option when question changes
    const currentAnswer = answers[currentQuestion?.id];
    setSelectedOption(currentAnswer || null);
  }, [currentQuestionIndex, answers, currentQuestion?.id]);

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
      // Calculate test score
      let correctAnswers = 0;
      Object.entries(answers).forEach(([questionId, answerId]) => {
        const question = questions.find(q => q.id === questionId);
        if (question && question.correct === answerId) {
          correctAnswers++;
        }
      });

      const score = (correctAnswers / questions.length) * 100;
      
      dispatch({
        type: 'COMPLETE_MODULE_TEST',
        payload: {
          moduleId: currentModule!,
          score,
          answers: Object.keys(answers).length
        }
      });

      completeTest();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (canGoPrev) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  if (!currentQuestion) {
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.screenContainer}>
          <View style={globalStyles.contentWrapper}>
            <Text style={[globalStyles.heading2, globalStyles.textCenter]}>
              No test questions available
            </Text>
            <Text style={[globalStyles.bodyText, globalStyles.textCenter, globalStyles.marginTopMd]}>
              Please select a valid module and topic.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={styles.testHeader}>
            <View style={globalStyles.stepIndicator}>
              <Text style={globalStyles.stepIndicatorText}>
                Testing Your Retention
              </Text>
            </View>
            <Text style={[globalStyles.heading2, styles.testTitle]}>
              Retention Test
            </Text>
            <Text style={styles.testInfo}>
              Immediate Recall - Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
          </View>

          <View style={styles.questionContainer}>
            <Text style={[globalStyles.heading3, styles.questionText]}>
              {currentQuestion.question}
            </Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option: any, index: number) => (
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
                {isLastQuestion ? 'Complete Test' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  testHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  testTitle: {
    marginTop: spacing.sm,
  },
  testInfo: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    textAlign: 'center',
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

export default RetentionTestScreen;