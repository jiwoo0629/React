import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render() {
    return (
      <header>
            <h1>{this.props.title}</h1>
            {this.props.sub}
        </header>
    );
  }
}

class Table extends Component {
  render() {
    return (
      <nav>
            <ul>
                <li><a href="1.html">HTML</a></li>
                <li><a href="2.html">CSS</a></li>
                <li><a href="3.html">JavaScript</a></li>
            </ul>
        </nav>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <article>
            <h2>{this.props.title}</h2>
            {this.props.desc}
      </article>
    );
  }
}

class App extends Component {
  render() {
    return (
      /*리액트 컴포넌트는 하나의 태그 안에 들어가야 한다.
      컴포넌트를 만듦으로써 태그만으로 header 안의 내용을 대체 가능*/
      <div className="app">
        <Subject title="WEB" sub="world wide web!"></Subject> 
        <Subject title="React" sub="for UI!"></Subject>
        <Table></Table>
        <Content title="HTML" desc="HTML is HyperText Markup Language"></Content>
      </div>
    );
  }  
}

export default App;
