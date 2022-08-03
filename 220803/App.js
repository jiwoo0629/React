import React, {useState} from 'react';
import './App.css';

function App() {
  return (
    <div className="container">
      {/*props는 함수형 컴포넌트든 클래스형 컴포넌트든 모두 사용가능
       state는 원래 클래스형 컴포넌트에서만 사용가능했는데 이제는 모두 사용가능*/
      }
      <h1>Hello World!</h1>
      <FuncComp initNumber={1}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );    
}

function FuncComp(props) {
  //인자의 이름은 굳이 props일 필요는 없다. 아무거나 가능
  //훅(Hook)을 통해 함수형 컴포넌트에서도 state를 사용할 수 있게 됨!!
  var numberState = useState(props.initNumber); //useState 함수
  var number = numberState[0];
  var setNumber = numberState[1];

  var dateState = useState((new Date()).toString());
  var date = dateState[0];
  var setDate = dateState[1];
  
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {number}</p>
      <p>Date: {date}</p>
      <input type="button" value="Random" onClick={function(){
        setNumber(Math.random());
      }
    }></input>
      <input type="button" value="Date" onClick={function(){
        setDate((new Date()).toString());
      }
    }></input>
    </div>
  );
}

class ClassComp extends React.Component {
  //컴포넌트 내부적으로 상태를 바꾸고 관리하는 state
  state = {
    number:this.props.initNumber, //외부에서 전달된 props 값을 state에 넣어 변경 가능한 상태로 만듬
    date:(new Date()).toString() //현재 시간
  }
  render() {
    return (
      <div className="container">
        <h2>class style component</h2> 
        <p>Number: {this.state.number}</p> 
        <p>Date: {this.state.date}</p>
        <input type="button" value="Random" onClick={function(){
          this.setState({number:Math.random()}); //state의 number를 랜덤한 수로 변경하는 버튼 생성
          }.bind(this)
        }></input>
        <input type="button" value="Date" onClick={function(){
          this.setState({date:(new Date()).toString()});
        }.bind(this)}></input>
      </div>
    );
  } 
}

export default App;
