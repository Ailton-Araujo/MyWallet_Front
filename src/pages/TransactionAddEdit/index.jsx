import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import useAuth from '../../hooks/useAuth.jsx';
import { postTransactionAdd, putTransactionEdit } from '../../services/api';
import backPageArrow from '../../assets/backPage.Icon.svg';

export default function TransactionAddEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tipo, id } = useParams();
  const { auth } = useAuth();
  const [tryAdd, setTryAdd] = useState(false);

  const [transactionDetails, setTransactionDetails] = useState({
    description: location.state ? location.state.description : '',
    amount: location.state ? location.state.amount : '',
    type: tipo,
  });

  function transactionSend(e) {
    e.preventDefault();
    setTryAdd(true);
    const body = {
      ...transactionDetails,
      amount: Number(transactionDetails.amount.replace(',', '.')),
    };
    function success() {
      setTryAdd(false);
      navigate('/home');
    }
    function failure() {
      setTryAdd(false);
    }
    if (!id) {
      const args = { body, token: auth.token };
      postTransactionAdd(args, success, failure);
    } else {
      const args = { id, body, token: auth.token };
      putTransactionEdit(args, success, failure);
    }
  }

  return (
    <TransactionsContainer>
      <header>
        <h1>
          {!id ? 'Nova ' : 'Editar '} {`${tipo}`}
        </h1>
        <button type='button' onClick={() => navigate(-1)}>
          <img src={backPageArrow} alt='backPage' />
        </button>
      </header>
      <form onSubmit={transactionSend}>
        <input
          data-test='registry-amount-input'
          type='text'
          disabled={tryAdd}
          id='amount'
          placeholder='Valor'
          value={transactionDetails.amount}
          onChange={(e) =>
            setTransactionDetails((prevState) => ({
              ...prevState,
              amount: e.target.value,
            }))
          }
        />
        <input
          data-test='registry-name-input'
          type='text'
          disabled={tryAdd}
          id='description'
          placeholder='Descrição'
          value={transactionDetails.description}
          onChange={(e) =>
            setTransactionDetails((prevState) => ({
              ...prevState,
              description: e.target.value,
            }))
          }
        />
        <button data-test='registry-save' disabled={tryAdd} type='submit'>
          {tryAdd ? (
            <ThreeDots
              height='20'
              width='60'
              radius='11'
              color=' #FFF'
              ariaLabel='three-dots-loading'
              wrapperStyle={{}}
              wrapperClassName=''
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
  height: 100svh;
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
