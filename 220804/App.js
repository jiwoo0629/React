import React, {useState, useEffect} from 'react';
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

var funcStyle = 'color:blue';
var funcId = 0;
//FuncComp라는 함수가 호출됐을 때 반환되는 것을 화면에 그려주는 작업이 리액트 컴포넌트의 main effect
function FuncComp(props) {
  //인자의 이름은 굳이 props일 필요는 없다. 아무거나 가능
  //훅(Hook)을 통해 함수형 컴포넌트에서도 state를 사용할 수 있게 됨!!
  var [number, setNumber] = useState(props.initNumber); //useState 함수
  var [date, setDate] = useState((new Date()).toString());
  
  //side effect : 함수형 컴포넌트가 실행된 후에 추가로 필요한 작업을 처리
  //useEffect : 함수에서 라이프사이클 구현하기
  useEffect(function() {
    //컴포넌트가 등장할 때와 퇴장할 때 하는 작업이 구분되고 그때마다 적당한 API를 구현해야 함
    console.log('%cfunc => useEffect number (componentDidMount & ComponentDidUpdate) '+(++funcId), funcStyle);
    document.title = number;
    return function cleanup() {
      console.log('%cfunc => useEffect number return (componentDidMount & ComponentDidUpdate) '+(++funcId), funcStyle);
    }
    //두번째 인자로 전달 받은 배열의 요소 내의 값의 상태가 바뀌었을 때만 콜백 함수가 호출되도록 함 (skipping effect)
  }, [number]);

  useEffect(function() {
    console.log('%cfunc => useEffect date (componentDidMount & ComponentDidUpdate) '+(++funcId), funcStyle);
    document.title = date;
    return function cleanup() {
      console.log('%cfunc => useEffect date return (componentDidMount & ComponentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [date]);

  console.log('%cfunc => render '+(++funcId), funcStyle);
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

var classStyle = 'color:red';
class ClassComp extends React.Component {
  /*componentWillMount -> render -> componentDidMount
    shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
  */

  //컴포넌트 내부적으로 상태를 바꾸고 관리하는 state
  state = {
    number:this.props.initNumber, //외부에서 전달된 props 값을 state에 넣어 변경 가능한 상태로 만듬
    date:(new Date()).toString() //현재 시간
  }
  /*UNSAFE_componentWillMount() {
    console.log('%cclass => componentWillMount', classStyle);
  }*/
  componentDidMount() { //컴포넌트가 처음 등장할 때 작업
    console.log('%cclass => componentDidMount', classStyle);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate', classStyle);
    return true;
  }
  /*UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log('%cclass => componentWillUpdate', classStyle);
  }*/
  componentDidUpdate(nextProps, nextState) {
    console.log('%cclass => componentDidUpdate', classStyle);
  }
  render() {
    console.log('%cclass => render', classStyle);
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
