# Belbin Team Roles Assessment — App Improvement Plan

## 1. Product direction

Transform the current questionnaire into a modern **team-role intelligence tool for software and IT organizations**.

The improved product should help a person answer three practical questions:

1. How do I naturally contribute to an IT team?
2. Where could my working style create delivery or collaboration risks?
3. How can I apply this insight in discovery, engineering, delivery, release, and operations?

For team leads, a later team workspace should answer:

1. Which contribution patterns are strong or underrepresented across the team?
2. Where could the team be exposed during a specific phase of the software-delivery lifecycle?
3. What concrete working agreements or staffing conversations should happen next?

### Product principles

- **Insight before decoration:** every visual must help a user compare, diagnose, or act.
- **IT-specific, not job-prescriptive:** a Belbin role is a behavioral contribution, not a job title or proof of technical ability.
- **Actionable results:** explain what to do next, not only what a score means.
- **Calm, credible design:** use a professional technology-product aesthetic instead of generic white cards.
- **Private by default:** individual results remain private unless the person explicitly shares them.
- **Accessible throughout:** keyboard support, strong contrast, visible focus, readable charts, and text alternatives.

## 2. Current-state assessment

### What already works

- The seven-section, ten-point allocation model is implemented clearly.
- Users receive immediate feedback about unallocated points.
- Back/next navigation is simple.
- Results include a radar chart, a top-three ranking, and basic role descriptions.
- The interface is responsive and has a consistent indigo/slate visual theme.

### Main shortcomings

| Area | Current limitation | User impact |
|---|---|---|
| Positioning | Generic teamwork language | Little relevance to software delivery or IT careers |
| Onboarding | One dense instruction panel and immediate start | Low context, trust, and motivation |
| Assessment input | Eight small number fields per section | High mental effort and weak touch usability |
| Progress | Shows section progress only; first page starts at 0% | Does not communicate effort, saved state, or completion confidence |
| Results | Radar chart plus repeated cards | Visually busy but analytically shallow |
| Interpretation | Static strengths and weaknesses | No IT examples, delivery implications, or next actions |
| Comparison | Radar scale changes with the user's maximum | Profiles are difficult to compare consistently |
| Team value | Only individual results | No team coverage, complementarity, or risk view |
| Accessibility | Inputs have no explicit labels and charts lack an equivalent data table | Harder to use with assistive technology |
| Persistence | Refreshing loses the assessment | Frustrating on a seven-section form |
| Content model | The UI scores eight roles while the README describes nine | Product documentation does not match the chosen assessment scope |
| Architecture | Questionnaire, copy, scoring, and every screen live in one component | Content and UX changes will become progressively riskier |

### Confirmed assessment scope

The product will retain its existing **eight-role, seven-section questionnaire and current ten-point allocation logic**. The Specialist role will not be added, and the scoring model will not be changed as part of this redesign.

The eight assessed roles are:

- Resource Investigator (RI)
- Teamworker (TW)
- Co-ordinator (CO)
- Plant (PL)
- Monitor Evaluator (ME)
- Shaper (SH)
- Implementer (IMP)
- Completer Finisher (CF)

Product and interface copy must describe the result as an **eight-role team contribution profile**. It must not state that the assessment measures all nine roles or show Specialist as an unscored/zero result. The README, onboarding, results explanations, chart legends, exports, and metadata should all use the same eight-role scope.

The existing scoring behavior remains the source of truth:

```text
section total = 10 points
number of sections = 7
profile total = 70 points
role score = sum of every answer mapped to that role
```

Ties must be preserved. When several roles share a top score, the results should describe them as co-leading roles instead of arbitrarily presenting one as stronger.

Before public or commercial distribution, separately confirm that the product has the required rights to use its questionnaire wording, framework name, and role descriptions. This release check does not require changing the chosen eight-role product scope.

## 3. Target users and use cases

### Individual contributor

Examples: software engineer, QA engineer, product designer, data analyst, security engineer, SRE, support engineer.

- Understand preferred contribution patterns.
- Prepare for a career or performance conversation.
- Identify collaboration risks under deadline pressure.
- Generate a personal development experiment for the next sprint.

### Engineering or IT manager

- Discuss team composition without ranking people as “better” or “worse.”
- See which delivery stages may lack behavioral coverage.
- Improve delegation, meeting structure, and incident responsibilities.
- Create working agreements based on complementary styles.

### People/learning partner

- Facilitate a workshop for a cohort or department.
- Export an anonymized team summary.
- Track completion without exposing private answers.

## 4. Proposed information architecture

### Individual experience — first release

