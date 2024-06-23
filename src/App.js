import React, { useState } from 'react';
import './App.css';

function App() {
  const [num, setNum] = useState(0);
  const [history, setHistory] = useState([0]);
  const [currentStep, setCurrentStep] = useState(0);

  const add = () => {
    if (num < 150) {
      const newNum = num + 1;
      updateHistory(newNum);
    }
  };

  const subtract = () => {
    if (num > 0) {
      const newNum = num - 1;
      updateHistory(newNum);
    }
  };

  const updateHistory = (newNum) => {
    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, newNum]);
    setCurrentStep(currentStep + 1);
    setNum(newNum);
  };

  const undo = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setNum(history[prevStep]);
      setCurrentStep(prevStep);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const nextStep = currentStep + 1;
      setNum(history[nextStep]);
      setCurrentStep(nextStep);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Number Counter</h1>
      <div className="counter">
        <button className="btn" onClick={subtract} disabled={num === 0}>-</button>
        <span className="number">{num}</span>
        <button className="btn" onClick={add} disabled={num === 150}>+</button>
      </div>
      <div className="controls">
        <button className="btn" onClick={undo} disabled={currentStep === 0}>Undo</button>
        <button className="btn" onClick={redo} disabled={currentStep === history.length - 1}>Redo</button>
      </div>
      <ProgressBar value={num} />
    </div>
  );
}

const ProgressBar = ({ value }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{
          width: `${(value / 150) * 100}%`,
          transition: 'width 0.3s ease-in-out',
          backgroundColor: value === 0 ? '#ddd' : value >= 150 ? 'red' : 'green',
        }}
      ></div>
    </div>
  );
};

export default App;
