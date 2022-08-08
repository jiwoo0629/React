import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  )
}

function Topics() {
  return (
    <div>
      <h2>Topics</h2>
      Topics...
    </div>
  )
}

function Contact() {
  return (
    <div>
      <h2>Contact</h2>
      Contact...
    </div>
  )
}

function App() {
  //BrowserRouter : 리액트 router의 도움을 받고 싶은 컴포넌트의 최상위 컴포넌트를 감싸는 wrapper 컴포넌트
  //Route로 각 컴포넌트를 감쌈으로써 URL에 따라 다르게 구현되도록 함
  return (
    <div>
      <h1>Hello React Router DOM</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/">Topics</a></li>
        <li><a href="/">Contact</a></li>
      </ul>
      <Route path="/"><Home></Home></Route>
      <Route path="/"><Topics></Topics></Route>
      <Route path="/"><Contact></Contact></Route>
    </div>    
  );
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
