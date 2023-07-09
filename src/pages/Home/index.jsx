import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FallingLines } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import { deleteSignOut, getTransactions } from "../../services/api";
import Transaction from "./Transaction";

export default function Home() {
  const { auth, signOut } = useAuth();
  const navigate = useNavigate();
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
    getTransactions(auth.token, success);
  }, []);
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">{`Olá, ${auth.name}`}</h1>
        <BiExit
          data-test="logout"
          onClick={() => {
            deleteSignOut(auth.token, signOut);
          }}
        />
      </Header>

      <TransactionsContainer>
        {transactions.length === 0 ? (
          Loading && (
            <FallingLines
              color="#8c11be"
              width="100"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          )
        ) : (
          <ul>
            {transactions.map((transaction) => {
              if (transaction.type === "entrada") {
                totalTransaction += transaction.amount;
              } else {
                totalTransaction -= transaction.amount;
              }
              return (
                <Transaction
                  key={transaction._id}
                  id={transaction._id}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  date={transaction.date}
                  description={transaction.description}
                  amount={transaction.amount}
                  type={transaction.type}
                />
              );
            })}
          </ul>
        )}
        <div>
          <strong>Saldo</strong>
          <Value
            data-test="total-amount"
            color={totalTransaction >= 0 ? "entrada" : "saida"}
          >
            {/* {totalTransaction.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })} */}
            {totalTransaction.toFixed(2).replace(".", ",")}
          </Value>
        </div>
      </TransactionsContainer>

      <ButtonsContainer>
        <button
          data-test="new-income"
          onClick={() => {
            navigate("/nova-transacao/entrada");
          }}
        >
          <AiOutlinePlusCircle />
          <p>
            Nova <br /> entrada
          </p>
        </button>
        <button
          data-test="new-expense"
          onClick={() => {
            navigate("/nova-transacao/saida");
          }}
        >
          <AiOutlineMinusCircle />
          <p>
            Nova <br />
            saída
          </p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.main`
  max-height: calc(100vh - 50px);
  padding: 25px 0px;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
  button {
    border: none;
    background: none;
  }
`;
const TransactionsContainer = styled.article`
  max-height: calc(100vh - 220px);
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
    overflow-y: scroll;
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
const ButtonsContainer = styled.nav`
  margin-top: 15px;
  display: flex;
  gap: 15px;
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
