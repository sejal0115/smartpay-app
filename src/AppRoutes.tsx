import { Route, Routes, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import SignInScreen from "./pages/SignInScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import SendMoney from "./pages/SendMoney";
import RequestMoney from "./pages/RequestMoney";
import SplitBills from "./pages/SplitBills";
import Savings from "./pages/Savings";
import Cards from "./pages/Cards";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import SignUpScreen from "./pages/SignUpScreen";
import AddCard from "./pages/AddCard";

const AppRoutes = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <WelcomeScreen onGetStarted={() => navigate("/signinscreen")} />
        }
      />

      <Route
        path="/signinscreen"
        element={
          <SignInScreen
            onSignIn={() => navigate("/Index")}
            onBack={() => navigate("/")}
          />
        }
      />

      <Route
        path="/forgot"
        element={<ForgotPassword onBack={() => navigate("/signinscreen")} />}
      />

      <Route
        path="/signup"
        element={
          <SignUpScreen
            onSignIn={() => navigate("/signinscreen")}
            onSignUp={() => navigate("/Index")}
            onBack={() => navigate("/")}
          />
        }
      />

      <Route path="/Index" element={<Index />} />
      <Route path="/send" element={<SendMoney />} />
      <Route path="/request" element={<RequestMoney />} />
      <Route path="/split" element={<SplitBills />} />
      <Route path="/savings" element={<Savings />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-card" element={<AddCard onSave={() => navigate("/cards")} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