1. **Welcome** — clear value proposition, duration, privacy note, and “How it works.”
2. **Work context** — optional selection of function and work setting.
3. **Assessment** — one section at a time with easier point allocation and autosave.
4. **Results overview** — primary roles, balance, confidence/context note, and key takeaway.
5. **IT application** — contributions, watchouts, collaboration tips, and delivery-stage relevance.
6. **Action plan** — choose one strength to apply and one risk to manage in the next sprint.
7. **Share/export** — accessible PDF or private link, with explicit consent.

Suggested IT functions:

- Software engineering
- Product management
- UX/product design
- Quality engineering
- Data and AI
- DevOps/SRE/platform
- Cybersecurity
- IT operations and support
- Technology leadership

The selected function should change examples and recommendations, not the underlying score.

### Team experience — later release

1. Team overview
2. Role coverage and concentration
3. Software-delivery lifecycle coverage
4. Collaboration pairs and likely tension points
5. Facilitated discussion prompts
6. Anonymized export and team settings

## 5. UX redesign

### Welcome and onboarding

- Lead with a direct promise: **“Understand how you contribute to software teams—and where your team may need balance.”**
- Show “7 sections · about 8 minutes · autosaved locally.”
- Add a small example that demonstrates distributing ten points.
- Explain that the result describes behavior, not seniority, personality, or technical competence.
- Place framework attribution and privacy information in a secondary details area.

### Assessment interaction

Replace bare number inputs with a purpose-built point allocator:

- Each statement is a selectable row with **minus, score, and plus** controls.
- Keep direct numeric entry available for keyboard users.
- Show a persistent circular “points remaining” indicator.
- Add “Clear section” and “Distribute evenly” only if user testing supports them.
- Make the entire statement row focusable and associate every control with a full accessible label.
- Warn before leaving only when unsaved state exists; otherwise autosave locally after every change.
- Allow navigation back to completed sections through a compact stepper.
- On mobile, keep the remaining-points indicator and next action reachable without covering content.

Helpful microcopy:

- “Assign more points to statements that sound most like you.”
- “You can leave a statement at zero.”
- “2 points left to assign.”
- “Section complete—continue when ready.”

### Results hierarchy

The results page should tell a story in this order:

1. **Your headline:** top contribution pattern and a short plain-language interpretation.
2. **Your top three roles:** scores, differences between them, and whether scores are close.
3. **Your overall profile:** all roles on a common fixed scale.
4. **How this shows up in IT work:** practical examples by delivery stage.
5. **Potential watchouts:** balanced, non-judgmental risk statements.
6. **Best collaboration matches:** what complementary contributions help.
7. **Next sprint experiment:** one specific action the user can save or export.

Avoid declaring a single role as a permanent identity. Use language such as “Your responses suggest…” and explain that context can change behavior.

## 6. Visualization strategy

The radar chart can remain as an optional profile “shape,” but it should not be the primary analytical view.

### Individual results

| Visualization | Purpose | Design notes |
|---|---|---|
| Ranked horizontal bar chart | Make all role scores easy to compare | Fixed 0–70 scale; direct value labels; highlight top three |
| Contribution-orientation bar | Summarize Action, People, and Thinking balance | Three-part normalized bar with a short interpretation |
| Software-delivery lifecycle heatmap | Show where the user's contribution patterns may help | Columns: Discover, Decide, Build, Validate, Release, Operate |
| Top-role composition | Show whether top scores are distinct or tightly grouped | Compact bars with the score gap, not a decorative donut |
| Strength/watchout pair | Connect an advantage to its possible overuse | Two-sided card with a concrete IT example |
| Accessible score table | Provide exact values and a non-visual alternative | Sortable, screen-reader-friendly, included in export |

### Team results

| Visualization | Decision it supports |
|---|---|
| Team role coverage matrix | Which contribution patterns are present, concentrated, or missing? |
| Member × role heatmap | Who can be invited to contribute in a particular way? |
| Lifecycle coverage heatmap | Where could the team struggle from discovery through operations? |
| Concentration/risk flags | Is the team overly dependent on one or two people for a behavior? |
| Team profile distribution | Is a role broadly shared or isolated in one individual? |

Do not use a single “team score.” Avoid red/green labels that imply people are failures or successes. Use neutral states such as **well represented**, **concentrated**, and **worth discussing**.

### Visualization rules

- Use a stable scale for every comparable chart.
- Label values directly where possible instead of relying on hover.
- Never communicate meaning with color alone.
- Provide a one-sentence interpretation below each chart.
- Explain the calculation in an expandable “How this is calculated” area.
- Export charts with their titles, legends, and text summaries.

