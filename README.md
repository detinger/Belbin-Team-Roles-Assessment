# 📊 Belbin Team Roles Assessment

An interactive, user-friendly tool designed to help individuals discover their natural behavioral strengths in a team environment. Based on the widely recognized **Belbin Team Roles** framework, this application provides insights into how you contribute, relate, and work within a group.

---

## 📖 What is it about?

The Belbin Team Roles Assessment is based on the research of Dr. Meredith Belbin, who identified nine specific clusters of behavior (team roles) that are critical for team success. This tool guides you through a self-perception inventory to identify which roles you naturally gravitate towards.

### The Nine Team Roles Covered

* **Action Oriented:** Shaper (SH), Implementer (IMP), Completer Finisher (CF)
* **People Oriented:** Co-ordinator (CO), Teamworker (TW), Resource Investigator (RI)
* **Thought Oriented:** Plant (PL), Monitor Evaluator (ME), Specialist (SP)*
  * *(Note: This tool focuses on the core behavioral roles identified in the interactive questionnaire).*

---

## ✨ Key Features

* **Interactive Questionnaire:** A structured 7-section assessment with real-time point tracking.
* **Dynamic Point Distribution:** Ensures accurate data entry with a "10-point rule" per section.
* **Visual Analytics:** Beautiful Radar Charts (Spider Charts) powered by Recharts to visualize your role distribution.
* **Detailed Insights:** Comprehensive breakdown of your top 3 roles, including:
  * **Strengths:** Your natural contributions.
  * **Allowable Weaknesses:** Areas where you might struggle.
  * **"Don't be Surprised":** How colleagues might perceive your typical behaviors.
* **Modern UI/UX:** A clean, responsive design built with Tailwind CSS, featuring smooth transitions and intuitive navigation.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (Latest LTS recommended)
* npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd Belbin-Team-Roles-Assessment
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🛠️ Technology Stack

* **Framework:** [React 19](https://react.dev/)
* **Build Tool:** [Vite 6](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescript.org/)
* **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Charts:** [Recharts](https://recharts.org/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Animations:** [Motion](https://motion.dev/)

---

## 📝 How to Use

1. **Start the Test:** Click the "Start Questionnaire" button on the landing page.
2. **Distribute Points:** In each of the 7 sections, you have **10 points** to distribute among the 8 behavioral statements.
    * Assign more points to statements that strongly describe you.
    * You can assign 0 points to statements that don't apply.
    * The tool will track your total and alert you if you haven't assigned exactly 10 points.
3. **Navigate Sections:** Use "Next" and "Back" to move through the assessment.
4. **View Results:** After the final section, click "See Results" to view your personalized Team Role Profile.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information (or create one).
