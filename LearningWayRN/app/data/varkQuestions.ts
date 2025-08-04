import { VarkQuestion } from '../types';

export const varkQuestions: VarkQuestion[] = [
  {
    id: 'q1',
    question: 'You are helping someone who wants to go to your airport, the center of town or railway station. You would:',
    options: [
      { id: 'a', text: 'Go with her', style: 'kinesthetic' },
      { id: 'b', text: 'Draw, or give her a map', style: 'visual' },
      { id: 'c', text: 'Tell her the directions', style: 'auditory' },
      { id: 'd', text: 'Write down the directions', style: 'reading' }
    ]
  },
  {
    id: 'q2',
    question: 'A website has a video showing how to make a special graph. There is a person speaking, some lists and words describing what to do and some diagrams. You would learn most from:',
    options: [
      { id: 'a', text: 'Seeing the diagrams', style: 'visual' },
      { id: 'b', text: 'Listening', style: 'auditory' },
      { id: 'c', text: 'Reading the words', style: 'reading' },
      { id: 'd', text: 'Watching the actions', style: 'kinesthetic' }
    ]
  },
  {
    id: 'q3',
    question: 'You want to learn a new program, skill or game on a computer. You would:',
    options: [
      { id: 'a', text: 'Read the written instructions', style: 'reading' },
      { id: 'b', text: 'Talk with people who know about the program', style: 'auditory' },
      { id: 'c', text: 'Use the controls or keyboard', style: 'kinesthetic' },
      { id: 'd', text: 'Follow the diagrams in the book', style: 'visual' }
    ]
  },
  {
    id: 'q4',
    question: 'Other than price, what would most influence your decision to buy a new non-fiction book?',
    options: [
      { id: 'a', text: 'The way it looks is appealing', style: 'visual' },
      { id: 'b', text: 'Quickly reading parts of it', style: 'reading' },
      { id: 'c', text: 'A friend talks about it and recommends it', style: 'auditory' },
      { id: 'd', text: 'It has real-life stories, experiences and examples', style: 'kinesthetic' }
    ]
  },
  {
    id: 'q5',
    question: 'You have finished a competition or test and would like some feedback. You would like to have feedback:',
    options: [
      { id: 'a', text: 'Using examples from what you have done', style: 'kinesthetic' },
      { id: 'b', text: 'Using a written description of your results', style: 'reading' },
      { id: 'c', text: 'From somebody who talks it through with you', style: 'auditory' },
      { id: 'd', text: 'Using graphs showing what you achieved', style: 'visual' }
    ]
  }
];