import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}

function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      Topics...
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  );
}

function NotFound() {
  return (
    <div>
      Not Found...
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Hello React Router DOM</h1>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      { /*
          react 18 이상부터는 반드시 route들을 routes 컴포넌트로 감싸야 하며, 이는 switch 기능을 사용하는 것과 같은 효과를 보인다.
          Route 컴포넌트는 element로 다른 function의 컴포넌트를 사용할 수 있다.
          path="*"는 사용자가 지정하지 않은 나머지 모든 path를 의미한다.
          Link 컴포넌트는 페이지가 리로드되지 않게 자동으로 구현하는 컴포넌트이다. (a href <-> Link to)
          NavLink 컴포넌트를 사용하면 Link와 달리 class 속성을 사용할 수 있으며, 이를 통해 css를 이용하여 현재 페이지를 표시할 수 있다.
        */
      }
      <Routes> 
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <App />
    </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
