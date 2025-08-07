import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useAssessment } from '../../contexts/AssessmentContext';
import { globalStyles, colors, spacing, typography, borderRadius } from '../../styles/theme';

interface LearningModuleScreenProps {
  currentModule: string | null;
  startRetentionTest: () => void;
  backToModules: () => void;
}

const LearningModuleScreen: React.FC<LearningModuleScreenProps> = ({ 
  currentModule, 
  startRetentionTest, 
  backToModules 
}) => {
  const { state, dispatch } = useAssessment();
  const [studyTime, setStudyTime] = useState(0);

  useEffect(() => {
    if (!currentModule) return;

    // Mark module as started
    dispatch({ 
      type: 'START_MODULE_STUDY', 
      payload: { moduleId: currentModule } 
    });

    // Start timer
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentModule, dispatch]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getModuleInfo = () => {
    const moduleMap: Record<string, any> = {
      visual: {
        step: 3,
        title: 'Visual Learning',
        icon: '👁️'
      },
      auditory: {
        step: 4,
        title: 'Auditory Learning',
        icon: '👂'
      },
      reading: {
        step: 5,
        title: 'Reading/Writing',
        icon: '📖'
      },
      kinesthetic: {
        step: 6,
        title: 'Kinesthetic Learning',
        icon: '✋'
      }
    };

    return moduleMap[currentModule || ''] || {
      step: 0,
      title: 'Unknown Module',
      icon: '❓'
    };
  };

  const getTopicContent = () => {
    const topic = state.progress.selectedTopic;
    
    if (!topic || !currentModule) {
      return {
        title: 'Content Not Available',
        content: 'Please select a topic and module first.'
      };
    }

    // This would normally be loaded from a data file or API
    const contentMap: Record<string, Record<string, any>> = {
      marine_bioluminescence: {
        visual: {
          title: 'Visual: Marine Bioluminescence',
          content: `
🌊 **Interactive Visual Learning Module**

**What is Bioluminescence?**
Bioluminescence is the production and emission of light by living organisms. In marine environments, this creates spectacular underwater light shows.

**Key Visual Concepts:**
• Light production through chemical reactions
• Luciferin + Luciferase = Light + Energy
• Different organisms produce different colors
• Blue-green light travels furthest underwater

**Common Bioluminescent Marine Life:**
🐠 Anglerfish - Deep sea predator with glowing lure
🪼 Crystal Jellies - Transparent with glowing edges  
🦐 Ostracod Crustaceans - Create "blue tears" effect
🐟 Flashlight Fish - Have light organs under eyes

**Why Do They Glow?**
• Communication and mating signals
• Predator deterrence (startle response)
• Prey attraction and hunting
• Camouflage (counter-illumination)

**The Chemistry:**
The basic reaction involves:
Luciferin (substrate) + Luciferase (enzyme) + Oxygen → Light + Oxyluciferin + Water

Take time to visualize these concepts as you study.`
        },
        auditory: {
          title: 'Auditory: Marine Bioluminescence',
          content: `
🔊 **Audio Learning Module**

Listen carefully as we explore the fascinating world of bioluminescent marine life.

**Introduction to Marine Light Production**
[Audio would play here explaining the basic concepts]

**Key Points to Remember:**
• Bioluminescence is living light
• Chemical reaction creates photons
• Most common in deep ocean environments
• Serves multiple biological purposes

**Ocean Depth and Light:**
The deeper you go in the ocean, the darker it becomes. At depths below 200 meters, sunlight cannot penetrate. This is where bioluminescence becomes crucial for survival.

**Species Examples:**
Listen to descriptions of various bioluminescent creatures:
- Anglerfish use their glowing lure to attract prey
- Jellyfish pulse with rhythmic light patterns
- Bacteria create glowing waves on beaches
- Deep-sea squid communicate with light signals

**The Chemical Process:**
The fundamental reaction can be remembered as:
"Luciferin plus Luciferase equals Light"

Focus on listening and retaining these audio explanations.`
        },
        reading: {
          title: 'Reading/Writing: Marine Bioluminescence',
          content: `
📖 **Text-Based Learning Module**

**Chapter 1: Introduction to Bioluminescence**

Bioluminescence represents one of nature's most remarkable phenomena. The term derives from the Greek word "bios" (living) and the Latin "lumen" (light). This biological process allows organisms to produce their own light through chemical reactions.

**Scientific Background:**
The discovery of bioluminescence dates back to ancient times, but scientific understanding began with studies of fireflies in the 17th century. Marine bioluminescence was first systematically studied by Charles Darwin during his voyage on the HMS Beagle.

**Chemical Mechanism:**
The universal reaction involves:
- Substrate: Luciferin
- Enzyme: Luciferase  
- Cofactor: Oxygen
- Products: Light, Oxyluciferin, Water

**Marine Environment Advantages:**
1. **Darkness**: 90% of ocean is in perpetual darkness
2. **Pressure**: High pressure enhances light production
3. **Temperature**: Cold water preserves light-producing proteins
4. **Density**: Water efficiently transmits blue-green light

**Evolutionary Functions:**
- **Predation**: Attracting prey with false signals
- **Defense**: Startling predators with sudden flashes
- **Communication**: Species recognition and mating
- **Camouflage**: Matching ambient light from above

Read carefully and take notes on key concepts.`
        },
        kinesthetic: {
          title: 'Kinesthetic: Marine Bioluminescence',
          content: `
✋ **Interactive Learning Module**

**Hands-On Learning Experience**

**Activity 1: Chemical Reaction Simulation**
Imagine you are mixing the bioluminescence reaction:
1. Hold out your left hand (Luciferin)
2. Hold out your right hand (Luciferase)
3. Clap them together (add Oxygen)
4. Open your palms to reveal "light"

**Activity 2: Depth Pressure Simulation**
1. Stand up and stretch your arms wide (surface level)
2. Slowly lower your arms while bending down (descending)
3. At the bottom, cup your hands (deep ocean pressure)
4. Feel how the "pressure" affects light production

**Activity 3: Predator-Prey Movement**
Practice the hunting strategies:
• **Anglerfish**: Slow, deliberate movements with lure
• **Jellyfish**: Pulsing, rhythmic motions
• **Squid**: Quick, darting movements with flashing

**Activity 4: Light Pattern Creation**
Use your fingers to trace these patterns in the air:
- Steady glow (communication)
- Quick flashes (alarm)
- Pulsing rhythm (mating)
- Burst pattern (defense)

**Memory Palace Technique:**
Create a mental map of the ocean:
1. Surface = Sunlight zone
2. Middle = Twilight zone  
3. Deep = Midnight zone (bioluminescence hub)
4. Bottom = Abyssal zone

Move through each level physically and mentally.

Engage your body while learning these concepts.`
        }
      },
      // Add similar content for other topics...
    };

    return contentMap[topic]?.[currentModule] || {
      title: 'Content Coming Soon',
      content: 'This module content is being developed.'
    };
  };

  const moduleInfo = getModuleInfo();
  const content = getTopicContent();

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.screenContainer}>
        <View style={globalStyles.contentWrapper}>
          <View style={styles.moduleHeader}>
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.buttonOutline, styles.backButton]}
              onPress={backToModules}
            >
              <Text style={[globalStyles.buttonText, globalStyles.buttonTextOutline]}>
                ← Back to Modules
              </Text>
            </TouchableOpacity>

            <View style={styles.moduleTitleContainer}>
              <View style={globalStyles.stepIndicator}>
                <Text style={globalStyles.stepIndicatorText}>
                  Step {moduleInfo.step} of 7
                </Text>
              </View>
              <Text style={[globalStyles.heading2, styles.moduleTitle]}>
                {moduleInfo.icon} {moduleInfo.title}
              </Text>
            </View>

            <View style={styles.moduleTimer}>
              <Text style={styles.timerText}>
                Study Time: {formatTime(studyTime)}
              </Text>
            </View>
          </View>

          <View style={styles.moduleBody}>
            <Text style={[globalStyles.heading3, styles.contentTitle]}>
              {content.title}
            </Text>
            <Text style={[globalStyles.bodyText, styles.contentText]}>
              {content.content}
            </Text>
          </View>

          <View style={styles.moduleFooter}>
            <TouchableOpacity
              style={[globalStyles.button, globalStyles.buttonPrimary, styles.testButton]}
              onPress={startRetentionTest}
            >
              <Text style={[globalStyles.buttonText, globalStyles.buttonTextPrimary]}>
                Take Retention Test
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  moduleHeader: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  moduleTitleContainer: {
    alignItems: 'center',
  },
  moduleTitle: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  moduleTimer: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.base,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  timerText: {
    fontSize: typography.fontSizeBase,
    color: colors.textSecondary,
    fontWeight: typography.fontWeightMedium,
  },
  moduleBody: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  contentTitle: {
    marginBottom: spacing.lg,
    color: colors.primary,
  },
  contentText: {
    lineHeight: typography.fontSizeBase * 1.6,
    fontSize: typography.fontSizeBase,
  },
  moduleFooter: {
    paddingTop: spacing.lg,
  },
  testButton: {
    width: '100%',
  },
});

export default LearningModuleScreen;