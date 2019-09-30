import React from "react";
import { Item } from "./Item";
import Loader from "./Loader";
import { getIterator } from "core-js";

export default class ViewComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false
    };
  }

  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
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
  };

  updateAutoRefresh = () => {
    this.setState(
      state => ({
        enableAutoRefresh: !state.enableAutoRefresh
      }),
      () => {
        if (this.state.enableAutoRefresh) {
          this.autoreRefresh = setInterval(this.getItems, 3000);
        } else {
          clearInterval(this.autoreRefresh);
        }
      }
    );
  };

  render() {
    const { items, isLoading, enableAutoRefresh } = this.state;
    //sorting by data
    const itemsSortByComments = items.sort(
      (a, b) => b.data.num_comments - a.data.num_comments
    );
    return (
      <div>
        <h1>Top commented.</h1>
        <button
          type="button"
          style={{ marginBotto: "15px" }}
          onClick={this.updateAutoRefresh}
        >
          {enableAutoRefresh ? "Stop" : "Start"} auto-refresh
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          itemsSortByComments.map(item => (
            <Item key={item.data.id} data={item.data} />
          ))
        )}
      </div>
    );
  }
}
