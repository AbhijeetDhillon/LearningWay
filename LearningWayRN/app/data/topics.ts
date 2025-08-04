import { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'marine_bioluminescence',
    name: 'Marine Bioluminescence',
    description: 'The science behind light-producing organisms in the ocean',
    icon: '🌊',
    content: {
      visual: {
        id: 'visual_marine',
        title: 'Visual Learning: Marine Bioluminescence',
        content: `
        <h3>Understanding Marine Bioluminescence Through Visuals</h3>
        <p>Marine bioluminescence is the production and emission of light by living organisms in the ocean. This fascinating phenomenon occurs when chemical reactions produce light energy.</p>
        
        <h4>Key Visual Elements:</h4>
        <div class="visual-grid">
          <div class="visual-item">
            <div class="icon">🦑</div>
            <h5>Deep Sea Creatures</h5>
            <p>90% of deep-sea creatures produce light</p>
          </div>
          <div class="visual-item">
            <div class="icon">⚡</div>
            <h5>Chemical Reaction</h5>
            <p>Luciferin + Luciferase = Light</p>
          </div>
          <div class="visual-item">
            <div class="icon">🎯</div>
            <h5>Functions</h5>
            <p>Communication, hunting, defense</p>
          </div>
        </div>
        
        <h4>Ocean Depth Zones:</h4>
        <p>Different depths show different bioluminescent patterns:</p>
        <ul>
          <li><strong>Twilight Zone (200-1000m):</strong> Counter-illumination camouflage</li>
          <li><strong>Midnight Zone (1000-4000m):</strong> Lure predators and prey</li>
          <li><strong>Abyssal Zone (4000m+):</strong> Rare but spectacular displays</li>
        </ul>
        `,
        interactiveElements: [
          {
            type: 'button-click',
            id: 'depth_explorer',
            data: {
              buttons: ['Twilight Zone', 'Midnight Zone', 'Abyssal Zone'],
              responses: [
                'Counter-illumination helps creatures blend with dim light above',
                'Most bioluminescent activity occurs here - like underwater fireworks!',
                'Rare but amazing - some of the most unique light displays in nature'
              ]
            }
          }
        ],
        testQuestions: [
          {
            id: 'q1',
            question: 'What percentage of deep-sea creatures produce bioluminescent light?',
            options: ['50%', '70%', '90%', '100%'],
            correctAnswer: 2,
            type: 'multiple-choice'
          },
          {
            id: 'q2',
            question: 'Which zone has the most bioluminescent activity?',
            options: ['Twilight Zone', 'Midnight Zone', 'Abyssal Zone', 'Surface Zone'],
            correctAnswer: 1,
            type: 'multiple-choice'
          },
          {
            id: 'q3',
            question: 'What is the main chemical involved in bioluminescence?',
            options: ['Chlorophyll', 'Luciferin', 'Melanin', 'Keratin'],
            correctAnswer: 1,
            type: 'multiple-choice'
          }
        ]
      },
      auditory: {
        id: 'auditory_marine',
        title: 'Auditory Learning: Marine Bioluminescence',
        content: `
        <h3>Listen and Learn About Marine Bioluminescence</h3>
        <p>Experience the wonders of bioluminescence through audio narration and sounds from the deep ocean.</p>
        
        <div class="audio-section">
          <h4>Ocean Depths Audio Journey</h4>
          <p>Close your eyes and imagine descending into the dark depths of the ocean...</p>
        </div>
        
        <h4>Key Learning Points:</h4>
        <ul>
          <li>Bioluminescence is nature's own LED technology</li>
          <li>Chemical reaction creates cold light with 100% efficiency</li>
          <li>Used for communication in the dark ocean depths</li>
          <li>Helps with hunting, mating, and defense mechanisms</li>
        </ul>
        
        <h4>Amazing Facts:</h4>
        <p>Did you know that some jellyfish can live for thousands of years and continue producing light throughout their entire lifespan? The deep ocean is like a living constellation!</p>
        `,
        audioUrl: 'https://example.com/marine-bioluminescence-audio.mp3',
        transcript: 'Welcome to the mysterious world of marine bioluminescence. As we descend into the ocean depths, imagine the darkness gradually surrounding you. At 200 meters deep, you enter the twilight zone where the first hints of biological light begin to appear...',
        testQuestions: [
          {
            id: 'q1',
            question: 'What is the efficiency of bioluminescent light production?',
            options: ['50%', '75%', '90%', '100%'],
            correctAnswer: 3,
            type: 'multiple-choice'
          },
          {
            id: 'q2',
            question: 'What is the deep ocean compared to in the audio?',
            options: ['A light show', 'A living constellation', 'A disco', 'A firework display'],
            correctAnswer: 1,
            type: 'multiple-choice'
          },
          {
            id: 'q3',
            question: 'At what depth does the twilight zone begin?',
            options: ['100m', '200m', '300m', '500m'],
            correctAnswer: 1,
            type: 'multiple-choice'
          }
        ]
      },
      reading: {
        id: 'reading_marine',
        title: 'Reading/Writing: Marine Bioluminescence',
        content: `
        <h3>Marine Bioluminescence: A Comprehensive Study</h3>
        
        <h4>Introduction</h4>
        <p>Bioluminescence is the biochemical emission of light by living organisms. In marine environments, this phenomenon is remarkably widespread, with an estimated 90% of deep-sea creatures possessing the ability to produce light through chemical reactions.</p>
        
        <h4>The Science Behind the Light</h4>
        <p>The basic mechanism involves the oxidation of a light-emitting compound called luciferin, catalyzed by the enzyme luciferase. This reaction produces light with remarkable efficiency—nearly 100% of the energy is converted to light with minimal heat production, far exceeding human-made lighting technologies.</p>
        
        <h4>Ecological Functions</h4>
        <p><strong>Communication:</strong> Many species use specific light patterns to communicate with potential mates or identify members of their own species.</p>
        
        <p><strong>Predation:</strong> Some organisms use bioluminescence as a lure to attract prey, while others use it to startle or confuse predators.</p>
        
        <p><strong>Camouflage:</strong> Counter-illumination involves producing light on the underside of the body to match the dim light filtering down from above, making the organism invisible to predators below.</p>
        
        <h4>Distribution by Ocean Zones</h4>
        <p><strong>Epipelagic Zone (0-200m):</strong> Limited bioluminescence due to abundant sunlight.</p>
        <p><strong>Mesopelagic Zone (200-1000m):</strong> Counter-illumination is common among fish and squid.</p>
        <p><strong>Bathypelagic Zone (1000-4000m):</strong> Peak bioluminescent activity with diverse light displays.</p>
        <p><strong>Abyssopelagic Zone (4000m+):</strong> Rare but highly specialized bioluminescent adaptations.</p>
        
        <h4>Notable Examples</h4>
        <p><strong>Atolla Jellyfish:</strong> Creates a "burglar alarm" - a spinning ring of light to attract larger predators that might eat its attacker.</p>
        <p><strong>Anglerfish:</strong> Uses a bioluminescent lure to attract prey in the dark depths.</p>
        <p><strong>Vampire Squid:</strong> Can produce light clouds to confuse predators while escaping.</p>
        `,
        interactiveElements: [
          {
            type: 'note-taking',
            id: 'marine_notes',
            data: {
              prompt: 'Take notes on the key functions of bioluminescence and provide examples for each:'
            }
          }
        ],
        testQuestions: [
          {
            id: 'q1',
            question: 'What is the enzyme that catalyzes the bioluminescent reaction?',
            options: ['Luciferin', 'Luciferase', 'Luminase', 'Biolucin'],
            correctAnswer: 1,
            type: 'multiple-choice'
          },
          {
            id: 'q2',
            question: 'Which zone has peak bioluminescent activity?',
            options: ['Epipelagic', 'Mesopelagic', 'Bathypelagic', 'Abyssopelagic'],
            correctAnswer: 2,
            type: 'multiple-choice'
          },
          {
            id: 'q3',
            question: 'What is the Atolla Jellyfish\'s "burglar alarm"?',
            options: ['A loud sound', 'A spinning ring of light', 'Chemical release', 'Rapid movement'],
            correctAnswer: 1,
            type: 'multiple-choice'
          }
        ]
      },
      kinesthetic: {
        id: 'kinesthetic_marine',
        title: 'Kinesthetic Learning: Marine Bioluminescence',
        content: `
        <h3>Interactive Marine Bioluminescence Experience</h3>
        <p>Learn about marine bioluminescence through hands-on activities and interactive elements. Drag and drop organisms to their correct ocean zones!</p>
        
        <h4>Ocean Ecosystem Zones</h4>
        <p>Help marine biologists organize these bioluminescent creatures into their correct ocean zones. Each zone has different light-producing organisms adapted to their specific environment.</p>
        
        <h4>Key Concepts to Explore:</h4>
        <ul>
          <li><strong>Depth Adaptation:</strong> Different creatures live at different depths</li>
          <li><strong>Light Functions:</strong> Each organism uses light for specific purposes</li>
          <li><strong>Ecosystem Balance:</strong> How bioluminescence affects the marine food chain</li>
        </ul>
        
        <p><strong>Instructions:</strong> Drag each organism from the collection area to its correct ocean zone. Pay attention to the depth ranges and the special adaptations of each creature!</p>
        `,
        interactiveElements: [
          {
            type: 'drag-drop',
            id: 'ocean_zones',
            data: {
              items: [
                { id: 'anglerfish', name: 'Anglerfish', zone: 'bathypelagic' },
                { id: 'jellyfish', name: 'Atolla Jellyfish', zone: 'bathypelagic' },
                { id: 'lanternfish', name: 'Lanternfish', zone: 'mesopelagic' },
                { id: 'vampire_squid', name: 'Vampire Squid', zone: 'bathypelagic' },
                { id: 'crystal_jelly', name: 'Crystal Jelly', zone: 'mesopelagic' },
                { id: 'hatchetfish', name: 'Hatchetfish', zone: 'mesopelagic' }
              ],
              zones: [
                { 
                  id: 'mesopelagic', 
                  name: 'Twilight Zone (200-1000m)', 
                  description: 'Counter-illumination camouflage zone' 
                },
                { 
                  id: 'bathypelagic', 
                  name: 'Midnight Zone (1000-4000m)', 
                  description: 'Peak bioluminescent activity zone' 
                },
                { 
                  id: 'abyssopelagic', 
                  name: 'Abyssal Zone (4000m+)', 
                  description: 'Rare but spectacular displays' 
                }
              ]
            }
          }
        ],
        testQuestions: [
          {
            id: 'q1',
            question: 'In which zone would you find the most counter-illumination?',
            options: ['Twilight Zone', 'Midnight Zone', 'Abyssal Zone', 'Surface Zone'],
            correctAnswer: 0,
            type: 'multiple-choice'
          },
          {
            id: 'q2',
            question: 'Which creature uses a lure to attract prey?',
            options: ['Crystal Jelly', 'Hatchetfish', 'Anglerfish', 'Lanternfish'],
            correctAnswer: 2,
            type: 'multiple-choice'
          },
          {
            id: 'q3',
            question: 'What zone has the most bioluminescent activity?',
            options: ['Twilight Zone', 'Midnight Zone', 'Abyssal Zone', 'All zones equally'],
            correctAnswer: 1,
            type: 'multiple-choice'
          }
        ]
      }
    }
  }
];