import React, {Component} from 'react';

//컴포넌트를 따로 파일로 분리할 때는 export default 처리함
export default class AddNumber extends Component {
    state = {
        size: 1
    }
    render() {
      return (
        <div>
          <h1>Add Number</h1>
          <input type="button" value="+" onClick={function() {
                //+ 버튼을 누르면 입력한 size 값이 상위 컴포넌트로 이동 (AddNumber -> AddNumberRoot -> Root)
                this.props.onClick(this.state.size);
            }.bind(this)}></input> 
          <input type="text" value={this.state.size} onChange={function(e){
            this.setState({size:Number(e.target.value)});
          }.bind(this)}></input>
        </div>
      );
    }
  }