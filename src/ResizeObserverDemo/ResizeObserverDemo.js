import React from 'react'
import ReactDOM from 'react-dom'
import DemoCardHoc from "../component/DemoCardHoc"

/**
 * ResizeObserverItem
 */
class ResizeObserverItem extends React.PureComponent {
  render() {
    const {title, upper} = this.props
    return (
      <div style={{border: 'solid 1px lightgreen'}}>
        {title}
        <div>
          <button onClick={upper}>upper me</button>
        </div>
      </div>
    )
  }
}

/**
 * ResizeObserverDemo
 */
class ResizeObserverDemo extends React.Component {
  constructor(props) {
    super(props)

    this.els = {}

    this.upper = this.upper.bind(this)
  }

  componentDidMount() {
    let counter = 0
    const observation = new MutationObserver((mutations) => {
      console.log(mutations)
      if (counter++ > 5) {
        console.log(observation.takeRecords())
      }
    })

    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    }
    Object.values(this.els).forEach((el) => {
      observation.observe(el, config)
    })
  }

  upper(item) {
    const el = this.els[item]
    el.style.height = el.clientHeight + 10 + 'px'
  }

  render() {
    return (
      <div>
        {[1, 2, 3].map((item) => {
          return (
            <ResizeObserverItem
              title={item}
              key={item}
              upper={() => {
                this.upper(item)
              }}
              ref={(ref) => {
                ref && (this.els[item] = ReactDOM.findDOMNode(ref))
              }}
            />
          )
        })}
      </div>
    )
  }
}


export default DemoCardHoc('resize observer demo')(ResizeObserverDemo)
