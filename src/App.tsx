import React, { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Info } from 'lucide-react';

const questionnaire = [
  {
    title: "1. What I believe I can contribute to a team:",
    questions: [
      { id: 'a', text: "I think I can quickly see and take advantage of new opportunities", role: "RI" },
      { id: 'b', text: "I can work well with a very wide range of people", role: "TW" },
      { id: 'c', text: "Producing ideas is something I'm naturally good at", role: "PL" },
      { id: 'd', text: "My ability rests in being able to draw people out whenever I sense they have something of value to contribute to goals of the group", role: "CO" },
      { id: 'e', text: "My capacity to follow through has much to do with my personal effectiveness", role: "CF" },
      { id: 'f', text: "I am ready to face temporary unpopularity if it leads to worthwhile results in the end", role: "SH" },
      { id: 'g', text: "I can usually sense what is realistic and likely to work", role: "IMP" },
      { id: 'h', text: "I can offer a well thought-out case for alternative courses of action without introducing bias or prejudice", role: "ME" }
    ]
  },
  {
    title: "2. If I have a possible shortcoming in teamwork, it could be that:",
    questions: [
      { id: 'a', text: "I am not at ease unless meetings are well structured and controlled and generally well conducted", role: "IMP" },
      { id: 'b', text: "I am inclined to be too generous toward others who have a valid viewpoint that has not received enough attention", role: "CO" },
      { id: 'c', text: "I have a tendency to talk too much once the group starts discussing new ideas", role: "RI" },
      { id: 'd', text: "My objective outlook makes it difficult for me to join in readily and enthusiastically with colleagues", role: "ME" },
      { id: 'e', text: "I am sometimes seen as forceful and authoritarian if there is a need to get something done", role: "SH" },
      { id: 'f', text: "I find it difficult to lead from the front, perhaps because I am overresponsive to the atmosphere in the group", role: "TW" },
      { id: 'g', text: "I easily get too caught up in ideas that occur to me and so lose track of what is happening", role: "PL" },
      { id: 'h', text: "My colleagues tend to see me as someone who worries too much about details and the possibility that things may go wrong", role: "CF" }
    ]
  },
  {
    title: "3. When involved in a project with other people:",
    questions: [
      { id: 'a', text: "I have a talent for influencing people without putting them under pressure", role: "CO" },
      { id: 'b', text: "My general vigilance prevents careless mistakes and omissions being made", role: "CF" },
      { id: 'c', text: "I am ready to press for action to make sure that the meeting does not waste time or lose sight of the main objective", role: "SH" },
      { id: 'd', text: "I can be counted on to contribute something original", role: "PL" },
      { id: 'e', text: "I am always ready to support a good suggestion in the common interest", role: "TW" },
      { id: 'f', text: "I am eager to look for the latest in new ideas and developments", role: "RI" },
      { id: 'g', text: "I believe my capacity for judgment can help to bring about the right decisions", role: "ME" },
      { id: 'h', text: "I can be relied upon to see that all essential work is organized", role: "IMP" }
    ]
  },
  {
    title: "4. My characteristic approach to group work is that:",
    questions: [
      { id: 'a', text: "I have a quiet interest in getting to know colleagues better", role: "TW" },
      { id: 'b', text: "I am not reluctant to challenge the views of others or to hold a minority view myself", role: "SH" },
      { id: 'c', text: "I can usually find a line of argument to refute unsound propositions", role: "ME" },
      { id: 'd', text: "I think I have a talent for making things work once a plan has to be put into operation", role: "IMP" },
      { id: 'e', text: "I have a tendency to avoid the obvious and to come up with the unexpected", role: "PL" },
      { id: 'f', text: "I bring a touch of perfectionism to any job I undertake", role: "CF" },
      { id: 'g', text: "I am ready to make use of contacts outside the group itself", role: "RI" },
      { id: 'h', text: "While I am interested in hearing all views, I never hesitate to make up my mind once a decision has to be made", role: "CO" }
    ]
  },
  {
    title: "5. I gain satisfaction in a job because:",
    questions: [
      { id: 'a', text: "I enjoy analyzing situations and weighing all the possible choices", role: "ME" },
      { id: 'b', text: "I am interested in finding practical solutions to problems", role: "IMP" },
      { id: 'c', text: "I like to feel that I am fostering good working relationships", role: "TW" },
      { id: 'd', text: "I can have a strong influence on decisions", role: "SH" },
      { id: 'e', text: "I can meet people who may have something new to offer", role: "RI" },
      { id: 'f', text: "I can get people to agree on a necessary course of action", role: "CO" },
      { id: 'g', text: "I feel in my element if I can give a task my full attention", role: "CF" },
      { id: 'h', text: "I like to find a field that stretches my imagination", role: "PL" }
    ]
  },
  {
    title: "6. If I am suddenly given a difficult task with limited time and unfamiliar people:",
    questions: [
      { id: 'a', text: "I would feel like going off into a corner in order to think up a way out of the impasse before developing a line of action", role: "PL" },
      { id: 'b', text: "I would be ready to work with the person who showed the most positive approach", role: "TW" },
      { id: 'c', text: "I would find some way of reducing the size of the task by establishing what different individuals might best contribute", role: "CO" },
      { id: 'd', text: "My natural sense of urgency would help to ensure that we did not fall behind schedule", role: "CF" },
      { id: 'e', text: "I believe I would keep cool and maintain my capacity to think straight", role: "ME" },
      { id: 'f', text: "I would retain a steadiness of purpose in spite of the pressures", role: "IMP" },
      { id: 'g', text: "I would be prepared to take a leadership role if I felt the group was making no progress", role: "SH" },
      { id: 'h', text: "I would start discussions in the hope of stimulating new thoughts and getting things moving", role: "RI" }
    ]
  },
  {
    title: "7. With reference to the problems I experience when working in groups:",
    questions: [
      { id: 'a', text: "I am apt to show my impatience with those who are obstructing progress", role: "SH" },
      { id: 'b', text: "Others may criticize me for being too analytical and not intuitive enough", role: "ME" },
      { id: 'c', text: "My desire to make sure that work is done properly can slow things down", role: "CF" },
      { id: 'd', text: "I tend to get bored rather easily and rely on one or two stimulating members to spark me", role: "RI" },
      { id: 'e', text: "I find it difficult to get started unless the goals are clear", role: "IMP" },
      { id: 'f', text: "I am sometimes poor at explaining and clarifying complex points that occur to me", role: "PL" },
      { id: 'g', text: "I am aware that I sometimes demand things from others that I cannot do myself", role: "CO" },
      { id: 'h', text: "I hesitate to get my points across when I encounter real opposition", role: "TW" }
    ]
  }
];

