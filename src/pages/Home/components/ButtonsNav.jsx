import { useNavigate } from "react-router-dom";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import styled from "styled-components";

export default function ButtonsNav() {
  const navigate = useNavigate();
  return (
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
  );
}

const ButtonsContainer = styled.nav`
  margin-top: 15px;
  display: flex;
  gap: 15px;
  button {
    width: 50%;
    height: 115px;
    padding: 20px;
    font-size: 22px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;
