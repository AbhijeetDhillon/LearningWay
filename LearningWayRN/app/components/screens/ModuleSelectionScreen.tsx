import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useAssessment } from '../../contexts/AssessmentContext';
import { globalStyles, colors, spacing, typography, borderRadius } from '../../styles/theme';

interface ModuleSelectionScreenProps {
  startModule: (moduleId: string) => void;
  showResults: () => void;
}

const ModuleSelectionScreen: React.FC<ModuleSelectionScreenProps> = ({ 
  startModule, 
  showResults 
}) => {
  const { state } = useAssessment();
  
  const modules = [
    {
      id: 'visual',
      step: 3,
      icon: '👁️',
      title: 'Visual Learning',
      description: 'Interactive diagrams and visual representations'
    },
    {
      id: 'auditory',
      step: 4,
      icon: '👂',
      title: 'Auditory Learning',
      description: 'Audio explanations with playback controls'
    },
    {
      id: 'reading',
      step: 5,
      icon: '📖',
      title: 'Reading/Writing',
      description: 'Text-based content with note-taking'
    },
    {
      id: 'kinesthetic',
      step: 6,
      icon: '✋',
      title: 'Kinesthetic Learning',
      description: 'Interactive drag-and-drop activities'
    }
  ];

  const getModuleStatus = (moduleId: string) => {
    const module = state.progress.moduleProgress[moduleId];
    if (!module) return 'Not Started';
    if (module.completed) return 'Completed';
    if (module.studyStarted) return 'In Progress';
    return 'Not Started';
  };

  const completedModules = Object.values(state.progress.moduleProgress).filter(
    module => module.completed
  ).length;

  const allModulesCompleted = completedModules === 4;

  const getTopicDisplay = () => {
    const topicMap: Record<string, any> = {
      marine_bioluminescence: {
        icon: '🌊',
        title: 'Marine Bioluminescence',
        description: 'The science behind light-producing organisms in the ocean'
      },
      ancient_cuneiform: {
        icon: '📜',
        title: 'Ancient Mesopotamian Cuneiform',
        description: 'The world\'s earliest known writing system from ancient Iraq'
      },
      quantum_entanglement: {
        icon: '⚛️',
        title: 'Quantum Entanglement',
        description: 'Particles becoming interconnected regardless of distance'
      },
      mycorrhizal_networks: {
        icon: '🍄',
        title: 'Mycorrhizal Networks',
        description: 'Underground fungal networks that connect forest ecosystems'
      },
      polyphonic_overtones: {
        icon: '🎵',
        title: 'Polyphonic Overtone Singing',
        description: 'Traditional throat singing techniques from Central Asia'
      }
    };

    return topicMap[state.progress.selectedTopic || ''] || {
      icon: '📚',
      title: 'Unknown Topic',
      description: 'Please select a topic first'
    };
  };

  const topicInfo = getTopicDisplay();

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={globalStyles.stepIndicator}>
            <Text style={globalStyles.stepIndicatorText}>
              <Text style={globalStyles.stepCurrentText}>Steps 3-6 of 7:</Text> Learning Modules
            </Text>
          </View>

          <Text style={[globalStyles.heading2, globalStyles.textCenter, globalStyles.marginBottomMd]}>
            Complete All Learning Modules
          </Text>

          <Text style={[globalStyles.instructionText, globalStyles.textCenter, globalStyles.marginBottomXl]}>
            Experience the same topic through 4 different learning styles. Each module teaches different aspects to prevent bias. Complete all modules for accurate results.
          </Text>

          <View style={styles.selectedTopicDisplay}>
            <Text style={styles.topicIcon}>{topicInfo.icon}</Text>
            <View style={styles.topicInfo}>
              <Text style={styles.topicTitle}>{topicInfo.title}</Text>
              <Text style={styles.topicDescription}>{topicInfo.description}</Text>
            </View>
          </View>

          <View style={styles.modulesGrid}>
            {modules.map((module) => {
              const status = getModuleStatus(module.id);
              const isCompleted = status === 'Completed';
              
              return (
                <TouchableOpacity
                  key={module.id}
                  style={[
                    styles.moduleCard,
                    isCompleted && styles.moduleCardCompleted
                  ]}
                  onPress={() => startModule(module.id)}
                >
                  <View style={styles.moduleStep}>
                    <Text style={styles.moduleStepText}>Step {module.step}</Text>
                  </View>
                  <Text style={styles.moduleIcon}>{module.icon}</Text>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDescription}>{module.description}</Text>
                  <View style={[
                    styles.moduleStatus,
                    isCompleted && styles.moduleStatusCompleted
                  ]}>
                    <Text style={[
                      styles.moduleStatusText,
                      isCompleted && styles.moduleStatusTextCompleted
                    ]}>
                      {status}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.moduleProgress}>
            <Text style={styles.progressInfo}>
              {completedModules}/4 modules completed
            </Text>
            {allModulesCompleted && (
              <TouchableOpacity
                style={[globalStyles.button, globalStyles.buttonPrimary, styles.resultsButton]}
                onPress={showResults}
              >
                <Text style={[globalStyles.buttonText, globalStyles.buttonTextPrimary]}>
                  Step 7: View Results
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
  selectedTopicDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  topicIcon: {
    fontSize: 40,
    marginRight: spacing.md,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  topicDescription: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    lineHeight: typography.fontSizeBase * 1.4,
  },
  modulesGrid: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  moduleCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: 'center',
    position: 'relative',
  },
  moduleCardCompleted: {
    borderColor: colors.success,
    backgroundColor: `${colors.success}10`,
  },
  moduleStep: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
  },
  moduleStepText: {
    color: colors.surface,
    fontSize: typography.fontSizeXs,
    fontWeight: typography.fontWeightBold,
  },
  moduleIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  moduleTitle: {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  moduleDescription: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: typography.fontSizeBase * 1.4,
  },
  moduleStatus: {
    backgroundColor: colors.textSecondary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  moduleStatusCompleted: {
    backgroundColor: colors.success,
  },
  moduleStatusText: {
    color: colors.surface,
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightMedium,
  },
  moduleStatusTextCompleted: {
    color: colors.surface,
  },
  moduleProgress: {
    alignItems: 'center',
    gap: spacing.md,
  },
  progressInfo: {
    fontSize: typography.fontSizeLg,
    color: colors.text,
    fontWeight: typography.fontWeightMedium,
  },
  resultsButton: {
    width: '100%',
  },
});

export default ModuleSelectionScreen;