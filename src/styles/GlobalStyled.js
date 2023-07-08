import { createGlobalStyle, css } from "styled-components";
import ResetStyle from "./ResetStyled";

const GlobalStyle = createGlobalStyle`
  ${ResetStyle}

  * {
    box-sizing: border-box;
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 400;
  }
  body {
    min-height: 100vh;
    background-color: #8c11be;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  h1 {
    font-weight: 700;
    font-size: 26px;
    color: white;
  }
  form {
    width: calc(100% - 15%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    border-radius: 5px;
  }
  input {
    width: 100%;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    margin: 1px;
    font-size: 20px;
    :focus {
      border: 2px solid #ffb6b6;
      margin: 0px;
    }
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
  button {
    width: 100%;
    padding: 15px;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  }
  a {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: white;
    text-decoration: none;
    padding-top: 30px;
  }
`;

export default GlobalStyle;
