import React, { Component } from 'react';

class Table extends Component {
    shouldComponentUpdate(newProps, newState) {
        console.log("Table render shoudlComponentUpdate",
            newProps.data,
            this.props.data
        );
        if(this.props.data === newProps.data)
            return false;
        return true;
    }
    render() {
        console.log('Table render');
        //props를 통해 주입된 state를 이용해 컴포넌트 작성
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i<data.length) {
            //Warning: Each child in a list should have a unique "key" prop.
            //이를 해결하기 위해 key를 추가
            lists.push(<li key={data[i].id}>
                <a href={"/content/" + data[i].id}
                data-id={data[i].id} //data-id라는 속성에 id 값을 할당
                onClick={function(e) { //방법1 : target.dataset을 통해 data-id 속성을 이용하는 방법
                    e.preventDefault(); //다른 페이지로 이동하지 않도록 하는 함수
                    this.props.onChangePage(e.target.dataset.id); //id 값에 따라 다른 화면이 나오도록 설정
                }.bind(this)
                        /*function(e) { //방법2 : data-id 속성을 이용하지 않고 bind를 호출할 때 인자에 data[i].id를 추가해 가져오는 것
                    e.preventDefault(); //다른 페이지로 이동하지 않도록 하는 함수
                    this.props.onChangePage(id); //id 값에 따라 다른 화면이 나오도록 설정
                }.bind(this, data[i].id)*/}>{data[i].title}</a></li>)
            i += 1;
        }
        return (
            <nav>
              <ul>
                  {lists}
              </ul>
            </nav>
        );
    }
}

export default Table;