import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useAssessment } from '../contexts/AssessmentContext';
import { globalStyles, colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import { ScreenProps } from '../types';
import { topics } from '../data/topics';

const TopicSelectionScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { dispatch } = useAssessment();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const selectTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    dispatch({ type: 'SELECT_TOPIC', payload: topicId });
    
    // Navigate to VARK questionnaire after a brief delay to show selection
    setTimeout(() => {
      navigation.navigate('VarkQuestionnaire');
    }, 300);
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={globalStyles.stepIndicator}>
            <Text style={globalStyles.stepIndicatorText}>
              <Text style={globalStyles.stepCurrentText}>Step 1 of 7:</Text> Choose Your Topic
            </Text>
          </View>

          <Text style={[globalStyles.heading2, globalStyles.textCenter, globalStyles.marginBottomMd]}>
            Select the Topic You Know Least About
          </Text>

          <View style={styles.instructionBox}>
            <Text style={globalStyles.bodyText}>
              Choose the topic you are LEAST familiar with to ensure unbiased assessment results. 
              This prevents prior knowledge from affecting your learning style evaluation.
            </Text>
          </View>

          <View style={styles.topicsContainer}>
            {topics.map((topic) => (
              <TouchableOpacity
                key={topic.id}
                style={[
                  styles.topicCard,
                  selectedTopic === topic.id && styles.topicCardSelected,
                ]}
                onPress={() => selectTopic(topic.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.topicIcon}>{topic.icon}</Text>
                <Text style={[globalStyles.heading4, styles.topicTitle]}>
                  {topic.name}
                </Text>
                <Text style={[globalStyles.bodyTextSecondary, styles.topicDescription]}>
                  {topic.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  instructionBox: {
    backgroundColor: `${colors.primary}15`,
    padding: spacing.md,
    borderRadius: borderRadius.base,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: spacing.xl,
  },
  topicsContainer: {
    gap: spacing.md,
  },
  topicCard: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
    ...shadows.sm,
  },
  topicCardSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}08`,
    transform: [{ scale: 0.98 }],
    ...shadows.md,
  },
  topicIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  topicTitle: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  topicDescription: {
    textAlign: 'center',
    fontSize: typography.fontSizeSm,
  },
});

export default TopicSelectionScreen;