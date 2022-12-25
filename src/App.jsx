import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthGuardRoute from "./guard/AuthGuardRoute";
import NavbarComponent from "./components/Navbar.component";
import FooterComponent from "./components/Footer.component";
import RegisterPage from "./pages/Register.page";
import ForgetPasswordPage from "./pages/ForgetPassword.page";
import ResetPasswordPage from "./pages/ResetPassword.page";
import LoginPage from "./pages/Login.page";
import CartsPage from "./pages/Carts.page";
import PayPalPage from "./pages/PayPal.page";
import UsersPage from "./pages/Users.page";
import EditUserPage from "./pages/EditUser.page";
import HomePage from "./pages/Home.page";
import AboutPage from "./pages/About.page";
import NewToyPage from "./pages/NewToy.page";
import AllToysPage from "./pages/AllToys.page";
import MyToysPage from "./pages/MyToys.page";
import EditToyPage from "./pages/EditToy.page";
import PreferedToysPage from "./pages/PreferedToys.page";
import ProfilePage from "./pages/Profile.page";
import NotFoundPage from "./pages/NotFound.page";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <NavbarComponent/>
    <div className="container">
      <ToastContainer />
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forgetpassword" component={ForgetPasswordPage} />
        <Route path="/resetpassword/:token" component={ResetPasswordPage} />
        <Route path="/login" component={LoginPage} />
        <AuthGuardRoute path="/carts" component={CartsPage} />
        <Route path="/paypal/:stp" component={PayPalPage} />
        <AuthGuardRoute path="/users" exact component={UsersPage} />
        <AuthGuardRoute path="/users/:id" component={EditUserPage} />
        <AuthGuardRoute path="/home" component={HomePage} />
        <AuthGuardRoute path="/about" component={AboutPage} />
        <AuthGuardRoute path="/newtoy" component={NewToyPage} />
        <AuthGuardRoute path="/alltoys" component={AllToysPage} />
        <AuthGuardRoute path="/mytoys" exact component={MyToysPage} />
        <AuthGuardRoute path="/mytoys/:id" component={EditToyPage} />
        <AuthGuardRoute path="/preferedtoys" exact component={PreferedToysPage} />
        <AuthGuardRoute path="/profile" exact component={ProfilePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </div>
    <FooterComponent/>
    </>
  );
}

export default App;