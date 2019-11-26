import React from 'react'
import ReactDom from 'react-dom'
import Main from './Main'

function App(){
  return(<Main/>)
}
ReactDom.render(
  <App/>,
  document.getElementById('root')
)
