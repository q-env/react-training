import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">お問い合わせフォーム</Link>
        </li>
        <li className="navbar-item">
          <Link to="/history">フォーム履歴</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;