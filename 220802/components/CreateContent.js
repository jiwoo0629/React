import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
      console.log('CreateContent render');
      return (
        <article>
              <h2>Create</h2>
              <form action="/create_process" method="post"
              onSubmit={function(e) {
                e.preventDefault();
                this.props.onSubmit( //App 컴포넌트에서 CreateContent 컴포넌의 onSubmit props로 지정한 함수에 값 전달
                    e.target.title.value,
                    e.target.desc.value
                );
                alert('Submit!');
              }.bind(this)}>
                {   /* onSubmit : submit 버튼이 눌렸을 때의 동작
                    placeholder : 아무것도 입력되지 않았을때 출력되는 문장 */
                }
                <p><input type="text" name="title" placeholder="title"></input></p> 
                <p><textarea name="desc" placeholder="description"></textarea></p>
                <p><input type="submit" value="생성"></input></p>
              </form>
        </article>
      );
    }
  }

export default CreateContent;