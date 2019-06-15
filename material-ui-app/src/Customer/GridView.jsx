import React, { Component } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  Typography,
  BottomNavigation
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import "typeface-roboto";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import { fetchCustomers } from "../Actions/postActions";
import EditDialog from "../Components/Dialog/editDialog";
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      dataSource: []
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    this.props.fetchCustomers();
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newCustomer) {
      this.props.customers.unshift(nextProps.newCustomer);
    }
  }

  handleChangePage = (event, newPage) => {
    const page = newPage;
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    const rowsPerPage = parseInt(event.target.value, 10);
    this.setState({ rowsPerPage });
  };

  getHeaderTitle = header => {
    return header.split(/(?=[A-Z])/).join(" ");
  };

  capitalizeFirstLetter = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  onSelectChange = e => {
    console.log("onChange");
    const temp = [...this.props.customers];
    const dataSource = e.target.value
      ? temp.filter(f => f["firstName"].toLowerCase().includes(e.target.value))
      : temp;
    this.setState({ dataSource });
  };

  render() {
    console.log("render");
    const dataSource =
      this.state.dataSource.length > 0
        ? this.state.dataSource
        : this.props.customers;
    //let headers = [];

    // const listofHeaders = Object.keys(dataSource[0]);

    // listofHeaders.map(k => {
    //   const title = this.capitalizeFirstLetter(this.getHeaderTitle(k));
    //   headers.push({ title: title, field: k });
    //   return headers;
    // });
    const headers = [
      { title: "Options", field: "" },
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" },
      { title: "Birth Date", field: "birthDate" },
      { title: "Email Address", field: "emailAddress" }
    ];

    const { page, rowsPerPage } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, dataSource.length - page * rowsPerPage);

    return (
      <Paper>
        <div>
          <InputBase onChange={this.onSelectChange} placeholder="Search…" />
        </div>

        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} align="center">
                  <Typography variant="h6" gutterBottom>
                    {header.title}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow key={row.customerKey}>
                  {headers.map(function(header, index) {
                    if (index == 0) {
                      return (
                        <TableCell key="0" align="right">
                          <EditDialog customerKey={row["customerKey"]} />
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={index} align="left">
                          {row[header.field]}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}

            {this.emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30]}
                colSpan={3}
                count={dataSource.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  native: true
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

GridView.propTypes = {
  fetchCustomers: PropTypes.func.isRequired,
  customers: PropTypes.array.isRequired,
  newCustomer: PropTypes.object
};

const mapStateToProps = state => ({
  customers: state.posts.records,
  newCustomer: state.posts.record
});

export default connect(
  mapStateToProps,
  { fetchCustomers }
)(GridView);
