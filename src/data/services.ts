export interface ServiceWorkItem {
  title: string
  body: string
}

export interface ServiceContent {
  slug: string
  name: string
  shortDesc: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  whoItsFor: string[]
  whatYoullWork: ServiceWorkItem[]
  approachNote: string
  relatedSlugs: string[]
}

export const SERVICES: ServiceContent[] = [
  {
    slug: 'career-guidance',
    name: 'Career Guidance',
    shortDesc: 'Find clarity and direction in your professional journey.',
    metaTitle: 'Career Guidance Coaching in Mumbai & Pune | The Life Mitra',
    metaDescription: 'One-on-one career guidance coaching with Sachin Chindarkar. Personalized assessment, an honest action roadmap, and ongoing support for professionals stuck between where they are and where they want to be.',
    h1: 'Career Guidance Coaching',
    intro: "Stuck between where you are and where you actually want to be? Career guidance coaching is for the mid-career professional who's outgrown their current role but can't yet see the next one clearly — or the early-career professional staring at too many options with no filter for choosing between them.",
    whoItsFor: [
      'Professionals feeling plateaued or unseen in their current role',
      "Career-changers who know something needs to shift but not what",
      'Students and early-career professionals mapping their first real move',
      'Founders and executives reconsidering their next chapter',
    ],
    whatYoullWork: [
      { title: 'Personalized assessment', body: 'Before any advice, a clear-eyed look at where you actually stand — your strengths, your blind spots, and the gap between your stated goals and your daily choices.' },
      { title: 'Action roadmap', body: "A concrete, sequenced plan — not a vague 'follow your passion' pep talk — with milestones you can check yourself against." },
      { title: 'Follow-up support', body: 'Career decisions rarely land in one session. Ongoing check-ins keep the plan honest as real life pushes back against it.' },
    ],
    approachNote: "Having built a business from a newspaper round to running his own 15-year-old MNC — after two decades inside Mahindra & Mahindra and Godrej Aerospace — Sachin brings a corporate-and-founder's view of what career moves actually hold up under pressure, not just what sounds good in a session.",
    relatedSlugs: ['public-speaking-coaching', 'business-startup-coaching', 'executive-communication-coaching'],
  },
  {
    slug: 'public-speaking-coaching',
    name: 'Public Speaking',
    shortDesc: 'Develop confidence and impact in front of any audience.',
    metaTitle: 'Public Speaking Coach in Mumbai & Pune | The Life Mitra',
    metaDescription: 'Public speaking coaching with a working stage anchor and vocal coach — 250+ stages, 10+ countries. Voice, presence, and real-world practice, not theory.',
    h1: 'Public Speaking Coaching',
    intro: "The fear isn't really the stage. It's the eight seconds before you start talking. Public speaking coaching rebuilds that moment — voice, breath, posture, and the internal script — so walking up to a mic stops being an event you survive and starts being one you run.",
    whoItsFor: [
      'Professionals who freeze, rush, or over-apologize in meetings and presentations',
      'First-time speakers preparing for a specific talk, pitch, or event',
      "Anyone whose voice doesn't match the authority of what they're saying",
      "People who've been told to 'just be more confident' and need an actual method instead",
    ],
    whatYoullWork: [
      { title: 'Voice modulation techniques', body: 'Pace, pitch, pause — the mechanics most people never learn, practiced until automatic instead of performed.' },
      { title: 'Stage presence training', body: 'What to do with your hands, your eyes, your stillness. Presence is trainable, not innate.' },
      { title: 'Real-world practice', body: 'Rehearsal against an actual audience reaction, not just a mirror — the only way nerves actually recalibrate.' },
    ],
    approachNote: "250+ stages across 10+ countries as a vocal coach and stage anchor means this isn't theory pulled from a book — it's a working method tested in front of real rooms.",
    relatedSlugs: ['executive-communication-coaching', 'career-guidance', 'stress-management-coaching'],
  },
  {
    slug: 'time-management-coaching',
    name: 'Time Management',
    shortDesc: 'Build structure, consistency, and discipline in daily life.',
    metaTitle: 'Time Management Coaching | The Life Mitra',
    metaDescription: 'Time management coaching that builds the discipline underneath the system — priority frameworks, productivity systems, and habit building that actually stick.',
    h1: 'Time Management Coaching',
    intro: "More apps and better to-do lists rarely fix the real problem: a lack of structure that no productivity hack can substitute for. Time management coaching builds the discipline underneath the system — the part that actually makes a calendar hold.",
    whoItsFor: [
      'Professionals who feel constantly behind despite working long hours',
      "People whose days get hijacked by other people's priorities",
      'Founders and freelancers without a boss enforcing structure',
      "Anyone who's tried productivity apps and still feels stuck",
    ],
    whatYoullWork: [
      { title: 'Priority frameworks', body: "A simple, repeatable way to decide what actually deserves today's hours — before the day decides for you." },
      { title: 'Productivity systems', body: 'Not a new app. A structure built around how you actually work, so it survives past week one.' },
      { title: 'Habit building', body: 'The unglamorous work of repetition — the reps that build discipline most people quit before finishing.' },
    ],
    approachNote: "'Show up, do the reps, take the next step' isn't a slogan here — it's the same discipline that took Sachin from a newspaper round in Jogeshwari to running his own company.",
    relatedSlugs: ['stress-management-coaching', 'career-guidance', 'business-startup-coaching'],
  },
  {
    slug: 'stress-management-coaching',
    name: 'Stress Management',
    shortDesc: 'Learn practical techniques to manage pressure and anxiety.',
    metaTitle: 'Stress Management Coaching in Mumbai & Pune | The Life Mitra',
    metaDescription: 'Practical stress management coaching — mindfulness, coping strategies, and resilience building for professionals under chronic pressure.',
    h1: 'Stress Management Coaching',
    intro: "Pressure doesn't go away because you managed it once. Stress management coaching is about building a repeatable response — so a hard week doesn't undo months of progress.",
    whoItsFor: [
      'Professionals managing chronic work pressure or burnout risk',
      'Anyone whose stress is starting to affect sleep, focus, or relationships',
      "People who've tried generic advice ('just relax') and need something more structured",
      'Those navigating a specific high-pressure period — a launch, a transition, a deadline stretch',
    ],
    whatYoullWork: [
      { title: 'Mindfulness practices', body: "Grounded, practical techniques you can use in the moment — not a meditation app subscription you'll abandon in a week." },
      { title: 'Coping strategies', body: 'Specific responses for specific triggers, built around your actual life and actual stressors.' },
      { title: 'Resilience building', body: 'The longer-term work of raising your baseline capacity, so the next hard week costs you less.' },
    ],
    approachNote: "No scripts, no generic worksheets — just grounded conversation and tools that hold up once you're back in the room that stressed you out.",
    relatedSlugs: ['emotional-healing-coaching', 'time-management-coaching', 'relationship-coaching'],
  },
  {
    slug: 'relationship-coaching',
    name: 'Relationship Coaching',
    shortDesc: 'Strengthen connections and build healthier relationships.',
    metaTitle: 'Relationship Coaching in Mumbai & Pune | The Life Mitra',
    metaDescription: "Relationship coaching focused on how you communicate, resolve conflict, and rebuild trust — for couples and individuals working through recurring patterns.",
    h1: 'Relationship Coaching',
    intro: "Most relationship friction isn't a compatibility problem — it's a communication one. Relationship coaching works on how you actually talk, listen, and repair, in the relationships that matter most to you.",
    whoItsFor: [
      'Couples or individuals navigating recurring conflict',
      'People rebuilding trust after a rupture',
      'Anyone who wants to communicate more directly without becoming harsh',
      'Those repeating the same relationship pattern across different people',
    ],
    whatYoullWork: [
      { title: 'Communication skills', body: "Saying the real thing, clearly, without it turning into a fight — a skill, not a personality trait." },
      { title: 'Conflict resolution', body: "A repeatable way through disagreement that doesn't leave residue for the next one." },
      { title: 'Trust building', body: 'The slow, specific work of becoming reliable to someone again — or for the first time.' },
    ],
    approachNote: "Real conversations, no scripts — the same principle that runs through every session, applied here to the relationships you can't afford to get wrong.",
    relatedSlugs: ['emotional-healing-coaching', 'stress-management-coaching', 'career-guidance'],
  },
  {
    slug: 'emotional-healing-coaching',
    name: 'Emotional Healing',
    shortDesc: 'Release emotional blocks and restore inner peace.',
    metaTitle: 'Emotional Healing Coaching | The Life Mitra',
    metaDescription: 'Structured, forward-focused emotional healing coaching — guided reflection and practical tools for releasing unresolved emotional weight.',
    h1: 'Emotional Healing Coaching',
    intro: "Some blocks aren't solved by trying harder. Emotional healing coaching creates space to actually look at what's been avoided — old patterns, unprocessed weight — and work through it deliberately.",
    whoItsFor: [
      'Anyone carrying unresolved weight from a past experience',
      'People who notice the same emotional pattern resurfacing across situations',
      'Those who feel emotionally stuck despite external success',
      'Anyone ready for reflective, structured work rather than a quick fix',
    ],
    whatYoullWork: [
      { title: 'Guided reflection', body: "Structured conversation that surfaces what's actually underneath a pattern, not just its symptoms." },
      { title: 'Healing techniques', body: 'Practical tools for processing and releasing emotional weight, built to be used long after the session ends.' },
      { title: 'Inner peace practices', body: 'Small, repeatable practices that keep the ground you gain from slipping back.' },
    ],
    approachNote: 'This is coaching, not therapy — forward-focused, structured, and grounded in real conversation rather than clinical process.',
    relatedSlugs: ['relationship-coaching', 'stress-management-coaching', 'law-of-attraction-coaching'],
  },
  {
    slug: 'executive-communication-coaching',
    name: 'Executive Communication',
    shortDesc: 'Master the art of clear, powerful communication.',
    metaTitle: 'Executive Communication Coaching | The Life Mitra',
    metaDescription: 'Executive communication coaching for leaders — leadership messaging, boardroom strategy, and executive presence built from two decades inside MNCs.',
    h1: 'Executive Communication Coaching',
    intro: 'In a boardroom, how you say it often decides whether what you said lands. Executive communication coaching sharpens message, delivery, and presence for the moments where clarity is non-negotiable.',
    whoItsFor: [
      'Executives and senior managers preparing for high-stakes presentations',
      'Leaders whose message gets lost in how it’s delivered',
      'Professionals moving into a role with more visibility and more scrutiny',
      'Anyone who needs to sound as credible as they actually are',
    ],
    whatYoullWork: [
      { title: 'Leadership messaging', body: 'Structuring what you say so the point survives contact with a skeptical room.' },
      { title: 'Boardroom strategies', body: 'Reading the room, handling pushback, and staying composed under direct questioning.' },
      { title: 'Executive presence', body: "The tone, pace, and stillness that signal authority before you've said a word." },
    ],
    approachNote: '20 years inside Mahindra & Mahindra, Godrej Aerospace, and Swiss & US MNCs — plus 250+ stages as a vocal coach — means this training comes from having actually been in those rooms.',
    relatedSlugs: ['public-speaking-coaching', 'career-guidance', 'sales-management-workshop'],
  },
  {
    slug: 'law-of-attraction-coaching',
    name: 'Law of Attraction',
    shortDesc: 'Harness the power of mindset to attract what you desire.',
    metaTitle: 'Law of Attraction Coaching | The Life Mitra',
    metaDescription: 'Mindset coaching grounded in structure and follow-through, not just affirmations — visualization, manifestation frameworks, and ongoing mentoring.',
    h1: 'Law of Attraction Coaching',
    intro: "Mindset work only holds up when it's paired with structure — otherwise it's just wishful thinking. This coaching treats mindset as a discipline: specific, practiced, and tied to real action.",
    whoItsFor: [
      'Anyone who wants mindset work grounded in practical follow-through, not just affirmations',
      'People stuck in a scarcity or self-doubt loop despite trying to think positively',
      'Those who want visualization and goal-setting tied to an actual plan',
      'Clients seeking ongoing mentoring alongside mindset work',
    ],
    whatYoullWork: [
      { title: 'Mindset transformation', body: "Identifying and interrupting the specific self-talk that's been running the show." },
      { title: 'Visualization mastery', body: 'A practiced technique, not a passive exercise — used deliberately, tied to real targets.' },
      { title: 'Manifestation frameworks', body: 'Structure that connects what you want to what you actually do next.' },
      { title: 'Personal mentoring', body: 'Ongoing, one-to-one support as the mindset shift meets real-world resistance.' },
    ],
    approachNote: 'Paired with the same grounded, no-scripts approach used across every session — mindset work here is a tool, not a substitute for action.',
    relatedSlugs: ['emotional-healing-coaching', 'business-startup-coaching', 'career-guidance'],
  },
  {
    slug: 'business-startup-coaching',
    name: 'Business Startup Coaching',
    shortDesc: 'From idea to execution — build your business with confidence.',
    metaTitle: 'Business Startup Coaching in Mumbai | The Life Mitra',
    metaDescription: "Startup coaching from a founder who's built his own company — business model design, market validation, launch strategy, and growth planning.",
    h1: 'Business Startup Coaching',
    intro: "Idea to execution is the hardest stretch — most plans die there, not from a bad idea but from no structure to carry it. This coaching is built for that specific gap.",
    whoItsFor: [
      'First-time founders moving from idea to a real business model',
      'Early-stage entrepreneurs who need market validation before scaling',
      'Founders with traction who need a clearer launch or growth strategy',
      'Startup teams looking for hands-on, experience-based mentoring',
    ],
    whatYoullWork: [
      { title: 'Business model design', body: 'Turning an idea into a structure that can actually generate revenue — not just a pitch deck.' },
      { title: 'Market validation', body: 'Testing assumptions before you spend on them, so the business is built on evidence, not hope.' },
      { title: 'Launch strategy', body: 'A sequenced go-to-market plan sized to what you can actually execute.' },
      { title: 'Growth planning', body: 'What comes after launch — the structure that keeps early traction from stalling.' },
    ],
    approachNote: "Sachin didn't just advise on this — he built his own Indian MNC from scratch, and has since worked hands-on with 100+ startup companies across India.",
    relatedSlugs: ['career-guidance', 'sales-management-workshop', 'time-management-coaching'],
  },
  {
    slug: 'sales-management-workshop',
    name: 'Sales Management Workshop',
    shortDesc: 'Practical strategies to elevate your sales performance.',
    metaTitle: 'Sales Management Workshop | The Life Mitra',
    metaDescription: 'Sales management training covering sales psychology, pipeline management, closing techniques, and team leadership — built on real MNC sales leadership experience.',
    h1: 'Sales Management Workshop',
    intro: "Sales performance is rarely a motivation problem — it's a process problem. This workshop rebuilds the process: psychology, pipeline, closing, and the leadership that holds a team to it.",
    whoItsFor: [
      'Sales teams and managers looking to improve close rates',
      'Individual sales professionals wanting a sharper, more consistent process',
      'Leaders building or scaling a sales function from scratch',
      'Organizations bringing in outside training for a sales team',
    ],
    whatYoullWork: [
      { title: 'Sales psychology', body: 'Understanding what actually moves a buyer, instead of relying on generic scripts.' },
      { title: 'Pipeline management', body: "A structure for tracking and moving deals that doesn't rely on memory or guesswork." },
      { title: 'Closing techniques', body: 'Specific, practiced approaches for the moment that decides the deal.' },
      { title: 'Team leadership', body: 'How to hold a sales team to a process — the management layer most workshops skip.' },
    ],
    approachNote: 'Built on real sales leadership experience inside Mahindra & Mahindra and Godrej Aerospace, and years training sales teams across engineering, pharma, and scientific MNCs in India and the Gulf.',
    relatedSlugs: ['executive-communication-coaching', 'business-startup-coaching', 'career-guidance'],
  },
]

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
