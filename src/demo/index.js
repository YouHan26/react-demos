import React, {useEffect} from "react"
import ReactDOM from "react-dom"
import autobind from "autobind-decorator"
import DemoCardHoc from "../component/DemoCardHoc"

export class BlurExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = {isOpen: false}
    this.timeOutId = null

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onBlurHandler = this.onBlurHandler.bind(this)
    this.onFocusHandler = this.onFocusHandler.bind(this)
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }))
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      })
    })
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId)
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    return (
      <div
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
        style={{position: 'relative'}}
      >

        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    )
  }
}

export const SimleButton = function () {
  return (
    <div>
      <button>this is a test button</button>
    </div>
  )
}

/**
 * ref test
 * @type {{$$typeof, render}}
 */
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
))


class TestRef extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  componentDidMount() {
    console.log(this.ref.current)
    this.ref.current.focus()
    console.log(this.refs.name)
    console.log(this.ref2)
  }

  render() {
    return [
      <FancyButton ref={this.ref} key={1}>Click me!</FancyButton>,
      <FancyButton ref={'name'} key={2}>Click me!</FancyButton>,
      <FancyButton
        ref={(ref) => {
          this.ref2 = ref
        }}
        key={3}
      >
        Click me!
      </FancyButton>,
      <>
        <div>test</div>
      </>,
      <div key="4">
      </div>
    ]
  }
}

export const TestRefDemo = DemoCardHoc('test ref demo')(TestRef)

export class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.getRender = this.getRender.bind(this)
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)
  }

  componentWillMount() {
    this.mount()
  }

  componentWillUnmount() {
    this.unmount()
  }

  mount() {
    this.modalEl = document.createElement('div')
    this.modalEl.style = 'position: fixed; top: 0;left: 0;'
    window.document.body.appendChild(this.modalEl)
  }

  unmount() {
    this.modalEl && window.document.body.removeChild(this.modalEl)
    this.modalEl = null
  }

  //
  // componentWillRecieveProps(nextProps) {
  //   if (nextProps.acctive !== this.props.acctive) {
  //     if (nextProps.active) {
  //       !this.modalEl && this.mount()
  //     } else {
  //       this.unmount()
  //     }
  //   }
  // }

  getRender() {
    const width = window.innerWidth
    const height = window.innerHeight
    return (
      <div style={{
        position: 'absolute',
        left: width / 2 - 360 / 2,
        top: height / 2 - 200 / 2,
        width: '360px',
        height: '200px',
        backgroundColor: 'yellow'
      }}>
        {this.props.children}
      </div>
    )
  }

  render() {
    if (this.props.active) {
      return ReactDOM.createPortal(this.getRender(), this.modalEl)
    }
    return null
  }
}

class SnapshotTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      value: 0
    }

    this.ref = React.createRef()
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.data.length < this.state.data.length) {
      const list = this.ref.current
      console.log(list.scrollHeight,
        list.scrollTop,
        list.scrollHeight - list.scrollTop)
      return list.scrollHeight - list.scrollTop
    }
    return null
  }

  componentDidMount() {
    console.log(this.state.value) // 0
    this.setState({value: this.state.value + 1})
    console.log(this.state.value) // 1
    this.setState({value: this.state.value + 1})
    console.log(this.state.value) // 2
  }

  componentDidUpdate(preProps, preState, snapshot) {
    if (snapshot !== null) {
      const list = this.ref.current
      list.scrollTop = list.scrollHeight - snapshot
    }
  }

  @autobind
  addLine() {
    console.log(this.state, 'begin state')
    this.setState((state) => {
      console.log(state, 'from old state')
      return {
        data: [
          ...state.data,
          {name: state.data.length}
        ]
      }
    }, () => {
      console.log(this.state.data, 'set state callback')
    })
    console.log(this.state, 'begin state2')
    this.setState((state) => {
      console.log(state, 'from old state2')
      return {
        data: [
          ...state.data,
          {name: state.data.length}
        ]
      }
    }, () => {
      console.log(this.state.data, 'set state callback2')
    })

    setTimeout(() => {
      console.log(this.state, 'begin state3')
      this.setState((state) => {
        console.log(state, 'from old state3')
        return {
          data: [
            ...state.data,
            {name: state.data.length}
          ]
        }
      }, () => {
        console.log(this.state.data, 'set state callback3')
      })
    })
  }

  render() {
    const {data} = this.state
    return (
      <div>
        <button onClick={this.addLine}>add line</button>
        <div ref={this.ref} style={{height: 400, overflow: 'scroll', backgroundColor: 'lightgray'}}>
          {data.map((item, index) => {
            return (
              <div key={index} style={{height: 100, margin: 10, backgroundColor: 'white'}}>
                <h2>{item.name}</h2>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export const SnapshotTestDemo = DemoCardHoc('snapshot demo')(SnapshotTest)


export function HooksDemoItem({data}) {
  useEffect(() => {
    console.log(' run effect', data)
    return () => {
      console.log('run unmount effect', data)
    }
  })
  return <div>count: {data}</div>
}

class HooksDemo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({count: this.state.count + 1})
          }}
        >
          add count
        </button>
        this is hooks demo
        <HooksDemoItem data={this.state.count}/>
      </div>
    )
  }
}

export const HooksTestDemo = DemoCardHoc('hook test demo')(HooksDemo)
