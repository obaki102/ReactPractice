import React, { Component } from "react";
import { Header, Footer } from "./Components/Layouts";
import Container from "./Customer/Container";
//import Departments from "./Categories/Departments";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoaded: false, customers: [] };
  }

  componentDidMount() {
    fetch("https://localhost:5001/api/customers")
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoaded: true, customers: json });
      });
  }
  departments = [
    { id: 1, value: "Corporate" },
    { id: 2, value: "EGA" },
    //  { id: 3, value: "Inventory Management" },
    // { id: 4, vlaue: "Manufacturing" },
    { id: 5, value: "QA" },
    { id: 6, value: "RD" }
    // { id: 7, value: "Sales and Marketing" }
  ];

  render() {
    const { isLoaded, customers } = this.state;

    if (isLoaded) {
      return (
        <React.Fragment>
          <Header />
          <Container customers={customers} />
          <Footer departments={this.departments} />
        </React.Fragment>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

export default App;
