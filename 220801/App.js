import React, { Component } from 'react';
/* 컴포넌트를 각 파일들로 분리하여 불러오기 */
import Table from './components/Table';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';

class App extends Component {
  /* 컴포넌트 내부적으로 사용하는 상태에는 state를 사용한다.
     state를 사용하기 위해 constructor를 작성
     컴포넌트가 실행될 때 이 함수가 가장 먼저 실행되어 초기화를 담당 */
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = { 
      mode:'read',
      selected_content_id: 2,
      welcome:{title:'Welcome', desc:'Hello, React'},
      subject:{title:'WEB', sub:'world wide web!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  //'어떤 HTML을 그릴 것인가'를 결정하는 함수
  render() {
    console.log('App render');
    var _title, _desc, _article = null;
    //state의 mode에 따라 렌더링 결과가 다르게 나오도록 설정
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function(_title, _desc) {
        this.max_content_id += 1;
        /* 데이터를 추가하는 방법 1 : push (원본을 변경하는 방법, 성능 개선 시에 까다로워서 잘 사용하지 않음)
        this.state.contents.push(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState(
          {contents:this.state.contents}
        ); */
        // 데이터를 추가하는 방법 2 : concat (원본을 변경하지 않고 새로운 배열 반환해 사용하는 방법, 유용하게 사용)
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState(
          {contents:_contents}
        );
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }
    console.log("render", this);
    return (
      /*리액트 컴포넌트는 하나의 태그 안에 들어가야 한다.
      컴포넌트를 만듦으로써 태그만으로 header 안의 내용을 대체 가능*/
      <div className="app">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          //props의 형태로 Subject 컴포넌트에 전달되는 onChangePage 함수
          onChangePage={function() {
            /*state 값을 변경하는 방법 : .bind(this), setState()
              setState() 함수 : 리액트에서 state 값을 변경할 때 호출하는 함수
                                   constructor를 제외하고 this.state 값을 강제로 변경해서는 안됨
              .bind(this) : this의 값이 없을 때 강제로 this를 주입하는 방법*/
            this.setState({mode:'welcome'});
          }.bind(this)}
          ></Subject> 
        <Table onChangePage = {function(id) {
          this.setState({
            mode:'read',
            selected_content_id:Number(id)});
        }.bind(this)}
          data={this.state.contents}></Table>
        <Control onChangeMode={function(_mode) {
          this.setState({
            mode:_mode
          });
        }.bind(this)}></Control>
        {_article}
      </div>
    );
  }  
}

export default App;
