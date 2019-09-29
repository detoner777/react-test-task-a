import React from "react";
import Loader from "./Loader";

export default class ViewComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      .then(response => {
        return response.json();
      })
      .then(({ data }) => {
        this.setState({
          items: data.children,
          isLoading: false
        });
      });
  }

  render() {
    const { items, isLoading } = this.state;
    return (
      <div>
        <h1>Top commented.</h1>
        {isLoading ? (
          <Loader />
        ) : (
          items.map(item => (
            <div
              key={item.data.id}
              style={{
                border: "1px solid black",
                marginBottom: "10px",
                padding: "5px"
              }}
            >
              {item.data.thumbnail ? (
                <img src={item.data.thumbnail} alt="" />
              ) : null}

              <p>{item.data.title}</p>
              <p>Number of comments: {item.data.num_comments}</p>
              <a
                href={`https://www.reddit.com/${item.data.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Link
              </a>
            </div>
          ))
        )}
      </div>
    );
  }
}
