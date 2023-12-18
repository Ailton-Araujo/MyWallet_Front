import styled from 'styled-components';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import useAuth from '../../hooks/useAuth.jsx';
import Logo from '../../components/Logo.jsx';
import { postSignIn } from '../../services/api';

export default function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [trySignIn, setTrySignIn] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  function signInSend(e) {
    e.preventDefault();
    setTrySignIn(true);
    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    function loginSuccess(token) {
      signIn(token);
      navigate('/home');
    }

    function loginFailure() {
      setTrySignIn(false);
    }
    const args = { body };
    postSignIn(args, loginSuccess, loginFailure);
  }

  return (
    <SingInContainer>
      <Logo />
      <form onSubmit={signInSend}>
        <input
          data-test='email'
          disabled={trySignIn}
          id='email'
          placeholder='E-mail'
          ref={emailRef}
          required
        />
        <input
          data-test='password'
          disabled={trySignIn}
          type='password'
          id='password'
          placeholder='Senha'
          ref={passwordRef}
          required
        />
        <button data-test='sign-in-submit' disabled={trySignIn} type='submit'>
          {trySignIn ? (
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
          ) : (
            'Entrar'
          )}
        </button>
      </form>
      <Link to={'/cadastro'}>Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
