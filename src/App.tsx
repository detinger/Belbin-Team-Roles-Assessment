import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronDown,
  Lightbulb,
  LockKeyhole,
  Minus,
  Plus,
  Printer,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  deliveryStages,
  questionnaire,
  roleInfo,
  roleOrder,
  type RoleCode,
} from './data';

type Answers = Record<number, Record<string, number>>;

type AssessmentResult = {
  role: RoleCode;
  score: number;
  name: string;
  shortName: string;
  color: string;
};

type SavedDraft = {
  answers: Answers;
  step: number;
  maxVisited: number;
  context: string;
  savedAt: string;
};

const STORAGE_KEY = 'team-signals-eight-role-draft-v1';

const contextOptions = [
  'Software engineering',
  'Product & design',
  'Data & AI',
  'DevOps, SRE & platform',
  'Cybersecurity',
  'IT operations & support',
  'Technology leadership',
];

const createEmptyAnswers = (): Answers =>
  Object.fromEntries(
    questionnaire.map((section, sectionIndex) => [
      sectionIndex,
      Object.fromEntries(section.questions.map((question) => [question.id, 0])),
    ]),
  );

const loadDraft = (): SavedDraft | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedDraft) : null;
  } catch {
    return null;
  }
};

function Brand({ onHome }: { onHome?: () => void }) {
  const content = (
    <>
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-copy">
        <strong>TeamSignals</strong>
        <small>for technology teams</small>
      </span>
    </>
  );

  if (onHome) {
    return (
      <button type="button" className="brand brand-button" onClick={onHome} aria-label="Return to TeamSignals home">
        {content}
      </button>
    );
  }

  return <div className="brand">{content}</div>;
}

function AppHeader({ label, onHome }: { label?: string; onHome?: () => void }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <Brand onHome={onHome} />
        <div className="header-meta">
          {label && <span className="header-status">{label}</span>}
          <span className="privacy-note"><LockKeyhole size={14} /> Saved on this device</span>
        </div>
      </div>
    </header>
  );
}

