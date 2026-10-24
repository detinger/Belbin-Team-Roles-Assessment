# TeamSignals

TeamSignals is a modern eight-role team contribution assessment designed for people working in software and IT. It preserves the original seven-section, ten-point questionnaire while turning the result into practical guidance for technology delivery.

## Included roles

- Resource Investigator (RI)
- Teamworker (TW)
- Co-ordinator (CO)
- Plant (PL)
- Monitor Evaluator (ME)
- Shaper (SH)
- Implementer (IMP)
- Completer Finisher (CF)

This product intentionally uses an eight-role profile. It does not calculate or display a Specialist score.

## Product features

- Seven-section assessment with exactly ten points per section
- Accessible plus/minus controls and direct numeric entry
- Local autosave and resume
- Responsive desktop and mobile layouts
- Fixed-scale ranked score visualization
- People, Thinking, and Action contribution balance
- IT-specific role interpretation
- Software-delivery lifecycle heatmap
- Next-sprint recommendations and collaboration prompts
- Eight original transparent PNG role illustrations
- Print-friendly results

## Development

Requirements: a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

The local development server runs at `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Project structure

```text
public/roles/     Generated PNG role illustrations
src/App.tsx       Application screens and interaction logic
src/data.ts       Questionnaire, role content, and IT mappings
src/index.css     Visual system and responsive layouts
```

## Data and privacy

Assessment drafts are stored in the browser's local storage. The current application has no server-side persistence and does not send responses to a remote service.

Before public or commercial distribution, confirm the required rights for the questionnaire wording, framework terminology, and role descriptions.
