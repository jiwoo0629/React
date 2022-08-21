import React, {Component} from 'react';
import './App.css';
import AddNumberRoot from './components/AddNumberRoot'
import DisplayNumberRoot from './components/DisplayNumberRoot'

/* 전체 흐름 
1.AddNumber에서 size를 입력하고 + 버튼 클릭
2.size 값이 AddNumber -> AddNumberRoot -> Root로 이동
3.number 값에 size를 더한 값으로 number 업데이트
4.number 값이 Root -> DisplayNumberRoot -> DisplayNumber로 이동
5.DisplayNumbe에 덧셈 결과 표시
*/

class App extends Component {
  state = {
    number: 0
  }
  render() {
    return (
      <div className="App">
        <h1>Root</h1>
        <AddNumberRoot onClick={function(size){
          //number 값 업데이트
          this.setState({number:this.state.number + size});
        }.bind(this)}></AddNumberRoot>
        <DisplayNumberRoot number={this.state.number}></DisplayNumberRoot>
      </div>
    );
  }
}

export default App;
