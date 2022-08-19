import './App.css';
import React, { Component } from 'react';

class Nav extends Component {
  //Nav 컴포넌트에 state를 추가하여 javascript 객체를 state에 저장하여 사용
  state = {
    list : []
  }
  /*컴포넌트를 초기화할 때 네트워크 통신을 하기에 최적의 메소드
    컴포넌트가 애플리케이션에 탑재되어 살아나기 시작하는 시점에 호출됨 */
  componentDidMount() {
    fetch('list.json') //fetch API: 첫번째 인자로 가져오려고 하는 데이터의 주소를 받는다.
      .then(function(result) { //fecth 내의 데이터를 브라우저가 가져오면 어떻게 처리할지에 대한 함수
        return result.json(); //list.json 파일의 데이터를 javascript 객체로 변환
      })
      .then(function(json) {
        this.setState({list:json});
      }.bind(this));
  }
  render() {
    /* Nav의 onClick 함수에 id를 인자로 전달하기 위해 data-id prop에 id 값을 미리 저장,
       이 값에는 e.target.dataset.id로 접근 가능 */
    var coms= [];
    for(var i=0; i<this.state.list.length; i++) {
      var com = this.state.list[i];
      coms.push(
        <li key={com.id}>
          <a href={com.id} data-id={com.id} onClick={function(e) {
            e.preventDefault();
            console.log('trigger');
            this.props.onClick(e.target.dataset.id);
          }.bind(this)}>
            {com.title}
          </a>
        </li>
      );
    }
    return(
      <nav>
        {coms}
      </nav>
    );
  }
}

class Article extends Component {
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
  state = {
    article:{title:'Welcome', desc:'Hello, React & Ajax'}
  }
  render() {
    return (
      <div className="App">
        <h1>WEB</h1>
        <Nav onClick={function(id) {
          //fetch API를 사용하여 JSON 파일을 읽어옴
          fetch(id+'.json')
            .then(function(result) {
              return result.json();
            })
            .then(function(json) {
              //Ajax를 통해 가져온 data를 APP 컴포넌트의 state에 저장
              this.setState({
                article:{title:json.title, desc:json.desc}
              });
            }.bind(this));
        }.bind(this)}></Nav>
        <Article title = {this.state.article.title} desc = {this.state.article.desc}></Article>
      </div>
    );
  }
}

export default App;
