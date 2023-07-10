import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { SignOutOutlet, SignInOutlet } from "./components/Outlets";
import { SignIn, SignUp, Home, TransactionAddEdit, UserEdit } from "./pages";

function App() {
  // const navigate = useNavigate();
  // const { auth } = useAuth();
  // useEffect(() => {
  //   if (auth) {
  //     navigate("/home");
  //   }
  // }, []);
  return (
    <Routes>
      <Route element={<SignInOutlet />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
      </Route>
      <Route element={<SignOutOutlet />}>
        <Route path="/home" element={<Home />} />
        <Route path="/nova-transacao/:tipo" element={<TransactionAddEdit />} />
        <Route
          path="/editar-registro/:tipo/:id"
          element={<TransactionAddEdit />}
        />
        <Route path="/editar-usuario/:tipo/:id" element={<UserEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
