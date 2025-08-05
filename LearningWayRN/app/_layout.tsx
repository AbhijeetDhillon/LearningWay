import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AssessmentProvider } from './contexts/AssessmentContext';

export default function RootLayout() {
  return (
    <AssessmentProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="topic-selection" />
        <Stack.Screen name="vark-questionnaire" />
      </Stack>
      <StatusBar style="auto" />
    </AssessmentProvider>
  );
}