## 7. IT-industry interpretation model

The mapping below is editorial guidance for contextual copy. It should be reviewed by a qualified facilitator and presented as examples, not deterministic assignments.

| Role | Possible contribution in IT work | Possible overuse/watchout |
|---|---|---|
| Resource Investigator | Scouting tools, vendors, practices, communities, and external expertise | Chasing new tools without follow-through |
| Teamworker | Cross-functional collaboration, handoffs, pairing, and incident-team cohesion | Avoiding a necessary technical or process conflict |
| Co-ordinator | Clarifying outcomes, ownership, stakeholder alignment, and delegation | Over-delegating or appearing detached from execution |
| Plant | Novel architecture ideas, prototypes, hard-problem exploration | Underweighting constraints, operability, or documentation |
| Monitor Evaluator | Architecture trade-offs, ADRs, vendor evaluation, and risk analysis | Analysis delay or communication that feels overly critical |
| Shaper | Unblocking delivery, driving decisions, and leading under incident pressure | Creating unnecessary urgency or interpersonal friction |
| Implementer | Turning roadmaps into executable plans, repeatable processes, and adoption | Preserving a plan after assumptions have changed |
| Completer Finisher | Quality, testing, release readiness, security hygiene, and edge cases | Becoming a bottleneck or over-polishing low-risk work |

### Example action recommendation structure

Every recommendation should include:

- **Situation:** “During sprint planning…”
- **Use your strength:** “Turn ambiguous work into a concrete implementation sequence.”
- **Watch for:** “Locking the team into the first workable plan.”
- **Try this:** “Ask which assumption is most likely to change before confirming the plan.”

## 8. Visual design direction

### Design character

Use an **editorial analytics** style: confident typography, structured data, spacious layouts, and subtle technical motifs. The product should feel closer to a modern engineering-intelligence platform than a generic online quiz.

### Suggested design system

- **Canvas:** soft cool gray with a faint grid or radial gradient used sparingly.
- **Primary surfaces:** deep navy navigation and warm white content panels.
- **Accent:** electric blue for actions; teal and violet for analytical categories.
- **Semantic colors:** amber for attention, rose for risk, emerald for completion—always paired with text/icons.
- **Typography:** a clean sans serif such as Inter or Geist; tabular numerals for scores.
- **Shape:** 12–16px radii, thin borders, restrained shadow, clear surface hierarchy.
- **Motion:** short state transitions for allocation, progress, and chart entry; respect reduced-motion settings.
- **Iconography:** one consistent line-icon family, used as navigation support rather than decoration.

### Layout changes

- Add a compact product header with assessment status and help.
- Replace the centered “card on gray” pattern with a responsive two-column assessment layout on desktop.
- Keep guidance and points remaining in a sticky side panel; place statements in the main column.
- On results, use one strong insight header followed by a 12-column analytical grid.
- Reduce repeated card styling; use sections, dividers, and typography to create hierarchy.

### Responsive behavior

- Desktop: sticky context panel plus questionnaire/results canvas.
- Tablet: collapsible context panel above content.
- Mobile: single column, 44px minimum targets, sticky bottom summary/action area.
- Charts must reflow into bars or tables when radial layouts become unreadable.

## 9. Content and trust improvements

- Add a plain-language framework explanation and attribution.
- State what the assessment can and cannot conclude.
- Explain how scores are calculated and why they total 70.
- Replace “Perfect” after point allocation with the more neutral “10 points assigned.”
- Use “possible watchout” instead of language that feels diagnostic.
- Describe data storage, retention, sharing, and deletion before collecting identifiable information.
- Do not show an individual answer-level breakdown to managers without explicit informed consent.
- For team views, require a minimum group size before showing aggregated insights.

## 10. Technical improvement plan

### Refactor the current single component

Suggested structure:

```text
src/
  app/
    App.tsx
    routes.tsx
  components/
    assessment/
    charts/
    results/
    ui/
  data/
    questionnaire.ts
    roles.ts
    it-context.ts
  domain/
    scoring.ts
    interpretations.ts
    types.ts
  hooks/
    useAssessment.ts
    useLocalDraft.ts
  pages/
    WelcomePage.tsx
    ContextPage.tsx
    AssessmentPage.tsx
    ResultsPage.tsx
  styles/
    tokens.css
  tests/
```

### Engineering priorities

