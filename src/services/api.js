import axios from "axios";
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

function tokenProvider(auth) {
  return {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
}

function postSignIn(args, success, failure) {
  const { body } = args;
  axios
    .post("/sign-in", body)
    .then((res) => {
      success(res.data);
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function postSignUp(args, success, failure) {
  const { body } = args;
  axios
    .post("/sign-up", body)
    .then(() => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function deleteSignOut(args, success) {
  const { auth } = args;
  axios
    .delete("/sign-out", tokenProvider(auth))
    .then(() => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
    });
}

function getTransactions(args, success, failure) {
  const { auth } = args;
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
function postTransactionAdd(args, success, failure) {
  const { auth, body } = args;
  axios
    .post(`/addTransaction/`, body, tokenProvider(auth))
    .then(() => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function deleteTransaction(args, success) {
  const { auth, id } = args;
  axios
    .delete(`/transaction/${id}`, tokenProvider(auth))
    .then((res) => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
    });
}
function putTransactionEdit(args, success, failure) {
  const { auth, id, body } = args;
  axios
    .put(`/transaction/${id}`, body, tokenProvider(auth))
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
  getTransactions,
  postTransactionAdd,
  deleteTransaction,
  putTransactionEdit,
};
