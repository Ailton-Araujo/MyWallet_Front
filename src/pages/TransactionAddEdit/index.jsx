import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import { postTransactionAdd, putTransactionEdit } from "../../services/api";
import backPageArrow from "../../assets/backPage.Icon.svg";

export default function TransactionAddEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tipo, id } = useParams();
  const { auth } = useAuth();
  const [tryAdd, setTryAdd] = useState(false);
  let prevDescription = "";
  let prevAmount = "";
  if (location.state) {
    prevDescription = location.state.description;
    prevAmount = location.state.amount.toFixed(2);
  }
  const [description, setDescription] = useState(prevDescription);
  const [amount, setAmount] = useState(prevAmount);

  function transactionSend(e) {
    e.preventDefault();
    setTryAdd(true);
    const data = {
      description,
      amount: Number(amount.replace(",", ".")),
      type: tipo,
    };
    function success() {
      setTryAdd(false);
      navigate("/home");
    }
    function failure() {
      setTryAdd(false);
    }
    if (!id) {
      postTransactionAdd(data, auth.token, success, failure);
    } else {
      putTransactionEdit(id, data, auth.token, success, failure);
    }
  }

  return (
    <TransactionsContainer>
      <header>
        <h1>
          {!id ? "Nova " : "Editar "} {`${tipo}`}
        </h1>
        <button type="button" onClick={() => navigate(-1)}>
          <img src={backPageArrow} alt="backPage" />
        </button>
      </header>
      <form onSubmit={transactionSend}>
        <input
          data-test="registry-amount-input"
          disabled={tryAdd}
          id="amount"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          // required
        />
        <input
          data-test="registry-name-input"
          disabled={tryAdd}
          id="description"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          // required
        />
        <button data-test="registry-save" disabled={tryAdd} type="submit">
          {tryAdd ? (
            <ThreeDots
              height="20"
              width="60"
              radius="11"
              color=" #FFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : !id ? (
            `Nova ${tipo}`
          ) : (
            `Atualizar ${tipo}`
          )}
        </button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  padding: 25px 0px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  header {
    width: calc(100% - 50px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    button {
      width: 60px;
      height: 60px;
      flex-grow: 0;
      padding: 0px;
      border: none;
      background: none;
      img {
        width: 45px;
        height: 45px;
      }
    }
  }
`;
