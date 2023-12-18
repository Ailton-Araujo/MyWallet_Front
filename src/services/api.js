import axios from 'axios';
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

function tokenProvider(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

function postSignIn(args, success, failure) {
  const { body } = args;
  axios
    .post('/sign-in', body)
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
    .post('/sign-up', body)
    .then(() => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function deleteSignOut(args, success) {
  const { token } = args;
  console.log(tokenProvider(token));
  axios
    .put('/sign-out', '', tokenProvider(token))
    .then(() => {
      success();
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
}

function getTransactions(args, success, failure) {
  const { token } = args;
  axios
    .get('/transactions', tokenProvider(token))
    .then((res) => {
      success(res.data);
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function postTransactionAdd(args, success, failure) {
  const { token, body } = args;
  axios
    .post(`/addTransaction/`, body, tokenProvider(token))
    .then(() => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
      failure();
    });
}
function deleteTransaction(args, success) {
  const { token, id } = args;
  axios
    .delete(`/transaction/${id}`, tokenProvider(token))
    .then((res) => {
      success();
    })
    .catch((error) => {
      alert(error.response.data);
    });
}
function putTransactionEdit(args, success, failure) {
  const { token, id, body } = args;
  axios
    .put(`/transaction/${id}`, body, tokenProvider(token))
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
