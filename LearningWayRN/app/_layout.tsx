import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { AssessmentProvider } from './contexts/AssessmentContext';
import WelcomeScreen from './screens/WelcomeScreen';
import TopicSelectionScreen from './screens/TopicSelectionScreen';
import VarkQuestionnaireScreen from './screens/VarkQuestionnaireScreen';

export type RootStackParamList = {
  Welcome: undefined;
  TopicSelection: undefined;
  VarkQuestionnaire: undefined;
  ModuleSelection: undefined;
  LearningModule: { moduleId: string };
  RetentionTest: { moduleId: string };
  Results: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <AssessmentProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="TopicSelection" component={TopicSelectionScreen} />
          <Stack.Screen name="VarkQuestionnaire" component={VarkQuestionnaireScreen} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AssessmentProvider>
  );
}