const roleDescriptions: Record<string, { name: string, description: string, strengths: string, weaknesses: string, dontBeSurprised: string }> = {
  "RI": {
    name: "Resource Investigator",
    description: "Uses their inquisitive nature to find ideas to bring back to the team.",
    strengths: "Outgoing, enthusiastic. Explores opportunities and develops contacts.",
    weaknesses: "Might be over-optimistic, and can lose interest once the initial enthusiasm has passed.",
    dontBeSurprised: "They might forget to follow up on a lead."
  },
  "TW": {
    name: "Teamworker",
    description: "Helps the team to gel, using their versatility to identify the work required and complete it on behalf of the team.",
    strengths: "Co-operative, perceptive and diplomatic. Listens and averts friction.",
    weaknesses: "Can be indecisive in crunch situations and tends to avoid confrontation.",
    dontBeSurprised: "They might be hesitant to make unpopular decisions."
  },
  "CO": {
    name: "Co-ordinator",
    description: "Needed to focus on the team's objectives, draw out team members and delegate work appropriately.",
    strengths: "Mature, confident, identifies talent. Clarifies goals.",
    weaknesses: "Can be seen as manipulative and might offload their own share of the work.",
    dontBeSurprised: "They might over-delegate, leaving themselves little work to do."
  },
  "PL": {
    name: "Plant",
    description: "Tends to be highly creative and good at solving problems in unconventional ways.",
    strengths: "Creative, imaginative, free-thinking, generates ideas and solves difficult problems.",
    weaknesses: "Might ignore incidentals, and may be too preoccupied to communicate effectively.",
    dontBeSurprised: "They could be absent-minded or forgetful."
  },
  "ME": {
    name: "Monitor Evaluator",
    description: "Provides a logical eye, making impartial judgements where required and weighs up the team's options in a dispassionate way.",
    strengths: "Sober, strategic and discerning. Sees all options and judges accurately.",
    weaknesses: "Sometimes lacks the drive and ability to inspire others and can be overly critical.",
    dontBeSurprised: "They could be slow to come to decisions."
  },
  "SH": {
    name: "Shaper",
    description: "Provides the necessary drive to ensure that the team keeps moving and does not lose focus or momentum.",
    strengths: "Challenging, dynamic, thrives on pressure. Has the drive and courage to overcome obstacles.",
    weaknesses: "Can be prone to provocation, and may sometimes offend people's feelings.",
    dontBeSurprised: "They could risk becoming aggressive and bad-humoured in their attempts to get things done."
  },
  "IMP": {
    name: "Implementer",
    description: "Needed to plan a workable strategy and carry it out as efficiently as possible.",
    strengths: "Practical, reliable, efficient. Turns ideas into actions and organises work that needs to be done.",
    weaknesses: "Can be a bit inflexible and slow to respond to new possibilities.",
    dontBeSurprised: "They might be slow to relinquish their plans in favour of positive changes."
  },
  "CF": {
    name: "Completer Finisher",
    description: "Most effectively used at the end of tasks to polish and scrutinise the work for errors, subjecting it to the highest standards of quality control.",
    strengths: "Painstaking, conscientious, anxious. Searches out errors. Polishes and perfects.",
    weaknesses: "Can be inclined to worry unduly, and reluctant to delegate.",
    dontBeSurprised: "They could be accused of taking their perfectionism to extremes."
  }
};

