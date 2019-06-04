import React, { Component } from "react";
import { Header, Footer } from "./Components/Layouts";
import GridView from "./Customer/gridView";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { isLoaded: false, customers: [], dataSource: [] };
  // }

  departments = [
    { id: 1, value: "Corporate" },
    { id: 2, value: "EGA" },
    //  { id: 3, value: "Inventory Management" },
    // { id: 4, vlaue: "Manufacturing" },
    { id: 5, value: "QA" },
    { id: 6, value: "RD" }
    // { id: 7, value: "Sales and Marketing" }
  ];

  handleSelectChange = e => {
    const temp = [...this.state.customers];
    const dataSource = e.target.value
      ? temp.filter(f => f["firstName"].toLowerCase().includes(e.target.value))
      : temp;

    this.setState({ dataSource });
  };
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Header />
          <GridView />
          <Footer departments={this.departments} />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
