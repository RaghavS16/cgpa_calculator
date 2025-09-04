import React, { useState } from "react";
import "./App.css";

function App() {
  const [branch, setBranch] = useState("it");
  const [choice, setChoice] = useState("GPA");
  const [semester, setSemester] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState({});
  const [result, setResult] = useState(null);

  const fetchSubjects = async () => {
    const res = await fetch("/courses.json");
    const data = await res.json();
    if (data[branch] && data[branch][semester]) {
      setSubjects(Object.keys(data[branch][semester]));
      setGrades({});
      setResult(null);
    }
  };

  const handleGradeChange = (subject, value) => {
    setGrades({ ...grades, [subject]: value });
  };

  const calculate = async () => {
    const response = await fetch("https://your-backend.onrender.com/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        branch,
        choice,
        semester,
        grades,
      }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <>
      <header>GPA / CGPA Calculator</header>
      <div className="container">
        <h2>Enter Your Details</h2>

        <label>Branch:</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="it">IT</option>
          <option value="cs">CS</option>
        </select>

        <label>Choice:</label>
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option value="GPA">GPA</option>
          <option value="CGPA">CGPA</option>
        </select>

        <label>Semester:</label>
        <input
          type="number"
          value={semester}
          onChange={(e) => setSemester(parseInt(e.target.value))}
        />
        <button onClick={fetchSubjects}>Load Subjects</button>

        {subjects.length > 0 && (
          <>
            <h2>Enter Grades</h2>
            {subjects.map((sub) => (
              <div key={sub}>
                <label>{sub}</label>
                <select
                  value={grades[sub] || ""}
                  onChange={(e) => handleGradeChange(sub, e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="O">O</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="RA">RA</option>
                  <option value="U">U</option>
                </select>
              </div>
            ))}

            <button onClick={calculate}>Calculate</button>
          </>
        )}

        {result && (
          <div className="result-box">
            <h3>{result.type}: {result.result}</h3>
            <h3>Entered Grades</h3>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(grades).map(([subject, grade]) => (
                  <tr key={subject}>
                    <td>{subject}</td>
                    <td>{grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total">{result.type}: {result.result}</div>
          </div>
        )}
      </div>
      <footer>© 2025 GPA/CGPA Calculator | Powered by React & Flask</footer>
    </>
  );
}

export default App;
