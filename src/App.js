import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FileYourIncome from './components/File-your-income';
import Process from './components/Process';
import ThankYou from './components/ThankYou';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file-your-income" element={<FileYourIncome />} />
        <Route path="/process" element={<Process />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App;