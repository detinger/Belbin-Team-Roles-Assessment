export type RoleCode = 'RI' | 'TW' | 'CO' | 'PL' | 'ME' | 'SH' | 'IMP' | 'CF';

export type Question = {
  id: string;
  text: string;
  role: RoleCode;
};

export type QuestionnaireSection = {
  title: string;
  eyebrow: string;
  questions: Question[];
};

export type RoleInfo = {
  code: RoleCode;
  name: string;
  shortName: string;
  category: 'People' | 'Thinking' | 'Action';
  description: string;
  strengths: string;
  weaknesses: string;
  itContribution: string;
  sprintAction: string;
  collaboration: string;
  image: string;
  color: string;
  softColor: string;
  delivery: [number, number, number, number, number, number];
};

export const questionnaire: QuestionnaireSection[] = [
  {
    eyebrow: 'Your contribution',
    title: 'What I believe I can contribute to a team',
    questions: [
      { id: 'a', text: 'I think I can quickly see and take advantage of new opportunities', role: 'RI' },
      { id: 'b', text: 'I can work well with a very wide range of people', role: 'TW' },
      { id: 'c', text: "Producing ideas is something I'm naturally good at", role: 'PL' },
      { id: 'd', text: 'My ability rests in being able to draw people out whenever I sense they have something of value to contribute to goals of the group', role: 'CO' },
      { id: 'e', text: 'My capacity to follow through has much to do with my personal effectiveness', role: 'CF' },
      { id: 'f', text: 'I am ready to face temporary unpopularity if it leads to worthwhile results in the end', role: 'SH' },
      { id: 'g', text: 'I can usually sense what is realistic and likely to work', role: 'IMP' },
      { id: 'h', text: 'I can offer a well thought-out case for alternative courses of action without introducing bias or prejudice', role: 'ME' },
    ],
  },
  {
    eyebrow: 'Your watchouts',
    title: 'If I have a possible shortcoming in teamwork, it could be that',
    questions: [
      { id: 'a', text: 'I am not at ease unless meetings are well structured and controlled and generally well conducted', role: 'IMP' },
      { id: 'b', text: 'I am inclined to be too generous toward others who have a valid viewpoint that has not received enough attention', role: 'CO' },
      { id: 'c', text: 'I have a tendency to talk too much once the group starts discussing new ideas', role: 'RI' },
      { id: 'd', text: 'My objective outlook makes it difficult for me to join in readily and enthusiastically with colleagues', role: 'ME' },
      { id: 'e', text: 'I am sometimes seen as forceful and authoritarian if there is a need to get something done', role: 'SH' },
      { id: 'f', text: 'I find it difficult to lead from the front, perhaps because I am overresponsive to the atmosphere in the group', role: 'TW' },
      { id: 'g', text: 'I easily get too caught up in ideas that occur to me and so lose track of what is happening', role: 'PL' },
      { id: 'h', text: 'My colleagues tend to see me as someone who worries too much about details and the possibility that things may go wrong', role: 'CF' },
    ],
  },
  {
    eyebrow: 'Project behavior',
    title: 'When involved in a project with other people',
    questions: [
      { id: 'a', text: 'I have a talent for influencing people without putting them under pressure', role: 'CO' },
      { id: 'b', text: 'My general vigilance prevents careless mistakes and omissions being made', role: 'CF' },
      { id: 'c', text: 'I am ready to press for action to make sure that the meeting does not waste time or lose sight of the main objective', role: 'SH' },
      { id: 'd', text: 'I can be counted on to contribute something original', role: 'PL' },
      { id: 'e', text: 'I am always ready to support a good suggestion in the common interest', role: 'TW' },
      { id: 'f', text: 'I am eager to look for the latest in new ideas and developments', role: 'RI' },
      { id: 'g', text: 'I believe my capacity for judgment can help to bring about the right decisions', role: 'ME' },
      { id: 'h', text: 'I can be relied upon to see that all essential work is organized', role: 'IMP' },
    ],
  },
  {
    eyebrow: 'Your approach',
    title: 'My characteristic approach to group work is that',
    questions: [
      { id: 'a', text: 'I have a quiet interest in getting to know colleagues better', role: 'TW' },
      { id: 'b', text: 'I am not reluctant to challenge the views of others or to hold a minority view myself', role: 'SH' },
      { id: 'c', text: 'I can usually find a line of argument to refute unsound propositions', role: 'ME' },
      { id: 'd', text: 'I think I have a talent for making things work once a plan has to be put into operation', role: 'IMP' },
      { id: 'e', text: 'I have a tendency to avoid the obvious and to come up with the unexpected', role: 'PL' },
      { id: 'f', text: 'I bring a touch of perfectionism to any job I undertake', role: 'CF' },
      { id: 'g', text: 'I am ready to make use of contacts outside the group itself', role: 'RI' },
      { id: 'h', text: 'While I am interested in hearing all views, I never hesitate to make up my mind once a decision has to be made', role: 'CO' },
    ],
  },
  {
    eyebrow: 'What motivates you',
    title: 'I gain satisfaction in a job because',
    questions: [
      { id: 'a', text: 'I enjoy analyzing situations and weighing all the possible choices', role: 'ME' },
      { id: 'b', text: 'I am interested in finding practical solutions to problems', role: 'IMP' },
      { id: 'c', text: 'I like to feel that I am fostering good working relationships', role: 'TW' },
      { id: 'd', text: 'I can have a strong influence on decisions', role: 'SH' },
      { id: 'e', text: 'I can meet people who may have something new to offer', role: 'RI' },
      { id: 'f', text: 'I can get people to agree on a necessary course of action', role: 'CO' },
      { id: 'g', text: 'I feel in my element if I can give a task my full attention', role: 'CF' },
      { id: 'h', text: 'I like to find a field that stretches my imagination', role: 'PL' },
    ],
  },
  {
    eyebrow: 'Under pressure',
    title: 'If I am suddenly given a difficult task with limited time and unfamiliar people',
    questions: [
      { id: 'a', text: 'I would feel like going off into a corner in order to think up a way out of the impasse before developing a line of action', role: 'PL' },
      { id: 'b', text: 'I would be ready to work with the person who showed the most positive approach', role: 'TW' },
      { id: 'c', text: 'I would find some way of reducing the size of the task by establishing what different individuals might best contribute', role: 'CO' },
      { id: 'd', text: 'My natural sense of urgency would help to ensure that we did not fall behind schedule', role: 'CF' },
      { id: 'e', text: 'I believe I would keep cool and maintain my capacity to think straight', role: 'ME' },
      { id: 'f', text: 'I would retain a steadiness of purpose in spite of the pressures', role: 'IMP' },
      { id: 'g', text: 'I would be prepared to take a leadership role if I felt the group was making no progress', role: 'SH' },
      { id: 'h', text: 'I would start discussions in the hope of stimulating new thoughts and getting things moving', role: 'RI' },
    ],
  },
  {
    eyebrow: 'Team friction',
    title: 'With reference to the problems I experience when working in groups',
    questions: [
      { id: 'a', text: 'I am apt to show my impatience with those who are obstructing progress', role: 'SH' },
      { id: 'b', text: 'Others may criticize me for being too analytical and not intuitive enough', role: 'ME' },
      { id: 'c', text: 'My desire to make sure that work is done properly can slow things down', role: 'CF' },
      { id: 'd', text: 'I tend to get bored rather easily and rely on one or two stimulating members to spark me', role: 'RI' },
      { id: 'e', text: 'I find it difficult to get started unless the goals are clear', role: 'IMP' },
      { id: 'f', text: 'I am sometimes poor at explaining and clarifying complex points that occur to me', role: 'PL' },
      { id: 'g', text: 'I am aware that I sometimes demand things from others that I cannot do myself', role: 'CO' },
      { id: 'h', text: 'I hesitate to get my points across when I encounter real opposition', role: 'TW' },
    ],
  },
];

