import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { globalStyles, spacing } from './styles/theme';

const VarkQuestionnaireScreen: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={globalStyles.stepIndicator}>
            <Text style={globalStyles.stepIndicatorText}>
              <Text style={globalStyles.stepCurrentText}>Step 2 of 7:</Text> Learning Preferences Survey
            </Text>
          </View>

          <Text style={[globalStyles.heading2, globalStyles.textCenter, globalStyles.marginBottomMd]}>
            VARK Questionnaire
          </Text>

          <Text style={[globalStyles.bodyText, globalStyles.textCenter, globalStyles.marginBottomXl]}>
            This screen is under development. The VARK questionnaire will be implemented here.
          </Text>

          <TouchableOpacity
            style={[globalStyles.button, globalStyles.buttonPrimary, { marginTop: spacing.xl }]}
            onPress={() => router.push('/')}
          >
            <Text style={[globalStyles.buttonText, globalStyles.buttonTextPrimary]}>
              Back to Welcome
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VarkQuestionnaireScreen;