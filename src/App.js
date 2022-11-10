import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppHeader } from "./components/AppHeader";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Offers } from "./pages/Offers";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <>
      <AppHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
    </>
  );
}

export default App;
