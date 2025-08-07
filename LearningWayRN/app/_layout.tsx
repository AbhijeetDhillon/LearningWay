import { StatusBar } from 'expo-status-bar';
import { AssessmentProvider } from './contexts/AssessmentContext';
import LearningAssessmentApp from './components/LearningAssessmentApp';

export default function RootLayout() {
  return (
    <AssessmentProvider>
      <LearningAssessmentApp />
      <StatusBar style="auto" />
    </AssessmentProvider>
  );
}
