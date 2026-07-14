import { Module, QuizQuestion, LearningGoal } from './types';

export const modulesData: Module[] = [
  {
    id: 1,
    number: 1,
    title: 'Fake News & Disinformation',
    status: 'active',
    duration: '30–40 min',
    level: 'Beginner',
    rating: 4.8,
    reviews: 120,
    description: 'Learn how to identify fake news and misinformation on social media platforms like TikTok, Instagram and WhatsApp.'
  },
  {
    id: 2,
    number: 2,
    title: 'Spotting Misinformation',
    status: 'available',
    duration: '25–35 min',
    level: 'Beginner',
    rating: 4.7,
    reviews: 84,
    description: 'Deep dive into confirmation bias, visual manipulations, and deceptive framing tactics on modern digital media.'
  },
  {
    id: 3,
    number: 3,
    title: 'Fact-Checking Basics',
    status: 'available',
    duration: '40–50 min',
    level: 'Intermediate',
    rating: 4.9,
    reviews: 95,
    description: 'Master the tools of professional fact-checkers: reverse image search, domain lookup, and lateral reading.'
  },
  {
    id: 4,
    number: 4,
    title: 'Media Bias',
    status: 'available',
    duration: '30–35 min',
    level: 'Intermediate',
    rating: 4.6,
    reviews: 73,
    description: 'Understand the spectrum of media bias, editorial choices, and how to diversify your media diet.'
  },
  {
    id: 5,
    number: 5,
    title: 'Information Verification',
    status: 'available',
    duration: '45–55 min',
    level: 'Advanced',
    rating: 4.9,
    reviews: 112,
    description: 'Advanced validation protocols for digital citizens, dealing with deepfakes and AI-generated text.'
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'Is the following news real or fake? "Drinking warm lemon water cures cancer"',
    options: [
      { label: 'Real', value: 'Real' },
      { label: 'Fake', value: 'Fake' }
    ],
    correctAnswer: 'Fake',
    explanation: 'Correct! There is no scientific evidence that warm lemon water cures cancer. While lemon water is hydrating and contains vitamin C, promoting it as a cure for cancer is a common and dangerous form of health-related fake news.'
  },
  {
    id: 2,
    text: 'Is the following news real or fake? "NASA discovered a new planet that can support human life."',
    options: [
      { label: 'Real', value: 'Real' },
      { label: 'Fake', value: 'Fake' }
    ],
    correctAnswer: 'Real',
    explanation: "Correct! NASA's space telescopes (such as Kepler and TESS) have successfully discovered multiple Earth-sized exoplanets orbiting in the 'habitable zone' of their host stars (like Kepler-186f and TOI-700 d), where conditions might support liquid water and human life."
  },
  {
    id: 3,
    text: 'Is the following news real or fake? "Sharing your password with friends increases account security."',
    options: [
      { label: 'Real', value: 'Real' },
      { label: 'Fake', value: 'Fake' }
    ],
    correctAnswer: 'Fake',
    explanation: 'Correct! Sharing passwords significantly compromises your security by creating more access points and exposing sensitive personal data. Always keep credentials strictly confidential.'
  },
  {
    id: 4,
    text: 'Is the following news real or fake? "Checking multiple reliable sources helps verify information."',
    options: [
      { label: 'Real', value: 'Real' },
      { label: 'Fake', value: 'Fake' }
    ],
    correctAnswer: 'Real',
    explanation: 'Correct! Cross-referencing claims across multiple independent, high-quality sources (lateral reading) is the gold standard for validating online content and debunking misinformation.'
  }
];

export const learningGoals: LearningGoal[] = [
  {
    icon: 'Target',
    title: 'Identify Fake News',
    description: 'Recognize misleading, false, or fabricated information spread online.'
  },
  {
    icon: 'Shield',
    title: 'Verify Sources',
    description: 'Check credentials, domain authority, and overall credibility of websites.'
  },
  {
    icon: 'Brain',
    title: 'Think Critically',
    description: 'Analyze content, bias, and purpose carefully before believing or sharing.'
  }
];
