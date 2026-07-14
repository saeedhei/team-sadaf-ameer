import React from 'react';
import { 
  Newspaper, 
  Share2, 
  Smartphone, 
  ShieldCheck, 
  Globe, 
  Target, 
  Shield, 
  Brain,
  Video,
  FileText,
  Search,
  Eye,
  Scale,
  Cpu
} from 'lucide-react';

export interface Goal {
  icon: 'Target' | 'Shield' | 'Brain';
  title: string;
  description: string;
}

export interface AccordionSection {
  id: string;
  title: string;
  iconName: 'Newspaper' | 'Share2' | 'Smartphone' | 'ShieldCheck' | 'Search' | 'Eye' | 'Scale' | 'Cpu' | 'Globe' | 'Brain';
  badge: string;
  badgeColor: string;
  content: string | React.ReactNode;
}

export interface SubtitleSnippet {
  time: number;
  text: string;
}

export interface QuizCase {
  id: number;
  platform: 'WhatsApp' | 'TikTok' | 'Instagram';
  sender: string;
  avatar: string;
  timestamp: string;
  headline: string;
  postContent: string;
  isReal: boolean;
  question: string;
  explanation: string;
  options: { label: string; value: boolean }[];
}

export interface ModuleContent {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  learningGoals: Goal[];
  sections: AccordionSection[];
  videoTitle: string;
  videoDuration: number;
  videoSubtitles: SubtitleSnippet[];
  exerciseCases: QuizCase[];
}

