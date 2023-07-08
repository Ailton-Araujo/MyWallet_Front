import axios from "axios";
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

function tokenProvider(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}
//UserRequests

function postSignIn(obj, success, failure) {
  axios
    .post("/sign-in", obj)
    .then((res) => {
      success(res.data);
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function postSignUp(obj, success, failure) {
  axios
    .post("/sign-up", obj)
    .then((res) => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function deleteSignOut(auth, success) {
  axios
    .delete("/sign-out", tokenProvider(auth))
    .then(() => {
      success();
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
function putUserEdit(obj, auth) {
  axios.put("/edit-user", obj, tokenProvider(auth)).then().catch();
}

//TransactionsRequests

function getTransactions(auth) {
  axios.get("/transactions", tokenProvider(auth)).then().catch();
}
function postTransactionAdd(obj, type, auth) {
  axios.post(`/transaction/${type}`, obj, tokenProvider(auth)).then().catch();
}
function deleteTransaction(id, auth) {
  axios.delete(`/transaction/${id}`, tokenProvider(auth)).then().catch();
}
function putTransactionEdit(id, obj, auth) {
  axios.put(`/transaction/${id}`, obj, tokenProvider(auth)).then().catch();
}

export {
  postSignIn,
  postSignUp,
  deleteSignOut,
  putUserEdit,
  getTransactions,
  postTransactionAdd,
  deleteTransaction,
  putTransactionEdit,
};
