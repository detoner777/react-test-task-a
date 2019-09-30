import React from "react";
import { Item } from "./Item";
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
    //sorting by data
    const itemsSortByComments = items.sort(
      (a, b) => b.data.num_comments - a.data.num_comments
    );
    return (
      <div>
        <h1>Top commented.</h1>
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