function LandingPage({
  context,
  onContextChange,
  onStart,
  onResume,
  resumeStep,
}: {
  context: string;
  onContextChange: (context: string) => void;
  onStart: () => void;
  onResume: (() => void) | null;
  resumeStep: number;
}) {
  return (
    <div className="landing-page">
      <AppHeader />
      <main>
        <section className="hero section-shell">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Eight-role team profile</div>
            <h1>
              <span className="hero-title-lead">See how you make</span>
              <span className="hero-title-accent">technology teams work.</span>
            </h1>
            <p className="hero-lede">
              Discover the contribution patterns you bring to software delivery—then turn them into better decisions, stronger collaboration, and a practical next step.
            </p>

            <div className="context-picker">
              <label htmlFor="work-context">Your technology context</label>
              <div className="context-select">
                <select id="work-context" value={context} onChange={(event) => onContextChange(event.target.value)}>
                  {contextOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                <ChevronDown className="context-select-icon" size={18} strokeWidth={2.25} aria-hidden="true" />
              </div>
            </div>

            <div className="hero-actions">
              <button className="primary-button" onClick={onResume ?? onStart}>
                {onResume ? (resumeStep >= questionnaire.length ? 'View saved profile' : `Resume section ${resumeStep + 1}`) : 'Start my profile'}
                <ArrowRight size={19} />
              </button>
              {onResume && (
                <button className="text-button" onClick={onStart}>
                  Start fresh
                </button>
              )}
            </div>

            <div className="hero-stats" aria-label="Assessment details">
              <div><strong>7</strong><span>short sections</span></div>
              <div><strong>8</strong><span>team roles</span></div>
              <div><strong>~8</strong><span>minutes</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="A collection of team role illustrations">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-core">
              <span>YOUR</span>
              <strong>TEAM<br />SIGNAL</strong>
              <small>8-role profile</small>
            </div>
            <img className="hero-role hero-role-ri" src={roleInfo.RI.image} alt="Resource Investigator role illustration" />
            <img className="hero-role hero-role-pl" src={roleInfo.PL.image} alt="Plant role illustration" />
            <img className="hero-role hero-role-co" src={roleInfo.CO.image} alt="Co-ordinator role illustration" />
            <img className="hero-role hero-role-cf" src={roleInfo.CF.image} alt="Completer Finisher role illustration" />
            <span className="float-pill pill-one">Explore</span>
            <span className="float-pill pill-two">Connect</span>
            <span className="float-pill pill-three">Deliver</span>
          </div>
        </section>

        <section className="trust-strip section-shell" aria-label="Assessment principles">
          <div><ShieldCheck size={19} /><span><strong>Behavior, not personality</strong> A snapshot of how you contribute right now.</span></div>
          <div><BrainCircuit size={19} /><span><strong>Built for IT work</strong> Results mapped to the delivery lifecycle.</span></div>
          <div><LockKeyhole size={19} /><span><strong>Private by design</strong> Your draft stays in this browser.</span></div>
        </section>

        <section className="how-it-works section-shell">
          <div className="section-heading">
            <div>
              <span className="kicker">A clearer way to reflect</span>
              <h2>From instinct to useful insight</h2>
            </div>
            <p>Distribute ten points in each section. Your choices build a profile of the eight contribution patterns you rely on most.</p>
          </div>
          <div className="feature-grid">
            <article>
              <span className="feature-number">01</span>
              <div className="feature-icon blue"><Target /></div>
              <h3>Prioritize what feels true</h3>
              <p>Give more points to the statements that best reflect how you actually behave in teams.</p>
            </article>
            <article>
              <span className="feature-number">02</span>
              <div className="feature-icon violet"><BarChart3 /></div>
              <h3>Read your contribution mix</h3>
              <p>Compare your eight role scores with direct, accessible charts and practical interpretation.</p>
            </article>
            <article>
              <span className="feature-number">03</span>
              <div className="feature-icon coral"><Rocket /></div>
              <h3>Apply it next sprint</h3>
              <p>See where your strengths support delivery and choose one concrete behavior to practice.</p>
            </article>
          </div>
        </section>

        <section className="role-preview section-shell">
          <div className="section-heading compact">
            <div>
              <span className="kicker">Your possible roles</span>
              <h2>Eight ways to move a team forward</h2>
            </div>
          </div>
          <div className="role-preview-grid">
            {roleOrder.map((code) => {
              const role = roleInfo[code];
              return (
                <article className="role-preview-card" key={code}>
                  <div style={{ background: role.softColor }}><img src={role.image} alt="" /></div>
                  <span>{role.category}</span>
                  <h3>{role.name}</h3>
                  <p>{role.shortName}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <footer className="site-footer section-shell">
        <Brand />
        <p>Eight-role team contribution assessment for modern technology teams.</p>
      </footer>
    </div>
  );
}

function PointsRing({ total }: { total: number }) {
  const remaining = 10 - total;
  const angle = Math.min(total, 10) * 36;
  return (
    <div
      className={`points-ring ${remaining === 0 ? 'complete' : ''}`}
      style={{ '--ring-angle': `${angle}deg` } as CSSProperties}
      aria-label={`${remaining} points remaining`}
    >
      <div>
        <strong>{remaining}</strong>
        <span>{remaining === 1 ? 'point left' : 'points left'}</span>
      </div>
    </div>
  );
}

function AssessmentPage({
  step,
  maxVisited,
  answers,
  onSetAnswer,
  onStepChange,
  onContinue,
  onHome,
}: {
  step: number;
  maxVisited: number;
  answers: Answers;
  onSetAnswer: (questionId: string, value: number) => void;
  onStepChange: (step: number) => void;
  onContinue: () => void;
  onHome: () => void;
}) {
  const section = questionnaire[step];
  const sectionAnswers = answers[step];
  const total = Object.values(sectionAnswers).reduce((sum, score) => sum + score, 0);
  const isComplete = total === 10;
  const completedSections = questionnaire.filter((_, index) =>
    Object.values(answers[index]).reduce((sum, score) => sum + score, 0) === 10,
  ).length;

  return (
    <div className="assessment-page">
      <AppHeader label={`Section ${step + 1} of ${questionnaire.length}`} onHome={onHome} />
      <main className="assessment-shell">
        <aside className="assessment-sidebar">
          <div className="sidebar-sticky">
            <span className="kicker">Your progress</span>
            <h2>{completedSections} of {questionnaire.length} sections complete</h2>
            <div className="section-nav" aria-label="Assessment sections">
              {questionnaire.map((item, index) => {
                const sectionTotal = Object.values(answers[index]).reduce((sum, score) => sum + score, 0);
                const canVisit = index <= maxVisited;
                return (
                  <button
                    key={item.eyebrow}
                    className={`${index === step ? 'active' : ''} ${sectionTotal === 10 ? 'done' : ''}`}
                    onClick={() => canVisit && onStepChange(index)}
                    disabled={!canVisit}
                    aria-label={`Section ${index + 1}: ${item.eyebrow}${sectionTotal === 10 ? ', complete' : ''}`}
                  >
                    <span>{sectionTotal === 10 ? <Check size={14} /> : index + 1}</span>
                    <div><strong>{item.eyebrow}</strong><small>{sectionTotal}/10 points</small></div>
                  </button>
                );
              })}
            </div>
            <div className="autosave-callout"><LockKeyhole size={16} /><span>Your progress saves automatically on this device.</span></div>
          </div>
        </aside>

        <section className="question-panel">
          <div className="question-header">
            <div>
              <span className="kicker">Section {step + 1} · {section.eyebrow}</span>
              <h1>{section.title}</h1>
              <p>Distribute exactly 10 points. Give more to statements that sound most like you.</p>
            </div>
            <PointsRing total={total} />
          </div>

          <div className="mobile-points-bar">
            <span>{10 - total} points left</span>
            <div><span style={{ width: `${total * 10}%` }} /></div>
            <strong>{total}/10</strong>
          </div>

          <div className="question-list">
            {section.questions.map((question, index) => {
              const value = sectionAnswers[question.id] ?? 0;
              const canIncrease = total < 10 && value < 10;
              return (
                <article className={`question-row ${value > 0 ? 'has-value' : ''}`} key={question.id}>
                  <span className="question-index">{String(index + 1).padStart(2, '0')}</span>
                  <label htmlFor={`question-${step}-${question.id}`}>{question.text}</label>
                  <div className="point-stepper">
                    <button
                      type="button"
                      onClick={() => onSetAnswer(question.id, value - 1)}
                      disabled={value === 0}
                      aria-label={`Remove one point from statement ${index + 1}`}
                    ><Minus size={16} /></button>
                    <input
                      id={`question-${step}-${question.id}`}
                      type="number"
                      min="0"
                      max="10"
                      inputMode="numeric"
                      value={value}
                      onChange={(event) => onSetAnswer(question.id, Number(event.target.value))}
                      aria-label={`Points for: ${question.text}`}
                    />
                    <button
                      type="button"
                      onClick={() => onSetAnswer(question.id, value + 1)}
                      disabled={!canIncrease}
                      aria-label={`Add one point to statement ${index + 1}`}
                    ><Plus size={16} /></button>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="assessment-actions">
            <button className="secondary-button" onClick={() => onStepChange(step - 1)} disabled={step === 0}>
              <ArrowLeft size={18} /> Back
            </button>
            <div className={`completion-message ${isComplete ? 'ready' : ''}`} aria-live="polite">
              {isComplete ? <><Check size={16} /> 10 points assigned</> : `${10 - total} points still to assign`}
            </div>
            <button className="primary-button" onClick={onContinue} disabled={!isComplete}>
              {step === questionnaire.length - 1 ? 'Reveal my profile' : 'Continue'} <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function ScoreTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: AssessmentResult }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="chart-tooltip">
      <strong>{item.name}</strong>
      <span>{item.score} of 70 points</span>
    </div>
  );
}

function ResultPage({
  results,
  context,
  onRetake,
  onHome,
}: {
  results: AssessmentResult[];
  context: string;
  onRetake: () => void;
  onHome: () => void;
}) {
  const topRoles = results.slice(0, 3);
  const maxScore = results[0].score;
  const leaders = results.filter((result) => result.score === maxScore);
  const headline = leaders.length > 1
    ? `${leaders.map((item) => item.shortName).join(' + ')} lead your profile`
    : `You lead as an ${topRoles[0].shortName}`;

  const categoryScores = [
    { name: 'Connect', label: 'People roles', color: '#22B8CF', roles: ['RI', 'TW', 'CO'] as RoleCode[] },
    { name: 'Think', label: 'Thinking roles', color: '#8668F4', roles: ['PL', 'ME'] as RoleCode[] },
    { name: 'Deliver', label: 'Action roles', color: '#F27469', roles: ['SH', 'IMP', 'CF'] as RoleCode[] },
  ].map((category) => ({
    ...category,
    value: category.roles.reduce((sum, code) => sum + (results.find((result) => result.role === code)?.score ?? 0), 0),
  }));

  return (
    <div className="results-page">
      <AppHeader label="Profile complete" onHome={onHome} />
      <main className="results-shell">
        <section className="results-hero">
          <div className="results-hero-copy">
            <span className="eyebrow"><Sparkles size={15} /> Your team signal</span>
            <h1>{headline}</h1>
            <p>
              Your strongest contributions combine <strong>{topRoles[0].name}</strong>, <strong>{topRoles[1].name}</strong>, and <strong>{topRoles[2].name}</strong> behaviors in a {context.toLowerCase()} context.
            </p>
            <div className="results-actions">
              <button className="primary-button" onClick={() => window.print()}><Printer size={17} /> Print profile</button>
              <button className="secondary-button" onClick={onRetake}><RefreshCw size={17} /> Retake</button>
            </div>
          </div>
          <div className="top-role-art" style={{ '--role-color': roleInfo[topRoles[0].role].color, '--role-soft': roleInfo[topRoles[0].role].softColor } as CSSProperties}>
            <span className="rank-badge">TOP ROLE · {topRoles[0].role}</span>
            <img src={roleInfo[topRoles[0].role].image} alt={`${topRoles[0].name} illustration`} />
            <div><strong>{topRoles[0].score}</strong><span>of 70 points</span></div>
          </div>
        </section>

        <section className="results-grid profile-overview">
          <article className="panel score-panel">
            <div className="panel-heading">
              <div><span className="kicker">Full profile</span><h2>Your role distribution</h2></div>
              <span className="panel-note">Fixed 0–70 scale</span>
            </div>
            <div className="score-chart" role="img" aria-label="Horizontal bar chart showing all eight role scores">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={results} layout="vertical" margin={{ top: 6, right: 24, left: 6, bottom: 4 }}>
                  <CartesianGrid stroke="#E7EAF0" horizontal={false} strokeDasharray="3 5" />
                  <XAxis type="number" domain={[0, 70]} tick={{ fill: '#7A8497', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="role" width={42} tick={{ fill: '#253047', fontSize: 12, fontWeight: 750 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<ScoreTooltip />} cursor={{ fill: '#F6F8FC' }} />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={18}>
                    {results.map((entry) => <Cell key={entry.role} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="score-table-wrap">
              <table className="sr-score-table">
                <caption>Exact team role scores</caption>
                <thead><tr><th>Role</th><th>Score</th></tr></thead>
                <tbody>{results.map((result) => <tr key={result.role}><td>{result.name}</td><td>{result.score}</td></tr>)}</tbody>
              </table>
            </div>
          </article>

          <article className="panel balance-panel">
            <div className="panel-heading">
              <div><span className="kicker">Work style</span><h2>Where your energy goes</h2></div>
            </div>
            <p className="panel-intro">A simple view of how your scores group across people, thinking, and action-oriented contributions.</p>
            <div className="balance-list">
              {categoryScores.map((category) => (
                <div className="balance-item" key={category.name}>
                  <div><strong>{category.name}</strong><span>{category.label}</span><b>{category.value}</b></div>
                  <div className="balance-track"><span style={{ width: `${(category.value / 70) * 100}%`, background: category.color }} /></div>
                </div>
              ))}
            </div>
            <div className="balance-note"><Lightbulb size={18} /><p>A lower category is not a flaw. It shows where complementary teammates can make the group more versatile.</p></div>
          </article>
        </section>

        <section className="top-three-section">
          <div className="section-heading compact">
            <div><span className="kicker">Your strongest signals</span><h2>Top three roles</h2></div>
            <p>These are contribution patterns—not fixed personality types. Use them as a starting point for better conversations.</p>
          </div>
          <div className="top-role-grid">
            {topRoles.map((result, index) => {
              const role = roleInfo[result.role];
              return (
                <article className="top-role-card" key={result.role} style={{ '--role-color': role.color, '--role-soft': role.softColor } as CSSProperties}>
                  <div className="top-role-card-head">
                    <span className="rank-number">0{index + 1}</span>
                    <img src={role.image} alt={`${role.name} role illustration`} />
                    <span className="score-pill">{result.score} pts</span>
                  </div>
                  <div className="top-role-card-body">
                    <span className="role-category">{role.category} role · {role.code}</span>
                    <h3>{role.name}</h3>
                    <p>{role.description}</p>
                    <div className="insight-block"><strong>In IT delivery</strong><span>{role.itContribution}</span></div>
                    <div className="watchout-block"><strong>Watch for</strong><span>{role.weaknesses}</span></div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="panel lifecycle-panel">
          <div className="panel-heading">
            <div><span className="kicker">Applied to technology work</span><h2>Your software-delivery contribution map</h2></div>
            <span className="panel-note">Top 3 roles</span>
          </div>
          <p className="panel-intro">Where each leading role is most likely to add value across a typical delivery lifecycle. This is guidance, not a measure of technical ability.</p>
          <div className="heatmap" role="table" aria-label="Top role relevance across the software delivery lifecycle">
            <div className="heatmap-row heatmap-header" role="row">
              <span role="columnheader">Role</span>
              {deliveryStages.map((stage) => <span role="columnheader" key={stage}>{stage}</span>)}
            </div>
            {topRoles.map((result) => {
              const role = roleInfo[result.role];
              return (
                <div className="heatmap-row" role="row" key={result.role}>
                  <span className="heatmap-role" role="rowheader"><i style={{ background: role.color }} /> {role.shortName}</span>
                  {role.delivery.map((value, index) => (
                    <span
                      key={deliveryStages[index]}
                      className={`heat-cell level-${value}`}
                      style={{ '--heat-color': role.color } as CSSProperties}
                      role="cell"
                      aria-label={`${role.name}: ${deliveryStages[index]} relevance ${value} of 3`}
                    ><b>{value === 3 ? 'High' : value === 2 ? 'Med' : 'Low'}</b></span>
                  ))}
                </div>
              );
            })}
          </div>
          <div className="heat-legend"><span><i className="level-1" /> Low</span><span><i className="level-2" /> Medium</span><span><i className="level-3" /> High</span></div>
        </section>

        <section className="action-section">
          <div className="section-heading compact">
            <div><span className="kicker">Make it practical</span><h2>Your next-sprint playbook</h2></div>
          </div>
          <div className="action-grid">
            {topRoles.map((result, index) => {
              const role = roleInfo[result.role];
              return (
                <article key={result.role} className="action-card">
                  <div className="action-icon" style={{ color: role.color, background: role.softColor }}>{index === 0 ? <Rocket /> : index === 1 ? <UsersRound /> : <BrainCircuit />}</div>
                  <span>TRY AS A {role.shortName.toUpperCase()}</span>
                  <h3>{role.sprintAction}</h3>
                  <p><strong>Best with:</strong> {role.collaboration}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="all-roles-section">
          <div className="section-heading compact">
            <div><span className="kicker">Complete profile</span><h2>All eight roles</h2></div>
            <p>Your lower-scoring roles are still available to you; they may simply take more effort or emerge in a different context.</p>
          </div>
          <div className="all-role-grid">
            {results.map((result) => {
              const role = roleInfo[result.role];
              return (
                <article className="all-role-card" key={result.role}>
                  <div className="all-role-art" style={{ background: role.softColor }}><img src={role.image} alt="" /></div>
                  <div className="all-role-copy">
                    <span>{role.code} · {role.category}</span>
                    <h3>{role.name}</h3>
                    <p>{role.description}</p>
                    <div><span style={{ width: `${(result.score / 70) * 100}%`, background: role.color }} /></div>
                  </div>
                  <strong>{result.score}</strong>
                </article>
              );
            })}
          </div>
        </section>

        <section className="results-footer-card">
          <div><span className="kicker">One final thought</span><h2>A strong team is a mix, not a leaderboard.</h2></div>
          <p>Share the language of your strengths, ask teammates what they experience, and use the differences to design better ways of working.</p>
          <button className="secondary-button" onClick={onRetake}><RefreshCw size={17} /> Retake assessment</button>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  const savedDraft = useRef<SavedDraft | null>(loadDraft());
  const [answers, setAnswers] = useState<Answers>(savedDraft.current?.answers ?? createEmptyAnswers());
  const [currentStep, setCurrentStep] = useState(-1);
  const [resumeStep, setResumeStep] = useState(savedDraft.current?.step ?? -1);
  const [maxVisited, setMaxVisited] = useState(savedDraft.current?.maxVisited ?? 0);
  const [context, setContext] = useState(savedDraft.current?.context ?? contextOptions[0]);

  useEffect(() => {
    if (currentStep < 0) return;
    const draft: SavedDraft = {
      answers,
      step: currentStep,
      maxVisited,
      context,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setResumeStep(currentStep);
  }, [answers, context, currentStep, maxVisited]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const results = useMemo<AssessmentResult[]>(() => {
    const scores = Object.fromEntries(roleOrder.map((role) => [role, 0])) as Record<RoleCode, number>;
    questionnaire.forEach((section, sectionIndex) => {
      section.questions.forEach((question) => {
        scores[question.role] += answers[sectionIndex]?.[question.id] ?? 0;
      });
    });
    return roleOrder
      .map((role) => ({
        role,
        score: scores[role],
        name: roleInfo[role].name,
        shortName: roleInfo[role].shortName,
        color: roleInfo[role].color,
      }))
      .sort((a, b) => b.score - a.score || roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  }, [answers]);

  const startFresh = () => {
    const fresh = createEmptyAnswers();
    setAnswers(fresh);
    setMaxVisited(0);
    setCurrentStep(0);
    setResumeStep(0);
  };

  const resume = () => {
    setCurrentStep(Math.max(0, resumeStep));
  };

  const setAnswer = (questionId: string, nextValue: number) => {
    setAnswers((previous) => {
      const sectionAnswers = previous[currentStep];
      const otherTotal = Object.entries(sectionAnswers as Record<string, number>)
        .filter(([id]) => id !== questionId)
        .reduce((sum, [, value]) => sum + value, 0);
      const safeValue = Number.isFinite(nextValue) ? Math.max(0, Math.min(10 - otherTotal, Math.round(nextValue))) : 0;
      return {
        ...previous,
        [currentStep]: { ...sectionAnswers, [questionId]: safeValue },
      };
    });
  };

  const continueAssessment = () => {
    const next = currentStep + 1;
    setMaxVisited((previous) => Math.max(previous, next));
    setCurrentStep(next);
  };

  const goToStep = (step: number) => {
    if (step < 0 || step >= questionnaire.length || step > maxVisited) return;
    setCurrentStep(step);
  };

  const retake = () => {
    const shouldReset = window.confirm('Clear this profile and start a new assessment?');
    if (!shouldReset) return;
    localStorage.removeItem(STORAGE_KEY);
    startFresh();
  };

  if (currentStep === -1) {
    return (
      <LandingPage
        context={context}
        onContextChange={setContext}
        onStart={startFresh}
        onResume={resumeStep >= 0 ? resume : null}
        resumeStep={resumeStep}
      />
    );
  }

  if (currentStep >= questionnaire.length) {
    return <ResultPage results={results} context={context} onRetake={retake} onHome={() => setCurrentStep(-1)} />;
  }

  return (
    <AssessmentPage
      step={currentStep}
      maxVisited={maxVisited}
      answers={answers}
      onSetAnswer={setAnswer}
      onStepChange={goToStep}
      onContinue={continueAssessment}
      onHome={() => setCurrentStep(-1)}
    />
  );
}