export const moduleContents: { [key: number]: ModuleContent } = {
  1: {
    id: 1,
    title: 'Understanding Fake News & Disinformation',
    subtitle: 'Develop a strong awareness of facts and learn how to safely expose online lies.',
    imageUrl: '/src/assets/images/digital_literacy_hero_1783786126828.jpg',
    learningGoals: [
      {
        icon: 'Target',
        title: 'Spot Fake News',
        description: 'Learn the exact difference between deliberate disinformation and accidental misinformation.'
      },
      {
        icon: 'Shield',
        title: 'Verify Sources',
        description: 'Analyze website domains, author profiles, and the credibility of news portals.'
      },
      {
        icon: 'Brain',
        title: 'Sharpen Critical Thinking',
        description: 'Question sensational headlines and emotional claims before sharing them unchecked.'
      }
    ],
    sections: [
      {
        id: 'what-is-news',
        title: 'A) What is Fake News?',
        iconName: 'Newspaper',
        badge: 'Definition',
        badgeColor: 'bg-blue-50 text-blue-600 border border-blue-100/60',
        content: 'Fake News refers to intentionally false or misleading information presented as trustworthy news. It is generally divided into two types:\n\n1. Disinformation: Deliberate, conscious lies spread to manipulate people.\n2. Misinformation: Unintentionally shared false reports without harmful intent.'
      },
      {
        id: 'why-spread',
        title: 'B) Why Does Misinformation Spread?',
        iconName: 'Share2',
        badge: 'Algorithms',
        badgeColor: 'bg-amber-50 text-amber-700 border border-amber-100/60',
        content: 'Social networks reward high engagement. Sensational or emotional content (like fear or outrage) gets many clicks in seconds. Algorithms then recommend these posts to millions of other users, while sober facts are often drowned out.'
      },
      {
        id: 'examples-news',
        title: 'C) Everyday Examples on Social Media',
        iconName: 'Smartphone',
        badge: 'Case Studies',
        badgeColor: 'bg-rose-50 text-rose-700 border border-rose-100/60',
        content: '• TikTok: Manipulated videos of politicians edited to make them look drunk.\n• Instagram: Screenshots of fake news sites with fabricated quotes.\n• WhatsApp: Chain letters sharing supposed miracle cures for serious illnesses.'
      },
      {
        id: 'reliable-sources',
        title: 'D) Reliable vs. Unreliable Sources',
        iconName: 'ShieldCheck',
        badge: 'Verification',
        badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100/60',
        content: 'Reliable sources have a clear "About" page, list authors, link to primary sources (like peer-reviewed studies or raw data), and use an objective tone. Unreliable pages use sensational clickbait, hide their publishers, and provide no verifiably linked evidence.'
      }
    ],
    videoTitle: 'What is Fake News & how do you spot disinformation?',
    videoDuration: 275,
    videoSubtitles: [
      { time: 0, text: "Welcome back. Today we are demystifying the concept of 'Fake News'." },
      { time: 5, text: "Propaganda has always existed, but social media has dramatically accelerated its reach." },
      { time: 12, text: "Through TikTok, Instagram, & WhatsApp, rumors spread 6 times faster than facts." },
      { time: 22, text: "Misinformation is often an honest mistake, whereas disinformation is pure intent to deceive." },
      { time: 35, text: "Learn how algorithms tend to favor sensational headlines to keep you engaged." },
      { time: 50, text: "Always ask yourself: Who wrote this? What is their goal? Where is the evidence?" },
      { time: 70, text: "Check out the next section to evaluate real case examples from your social feeds." }
    ],
    exerciseCases: [
      {
        id: 1,
        platform: 'WhatsApp',
        sender: 'Aunt Helga (Forwarded)',
        avatar: '👩‍🦳',
        timestamp: 'Today, 08:34',
        headline: '⚠️ CRITICAL WARNING FOR ALL FAMILIES!',
        postContent: 'Drink a glass of warm lemon water every single morning! Scientists in Sweden have discovered that the acidity completely destroys cancer cells in the body within 24 hours! Please forward to all your contacts! 🍋🍋🍋',
        isReal: false,
        question: 'Is this message Real or Fake?',
        explanation: 'This is a FAKE! There is absolutely no scientific evidence that warm lemon water can cure cancer. Such claims play on people\'s fears and hopes, spreading rapidly via viral chain messages.',
        options: [
          { label: 'Real (It sounds healthy and natural)', value: true },
          { label: 'Fake (No reputable sources, typical viral chain letter language)', value: false }
        ]
      },
      {
        id: 2,
        platform: 'TikTok',
        sender: 'ScienceSpace',
        avatar: '🚀',
        timestamp: '2 hours ago',
        headline: 'Earth 2.0 Discovered? 🪐',
        postContent: 'NASA has discovered an Earth-sized planet in the habitable zone using the advanced James Webb Space Telescope. Located approximately 100 light-years away, conditions suggest liquid water could exist on its surface.',
        isReal: true,
        question: 'Is this message Real or Fake?',
        explanation: 'This is REAL! NASA scientists have indeed discovered multiple Earth-sized exoplanets in the habitable zone of their parent stars (such as TOI-700 d and Kepler-186f) where liquid water could potentially exist.',
        options: [
          { label: 'Real (Supported by scientific publications and NASA)', value: true },
          { label: 'Fake (Sounds too fantastic to be true)', value: false }
        ]
      },
      {
        id: 3,
        platform: 'Instagram',
        sender: 'AcuityDaily',
        avatar: '📰',
        timestamp: 'Yesterday',
        headline: 'Artificial Intelligence Learns to Read Thoughts! 🧠',
        postContent: 'A team of US researchers has developed an fMRI decoder that scans brain activity and translates thoughts into text with surprising accuracy. Early trials show astonishing results.',
        isReal: true,
        question: 'Is this message Real or Fake?',
        explanation: 'This is REAL! Researchers at the University of Texas at Austin have indeed developed an AI-powered semantic decoder that can reconstruct language thoughts from fMRI brain scans with remarkable accuracy.',
        options: [
          { label: 'Real (A major neurotechnology breakthrough is happening)', value: true },
          { label: 'Fake (Mind reading is technically impossible)', value: false }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: 'Spotting Image Manipulation & Framing',
    subtitle: 'Learn how photos are retouched and how biased headlines manipulate our perception.',
    imageUrl: '/src/assets/images/spotting_misinfo_1783854776840.jpg',
    learningGoals: [
      {
        icon: 'Target',
        title: 'Understand Confirmation Bias',
        description: 'Learn how we subconsciously believe lies simply because they align with our personal beliefs.'
      },
      {
        icon: 'Shield',
        title: 'Detect Photo Manipulation',
        description: 'Identify edited images, deceptive croppings, or old photos shared out of context.'
      },
      {
        icon: 'Brain',
        title: 'Deconstruct Sensational Framing',
        description: 'Recognize linguistic manipulation through highly emotional adjectives and suggestive structures.'
      }
    ],
    sections: [
      {
        id: 'confirmation-bias',
        title: 'A) What is Confirmation Bias?',
        iconName: 'Brain',
        badge: 'Psychology',
        badgeColor: 'bg-indigo-50 text-indigo-600 border border-indigo-100/60',
        content: 'Confirmation Bias describes our tendency to search for, interpret, and recall information in a way that confirms our preexisting beliefs or hypotheses. This makes us highly vulnerable to fake news that caters to our worldview.'
      },
      {
        id: 'photo-manipulation',
        title: 'B) Visual Manipulations on the Web',
        iconName: 'Eye',
        badge: 'Technology',
        badgeColor: 'bg-rose-50 text-rose-600 border border-rose-100/60',
        content: 'Photos do lie! Nowadays, manipulating photos is child\'s play. Deceptive practices range from simple filters and photo editing, to extremely tight cropping (to remove vital context), and sharing authentic older photos as if they were current events.'
      },
      {
        id: 'clickbait-framing',
        title: 'C) Sensational Headlines & Framing',
        iconName: 'Newspaper',
        badge: 'Media',
        badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100/60',
        content: 'Framing is the way information is presented to influence how we process it. By choosing highly emotional words, creators guide your reaction. For example, using "horde of migrants" instead of "asylum seekers" instantly invokes threat and panic.'
      },
      {
        id: 'debunk-framing',
        title: 'D) Defenses Against Manipulative Frames',
        iconName: 'ShieldCheck',
        badge: 'Practice',
        badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100/60',
        content: 'Read articles with a cool, logical mind. Mentally swap emotional buzzwords for neutral terms. Search for reports from other reputable outlets to see if the event is described more objectively elsewhere.'
      }
    ],
    videoTitle: 'How Images and Headlines Are Crafted to Manipulate You',
    videoDuration: 240,
    videoSubtitles: [
      { time: 0, text: "A picture is worth a thousand words, but it can also deceive us completely." },
      { time: 6, text: "By intentionally cropping photos, the entire meaning can be reversed." },
      { time: 14, text: "Headlines use emotional trigger words to generate clicks and revenue." },
      { time: 24, text: "We are prone to believing fakes if they align with our preexisting worldview." },
      { time: 35, text: "Keep an eye out for altered color saturation or inconsistent shadows in photos." },
      { time: 48, text: "Try to mentally translate sensational headlines into raw, neutral facts." },
      { time: 65, text: "Continue to the interactive exercise to put your critical eye to the test!" }
    ],
    exerciseCases: [
      {
        id: 1,
        platform: 'TikTok',
        sender: 'PolitixRadar',
        avatar: '🗣️',
        timestamp: 'Yesterday',
        headline: '⚠️ SCANDAL IN PARLIAMENT!',
        postContent: 'The Foreign Minister was completely drunk during yesterday\'s speech! He is slurring his words and can barely stand straight. Here is the video proof!',
        isReal: false,
        question: 'Is this video Real or Fake?',
        explanation: 'This is a FAKE! The original video was slowed down to 0.75x speed to make the minister appear drunk and slurred. This is a common video manipulation tactic known as a "slow-down fake."',
        options: [
          { label: 'Real (You can see it very clearly in the video)', value: true },
          { label: 'Fake (Slowed-down video to discredit and mock the person)', value: false }
        ]
      },
      {
        id: 2,
        platform: 'Instagram',
        sender: 'GlobalGreenNews',
        avatar: '🌍',
        timestamp: '3 hours ago',
        headline: '🔥 ALARMING WILDFIRES!',
        postContent: 'Massive wildfires are currently raging right outside the capital gates! The sky is colored deep blood red. The environmental catastrophe is here!',
        isReal: false,
        question: 'Is this post Real or Fake?',
        explanation: 'This is a FAKE! The shared photo actually shows a forest fire in California from the year 2018. It has been shared out of context under a false current location to spark outrage and gain clicks.',
        options: [
          { label: 'Real (The image source looks incredibly dramatic)', value: true },
          { label: 'Fake (False context; the photo is old and from another country)', value: false }
        ]
      },
      {
        id: 3,
        platform: 'WhatsApp',
        sender: 'Uwe (Colleague)',
        avatar: '👨‍🔧',
        timestamp: 'Today, 11:15',
        headline: '+++ Breaking Shocking News +++',
        postContent: 'The government is secretly planning a luxury tax on breathing fresh air in metropolitan cities starting in 2027! A whistleblower leaked the confidential drafts. Unbelievable!',
        isReal: false,
        question: 'Is this message Real or Fake?',
        explanation: 'This is a FAKE! The story originated on a well-known satire website. Someone took the satire literally and forwarded it as a real rumor on WhatsApp.',
        options: [
          { label: 'Real (I wouldn\'t put anything past politicians)', value: true },
          { label: 'Fake (Originated as satire that was mistaken for genuine fact)', value: false }
        ]
      }
    ]
  },
  3: {
    id: 3,
    title: 'Fact-Checking Fundamentals',
    subtitle: 'Master the professional techniques of fact-checkers: reverse search, domain lookup, and lateral reading.',
    imageUrl: '/src/assets/images/fact_checking_1783854796169.jpg',
    learningGoals: [
      {
        icon: 'Target',
        title: 'Master Reverse Image Search',
        description: 'Learn how to use Google Lens or TinEye to find the original source of any uploaded photo.'
      },
      {
        icon: 'Shield',
        title: 'Verify Website Ownership',
        description: 'Check "About Us" sections and registration data to spot anonymous fake-news portals.'
      },
      {
        icon: 'Brain',
        title: 'Adopt Lateral Reading',
        description: 'Develop the habit of leaving a suspicious site immediately to verify claims across multiple tabs.'
      }
    ],
    sections: [
      {
        id: 'reverse-image',
        title: 'A) Reverse Image Search',
        iconName: 'Search',
        badge: 'Practical Tool',
        badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100/60',
        content: 'If you want to know if a photo is authentic, upload it to Google Images, TinEye, or Yandex. The search engine will show you all other websites that have ever published that photo. This easily exposes recycled images.'
      },
      {
        id: 'impressum-check',
        title: 'B) The Ownership & Domain Check',
        iconName: 'ShieldCheck',
        badge: 'Media Law',
        badgeColor: 'bg-blue-50 text-blue-600 border border-blue-100/60',
        content: 'Every legitimate news site has a transparent, verifiable "About Us" section with contacts and a physical address. If contact information is entirely missing, or registered to obscure offshore PO boxes, exercise caution. Watch for suspicious domains like .news-blog.ru.'
      },
      {
        id: 'lateral-reading',
        title: 'C) What is Lateral Reading?',
        iconName: 'Globe',
        badge: 'Methodology',
        badgeColor: 'bg-purple-50 text-purple-600 border border-purple-100/60',
        content: 'Professional fact-checkers don\'t read vertically (scrolling down a single web page). They read laterally: opening multiple browser tabs to research what independent, reliable sources say about that author, that website, and the specific claim.'
      },
      {
        id: 'factcheck-orgs',
        title: 'D) Professional Fact-Checking Outlets',
        iconName: 'Newspaper',
        badge: 'Resources',
        badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100/60',
        content: 'Leverage expert work! Independent organizations such as Snopes (International), FactCheck.org, and PolitiFact analyze viral rumors daily and publish detailed, evidence-backed debunkings.'
      }
    ],
    videoTitle: 'Fact-Checking Tools: How Journalists Verify Claims Daily',
    videoDuration: 290,
    videoSubtitles: [
      { time: 0, text: "Fact-checking is not a secret science; it is a systematic craft." },
      { time: 5, text: "Using reverse image search, you can expose recycled fakes in seconds." },
      { time: 12, text: "Exit the suspicious website immediately and practice lateral reading." },
      { time: 20, text: "Search on Google or Bing for the topic alongside the word 'fact check'." },
      { time: 30, text: "If no reputable news outlets are reporting on a 'sensation', it is highly likely fake." },
      { time: 42, text: "Examine the website's publisher info: Who funds them? Who is the author?" },
      { time: 60, text: "Solve the quiz and become a professional digital verifier yourself!" }
    ],
    exerciseCases: [
      {
        id: 1,
        platform: 'WhatsApp',
        sender: 'Uncle Dieter',
        avatar: '👨‍🦳',
        timestamp: 'Yesterday',
        headline: '🦖 SENSATIONAL DEEP SEA FIND!',
        postContent: 'A massive 50-meter-long sea serpent was spotted and photographed in the Amazon! It reportedly swallowed an entire boat. Incredible what nature is capable of!',
        isReal: false,
        question: 'Is this message Real or Fake?',
        explanation: 'This is a FAKE! A reverse image search reveals the photo is actually a computer-generated CGI model from a fantasy film. Biologically, snakes of this size cannot exist.',
        options: [
          { label: 'Real (The photo looks incredibly realistic)', value: true },
          { label: 'Fake (CGI computer graphics from a fantasy film)', value: false }
        ]
      },
      {
        id: 2,
        platform: 'Instagram',
        sender: 'EcoScience',
        avatar: '🌱',
        timestamp: '1 day ago',
        headline: '🌳 Trees communicate with each other!',
        postContent: 'Latest research proves that trees in a forest can send distress signals and nutrients to their neighbors through an underground fungal network (dubbed the Wood Wide Web).',
        isReal: true,
        question: 'Is this message Real or Fake?',
        explanation: 'This is REAL! This fascinating biological discovery is scientifically proven and published in highly reputable journals like Nature. Trees actively use mycorrhizal fungal networks to communicate.',
        options: [
          { label: 'Real (Scientifically proven biological symbiosis)', value: true },
          { label: 'Fake (Trees have no brain, this is just a fairy tale)', value: false }
        ]
      },
      {
        id: 3,
        platform: 'TikTok',
        sender: 'FreeVoucherEasy',
        avatar: '🎁',
        timestamp: '4 hours ago',
        headline: '🚨 TARGET GIVING OUT $500 VOUCHERS!',
        postContent: 'Target is celebrating its anniversary and giving a free $500 shopping voucher to everyone who visits target-vouchers.com.co and submits their details! Act fast!',
        isReal: false,
        question: 'Is this message Real or Fake?',
        explanation: 'This is a FAKE! This is a classic phishing scam hosted on a deceptive domain (.com.co instead of target.com) designed to steal credit card details and personal information.',
        options: [
          { label: 'Real (I want to secure my free voucher)', value: true },
          { label: 'Fake (Dangerous phishing website operating under a copycat domain)', value: false }
        ]
      }
    ]
  },
  4: {
    id: 4,
    title: 'Media Literacy & Bias',
    subtitle: 'Understand the political leanings of news outlets and how to break out of your personal echo chamber.',
    imageUrl: '/src/assets/images/media_bias_1783854812851.jpg',
    learningGoals: [
      {
        icon: 'Target',
        title: 'Recognize Media Bias',
        description: 'Learn to assess political, commercial, or social biases in news reporting.'
      },
      {
        icon: 'Shield',
        title: 'Break Echo Chambers',
        description: 'Understand how social media algorithms keep you trapped inside a one-sided bubble.'
      },
      {
        icon: 'Brain',
        title: 'Diversify Your Media Diet',
        description: 'Build a habit of checking multiple highly reputable outlets with diverse viewpoints.'
      }
    ],
    sections: [
      {
        id: 'what-is-bias',
        title: 'A) What is Media Bias?',
        iconName: 'Scale',
        badge: 'Analysis',
        badgeColor: 'bg-blue-50 text-blue-600 border border-blue-100/60',
        content: 'Every media organization has an editorial policy. Some report with a conservative focus, others with a liberal slant. Having a bias is not illegal as long as facts and opinions remain separated. However, relying on a single, highly biased source distorts our reality.'
      },
      {
        id: 'echo-chambers',
        title: 'B) Filter Bubbles & Echo Chambers',
        iconName: 'Share2',
        badge: 'Social Media',
        badgeColor: 'bg-rose-50 text-rose-600 border border-rose-100/60',
        content: 'Since algorithms feed you content based on what you already like, you rarely encounter dissenting views. This creates an echo chamber where you only hear reflections of your own beliefs, leading to extreme social polarization.'
      },
      {
        id: 'opinion-vs-fact',
        title: 'C) Fact-Based Journalism vs. Opinion-Mongering',
        iconName: 'Newspaper',
        badge: 'Journalism',
        badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100/60',
        content: 'Professional journalism maintains a strict separation between objective reporting (facts) and editorial comments (opinion of the author). Sensationalist channels deliberately blur this line to provoke emotional and political reactions.'
      },
      {
        id: 'diet-diversity',
        title: 'D) Tips for a Balanced Media Diet',
        iconName: 'Globe',
        badge: 'Practice',
        badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100/60',
        content: 'Deliberately follow reputable news organizations on social media that cover a different political spectrum than yours. Reading foreign outlets is also a great way to gain external perspective on local events.'
      }
    ],
    videoTitle: 'Echo Chambers and Media Bias: How We Consume Information',
    videoDuration: 210,
    videoSubtitles: [
      { time: 0, text: "Every media outlet has a perspective. This is called media bias." },
      { time: 6, text: "Algorithms trap us in filter bubbles because they prioritize user engagement." },
      { time: 14, text: "In an echo chamber, we begin to believe that everyone shares our exact views." },
      { time: 22, text: "Learn the crucial distinction between objective reports and opinions." },
      { time: 32, text: "One-sided coverage may not be a direct lie, but it conceals half the truth." },
      { time: 45, text: "Diversify your news diet to construct a balanced and free personal opinion." },
      { time: 62, text: "Test your skills in the following interactive exercise!" }
    ],
    exerciseCases: [
      {
        id: 1,
        platform: 'Instagram',
        sender: 'TruthSeeker_99',
        avatar: '👁️',
        timestamp: 'Yesterday',
        headline: '👁️ THE ESTABLISHMENT IS LYING!',
        postContent: 'All major TV networks and newspapers are colluding to cover up the truth! Believe absolutely nothing from the mainstream media; follow only my anonymous Telegram channel for the real truth!',
        isReal: false,
        question: 'Is this post Real or Fake?',
        explanation: 'This is a FAKE! This represents a classic conspiracy pattern. By portraying all established media outlets as systematic liars, the creator attempts to isolate you emotionally and draw you into their echo chamber.',
        options: [
          { label: 'Real (Finally, someone is calling them out!)', value: true },
          { label: 'Fake (Conspiracy tactic designed to gain uncritical followers)', value: false }
        ]
      },
      {
        id: 2,
        platform: 'TikTok',
        sender: 'MediaWatcher',
        avatar: '📊',
        timestamp: '2 days ago',
        headline: 'Two Papers, Two Realities 📰',
        postContent: 'Newspaper A headlines the tax reform as: "A Disaster for the Middle Class!". Newspaper B headlines it as: "Tax Relief for Millions!". Both are analyzing the exact same official government numbers.',
        isReal: true,
        question: 'Is this post Real or Fake?',
        explanation: 'This is REAL! This is a classic example of editorial bias and framing. Neither newspaper is lying; they are emphasizing different aspects of the same reform according to their target audience and values.',
        options: [
          { label: 'Real (Normal editorial bias, not a fabricated report)', value: true },
          { label: 'Fake (One of these newspapers must be outright lying)', value: false }
        ]
      },
      {
        id: 3,
        platform: 'WhatsApp',
        sender: 'Leo (School Friend)',
        avatar: '🧑‍🎓',
        timestamp: 'Today, 14:05',
        headline: 'Interesting Algorithm Fact',
        postContent: 'Did you know that TikTok and YouTube automatically recommend more extreme videos once you click on a controversial topic? This is designed to maximize your watch time.',
        isReal: true,
        question: 'Is this message Real or Fake?',
        explanation: 'This is REAL! Recommendation algorithms are optimized for user retention. Sensational or radical content evokes stronger emotional reactions, which is why algorithms naturally amplify it.',
        options: [
          { label: 'Real (Algorithms thrive on amplification and engagement)', value: true },
          { label: 'Fake (Platforms filter out such biased recommendation algorithms)', value: false }
        ]
      }
    ]
  },
  5: {
    id: 5,
    title: 'Advanced Verification',
    subtitle: 'Equip yourself against the future of disinformation: Deepfakes, AI voices, and synthetic media.',
    imageUrl: '/src/assets/images/info_verification_1783854831509.jpg',
    learningGoals: [
      {
        icon: 'Target',
        title: 'Spot Deepfakes',
        description: 'Learn to detect physical flaws and unnatural artifacts in AI-generated videos and voices.'
      },
      {
        icon: 'Shield',
        title: 'Analyze AI Text',
        description: 'Understand how large language models hallucinate facts and how to spot machine-generated copy.'
      },
      {
        icon: 'Brain',
        title: 'Verification Protocol',
        description: 'Establish a reliable three-step verification habit before sharing anything on social media.'
      }
    ],
    sections: [
      {
        id: 'what-is-deepfake',
        title: 'A) What are Deepfakes & Voice Clones?',
        iconName: 'Cpu',
        badge: 'Technology',
        badgeColor: 'bg-purple-50 text-purple-600 border border-purple-100/60',
        content: 'Deepfakes are artificially synthesized videos where a person\'s face has been seamlessly swapped using AI. Voice cloning copies a real person\'s vocal traits using just a few seconds of raw audio, allowing bad actors to make them say anything.'
      },
      {
        id: 'spot-deepfakes',
        title: 'B) Exposing AI-Generated Media',
        iconName: 'Eye',
        badge: 'Detection',
        badgeColor: 'bg-rose-50 text-rose-600 border border-rose-100/60',
        content: 'Look for details! AI-generated characters often blink unnaturally, have asymmetrical glasses, irregular teeth, or blurry edges around the hair. Cloned voices often lack natural breathing patterns, gasps, and emotional inflections.'
      },
      {
        id: 'ai-hallucinations',
        title: 'C) AI Text & Hallucinations',
        iconName: 'Newspaper',
        badge: 'AI Writing',
        badgeColor: 'bg-amber-50 text-amber-600 border border-amber-100/60',
        content: 'Modern chatbots write with perfect grammar and sound highly convincing. But beware: AI models frequently "hallucinate" facts—inventing historical events, academic sources, or biographical details with complete, smooth confidence.'
      },
      {
        id: 'citizen-protocol',
        title: 'D) The 3 Rules of Social Sharing',
        iconName: 'ShieldCheck',
        badge: 'Checklist',
        badgeColor: 'bg-emerald-50 text-emerald-700 border border-emerald-100/60',
        content: 'Before sharing anything, apply the three golden rules:\n1. Stop (Never share in a state of high emotion or anger).\n2. Trace (Locate the original, primary source of the information).\n3. Double-Check (Verify if at least two independent, reputable outlets confirm the claims).'
      }
    ],
    videoTitle: 'The Future of Information: Deepfakes & Artificial Intelligence',
    videoDuration: 325,
    videoSubtitles: [
      { time: 0, text: "Artificial Intelligence is rewriting the rules of media consumption." },
      { time: 6, text: "With deepfakes, bad actors can put words into the mouths of world leaders." },
      { time: 15, text: "Voice cloning enables high-tech telephone scams mimicking loved ones." },
      { time: 24, text: "Watch closely for blurry edges, unnatural blinking, and mismatched earrings." },
      { time: 35, text: "AI models sound authoritative, but often hallucinate incredibly convincing lies." },
      { time: 48, text: "Never trust a sensational audio or video clip without searching for its source." },
      { time: 65, text: "Complete the final quiz to prove your digital resilience!" }
    ],
    exerciseCases: [
      {
        id: 1,
        platform: 'TikTok',
        sender: 'FinanceTipAI',
        avatar: '🤖',
        timestamp: '1 hour ago',
        headline: '📈 ELON MUSK EXCLUSIVE GIVEAWAY!',
        postContent: 'A video shows Elon Musk recommending a brand-new cryptocurrency app to fans. While his voice matches perfectly, his earlobes have pixelated, blurry outlines, and he does not blink once throughout the entire 2-minute video.',
        isReal: false,
        question: 'Is this video Real or Fake?',
        explanation: 'This is a FAKE! This is an AI-generated deepfake video designed to lure viewers into a cryptocurrency scam. The lack of natural blinking and pixel artifacts around the face are classic tells of deepfake technology.',
        options: [
          { label: 'Real (His lips move in perfect sync with the audio)', value: true },
          { label: 'Fake (Deepfake video with cloned voice designed for financial scams)', value: false }
        ]
      },
      {
        id: 2,
        platform: 'Instagram',
        sender: 'VeniceMagic',
        avatar: '🎭',
        timestamp: 'Yesterday',
        headline: '🌟 BREATH-TAKING ARCHITECTURE!',
        postContent: 'Stunning photos showcase brand-new glass underwater palaces built directly into the historic canals of Venice! An architectural triumph attracting thousands of tourists.',
        isReal: false,
        question: 'Is this photo Real or Fake?',
        explanation: 'This is a FAKE! The image was synthesized using Midjourney or a similar AI image generator. Venice does not have underwater glass palaces. The user mistook AI art for real architecture.',
        options: [
          { label: 'Real (I saw the photo; it is too detailed to be fake)', value: true },
          { label: 'Fake (AI-generated image masquerading as real photography)', value: false }
        ]
      },
      {
        id: 3,
        platform: 'WhatsApp',
        sender: 'Unknown Number',
        avatar: '📞',
        timestamp: '10 min ago',
        headline: '🚨 HIGH-TECH VOICE CLONING EMERGENCY',
        postContent: 'A voice note from your grandson: "Grandma, I was in a terrible car accident and need $5,000 for bail immediately. Please hand the money to the man who is coming over right now!" It sounds exactly like him, but comes from an unknown number.',
        isReal: false,
        question: 'Is this voice message Real or Fake?',
        explanation: 'This is a FAKE! This represents a dangerous high-tech scam utilizing "Voice Cloning". Scammers copy voices from public clips on social media and call older relatives to extort cash. Hang up immediately and call your grandson on his known number!',
        options: [
          { label: 'Real (The voice sounds 100% exactly like my grandson)', value: true },
          { label: 'Fake (AI voice clone used for extortion; always verify directly!)', value: false }
        ]
      }
    ]
  }
};
