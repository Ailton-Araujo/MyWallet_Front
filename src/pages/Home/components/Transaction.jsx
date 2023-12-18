import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import useAuth from '../../../hooks/useAuth.jsx';
import { deleteTransaction } from '../../../services/api';

export default function Transaction({
  id,
  transactionsList,
  setTransactions,
  transaction,
}) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { date, description, amount, type } = transaction;

  function tryDelete() {
    const userConfirm = confirm('Você deseja deletar essa entrada');
    if (!userConfirm) return;
    function success() {
      setTransactions([
        ...transactionsList.filter((transaction) => transaction.id !== id),
      ]);
    }
    const args = { id, token: auth.token };
    deleteTransaction(args, success);
  }

  function toEdit() {
    navigate(`/editar-registro/${type}/${id}`, {
      state: {
        description,
        amount: (amount / 100).toFixed(2).replace('.', ','),
      },
    });
  }
  return (
    <ListItemContainer>
      <div>
        <span>{dayjs(date).format('DD/MM')}</span>
        <strong data-test='registry-name' onClick={toEdit}>
          {description}
        </strong>
      </div>
      <div>
        <Value data-test='registry-amount' color={type}>
          {(amount / 100).toFixed(2).replace('.', ',')}
        </Value>
        <button data-test='registry-delete' onClick={tryDelete}>
          X
        </button>
      </div>
    </ListItemContainer>
  );
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === 'entrada' ? 'green' : 'red')};
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
  div strong {
    cursor: pointer;
  }
  div {
    display: flex;
    gap: 5px;
    button {
      background: none;
      border: none;
      cursor: pointer;
      color: #c6c6c6;
      font-family: 'Raleway', sans-serif;
      font-size: 16px;
      font-weight: 400;
      padding: 0;
    }
  }
`;
