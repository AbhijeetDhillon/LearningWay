import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAssessment } from '../contexts/AssessmentContext';
import { globalStyles } from '../styles/theme';

// Import all screen components
import WelcomeScreen from './screens/WelcomeScreen';
import TopicSelectionScreen from './screens/TopicSelectionScreen';
import VarkQuestionnaireScreen from './screens/VarkQuestionnaireScreen';
import ModuleSelectionScreen from './screens/ModuleSelectionScreen';
import LearningModuleScreen from './screens/LearningModuleScreen';
import RetentionTestScreen from './screens/RetentionTestScreen';
import ResultsScreen from './screens/ResultsScreen';
import LoadingScreen from './screens/LoadingScreen';
import SaveIndicator from './ui/SaveIndicator';

export type ScreenName = 
  | 'welcome'
  | 'topic-selection' 
  | 'vark-questionnaire'
  | 'module-selection'
  | 'learning-module'
  | 'retention-test'
  | 'results'
  | 'loading';

const LearningAssessmentApp: React.FC = () => {
  const { state } = useAssessment();
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [currentModule, setCurrentModule] = useState<string | null>(null);

  // Auto-recovery logic based on saved progress
  useEffect(() => {
    if (state.progress.completed) {
      setCurrentScreen('results');
    } else if (Object.keys(state.progress.moduleProgress).length > 0) {
      setCurrentScreen('module-selection');
    } else if (state.progress.varkCompleted) {
      setCurrentScreen('module-selection');
    } else if (state.progress.selectedTopic) {
      setCurrentScreen('vark-questionnaire');
    } else {
      setCurrentScreen('welcome');
    }
  }, [state.progress]);

  // Navigation functions that match the original HTML app
  const navigateToScreen = (screen: ScreenName, moduleId?: string) => {
    if (moduleId) {
      setCurrentModule(moduleId);
    }
    setCurrentScreen(screen);
  };

  const startAssessment = () => {
    navigateToScreen('topic-selection');
  };

  const selectTopic = (topicId: string) => {
    // This will be handled by the context
    setTimeout(() => {
      navigateToScreen('vark-questionnaire');
    }, 300);
  };

  const completeVark = () => {
    navigateToScreen('module-selection');
  };

  const startModule = (moduleId: string) => {
    navigateToScreen('learning-module', moduleId);
  };

  const startRetentionTest = () => {
    navigateToScreen('retention-test', currentModule || undefined);
  };

  const completeTest = () => {
    // Check if all modules are completed
    const completedModules = Object.values(state.progress.moduleProgress).filter(p => p.completed).length;
    if (completedModules >= 4) {
      navigateToScreen('loading');
      // Simulate analysis time
      setTimeout(() => {
        navigateToScreen('results');
      }, 2000);
    } else {
      navigateToScreen('module-selection');
    }
  };

  const showResults = () => {
    navigateToScreen('loading');
    // Simulate analysis time
    setTimeout(() => {
      navigateToScreen('results');
    }, 1500);
  };

  const backToModules = () => {
    navigateToScreen('module-selection');
  };

  const restartAssessment = () => {
    navigateToScreen('welcome');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen startAssessment={startAssessment} />;
      case 'topic-selection':
        return <TopicSelectionScreen selectTopic={selectTopic} />;
      case 'vark-questionnaire':
        return <VarkQuestionnaireScreen completeVark={completeVark} />;
      case 'module-selection':
        return <ModuleSelectionScreen startModule={startModule} showResults={showResults} />;
      case 'learning-module':
        return (
          <LearningModuleScreen 
            currentModule={currentModule} 
            startRetentionTest={startRetentionTest}
            backToModules={backToModules}
          />
        );
      case 'retention-test':
        return (
          <RetentionTestScreen 
            currentModule={currentModule} 
            completeTest={completeTest}
          />
        );
      case 'results':
        return <ResultsScreen restartAssessment={restartAssessment} />;
      case 'loading':
        return <LoadingScreen />;
      default:
        return <WelcomeScreen startAssessment={startAssessment} />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <SaveIndicator />
      {renderCurrentScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    ...globalStyles.container,
    position: 'relative',
  },
});

export default LearningAssessmentApp;