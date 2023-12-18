import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FallingLines } from 'react-loader-spinner';
import useAuth from '../../hooks/useAuth.jsx';
import { getTransactions } from '../../services/api.js';
import { Header, Transaction, ButtonsNav } from './components/index.js';

export default function Home() {
  const { auth, signOut } = useAuth();

  const [Loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  let totalTransaction = 0;
  useEffect(() => {
    function success(data) {
      if (data.length === 0) {
        setLoading(false);
      }
      setTransactions(data);
    }
    function failure() {
      signOut();
    }
    const args = { token: auth.token };
    getTransactions(args, success, failure);
  }, []);
  return (
    <HomeContainer>
      <Header name={auth.name} token={auth.token} signOut={signOut} />
      <TransactionsContainer>
        {transactions.length === 0 ? (
          Loading && (
            <FallingLines
              color='#8c11be'
              width='100'
              visible={true}
              ariaLabel='falling-lines-loading'
            />
          )
        ) : (
          <ul>
            {transactions.map((transaction) => {
              if (transaction.type === 'entrada') {
                totalTransaction += transaction.amount;
              } else {
                totalTransaction -= transaction.amount;
              }
              return (
                <Transaction
                  key={transaction.id}
                  id={transaction.id}
                  transactionsList={transactions}
                  setTransactions={setTransactions}
                  transaction={transaction}
                />
              );
            })}
          </ul>
        )}
        <div>
          <strong>Saldo</strong>
          <Value
            data-test='total-amount'
            color={totalTransaction >= 0 ? 'entrada' : 'saida'}
          >
            {(totalTransaction / 100).toFixed(2).replace('.', ',')}
          </Value>
        </div>
      </TransactionsContainer>
      <ButtonsNav />
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  max-height: calc(100svh - 50px);
  padding: 25px 0px;
  display: flex;
  flex-direction: column;
`;

const TransactionsContainer = styled.article`
  min-height: calc(100svh - 220px);
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-shrink: 3;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  ul {
    height: calc(100svh - 220px);
    overflow-y: auto;
  }
  svg {
    align-self: center;
  }
  div {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === 'entrada' ? 'green' : 'red')};
`;
