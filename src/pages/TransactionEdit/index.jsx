import styled from "styled-components";

export default function TransactionEdit() {
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input
          data-test="registry-amount-input"
          placeholder="Valor"
          type="text"
        />
        <input
          data-test="registry-amount-input"
          placeholder="Descrição"
          type="text"
        />
        <button data-test="registry-save">Salvar TRANSAÇÃO</button>
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
