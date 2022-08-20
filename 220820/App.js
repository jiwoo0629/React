import './App.css';
import React, { Component } from 'react';

/*
  presentation 컴포넌트 : 데이터에 종속되지 않고 순수하게 보여주는 역할만 담당하는 컴포넌트
  container 컴포넌트 : 데이터를 처리하고 사용자의 상호작용 등을 처리하는, application에 완전히 종속된 컴포넌트
  리액트를 사용하는 가장 큰 이유는 재사용 가능한 컴포넌트를 만드는 것
  디커플링(decoupling) : 컴포넌트가 어떤 특정한 데이터에 종속되지 않도록 떼어내는 과정
                        데이터의 종류와는 상관없이 데이터를 표현하기만 하는 컴포넌트로 만드는 과정
*/

class Nav extends Component {
  render() {
    //Nav 컴포넌트도 외부에서 props를 넘겨받아 사용하는 방식으로 변경
    /* Nav의 onClick 함수에 id를 인자로 전달하기 위해 data-id prop에 id 값을 미리 저장,
       이 값에는 e.target.dataset.id로 접근 가능 */
    var coms= [];
    for(var i=0; i<this.props.list.length; i++) {
      var com = this.props.list[i];
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

class Loading extends Component {
  render() {
    return (
      <div>
        Now Loading...
      </div>
    );
  }
}

class App extends Component {
  /*isLoading : 로딩이 시작될 때 true, 로딩이 끝나면 false
    state의 article 부분과 list 부분에 각각 로딩중임을 확인하는 값인 isLoading을 추가
    이에 따라 article과 list의 props 값도 state 구조에 맞게 변경해줘야 함*/
  state = {
    article:{
      item:{title:'Welcome', desc:'Hello, React & Ajax'},
      isLoading:false
    },
    list:{
      items:[],
      isLoading:false
    }
  }
  /*컴포넌트를 초기화할 때 네트워크 통신을 하기에 최적의 메소드
    컴포넌트가 애플리케이션에 탑재되어 살아나기 시작하는 시점에 호출됨*/
    componentDidMount() {
      var newList = Object.assign({}, this.state.list, {isLoading:true}); //로딩이 시작되는 순간에 isLoading을 true로 설정
      this.setState({list:newList});
      fetch('list.json') //fetch API: 첫번째 인자로 가져오려고 하는 데이터의 주소를 받는다.
        .then(function(result) { //fecth 내의 데이터를 브라우저가 가져오면 어떻게 처리할지에 대한 함수
          return result.json(); //list.json 파일의 데이터를 javascript 객체로 변환
        })
        .then(function(json) { //Ajax를 통해 가져온 data를 APP 컴포넌트의 state에 저장
          this.setState({list:{
            items:json,
            isLoading:false //로딩이 완료되어 state를 설정하는 단계이므로 다시 isLoading을 false로 변경
          }});
        }.bind(this));
    }
  render() {
    var NavTag = null;
    if(this.state.list.isLoading) {
      NavTag = <Loading></Loading>
    } else { 
      NavTag = <Nav list={this.state.list.items} onClick={function(id) { //list의 props 값을 state 구조에 맞게 변경
        //list props에 state.list 값을 전달
        var newArticle = Object.assign({}, this.state.article, {isLoading:true}); //로딩이 시작되는 순간에 isLoading을 true로 설정
        this.setState({article:newArticle});
        //fetch API를 사용하여 JSON 파일을 읽어옴
        fetch(id+'.json')
          .then(function(result) {
            return result.json();
          })
          .then(function(json) {
            this.setState({
              article:{
                item:{title:json.title, desc:json.desc},
                isLoading:false //로딩이 완료되어 state를 설정하는 단계이므로 다시 isLoading을 false로 변경
              }
            })
          }.bind(this));
      }.bind(this)}></Nav>
    }

    var ArticleTag = null;
    if(this.state.article.isLoading) {
      ArticleTag = <Loading></Loading>
    } else {
      //article의 props 값을 state 구조에 맞게 변경
      ArticleTag = <Article title={this.state.article.item.title} desc={this.state.article.item.desc}></Article>
    }

    return (
      <div className="App">
        <h1>WEB</h1>
        {NavTag}
        {ArticleTag}      
      </div>
    );
  }
}

export default App;
