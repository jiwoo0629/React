import React, { Component } from 'react';

class UpdateContent extends Component {
    //props 값을 직접 사용하면 readonly가 되기 때문에, constructor를 구현하여 props 값을 state에 넣어 사용
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.data.id, //어느 항목을 update할 것인지에 대한 식별자 
            title:this.props.data.title,
            desc:this.props.data.desc
        };
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    //setState를 통해 state 값이 바뀌도록 하는 함수
    inputFormHandler(e) {
        this.setState({[e.target.name]:e.target.value}); //대괄호를 사용하면 객체에서 대괄호 내의 value를 property로 사용 가능
    }

    render() {
      console.log(this.props.data);
      console.log('UpdateContent render');
      return (
        <article>
              <h2>Update</h2>
              <form action="/update_process" method="post"
              onSubmit={function(e) {
                e.preventDefault();
                this.props.onSubmit( //App 컴포넌트에서 CreateContent 컴포넌의 onSubmit props로 지정한 함수에 값 전달
                    this.state.id, this.state.title, this.state.desc
                );
                alert('Update!');
            }.bind(this)}>
                <input type="hidden" name="id" value={this.state.id}></input>
                <p><input type="text" name="title" placeholder="title" value={this.state.title}
                    onChange={this.inputFormHandler}></input></p> 
                <p><textarea name="desc" placeholder="description" value={this.state.desc}
                    onChange={this.inputFormHandler}></textarea></p>
                <p><input type="submit" value="수정"></input></p>
              </form>
        </article>
      );
    }
  }

export default UpdateContent;