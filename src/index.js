import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const recentResults = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const alltimeResults = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';

class LeaderBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      persons: []
    };
    // let recentResults = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(result => {
    //   return result.json();
    // });
    // this.recentPoints = this.recentPoints.bind(this,recentResults);
    // this.allTimePoints = this.allTimePoints.bind(this);
  }

  componentDidMount() {
    let results = fetch(recentResults).then(result => {
      return result.json();
    }).catch(e => console.log('error'));
    // this.setState( {recentResults: recentResults});
    this.displayData(results);
  }

  displayData(results) {
    results.then(data => {
      let persons = data.map((person, i) => {
        return (
          <tr key={i}>
            <td className="center">{i + 1}</td>
            <td>
              <a target="_blank" href={"https://www.freecodecamp.org/" + person.username}>
                <img className="userimg" src={person.img} />
                <span>{person.username}</span>
              </a>
            </td>
            <td className="center">{person.recent}</td>
            <td className="center">{person.alltime}</td>
          </tr>
        )
      });
      this.setState({ persons: persons });
    }).catch(e => console.log('error1'));
  }

  recentPoints(results) {
    this.displayData(results);
  }

  allTimePoints() {
    let alltimeResults = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then(result => {
        return result.json();
      });
    this.displayData(alltimeResults);
  }

  render() {
    return (
      <div className="container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th colSpan="4">Leaderboard</th>
            </tr>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th className="link" onClick={this.recentPoints}>Points in 30 days</th>
              <th className="link" onClick={this.allTimePoints}>All time points</th>
            </tr>
          </thead>
          <tbody>{this.state.persons}</tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<LeaderBoard />, document.getElementById('root'))