- Extract content and scoring from the UI.
- Define versioned assessment and result schemas.
- Add route-level screens so refresh/back navigation behaves predictably.
- Save a draft locally with schema version and timestamp.
- Add deterministic unit tests for scoring, ties, empty data, and section totals.
- Add component tests for allocation, validation, keyboard use, and resume.
- Add end-to-end tests for complete assessment and export flows.
- Remove unused dependencies/imports and keep bundle size visible in CI.
- Add automated accessibility checks plus manual keyboard and screen-reader QA.
- Instrument only consented, non-sensitive product analytics.

### Data model for a future team workspace

- `assessmentVersion`
- `resultId`
- `memberId` or anonymous participant token
- `teamId`
- `context` (function, work setting, optional seniority band)
- `roleScores`
- `consentScope`
- `createdAt` and `deletedAt`

Store derived scores separately from raw answers when possible, and define a clear deletion flow.

## 11. Delivery roadmap

### Phase 0 — eight-role foundations (2–4 days)

- Confirm product audience and public/commercial use.
- Document the existing seven-section, eight-role scoring model as the source of truth.
- Align the README, metadata, onboarding, results, and exports to the eight-role scope.
- Confirm usage rights for the existing questionnaire and role content before public or commercial distribution.
- Establish baseline usability, completion, accessibility, and performance measures.

**Exit criteria:** every product surface describes the same eight-role assessment, and automated scoring fixtures reproduce known questionnaire results.

### Phase 1 — modern individual assessment (1 sprint)

- Introduce the visual system and responsive app shell.
- Redesign welcome and instructions.
- Build the improved ten-point allocator, section navigator, and autosave/resume around the existing questions.
- Improve validation, focus management, keyboard behavior, and mobile controls.
- Refactor content and scoring out of the main component.

**Exit criteria:** a user can complete the existing assessment on mobile or desktop, resume after refresh, and finish entirely by keyboard without changing the resulting role scores.

### Phase 2 — informative IT results (1–2 sprints)

- Add IT function/context selection.
- Make ranked bars the primary result chart.
- Add orientation balance, lifecycle heatmap, and exact score table.
- Write IT-specific contribution, watchout, and collaboration guidance.
- Add a one-sprint action-plan builder and accessible export.

**Exit criteria:** every chart has a decision purpose and text alternative; each top role produces at least one relevant IT example and one concrete action.

### Phase 3 — team intelligence (2–3 sprints)

- Add team creation, private invitations, consent, and result sharing.
- Build team coverage, concentration, and lifecycle views.
- Add facilitation prompts and anonymized export.
- Apply minimum-group-size privacy rules.

**Exit criteria:** a manager can discuss coverage and working agreements without seeing private raw responses or receiving an employee ranking.

### Phase 4 — validation and optimization (ongoing)

- Test interpretation language with IT practitioners and facilitators.
- Run usability sessions across engineering, product, QA, operations, and security.
- Tune onboarding and assessment interactions based on funnel data.
- Conduct accessibility, privacy, security, and performance reviews.

## 12. Prioritized backlog

### P0 — required for a credible relaunch

- Documented eight-role scoring rules and regression fixtures
- Eight-role wording aligned across the app and documentation
- Usage-rights review before public or commercial distribution
- Responsive design system and app shell
- Accessible ten-point allocation controls using the current questions
- Autosave and resume
- Fixed-scale ranked results chart
- IT-specific result interpretation
- Scoring and accessibility tests

### P1 — high-value follow-up

- Delivery-lifecycle heatmap
- Personal sprint action plan
- Accessible PDF/export
- Share controls and privacy settings
- Team role coverage view

### P2 — expansion

- Facilitated workshop mode
- Longitudinal reassessment comparison
- SSO and organization administration
- HR/LMS integrations
- Localization

## 13. Success measures

### Product

- Assessment start-to-completion rate
- Median completion time and section abandonment
- Draft resume success rate
- Percentage of users who save an action or view IT guidance
- Result usefulness score: “I know how to apply this in my work”
- Team discussion/workshop completion rate

### Quality

- Zero critical automated accessibility violations
- Full assessment completion with keyboard only
- No horizontal overflow at 320px width
- Core Web Vitals in the “good” range on typical mobile hardware
- 100% deterministic scoring test coverage across roles and ties
- Zero analytics events containing raw answers or free-text personal data

## 14. Recommended first release

Keep the first release intentionally focused:

- Modern welcome and assessment flow
- Existing seven-section, eight-role assessment and scoring
- Optional IT-function context
- Autosave/resume
- Ranked role profile and optional radar view
- Action/People/Thinking balance
- IT delivery-lifecycle heatmap
- Top-three role guidance with strengths, watchouts, collaboration advice, and a next-sprint action
- Accessible score table and export

Defer accounts, team dashboards, SSO, and integrations until the individual experience and interpretation language have been validated with real IT users.
