import React from 'react'
import VirtualList from './VirtualList'
import DemoCardHoc from "../component/DemoCardHoc"

function getData(len) {
  const list = []
  for (let i = 0; i < len; i++) {
    list.push(
      <div style={{border: 'solid 1px red', height: '50px'}}>
        {i}
      </div>
    )
  }
  return list
}


class VirtualListDemo extends React.Component {
  constructor(props) {
    super(props)

    this.itemsRenderer = this.itemsRenderer.bind(this)
  }

  itemsRenderer(items) {
    return items.map((item, index) => {
      return (
        <div style={{border: 'solid 1px red', height: '50px'}}>
          {index}
        </div>
      )
    })
  }

  render() {
    return (
      <div style={{border: 'solid 1px gray', height: '500px'}}>
        <VirtualList
          itemsRenderer={this.itemsRenderer}
        >
          {getData()}
        </VirtualList>
      </div>
    )
  }
}


export default DemoCardHoc('VirtualList')(VirtualListDemo)
