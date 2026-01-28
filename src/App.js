import React, { useState } from "react";
import "./App.css";

const gradePoints = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  RA: 0,
  U: 0,
};

const courseData = {
it: {
        1: {"COMMUNICATIVE ENGLISH 1": 4, "MATRICES AND CALCULUS": 4, "ENGINEERING GRAPHICS": 2,
            "APPLIED PHYSICS": 3, "CHEMISTRY OF MATERIAL": 3, "DIGITAL SYSTEM": 4, "C PROGRAMMING": 4},
        2: {"COMMUNICATIVE ENGLISH 2": 4, "ODE": 4, "BEEE": 4, "PYTHON": 4, "DATA STRUCTURE": 3,
            "COMPUTER ARCHITECTURE": 3, "DATA STRUCTURE LAB": 2},
        3: {"PDE": 4, "C++": 4, "DATA MANAGEMENT SYSTEM": 3, "OS": 4, "MICROPROCESSOR AND APPLICATION": 4,
            "PRINCIPLE OF ANALOG AND DIGITAL COMMUNICATION SYSTEM": 3, "DATA MANAGEMENT SYSTEM LAB": 2},
        4: {"DISCRETE STRUCTURE": 4, "LINEAR ALGEBRA": 3, "SOFTWARE ENGINEERING": 4, "JAVA": 3,
            "COMPUTER NETWORK": 4, "ENVIRONMENT SCIENCE AND SUSTAINABILITY": 2, "JAVA LAB": 2},
        5: {"PROBABILITY AND STATISTICS": 4, "OBJECT ORIENTED ANALYSIS AND DESIGN": 4,
            "DATA WAREHOUSE AND MINING": 4, "WEB TECHNOLOGY": 3, "THEORY OF COMPUTATION": 4,
            "PROFESSIONAL ELECTIVE 1": 3, "WEB TECHNOLOGY LAB": 2},
        6: {"OPERATION RESEARCH": 4, "MACHINE LEARNING": 4, "SOFTWARE PROJECT MANAGEMENT": 3,
            "DESIGN AND ANALYSIS OF ALGORITHM": 4, "CLOUD COMPUTING": 3, "PROFESSIONAL ELECTIVE 2": 3,
            "MINI PROJECT": 2},
        7: {"INDUSTRIAL PROJECT": 16},
        8: {"ADVANCE STATISTICAL METHOD FOR COMPUTING": 4, "ADVANCE NETWORK": 3,
            "PRINCIPLE OF MANAGEMENT AND BEHAVIOR SCIENCE": 3, "ARTIFICIAL INTELLIGENCE": 3,
            "CYBER SECURITY": 3, "PROFESSIONAL ELECTIVE 3": 3, "PROFESSIONAL ELECTIVE 4": 3,
            "STATISTICAL PROGRAM LAB": 2},
        9: {"NUMERICAL METHOD": 4, "INTERNET OF THINGS": 3, "ADVANCE DATABASE TECHNOLOGY": 4,
            "MULTIMEDIA TECHNOLOGY": 3, "PROFESSIONAL ELECTIVE 5": 3, "PROFESSIONAL ELECTIVE 6": 3,
            "INTERNET OF THINGS LAB": 2, "CREATIVE AND INNOVATIVE PROJECT": 2},
        10: {"PROJECT WORK": 16}
    },
    cs: {
        1: {"COMMUNICATIVE ENGLISH 1": 4, "MATRICES AND CALCULUS": 4, "ENGINEERING GRAPHICS": 2,
            "APPLIED PHYSICS": 3, "CHEMISTRY OF MATERIAL": 3, "DIGITAL SYSTEM": 4, "C PROGRAMMING": 4},
        2: {"COMMUNICATIVE ENGLISH 2": 4, "ODE": 4, "BEEE": 4, "PYTHON": 4, "DATA STRUCTURE": 3,
            "COMPUTER ARCHITECTURE": 3, "DATA STRUCTURE LAB": 2},
        3: {"PDE": 4, "C++": 4, "DATA MANAGEMENT SYSTEM": 3, "OS": 4, "MICROPROCESSOR AND APPLICATION": 4,
            "PRINCIPLE OF ANALOG AND DIGITAL COMMUNICATION SYSTEM": 3, "DATA MANAGEMENT SYSTEM LAB": 2},
        4: {"DISCRETE STRUCTURE": 4, "ALGEBRA AND NUMBER THEORY": 3, "SOFTWARE ENGINEERING": 4, "JAVA": 3,
            "COMPUTER NETWORK": 4, "ENVIRONMENT SCIENCE AND SUSTAINABILITY": 2, "JAVA LAB": 2},
        5: {"PROBABILITY AND STATISTICS": 4, "CRYPTOGRAPHY AND DATA SECURITY": 4,
            "DATA WAREHOUSE AND MINING": 4, "WEB TECHNOLOGY": 3, "THEORY OF COMPUTATION": 4,
            "PROFESSIONAL ELECTIVE 1": 3, "WEB TECHNOLOGY LAB": 2},
        6: {"OPERATION RESEARCH": 4, "MACHINE LEARNING": 4, "COMPILER DESIGN": 3,
            "DESIGN AND ANALYSIS OF ALGORITHM": 4, "CLOUD COMPUTING": 3, "PROFESSIONAL ELECTIVE 2": 3,
            "MINI PROJECT": 2},
        7: {"INDUSTRIAL PROJECT": 16},
        8: {"ADVANCE STATISTICAL METHOD FOR COMPUTING": 4, "NETWORKING TECHNOLOGIES": 3,
            "PRINCIPLE OF MANAGEMENT AND BEHAVIOR SCIENCE": 3, "ARTIFICIAL INTELLIGENCE": 3,
            "CYBER SECURITY": 3, "PROFESSIONAL ELECTIVE 3": 3, "PROFESSIONAL ELECTIVE 4": 3,
            "STATISTICAL PROGRAM LAB": 2},
        9: {"NUMERICAL METHOD": 4, "INTERNET OF THINGS": 3, "DIGITAL FORENSIC": 4,
            "MULTIMEDIA TECHNOLOGY": 3, "PROFESSIONAL ELECTIVE 5": 3, "PROFESSIONAL ELECTIVE 6": 3,
            "INTERNET OF THINGS LAB": 2, "CREATIVE AND INNOVATIVE PROJECT": 2},
        10: {"PROJECT WORK": 16}
    }
};

