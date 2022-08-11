import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, NavLink, useParams } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Home</h2>
      Home...
    </div>
  );
}

/*사실상 데이터베이스
  실제에서 데이터는 Ajax를 통해 가져올거임
*/
var contents = [
  {id:1, title:'HTML', description:'HTML is...'},
  {id:2, title:'JS', description:'JS is...'},
  {id:3, title:'React', description:'React is...'}
];

function Topic() {
  var params = useParams(); //parameter 값을 가져오는 hook
  var topic_id = params.topic_id;
  var selected_topic = {
    //일치하는 id가 없을 경우 출력할 title과 description의 초기값
    title:'Sorry', description:'Not Found'
  };
  for(var i=0; i<contents.length; i++) {
    if(contents[i].id === Number(topic_id)) {
      selected_topic = contents[i];
      break;
    }
  }
  return (
    <div>
      <h2>{selected_topic.title}</h2>
      {selected_topic.description}
    </div>
  );
}

function Topics() {
  var lis = [];
  for(var i=0; i<contents.length; i++) {
    lis.push(
      <li key={contents[i].id}><NavLink to={"/topics/" + contents[i].id}>{contents[i].title}</NavLink></li>
    )
  }
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {lis}
      </ul>
      <Topic></Topic>
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

function App() {
  return (
    <div>
      <h1>Hello React Router DOM</h1>
      { /*
          react 18 이상부터는 반드시 route들을 routes 컴포넌트로 감싸야 하며, 이는 switch 기능을 사용하는 것과 같은 효과를 보인다.
          Route 컴포넌트는 element로 다른 function의 컴포넌트를 사용할 수 있다.
          path="*"는 사용자가 지정하지 않은 나머지 모든 path를 의미한다.
          Link 컴포넌트는 페이지가 리로드되지 않게 자동으로 구현하는 컴포넌트이다. (a href <-> Link to)
          NavLink 컴포넌트를 사용하면 Link와 달리 class 속성을 사용할 수 있으며, 이를 통해 css를 이용하여 현재 페이지를 표시할 수 있다.
        */
      }
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      <Routes> 
        <Route path="/" element={<Home />}></Route>
        { //중첩 라우팅
        }
          <Route path="/topics/" element={<Topics />}> 
            <Route path="/topics/:topic_id" element={<Topic />}></Route>
          </Route> 
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
