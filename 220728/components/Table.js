import React, { Component } from 'react';

class Table extends Component {
    render() {
        console.log('Table render');
        //props를 통해 주입된 state를 이용해 컴포넌트 작성
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i<data.length) {
            //Warning: Each child in a list should have a unique "key" prop.
            //이를 해결하기 위해 key를 추가
            lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id}>{data[i].title}</a></li>)
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