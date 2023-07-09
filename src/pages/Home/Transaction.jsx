import styled from "styled-components";
import dayjs from "dayjs";
import useAuth from "../../hooks/useAuth";
import { deleteTransaction } from "../../services/api";

export default function Transaction({
  id,
  transactions,
  setTransactions,
  date,
  description,
  amount,
  type,
}) {
  const { auth } = useAuth();

  function tryDelete() {
    const teste = confirm("Você deseja deletar essa entrada");
    if (!teste) return;
    function success() {
      setTransactions([
        ...transactions.filter((transaction) => transaction._id !== id),
      ]);
    }
    deleteTransaction(id, auth.token, success);
  }
  return (
    <ListItemContainer>
      <div>
        <span>{dayjs(date).format("DD/MM")}</span>
        <strong data-test="registry-name">{description}</strong>
      </div>
      <div>
        <Value data-test="registry-amount" color={type}>
          {/* {amount.toLocaleString("pt-br", {
            useGrouping: true,
            minimumFractionDigits: 2,
          })} */}
          {amount.toFixed(2).replace(".", ",")}
        </Value>
        <p data-test="registry-delete" onClick={tryDelete}>
          X
        </p>
      </div>
    </ListItemContainer>
  );
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`;
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
  div {
    display: flex;
    gap: 5px;
    p {
      color: #c6c6c6;
      text-align: center;
      font-family: Raleway;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;
