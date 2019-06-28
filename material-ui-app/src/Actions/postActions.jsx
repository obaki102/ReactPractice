import { FETCH_POSTS, NEW_POST, FETCH_POST, PUT_CUST } from "./types";

export const fetchCustomers = () => dispatch => {
  console.log("fetching..");
  fetch("https://localhost:5001/api/customers")
    .then(res => res.json())
    .then(customers =>
      dispatch({
        type: FETCH_POSTS,
        payload: customers
      })
    );
};

export const fetchCustomer = id => dispatch => {
  console.log("fetching..");
  fetch("https://localhost:5001/api/customers/" + id)
    .then(res => res.json())
    .then(customer =>
      dispatch({
        type: FETCH_POST,
        payload: customer
      })
    );
};

export const createCustomer = customer => dispatch => {
  fetch("https://localhost:5001/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: post
      })
    );
};

export const modifyCustomer = customer => dispatch => {
  fetch("https://localhost:5001/api/customers/" + customer["customerKey"], {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: PUT_CUST,
        payload: post
      })
    );
};
