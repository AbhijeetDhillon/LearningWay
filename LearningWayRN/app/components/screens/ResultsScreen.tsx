import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAssessment } from '../../contexts/AssessmentContext';
import { globalStyles, colors, spacing, typography, borderRadius } from '../../styles/theme';

interface ResultsScreenProps {
  restartAssessment: () => void;
  downloadResults?: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  restartAssessment,
  downloadResults,
}) => {
  const { state } = useAssessment();

  const getPrimaryLearningStyle = () => {
    if (!state.progress.varkResults) {
      return { style: 'unknown', score: 0, icon: '❓', name: 'Unknown' };
    }

    const vark = state.progress.varkResults;
    const styles = [
      { key: 'visual', score: vark.visual, icon: '👁️', name: 'Visual Learner' },
      { key: 'auditory', score: vark.auditory, icon: '👂', name: 'Auditory Learner' },
      { key: 'reading', score: vark.reading, icon: '📖', name: 'Reading/Writing Learner' },
      { key: 'kinesthetic', score: vark.kinesthetic, icon: '✋', name: 'Kinesthetic Learner' },
    ];

    return styles.reduce((max, current) => 
      current.score > max.score ? current : max
    );
  };

  const getStyleDescription = (style: string) => {
    const descriptions: Record<string, string> = {
      visual: 'You learn best through visual representations, diagrams, charts, and spatial understanding. Visual learners benefit from seeing information presented graphically.',
      auditory: 'You learn best through listening, speaking, and auditory processing. Auditory learners benefit from lectures, discussions, and verbal explanations.',
      reading: 'You learn best through reading and writing activities. Reading/writing learners benefit from text-based materials and note-taking.',
      kinesthetic: 'You learn best through hands-on experiences, movement, and tactile activities. Kinesthetic learners benefit from interactive and physical learning.',
      unknown: 'Unable to determine primary learning style. Please complete the assessment.'
    };

    return descriptions[style] || descriptions.unknown;
  };

  const getRetentionPerformance = () => {
    const modules = Object.values(state.progress.moduleProgress);
    if (modules.length === 0) return [];

    return modules.map(module => ({
      module: module.moduleId,
      score: module.retentionScore || 0,
      icon: getModuleIcon(module.moduleId)
    })).sort((a, b) => b.score - a.score);
  };

  const getModuleIcon = (moduleId: string) => {
    const icons: Record<string, string> = {
      visual: '👁️',
      auditory: '👂',
      reading: '📖',
      kinesthetic: '✋'
    };
    return icons[moduleId] || '📚';
  };

  const getModuleName = (moduleId: string) => {
    const names: Record<string, string> = {
      visual: 'Visual',
      auditory: 'Auditory',
      reading: 'Reading/Writing',
      kinesthetic: 'Kinesthetic'
    };
    return names[moduleId] || moduleId;
  };

  const getRecommendations = (primaryStyle: string) => {
    const recommendations: Record<string, string[]> = {
      visual: [
        'Use mind maps and visual organizers when studying',
        'Convert text information into charts and diagrams',
        'Use color coding to categorize information',
        'Watch educational videos and visual demonstrations',
        'Create flowcharts for complex processes'
      ],
      auditory: [
        'Record lectures and listen to them multiple times',
        'Participate in group discussions and study groups',
        'Read information out loud to yourself',
        'Use mnemonic devices and verbal repetition',
        'Listen to educational podcasts and audiobooks'
      ],
      reading: [
        'Take detailed written notes during lectures',
        'Rewrite information in your own words',
        'Create outlines and bullet-point summaries',
        'Read multiple sources on the same topic',
        'Use written self-testing and flashcards'
      ],
      kinesthetic: [
        'Use hands-on activities and experiments',
        'Take frequent breaks during study sessions',
        'Walk around while reviewing material',
        'Use physical objects and manipulatives',
        'Practice skills through real-world applications'
      ]
    };

    return recommendations[primaryStyle] || [];
  };

  const primaryStyle = getPrimaryLearningStyle();
  const retentionPerformance = getRetentionPerformance();
  const recommendations = getRecommendations(primaryStyle.key);
  const varkResults = state.progress.varkResults;

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={globalStyles.stepIndicator}>
            <Text style={globalStyles.stepIndicatorText}>
              <Text style={globalStyles.stepCurrentText}>Step 7 of 7:</Text> Your Results
            </Text>
          </View>

          <Text style={[globalStyles.heading1, globalStyles.textCenter, globalStyles.marginBottomLg]}>
            Your Learning Style Profile
          </Text>

          <View style={styles.resultsSection}>
            <Text style={[globalStyles.heading2, styles.sectionTitle]}>
              Your Primary Learning Style
            </Text>
            <View style={styles.primaryStyleBadge}>
              <Text style={styles.primaryStyleIcon}>{primaryStyle.icon}</Text>
              <Text style={styles.primaryStyleName}>{primaryStyle.name}</Text>
            </View>
            <Text style={[globalStyles.bodyText, styles.primaryStyleDescription]}>
              {getStyleDescription(primaryStyle.key)}
            </Text>
          </View>

          {varkResults && (
            <View style={styles.resultsSection}>
              <Text style={[globalStyles.heading3, styles.sectionTitle]}>
                Learning Preferences Breakdown
              </Text>
              <View style={styles.varkBreakdown}>
                <View style={styles.varkItem}>
                  <Text style={styles.varkIcon}>👁️</Text>
                  <Text style={styles.varkLabel}>Visual</Text>
                  <View style={styles.varkBarContainer}>
                    <View 
                      style={[
                        styles.varkBar, 
                        { width: `${(varkResults.visual / 5) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.varkScore}>{varkResults.visual}/5</Text>
                </View>
                <View style={styles.varkItem}>
                  <Text style={styles.varkIcon}>👂</Text>
                  <Text style={styles.varkLabel}>Auditory</Text>
                  <View style={styles.varkBarContainer}>
                    <View 
                      style={[
                        styles.varkBar, 
                        { width: `${(varkResults.auditory / 5) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.varkScore}>{varkResults.auditory}/5</Text>
                </View>
                <View style={styles.varkItem}>
                  <Text style={styles.varkIcon}>📖</Text>
                  <Text style={styles.varkLabel}>Reading</Text>
                  <View style={styles.varkBarContainer}>
                    <View 
                      style={[
                        styles.varkBar, 
                        { width: `${(varkResults.reading / 5) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.varkScore}>{varkResults.reading}/5</Text>
                </View>
                <View style={styles.varkItem}>
                  <Text style={styles.varkIcon}>✋</Text>
                  <Text style={styles.varkLabel}>Kinesthetic</Text>
                  <View style={styles.varkBarContainer}>
                    <View 
                      style={[
                        styles.varkBar, 
                        { width: `${(varkResults.kinesthetic / 5) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.varkScore}>{varkResults.kinesthetic}/5</Text>
                </View>
              </View>
            </View>
          )}

          {retentionPerformance.length > 0 && (
            <View style={styles.resultsSection}>
              <Text style={[globalStyles.heading3, styles.sectionTitle]}>
                Retention Performance
              </Text>
              <View style={styles.performanceList}>
                {retentionPerformance.map((item, index) => (
                  <View key={item.module} style={styles.performanceItem}>
                    <Text style={styles.performanceIcon}>{item.icon}</Text>
                    <Text style={styles.performanceLabel}>
                      {getModuleName(item.module)}
                    </Text>
                    <Text style={styles.performanceScore}>
                      {Math.round(item.score)}%
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.resultsSection}>
            <Text style={[globalStyles.heading3, styles.sectionTitle]}>
              Personalized Learning Strategies
            </Text>
            <View style={styles.recommendationsList}>
              {recommendations.map((recommendation, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Text style={styles.recommendationBullet}>•</Text>
                  <Text style={styles.recommendationText}>{recommendation}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.resultsActions}>
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.buttonOutline, styles.actionButton]}
              onPress={restartAssessment}
            >
              <Text style={[globalStyles.buttonText, globalStyles.buttonTextOutline]}>
                Take Assessment Again
              </Text>
            </TouchableOpacity>
            {downloadResults && (
              <TouchableOpacity
                style={[globalStyles.button, globalStyles.buttonPrimary, styles.actionButton]}
                onPress={downloadResults}
              >
                <Text style={[globalStyles.buttonText, globalStyles.buttonTextPrimary]}>
                  Download Results
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultsSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.primary,
  },
  primaryStyleBadge: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  primaryStyleIcon: {
    fontSize: 64,
    marginBottom: spacing.sm,
  },
  primaryStyleName: {
    fontSize: typography.fontSizeXl,
    fontWeight: typography.fontWeightBold,
    color: colors.primary,
  },
  primaryStyleDescription: {
    textAlign: 'center',
    lineHeight: typography.fontSizeBase * 1.5,
  },
  varkBreakdown: {
    gap: spacing.md,
  },
  varkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  varkIcon: {
    fontSize: 24,
    width: 32,
  },
  varkLabel: {
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightMedium,
    color: colors.text,
    width: 80,
  },
  varkBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  varkBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  varkScore: {
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightBold,
    color: colors.primary,
    width: 40,
    textAlign: 'right',
  },
  performanceList: {
    gap: spacing.sm,
  },
  performanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.base,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  performanceIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  performanceLabel: {
    flex: 1,
    fontSize: typography.fontSizeBase,
    color: colors.text,
  },
  performanceScore: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.primary,
  },
  recommendationsList: {
    gap: spacing.sm,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  recommendationBullet: {
    fontSize: typography.fontSizeLg,
    color: colors.primary,
    marginTop: 2,
  },
  recommendationText: {
    flex: 1,
    fontSize: typography.fontSizeBase,
    color: colors.text,
    lineHeight: typography.fontSizeBase * 1.4,
  },
  resultsActions: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    width: '100%',
  },
});

export default ResultsScreen;