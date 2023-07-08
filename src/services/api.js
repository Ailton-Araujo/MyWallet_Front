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
    .then(() => {
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

function getTransactions(auth, success, failure) {
  axios
    .get("/transactions", tokenProvider(auth))
    .then((res) => {
      success(res.data);
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function postTransactionAdd(obj, auth, success, failure) {
  axios
    .post(`/addTransaction/`, obj, tokenProvider(auth))
    .then(() => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function deleteTransaction(id, auth, success) {
  axios
    .delete(`/transaction/${id}`, tokenProvider(auth))
    .then((res) => {
      console.log(res.status);
      success();
    })
    .catch((error) => {
      alert(error.response.data);
    });
}
function putTransactionEdit(id, obj, auth, success, failure) {
  axios
    .put(`/transaction/${id}`, obj, tokenProvider(auth))
    .then(() => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
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
