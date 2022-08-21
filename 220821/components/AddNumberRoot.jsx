import React, {Component} from 'react';
import AddNumber from '../components/AddNumber';

export default class AddNumberRoot extends Component {
    render() {
      return (
        <div>
          <h1>Add Number Root</h1>
          <AddNumber onClick={function(size){
            //AddNumber 컴포넌트로부터 전달받은 size 값을 Root 컴포넌트로 전달
            this.props.onClick(size);
          }.bind(this)}></AddNumber>
        </div>
      );
    }
  }