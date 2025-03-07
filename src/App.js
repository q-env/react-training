import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import JSONSchemaForm from "./components/JSONSchemaForm";
import FormHistory from './components/FormHistory';

const App = () => {
  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<JSONSchemaForm />} />
          <Route path="/history" element={<FormHistory />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;