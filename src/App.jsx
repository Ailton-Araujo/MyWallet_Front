import { Route, Routes } from "react-router-dom";
import { SignOutOutlet, SignInOutlet } from "./components/Outlets";
import { SignIn, SignUp, Home, TransactionAddEdit } from "./pages";

function App() {
  return (
    <Routes>
      <Route element={<SignInOutlet />}>
        <Route path="/" element={<SignIn />} />
      </Route>

      <Route path="/cadastro" element={<SignUp />} />

      <Route element={<SignOutOutlet />}>
        <Route path="/home" element={<Home />} />
        <Route path="/nova-transacao/:tipo" element={<TransactionAddEdit />} />
        <Route
          path="/editar-registro/:tipo/:id"
          element={<TransactionAddEdit />}
        />
      </Route>
    </Routes>
  );
}

export default App;
