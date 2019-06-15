import React, { Component } from "react";
import { Header, Footer } from "./Components/Layouts";
import GridView from "./Customer/gridView";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";

class App extends Component {
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
