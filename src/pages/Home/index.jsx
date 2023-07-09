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
  const [user, setUser] = useState({ name: "Usuário" });
  const [transactions, setTransactions] = useState([]);
  let totalTransaction = 0;
  useEffect(() => {
    function success(data) {
      if (data.length === 0) {
        setLoading(false);
      }
      setUser(data.user);
      setTransactions(data.transactions);
    }
    getTransactions(auth, success);
  }, []);
  return (
    <HomeContainer>
      <Header>
        <h1 data-test="user-name">{`Olá, ${user.name}`}</h1>
        <BiExit
          data-test="logout"
          onClick={() => {
            deleteSignOut(auth, signOut);
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

        <article>
          <strong>Saldo</strong>
          <Value
            data-test="total-amount"
            color={totalTransaction >= 0 ? "entrada" : "saida"}
          >
            {totalTransaction.toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </Value>
        </article>
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

const HomeContainer = styled.div`
  padding: 25px 0px;
  min-height: 100vh;
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
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: hidden;
  svg {
    align-self: center;
  }
  article {
    display: flex;
    justify-content: space-between;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
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