type Answers = Record<number, Record<string, number>>;

export default function App() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState<Answers>(() => {
    const initial: Answers = {};
    for (let i = 0; i < questionnaire.length; i++) {
      initial[i] = {};
      for (const q of questionnaire[i].questions) {
        initial[i][q.id] = 0;
      }
    }
    return initial;
  });

  const handleStart = () => setCurrentStep(0);

  const handleInputChange = (sectionIndex: number, questionId: string, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (isNaN(numValue) || numValue < 0 || numValue > 10) return;

    setAnswers(prev => ({
      ...prev,
      [sectionIndex]: {
        ...prev[sectionIndex],
        [questionId]: numValue
      }
    }));
  };

  const getSectionTotal = (sectionIndex: number): number => {
    const sectionAnswers = answers[sectionIndex] || {};
    return Object.values(sectionAnswers as Record<string, number>).reduce((sum: number, val: number) => sum + val, 0);
  };

  const handleNext = () => {
    if (getSectionTotal(currentStep) === 10) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const calculateScores = () => {
    const scores: Record<string, number> = {
      RI: 0, TW: 0, CO: 0, PL: 0, ME: 0, SH: 0, IMP: 0, CF: 0
    };

    for (let i = 0; i < questionnaire.length; i++) {
      const section = questionnaire[i];
      for (const q of section.questions) {
        scores[q.role] += answers[i][q.id] || 0;
      }
    }

    return Object.entries(scores)
      .map(([role, score]) => ({ role, score, name: roleDescriptions[role].name }))
      .sort((a, b) => b.score - a.score);
  };

  if (currentStep === -1) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans text-slate-900">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-indigo-950 mb-6">Belbin Team Roles</h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Discover your natural behavioral strengths in a team setting. This test will help you identify which of the Belbin Team Roles you naturally gravitate towards.
          </p>
          <div className="bg-indigo-50 rounded-xl p-6 mb-10 text-left border border-indigo-100">
            <h3 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5" /> Guidelines to fill in the test
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-indigo-800/80">
              <li>There are 7 sections in total.</li>
              <li>For each section, you have exactly <strong>10 points</strong> to distribute among the 8 sentences.</li>
              <li>Distribute the points based on how well you think each sentence describes your behavior.</li>
              <li>You can give all 10 points to one sentence, or spread them out (e.g., 4, 4, 2).</li>
            </ul>
          </div>
          <button
            onClick={handleStart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-10 rounded-xl transition-all shadow-md hover:shadow-lg text-lg flex items-center justify-center mx-auto gap-2"
          >
            Start Questionnaire <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  if (currentStep >= questionnaire.length) {
    const results = calculateScores();
    const topRoles = results.slice(0, 3);

    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-950 mb-4">Your Team Role Profile</h1>
            <p className="text-lg text-slate-600">Based on your responses, here is your Belbin Team Role distribution.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center">
              <h3 className="text-xl font-semibold text-slate-800 mb-6">Role Distribution</h3>
              <div className="w-full h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={results}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="role" tick={{ fill: '#475569', fontSize: 14, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 5']} tick={{ fill: '#94a3b8' }} />
                    <Radar name="Score" dataKey="score" stroke="#4f46e5" fill="#6366f1" fillOpacity={0.5} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value: number, name: string, props: any) => [value, props.payload.name]}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Roles Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800">Your Top Roles</h3>
              {topRoles.map((result, idx) => {
                const roleInfo = roleDescriptions[result.role];
                return (
                  <div key={result.role} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500 opacity-80"></div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-indigo-950">{roleInfo.name} <span className="text-slate-400 text-sm font-normal ml-2">({result.role})</span></h4>
                      <span className="bg-indigo-100 text-indigo-800 text-sm font-bold px-3 py-1 rounded-full">Score: {result.score}</span>
                    </div>
                    <p className="text-slate-700 mb-4">{roleInfo.description}</p>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-emerald-700">Strengths:</strong> <span className="text-slate-600">{roleInfo.strengths}</span></p>
                      <p><strong className="text-amber-700">Allowable weaknesses:</strong> <span className="text-slate-600">{roleInfo.weaknesses}</span></p>
                      <p><strong className="text-indigo-700">Don't be surprised:</strong> <span className="text-slate-600">{roleInfo.dontBeSurprised}</span></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* All Roles Reference */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">All Roles Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map(result => {
                const roleInfo = roleDescriptions[result.role];
                return (
                  <div key={result.role} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-slate-800">{roleInfo.name}</h4>
                      <span className="text-slate-500 font-mono text-sm">{result.score}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 flex-grow">{roleInfo.description}</p>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-auto">
                      <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${(result.score / 70) * 100}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <button
              onClick={() => {
                setCurrentStep(-1);
                setAnswers(() => {
                  const initial: Answers = {};
                  for (let i = 0; i < questionnaire.length; i++) {
                    initial[i] = {};
                    for (const q of questionnaire[i].questions) {
                      initial[i][q.id] = 0;
                    }
                  }
                  return initial;
                });
              }}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Retake Questionnaire
            </button>
          </div>
        </div>
      </div>
    );
  }

  const section = questionnaire[currentStep];
  const currentTotal = getSectionTotal(currentStep);
  const remaining = 10 - currentTotal;
  const isValid = currentTotal === 10;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 font-sans text-slate-900">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
            <span>Section {currentStep + 1} of {questionnaire.length}</span>
            <span>{Math.round(((currentStep) / questionnaire.length) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentStep) / questionnaire.length) * 100}%` }}></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          {/* Header */}
          <div className="bg-indigo-950 p-6 md:p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">{section.title}</h2>
          </div>

          {/* Points Tracker */}
          <div className={`sticky top-0 z-10 p-4 border-b flex items-center justify-between backdrop-blur-md bg-white/90 ${isValid ? 'border-emerald-200' : 'border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Points to assign</span>
              <span className={`text-2xl font-bold ${remaining === 0 ? 'text-emerald-600' : remaining < 0 ? 'text-red-500' : 'text-indigo-600'}`}>
                {remaining}
              </span>
            </div>
            {isValid ? (
              <div className="flex items-center text-emerald-600 text-sm font-medium gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-4 h-4" /> Perfect
              </div>
            ) : (
              <div className={`flex items-center text-sm font-medium gap-1.5 px-3 py-1.5 rounded-full ${remaining < 0 ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50'}`}>
                <AlertCircle className="w-4 h-4" /> {remaining < 0 ? 'Too many points' : 'Need more points'}
              </div>
            )}
          </div>

          {/* Questions */}
          <div className="p-6 md:p-8 space-y-4">
            {section.questions.map((q) => (
              <div key={q.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group">
                <div className="flex-shrink-0 pt-1">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                    {q.id}
                  </span>
                </div>
                <div className="flex-grow">
                  <p className="text-slate-700 leading-relaxed">{q.text}</p>
                </div>
                <div className="flex-shrink-0">
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={answers[currentStep][q.id] || ''}
                    onChange={(e) => handleInputChange(currentStep, q.id, e.target.value)}
                    className="w-16 h-12 text-center text-lg font-semibold bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors ${currentStep === 0 ? 'text-slate-400 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'}`}
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isValid}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${isValid ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
              {currentStep === questionnaire.length - 1 ? 'See Results' : 'Next Section'} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
