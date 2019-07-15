import React from "react";
import "./App.css";
import Nav from "./components/Nav.js";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
      isLoaded: false,
      id: []
    };
  }

  async componentDidMount() {
    const url = `https://cors-anywhere.herokuapp.com/https://api.tronalddump.io/search/quote?query=obama&page_size=3&page=1`;
    await axios.get(url).then(response => {
      this.setState({
        titles: response.data._embedded.quotes.slice(0, 3),
        isLoaded: true
      });
    });
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = this.state;
    const url = `https://cors-anywhere.herokuapp.com/https://api.tronalddump.io/search/quote?query=${
      this.state.value
    }&page_size=3&page=1`;
    axios.get(url).then(response => {
      if (
        data.value !== this.state.value &&
        response.data._embedded.quotes.value === undefined
      ) {
        console.log("Shockinly Trump hasn't said a word!");
      } else {
        this.setState({
          isLoaded: true,
          titles: response.data._embedded.quotes.slice(0, 3)
        });
      }
    });
  };
  handleOnClick = event => {
    event.preventDefault();
    const data = this.state;
    const url = `https://cors-anywhere.herokuapp.com/https://api.tronalddump.io/random/quote`;
    axios.get(url).then(response => {
      if (data.titles === null || data.titles === undefined) {
        return <p>Shockinly Trump hasn't said a word!</p>;
      } else {
        this.setState({
          isLoaded: true,
          titles: [response.data]
        });
      }
    });
  };

  render() {
    const { titles } = this.state;
    return (
      <React.Fragment>
        <div>
          <Nav />
        </div>
        <br />
        <br />
        <div>
          {!this.state.isLoaded ? (
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status" />
            </div>
          ) : (
            <React.Fragment>
              <div>
                <div>
                  <form onSubmit={this.handleSubmit} style={{ width: "60%" }}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Type something"
                        value={this.state.value}
                        onChange={this.handleChange}
                        name="tag"
                        style={{ width: "30%" }}
                      />
                    </div>
                    <button
                      style={{
                        color: "black",
                        fontSize: "1em",
                        backgroundColor: "darkgrey",
                        width: "30%"
                      }}
                      className="btn btn-primary btn-lg btn-block mb-1"
                      type="submit"
                    >
                      <strong>Search</strong>
                    </button>
                    <small
                      className="form-text text-muted"
                      style={{ width: "30%" }}
                    >
                      Please Note that it will not return a value if the word is
                      not in the DataBase.
                    </small>
                  </form>
                </div>
                <span>
                  <button
                    style={{
                      color: "black",
                      fontSize: "1em",
                      backgroundColor: "darkgrey",
                      width: "18%"
                    }}
                    className="btn btn-primary btn-lg btn-block mb-1"
                    type="submit"
                    onClick={this.handleOnClick}
                  >
                    <strong>Random Quote</strong>
                  </button>
                </span>
              </div>
              <p
                style={{ float: "right", marginRight: "50%", fontSize: "2em" }}
              >
                <big>
                  <i>Trump Quotes!</i>
                </big>
              </p>
              <br />
              <br />
              <br />
              <div
                style={{
                  width: "27%",
                  marginRight: "0%",
                  backgroundColor: "whitesmoke"
                }}
                className="flex-container"
                className="row-md-4 offset-md-4"
              >
                {titles.map(data => {
                  return (
                    <React.Fragment>
                      <div
                        className="card mb-3"
                        className="shadow-sm p-3 mb-5 bg-white rounded"
                      >
                        <h5 key={data.quote_id} className="card-title">
                          <big> Trump on {data.tags}:</big>
                        </h5>
                        <br />
                        <p className="card-text">{data.value}</p>
                        <br />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default App;
