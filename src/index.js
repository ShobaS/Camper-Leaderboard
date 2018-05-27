import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class LeaderBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      persons: []
    }
  }

  componentDidMount() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(results => {
        return results.json();
      }).then(data => {
        let persons = data.map((person, i) => {
          return (
            <tr key={i}>
              <td>{i+1}</td>
              <td>
                <a href="https://www.freecodecamp.org/">
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
              <th>Points in 30days</th>
              <th>All time points</th>
            </tr>
            </thead>
          <tbody>{this.state.persons}</tbody>
        </table>
      </div>
    )
  }
}

ReactDOM.render(<LeaderBoard />, document.getElementById('root'))