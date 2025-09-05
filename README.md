# GPA & CGPA Calculator – Anna University (M.Sc Integrated CS/IT, Regulation 2023)

This is a **React-based GPA & CGPA Calculator** designed exclusively for **Anna University M.Sc Integrated CS/IT students (Regulation 2023)**.

The calculator allows students to:

* Select their **branch (CS/IT)**
* Choose their **semester**
* Enter **grades for each subject**
* Instantly compute **GPA (for the semester)** and **CGPA (up to that semester)**

It is deployed and hosted using **AWS Amplify**.

---

## Features

* GPA Calculation – For the selected semester.
* CGPA Calculation – Automatically includes all semesters up to the selected one.
* Validation – Alerts if any subject grade is left blank.
* Reset Button – Clear all inputs and start fresh.
* Modern UI – Clean design with custom CSS for ease of use.

---

## Grade Points (Anna University Regulation 2023)

| Grade | Grade Point |
| ----- | ----------- |
| O     | 10          |
| A+    | 9           |
| A     | 8           |
| B+    | 7           |
| B     | 6           |
| C     | 5           |
| RA    | 0           |
| U     | 0           |

*Note: RA = Re-appear, U = Absent*

---

## How to Run Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/gpa-cgpa-calculator.git
   cd gpa-cgpa-calculator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (AWS Amplify)

This project is deployed using **AWS Amplify**.

Steps to deploy:

1. Push your project to GitHub.
2. Login to [AWS Amplify Console](https://aws.amazon.com/amplify/).
3. Connect your GitHub repository.
4. Select the branch (for example, `main`).
5. Amplify will automatically build and host your React app.
6. After deployment, Amplify will provide a live URL to share.

---

## Usage Instructions

1. Select **Branch**: IT or CS.
2. Select **Semester** (1–10).
3. Enter **grades** for each subject using the dropdown.
4. Click **Calculate**.

   * GPA for that semester will be displayed.
   * CGPA up to that semester will be displayed.
5. Click **Reset** to clear inputs and start again.

---

## Note

* This calculator is only valid for **Anna University M.Sc Integrated CS/IT (Regulation 2023)**.
* GPA/CGPA calculation is based strictly on **Anna University Grade Points & Credits**.
* It may not apply to other courses, branches, or regulations.

---

## Tech Stack

* React.js (Frontend)
* AWS Amplify (Deployment & Hosting)
* Custom CSS (Styling)

---

## Feedback

If you find any errors in subjects, credits, or grade mapping, please raise an issue or contribute via pull requests.
