import React, { Component } from 'react'
import MainViewContainer from './components/MainViewContainer'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PDX NOW</h1>
        </header>
        <section className="Main-content">
          <MainViewContainer />
        </section>
      </div>
    )
  }
}

export default App
