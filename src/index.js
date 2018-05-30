import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class LeaderBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      persons: []
    };
    this.viewData = () => this._viewData();
  }

  _viewData(e) {
    console.log(e);
  }

  componentDidMount() {
    this.recentPoints(); 
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
    })
  }

  recentPoints() {
    let recentResults = fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
    .then(result => {
      return result.json();
    });
    this.displayData(recentResults);
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
              <th className="link" onClick={this.recentPoints.bind(this)}>Points in 30 days</th>
              <th className="link" onClick={this.allTimePoints.bind(this)}>All time points</th>
            </tr>
          </thead>
          <tbody>{this.state.persons}</tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<LeaderBoard />, document.getElementById('root'))