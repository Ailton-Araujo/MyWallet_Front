import styled from "styled-components";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import { postTransactionAdd } from "../../services/api";

export default function TransactionAdd() {
  const navigate = useNavigate();
  const { tipo } = useParams();
  const { auth } = useAuth();
  const [tryAdd, setTryAdd] = useState(false);
  const descriptionRef = useRef();
  const amountRef = useRef();
  function transactionSend(e) {
    e.preventDefault();
    setTryAdd(true);
    const data = {
      description: descriptionRef.current.value,
      amount: Number(amountRef.current.value.replace(/[,.]/, "")),
      type: tipo,
    };
    function successAdd() {
      setTryAdd(false);
      navigate("/home");
    }
    function failureAdd() {
      setTryAdd(false);
    }
    postTransactionAdd(data, auth, successAdd, failureAdd);
  }

  return (
    <TransactionsContainer>
      <h1>Nova {`${tipo}`}</h1>
      <form onSubmit={transactionSend}>
        <input
          data-test="registry-amount-input"
          disabled={tryAdd}
          id="value"
          placeholder="Valor"
          ref={amountRef}
          required
        />
        <input
          data-test="registry-name-input"
          disabled={tryAdd}
          id="description"
          placeholder="Descrição"
          ref={descriptionRef}
          required
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
          ) : (
            `Salvar ${tipo}`
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

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