export const deliveryStages = ['Discover', 'Plan', 'Build', 'Validate', 'Release', 'Operate'] as const;

export const roleInfo: Record<RoleCode, RoleInfo> = {
  RI: {
    code: 'RI', name: 'Resource Investigator', shortName: 'Explorer', category: 'People',
    description: 'Curious and outward-looking, you connect the team with useful ideas, people, tools, and opportunities.',
    strengths: 'Outgoing, enthusiastic, explores opportunities and develops contacts.',
    weaknesses: 'Can be over-optimistic or lose interest after the initial discovery.',
    itContribution: 'You are valuable when evaluating new platforms, finding external expertise, researching vendors, and bringing emerging practices into the team.',
    sprintAction: 'Bring one promising external idea to the next refinement session—and name the smallest experiment that could validate it.',
    collaboration: 'Pair with an Implementer or Completer Finisher to convert promising discoveries into dependable outcomes.',
    image: '/roles/resource-investigator.png', color: '#275EFE', softColor: '#E8EEFF', delivery: [3, 2, 1, 1, 1, 2],
  },
  TW: {
    code: 'TW', name: 'Teamworker', shortName: 'Connector', category: 'People',
    description: 'Perceptive and supportive, you help people collaborate, navigate tension, and keep work moving across boundaries.',
    strengths: 'Co-operative, diplomatic, listens well and averts friction.',
    weaknesses: 'Can avoid confrontation or hesitate when an unpopular decision is needed.',
    itContribution: 'You strengthen pairing, cross-functional handoffs, design critiques, incident response, and the everyday psychological safety of technical teams.',
    sprintAction: 'Notice one strained handoff this sprint and facilitate a short conversation that produces a clear shared next step.',
    collaboration: 'Work with a Shaper when the team needs to turn healthy dialogue into a timely decision.',
    image: '/roles/teamworker.png', color: '#15A7C8', softColor: '#E0F8FB', delivery: [2, 3, 2, 2, 2, 3],
  },
  CO: {
    code: 'CO', name: 'Co-ordinator', shortName: 'Orchestrator', category: 'People',
    description: 'Calm and clarifying, you align people around outcomes and make the best use of each person’s contribution.',
    strengths: 'Mature, confident, identifies talent, clarifies goals and delegates effectively.',
    weaknesses: 'Can over-delegate or appear removed from hands-on execution.',
    itContribution: 'You are effective in planning, stakeholder alignment, ownership design, cross-team programs, and meetings where many technical perspectives must converge.',
    sprintAction: 'For one ambiguous initiative, name the outcome, decision owner, contributors, and next checkpoint in a single visible brief.',
    collaboration: 'Invite a Plant for options and a Monitor Evaluator for trade-offs before aligning the team on a path.',
    image: '/roles/coordinator.png', color: '#7257E8', softColor: '#F0ECFF', delivery: [2, 3, 2, 2, 2, 2],
  },
  PL: {
    code: 'PL', name: 'Plant', shortName: 'Inventor', category: 'Thinking',
    description: 'Original and imaginative, you reframe difficult problems and generate approaches others may not see.',
    strengths: 'Creative, free-thinking, generates ideas and solves difficult problems.',
    weaknesses: 'Can overlook constraints or become too absorbed to communicate clearly.',
    itContribution: 'You shine in architecture exploration, complex debugging, product discovery, prototyping, and moments when conventional approaches have stalled.',
    sprintAction: 'Choose one stubborn problem and present two unconventional options with their assumptions, constraints, and quickest proof point.',
    collaboration: 'Pair with a Monitor Evaluator to test the idea and an Implementer to turn it into a workable sequence.',
    image: '/roles/plant.png', color: '#8B5CF6', softColor: '#F3EAFF', delivery: [3, 2, 3, 1, 1, 1],
  },
  ME: {
    code: 'ME', name: 'Monitor Evaluator', shortName: 'Analyst', category: 'Thinking',
    description: 'Strategic and discerning, you examine evidence and surface the trade-offs behind important decisions.',
    strengths: 'Objective, logical, sees options and judges accurately.',
    weaknesses: 'Can appear overly critical or move slowly when evidence is incomplete.',
    itContribution: 'You add rigor to architecture decisions, security reviews, vendor selection, technical strategy, risk analysis, and post-incident learning.',
    sprintAction: 'Improve one decision by writing down its options, evidence, reversibility, failure modes, and decision deadline.',
    collaboration: 'Work with a Shaper to time-box analysis and a Teamworker to make critical feedback easier to absorb.',
    image: '/roles/monitor-evaluator.png', color: '#4267D5', softColor: '#E9EEFF', delivery: [2, 3, 2, 3, 2, 3],
  },
  SH: {
    code: 'SH', name: 'Shaper', shortName: 'Driver', category: 'Action',
    description: 'Energetic and challenging, you create momentum and keep the team focused when pressure rises.',
    strengths: 'Dynamic, thrives on pressure, has the courage to overcome obstacles.',
    weaknesses: 'Can create unnecessary urgency or cause interpersonal friction.',
    itContribution: 'You help unblock delivery, close open decisions, lead through incidents, and keep critical migrations or releases moving toward an outcome.',
    sprintAction: 'Pick one stalled decision, make the blocker explicit, and help the owner agree on a decision time and next action.',
    collaboration: 'Pair with a Teamworker or Co-ordinator to keep urgency constructive and bring people with you.',
    image: '/roles/shaper.png', color: '#F06B66', softColor: '#FFF0EC', delivery: [1, 3, 2, 2, 3, 3],
  },
  IMP: {
    code: 'IMP', name: 'Implementer', shortName: 'Builder', category: 'Action',
    description: 'Practical and reliable, you turn direction into an organized plan that people can execute.',
    strengths: 'Disciplined, efficient, turns ideas into actions and organizes the work.',
    weaknesses: 'Can hold onto a plan after assumptions or opportunities have changed.',
    itContribution: 'You bring value to delivery planning, platform adoption, operating models, CI/CD improvements, migrations, and repeatable engineering processes.',
    sprintAction: 'Take one vague initiative and define its first three executable steps, owners, dependencies, and visible completion signal.',
    collaboration: 'Invite a Resource Investigator to challenge the current approach and a Plant when the obvious plan is not enough.',
    image: '/roles/implementer.png', color: '#176B87', softColor: '#E3F5F7', delivery: [1, 3, 3, 2, 3, 3],
  },
  CF: {
    code: 'CF', name: 'Completer Finisher', shortName: 'Guardian', category: 'Action',
    description: 'Conscientious and precise, you protect quality by finding the details, risks, and omissions others miss.',
    strengths: 'Painstaking, attentive to detail, searches out errors and polishes work.',
    weaknesses: 'Can worry unduly, over-polish low-risk work, or become a bottleneck.',
    itContribution: 'You strengthen testing, accessibility, security hygiene, release readiness, operational checks, documentation quality, and edge-case coverage.',
    sprintAction: 'Define the three highest-risk release checks early, then agree what “good enough” means for everything else.',
    collaboration: 'Work with a Shaper on risk-based deadlines and an Implementer to make quality repeatable rather than dependent on you.',
    image: '/roles/completer-finisher.png', color: '#D95A8A', softColor: '#FDEBF3', delivery: [1, 2, 2, 3, 3, 3],
  },
};

export const roleOrder: RoleCode[] = ['RI', 'TW', 'CO', 'PL', 'ME', 'SH', 'IMP', 'CF'];

