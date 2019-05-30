import React, { Component } from "react";

class Counter extends Component {
  // constructor() {
  //    super();
  //    this.handleIncrement = this.handleIncrement.bind(this);
  // }

  //state = {
  // value: this.props.counter.value,
  // tags: ["tag1", "tag2", "tag3"]
  // };

  styles = {
    fontSize: 10,
    fontWeight: "bold"
  };

  //handleIncrement = id => {
  // this.setState({ value: this.state.value + 1 });
  //};

  //renderTags() {
  // if (this.state.tags.length === 0) return <p>Tags are empty</p>;
  //return (
  //  <ul>
  //   {this.state.tags.map(tag => (
  //      <li key={tag}>{tag}</li>
  //    ))}
  //  </ul>
  // );
  //}

  componentDidUpdate(prevProps, prevState) {
    //This part where you can set another ajax call
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    if (prevProps.counter.value !== this.porps.counter.value) {
      //Ajax call and get new data from the server
    }
  }
  render() {
    //console.log(this.props.children);
    console.log("Counter - Rendered");
    return (
      <div>
        <h4>Counter# {this.props.counter.id}</h4>
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => this.props.onIncrement(this.props.counter)}
        >
          Increment
        </button>
        <button
          className="btn btn-danger btn-sm m-2"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? <span>zero</span> : value;
  }
}

export default Counter;
