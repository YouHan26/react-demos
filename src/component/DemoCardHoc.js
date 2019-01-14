import React from 'react'

function DemoCardHoc(title) {
  return function (Comp) {
    return function () {
      return (
        <div style={{border: 'solid 1px lightblue', padding: 12, margin: 12, minHeight: 200}}>
          <h3>{title}</h3>
          <hr/>
          <div>
            <Comp/>
          </div>
        </div>
      )
    }
  }
}

export default DemoCardHoc
