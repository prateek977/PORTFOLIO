import heroPortrait from '../assets/hero-portrait.png';

export const portfolioContent = {
  personal: {
    firstName: 'Prateek',
    lastName: 'Jaiswal',
    fullName: 'Prateek Jaiswal',
    role: 'Web Developer & Automation Architect',
    status: 'Available for new projects',
    email: 'jaiswalprateek682@gmail.com',
    github: 'https://github.com/prateek977',
    linkedin: 'https://www.linkedin.com/in/prateek-jaiswal-44b580377/',
    portraitImage: heroPortrait,
    tagline: 'I architect sophisticated digital experiences with precise code and strategic automation — bridging the gap between vision and production.',
    location: 'India',
    systemStatus: 'ONLINE // OPEN TO CONTRACT & FULL-TIME',
  },
  stats: [
    { label: 'Projects Built', value: '8+', roman: 'VIII', description: 'Engineered web applications' },
    { label: 'APIs Integrated', value: '10+', roman: 'X', description: 'REST, GraphQL & 3rd-party services' },
    { label: 'n8n Workflows', value: '5+', roman: 'V', description: 'Production-grade automated pipelines' },
  ],
  bio: {
    lead: 'Passionate Web Developer dedicated to building high-performance, visually stunning applications.',
    paragraphs: [
      'I am a passionate Web Developer dedicated to building high-performance, visually stunning applications. With a focus on modern frontend technologies and seamless user experiences, I turn complex ideas into functional digital products.',
      'My expertise spans across React, JavaScript, and API Integration. I specialize in bridging the gap between design and functionality, ensuring every project is not only beautiful but also robust and scalable.',
      'Beyond coding, I am an advocate for workflow automation using tools like n8n. I believe in the power of technology to simplify processes and enhance productivity, and I am always looking for innovative ways to integrate AI into my development stack.'
    ],
    highlights: ['React & Modern JS', 'API Engineering', 'Workflow Automation (n8n)', 'AI Integration']
  },
  skillsGroups: [
    {
      category: 'Frontend Engineering',
      title: 'Frontend',
      code: 'FE-01',
      description: 'Modern component architectures, fluid motion, and responsive interfaces.',
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React 19', 'Framer Motion', 'Responsive UI']
    },
    {
      category: 'Backend & Systems',
      title: 'Backend',
      code: 'BE-02',
      description: 'Server logic, robust data interchange, and clean application programming interfaces.',
      skills: ['Python', 'Java', 'REST APIs', 'Node.js Basics', 'JSON Schema']
    },
    {
      category: 'Automation & DevOps',
      title: 'Automation',
      code: 'AU-03',
      description: 'Autonomous multi-step workflows, webhooks, and streamlined continuous deployments.',
      skills: ['n8n Workflows', 'API Integration', 'Git / GitHub', 'Netlify', 'CI/CD Pipelines', 'Docker Basics']
    },
    {
      category: 'AI & Next-Gen Tech',
      title: 'Artificial Intelligence',
      code: 'AI-04',
      description: 'Harnessing generative AI models, vector search, and conversational interfaces.',
      skills: ['AI Model Integration', 'Chatbot Architectures', 'Image Gen APIs', 'Prompt Engineering', 'LLM Workflows']
    }
  ],
  projects: [
    {
      id: 'vibe-tunes',
      number: '01',
      codeName: 'VIBE_AUDIO_CORE',
      title: 'Vibe Tunes',
      subtitle: 'Real-time Music Streaming Platform',
      year: '2026',
      editorialCategory: 'AUDIO ARCHITECTURE // INTERACTIVE STREAMING',
      description: 'A music streaming platform that allows users to listen to their favorite songs and discover new music. Built with React and optimized for real-time interactions, smooth playback state, and fluid UI choreography.',
      longDescription: 'Engineered as a full-spectrum streaming interface featuring low-latency audio state coordination, interactive waveform cues, playlist curation, and seamless dynamic page transitions powered by React and Framer Motion.',
      tags: ['React', 'Music Streaming', 'Framer Motion', 'Audio API'],
      metrics: { latency: '18ms', uptime: '99.9%', users: 'Real-time Audio' },
      link: 'https://vibe-tunes.netlify.app/',
      github: 'https://github.com/prateek977/Vibe-Tunes-',
      isFeatured: true,
      accentColor: '#ff003c'
    },
    {
      id: 'public-api-playground',
      number: '02',
      codeName: 'API_DISCOVERY_MESH',
      title: 'Public API Playground',
      subtitle: 'Dynamic API Explorer & Dashboard',
      year: '2025',
      editorialCategory: 'SYSTEM DASHBOARD // DATA VISUALIZATION',
      description: 'A versatile dashboard for exploring various public APIs. Features real-time data fetching, advanced filtering, error recovery, and a modular architecture.',
      longDescription: 'Created to demystify external data layers by aggregating multiple endpoints into a unified explorer with payload inspection, query-building parameters, and latency metrics.',
      tags: ['React', 'REST API', 'Vite', 'Async State'],
      metrics: { endpoints: '10+ APIs', filterSpeed: '<5ms', architecture: 'Modular' },
      link: 'https://shimmering-concha-667417.netlify.app/',
      github: 'https://github.com/prateek977/Public-API-Playground-',
      isFeatured: false,
      accentColor: '#00f0ff'
    },
    {
      id: 'leet-compare',
      number: '03',
      codeName: 'LEET_ANALYTICS_V3',
      title: 'Leet Compare',
      subtitle: 'Competitive Developer Analytics',
      year: '2025',
      editorialCategory: 'DATA COMPARISON // ALGORITHMIC TELEMETRY',
      description: 'A platform to compare your LeetCode stats with your friends. Built with React and LeetCode API to provide intuitive head-to-head visual performance comparisons.',
      longDescription: 'Direct comparative analytics engine parsing algorithmic problem-solving records, submission velocities, difficulty tiers, and historical streaks between competitive programmers.',
      tags: ['React', 'LeetCode API', 'Netlify', 'Data Viz'],
      metrics: { syncRate: 'Live Feed', metricTypes: 'Hard/Med/Easy', speed: 'Optimized' },
      link: 'https://leet-compare.netlify.app/',
      github: 'https://github.com/prateek977/Leet-Compare-',
      isFeatured: false,
      accentColor: '#ffb703'
    }
  ]
};