export default function App() {
  const [branch, setBranch] = useState("it");
  const [semester, setSemester] = useState(1);
  const [grades, setGrades] = useState({});
  const [results, setResults] = useState(null);

  const handleGradeChange = (sem, subject, grade) => {
    setGrades((prev) => ({
      ...prev,
      [sem]: { ...prev[sem], [subject]: grade },
    }));
  };

  const calculateGPA = (semesterSubjects, semesterGrades) => {
    let totalPoints = 0;
    let totalCredits = 0;

    Object.entries(semesterSubjects).forEach(([subject, credit]) => {
      const grade = semesterGrades?.[subject];
      if (grade && gradePoints[grade] !== undefined) {
        totalPoints += gradePoints[grade] * credit;
        if (grade !== "RA" && grade !== "U") {
          totalCredits += credit;
        }
      }
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const handleCalculate = () => {
    // ✅ Validation check
    for (let i = 1; i <= semester; i++) {
      const semSubjects = courseData[branch][i];
      const semGrades = grades[i];
      if (!semGrades || Object.keys(semGrades).length < Object.keys(semSubjects).length) {
        alert(`Please select all grades for Semester ${i}`);
        return;
      }
    }

    let cgpaPoints = 0;
    let cgpaCredits = 0;
    let lastGpa = 0;

    for (let i = 1; i <= semester; i++) {
      const semSubjects = courseData[branch][i];
      const semGrades = grades[i];
      const gpa = calculateGPA(semSubjects, semGrades);

      if (i === semester) {
        lastGpa = gpa;
      }

      Object.entries(semSubjects).forEach(([subject, credit]) => {
        const grade = semGrades?.[subject];
        if (grade && gradePoints[grade] !== undefined) {
          cgpaPoints += gradePoints[grade] * credit;
          if (grade !== "RA" && grade !== "U") {
            cgpaCredits += credit;
          }
        }
      });
    }

    const cgpa = cgpaCredits > 0 ? cgpaPoints / cgpaCredits : 0;

    setResults({
      gpa: lastGpa.toFixed(2),
      cgpa: cgpa.toFixed(2),
      creditsEarned: cgpaCredits,
      grades,
    });
  };

  const handleReset = () => {
    setGrades({});
    setResults(null);
    setSemester(1);
    setBranch("it");
  };

  return (
    <>
      <header>GPA & CGPA Calculator</header>

      <div className="container">
        <h2>Enter Grades</h2>

        <label>
          Branch:
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="it">IT</option>
            <option value="cs">CS</option>
          </select>
        </label>

        <label>
          Semester:
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
          >
            {Object.keys(courseData[branch]).map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </label>

        {Array.from({ length: semester }, (_, i) => i + 1).map((sem) => (
          <div key={sem} style={{ marginBottom: "20px" }}>
            <h3>Semester {sem}</h3>
            {Object.entries(courseData[branch][sem]).map(([subject]) => (
              <div key={subject}>
                <label>{subject}</label>
                <select
                  value={grades[sem]?.[subject] || ""}
                  onChange={(e) =>
                    handleGradeChange(sem, subject, e.target.value)
                  }
                >
                  <option value="">Select Grade</option>
                  {Object.keys(gradePoints).map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}

        <button onClick={handleCalculate}>Calculate</button>
        <button onClick={handleReset}>Reset</button>

        {results && (
          <div className="result-box">
            <h3>Entered Grades</h3>
            {Object.entries(results.grades).map(([sem, semGrades]) => (
              <div key={sem}>
                <h4>Semester {sem}</h4>
                <ul>
                  {Object.entries(semGrades).map(([subject, grade]) => (
                    <li key={subject}>
                      {subject}: <strong>{grade}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="total">
              GPA (Sem {semester}): {results.gpa}
            </div>
            <div className="total">
              CGPA (Up to Sem {semester}): {results.cgpa}
            </div>
            <div className="total">
              Total Credits Earned: {results.creditsEarned}
            </div>
          </div>
        )}
      </div>

      <footer>© 2025 GPA/CGPA Calculator</footer>
    </>
  );
}
