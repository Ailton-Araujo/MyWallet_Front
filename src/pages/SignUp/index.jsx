import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import Logo from "../../components/Logo";
import { postSignUp } from "../../services/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [trySignUp, setTrySignUp] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [confirmPassWord, setConfirmPassword] = useState("");

  function checkPassword(confirmPassword) {
    if (confirmPassword !== "" && password !== confirmPassword) {
      setConfirmPassword("Ambas as senhas devem ser iguais");
    } else if (password === confirmPassword) {
      setConfirmPassword("");
    }
  }

  function signUpSend(e) {
    if (confirmPassWord.length !== 0)
      return alert("Ambos as Senhas devem ser iguais");
    e.preventDefault();
    setTrySignUp(true);

    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password,
    };

    function signUpSuccess() {
      navigate("/");
    }

    function signUpFailure() {
      setTrySignUp(false);
    }
    const args = { body };
    postSignUp(args, signUpSuccess, signUpFailure);
  }

  return (
    <SingUpContainer>
      <Logo />
      <form onSubmit={signUpSend}>
        <input
          data-test="name"
          disabled={trySignUp}
          type="text"
          id="name"
          placeholder="Nome"
          ref={nameRef}
          required
        />
        <input
          data-test="email"
          disabled={trySignUp}
          // type="email"
          id="email"
          placeholder="E-mail"
          ref={emailRef}
          required
        />
        <input
          data-test="password"
          disabled={trySignUp}
          type="password"
          id="password"
          placeholder="Senha"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          data-test="conf-password"
          disabled={trySignUp}
          type="password"
          id="confirmPassword"
          placeholder="Confirme a senha"
          autoComplete="new-password"
          onChange={(e) => {
            checkPassword(e.target.value);
          }}
          required
        />
        <p>{confirmPassWord}</p>
        <button data-test="sign-up-submit" disabled={trySignUp} type="submit">
          {trySignUp ? (
            <ThreeDots
              height="15"
              width="60"
              radius="11"
              color=" #FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
      <Link to={"/"}>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
