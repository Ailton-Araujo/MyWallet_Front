import styled from 'styled-components';
import { BiExit } from 'react-icons/bi';
import { deleteSignOut } from '../../../services/api';

export default function Header({ name, token, signOut }) {
  return (
    <HeaderStyled>
      <h1 data-test='user-name'>{`Olá, ${name}`}</h1>
      <BiExit
        data-test='logout'
        onClick={() => {
          console.log(token);
          deleteSignOut({ token }, signOut);
        }}
      />
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
