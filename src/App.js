import React from 'react'
import {Provider} from 'react-redux'
import './App.css'
import store from './store/index'
import {BlurExample, HooksTestDemo, Modal, SnapshotTestDemo, TestRefDemo} from "./demo"
import {ReduxDemo1, ReduxDemo2, ReduxDemo3} from "./demo/ReduxDemo"
import VirtualListDemo from "./virtualList/VirtualListDemo"
import DemoCardHoc from "./component/DemoCardHoc"
import ResizeObserverDemo from './ResizeObserverDemo/ResizeObserverDemo'
import DomEventDemo from "./domEvent/DomEventDemo"

const ReduxDemo = DemoCardHoc('redux demo')(
  function () {
    return (
      <div>
        <ReduxDemo1/>
        <ReduxDemo2/>
        <ReduxDemo3/>
      </div>
    )
  }
)

/**
 * ModalDemo
 */
const ModalDemo = DemoCardHoc('modal test')(
  class ModalDemoClass extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        active: false
      }
    }

    render() {
      return (
        <div className={'modal-test'}>
          <button
            onClick={() => {
              this.setState({active: !this.state.active})
            }}
          >
            {this.state.active ? '关闭' : '打开'}
          </button>
          <Modal active={this.state.active}>
            <div>
              this is test modal
            </div>
          </Modal>
        </div>
      )
    }
  }
)

const BlurDemo = DemoCardHoc('blue demo')(
  function () {
    return (
      <React.Fragment>
        <BlurExample/>
        <BlurExample/>
        <BlurExample/>
      </React.Fragment>
    )
  }
)


/**
 * app
 */
class App extends React.Component {
  constructor(props) {
    super(props)


    React.memo(function Name() {
      return <div> this is memo test</div>
    })
  }

  render() {

    return (
      <Provider store={store}>
        <React.Fragment>
          <ReduxDemo/>
          {/*<VirtualListDemo/>*/}
          <ModalDemo/>
          <BlurDemo/>
          <TestRefDemo/>
          <SnapshotTestDemo/>
          <HooksTestDemo/>
          <ResizeObserverDemo/>
          <DomEventDemo />
        </React.Fragment>
      </Provider>
    )
  }
}


export default App
