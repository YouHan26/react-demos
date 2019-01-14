import React from 'react'
import {connect} from 'react-redux'
import autobind from 'autobind-decorator'

/**
 * Demo1
 */
class Demo1 extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('demo1 render')
    return (
      <div>
        redux demo1:{this.props.data.count}
      </div>
    )
  }
}

export const ReduxDemo1 = connect((state, props) => {
  console.log('demo1 connect', state)
  return {data: 1}
}, undefined, undefined, {pure: false})(Demo1)


/**
 * Demo3
 * @param props
 * @returns {*}
 * @constructor
 */
const Demo3 = (props) => {
  console.log('demo3 render')
  return (
    <div>
      redux demo3 : {JSON.stringify(props.state)}
    </div>
  )
}

export const ReduxDemo3 = connect((state, props) => {
  console.log('demo3 connect')
  return {state: state.name}
}, undefined, undefined, {pure: false})(Demo3)


/**
 * Demo2
 */
class Demo2 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {count: 1}
  }
  
  @autobind
  onPress() {
    this.setState({count: this.state.count + 1})
    this.props.increment()
  }

  render() {
    console.log('demo2 render')
    return (
      <div>
        <button onClick={this.onPress}>click me {this.state.count}</button>
      </div>
    )
  }
}


export const ReduxDemo2 = connect((state, props) => {
  console.log('demo2 connect')
  return {state}
}, {
  increment: function () {
    return {
      type: 'INCREMENT'
    }
  }
}, undefined, {pure: false})(Demo2)
