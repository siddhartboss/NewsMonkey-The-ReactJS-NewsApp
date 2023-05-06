import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

export default class App extends Component {
  sizePage = 9;
  // apiKey = process.env.REACT_APP_NEWS_API;
  apiKey = "92a7c01d2c4548f298dc40953ef7f32b";

  state={
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress : progress})
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        height={2}
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path="/" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.sizePage} country="in" category="general"/>}></Route>
          <Route exact path="/general" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.sizePage} country="in" category="general"/>}></Route>
          <Route exact path="/business" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.sizePage} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.sizePage} country="in" category="entertainment"/>}></Route>
          <Route exact path="/health" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.sizePage} country="in" category="health"/>}></Route>
          <Route exact path="/science" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.sizePage} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.sizePage} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element= {<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.sizePage} country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
  }
}
