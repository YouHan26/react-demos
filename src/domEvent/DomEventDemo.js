import React from 'react'
import ReactDOM from 'react-dom'
import DemoCardHoc from "../component/DemoCardHoc"


class DomEventDemo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: ''
    }

    this.handleEvent = this.handleEvent.bind(this)
    this.handleKeyUp = this.handleEvent('key up')
    this.handleKeyDown = this.handleEvent('key down')
    this.handleKeyPress = this.handleEvent('key key press')
    this.handleClick = this.handleEvent('click')
    this.print = this.print.bind(this)
  }

  componentDidMount() {
    console.log(this.ref, ReactDOM.findDOMNode(this.ref))
    this.ref.addEventListener('keyup', this.handleKeyUp)
    this.ref.addEventListener('keydown', this.handleKeyDown)
    this.ref.addEventListener('keypress', this.handleKeyPress)
    this.ref.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    this.ref.removeEventListener('keyup', this.handleKeyUp)
    this.ref.removeEventListener('keydown', this.handleKeyDown)
    this.ref.removeEventListener('keypress', this.handleKeyPress)
    this.ref.removeEventListener('click', this.handleClick)
  }

  handleEvent(message) {
    return (e) => {
      this.print(message, e)
    }
  }

  print() {
    console.log(arguments)
    this.setState({
      text: []
        .slice
        .apply(arguments)
        .map(function (item) {
          if (typeof item === 'object') {
            const data = {}
            for (const i in item) {
              if (item.hasOwnProperty(i)) {
                data[i] = item[i]
              }
            }
            return JSON.stringify(data, null, 2)
          }
          return item
        })
        .join('\n')
    })
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <input
          ref={(ref) => {
            ref && (this.ref = ref)
          }}
          style={{width: 250, height: 250, backgroundColor: 'lightgreen', textAlign: 'center'}}
        >
        </input>
        <div style={{flex: 1, border: 'solid 1px gray'}}>
          {this.state.text}
        </div>
      </div>
    )
  }
}

export default DemoCardHoc('dom event demo')(DomEventDemo)
