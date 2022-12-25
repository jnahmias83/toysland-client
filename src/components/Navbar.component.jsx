import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store/auth";

const NavBarComponent = () => {
  const isAdmin = useSelector((state) => state.authSlice.isAdmin);
  const loggedIn = useSelector((state) => state.authSlice.loggedIn);
  const email = useSelector((state) => state.authSlice.email);
  const imgpath = useSelector((state) => state.authSlice.img);

  const history = useHistory();
  const dispatch = useDispatch();

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    axios
      .get("/login",  {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setUsersData(data);
      })
      .catch((err) => {});
  }, [loggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout());
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid w-100">
          <img
            src="../images/toysland-logo.png"
            width="50"
            alt="toysland-logo"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loggedIn ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    {isAdmin ? (
                      <>
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/newtoy"
                        >
                          New Toy
                        </NavLink>
                      </>
                    ) : null}
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/alltoys"
                    >
                      All Toys
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/mytoys"
                    >
                      My toys
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/preferedtoys"
                    >
                      My prefered toys
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          {loggedIn ? (
            <>
              <div style={{ fontSize: "12px", color: "white" }}>
                {imgpath !== "" ? (
                  <img
                    src={imgpath}
                    width="50"
                    height="50"
                    title={email}
                    alt="user img"
                  />
                ) : (
                  <img
                    src="../images/user_image.jpg"
                    width="50"
                    height="50"
                    title={email}
                    alt="user img"
                  />
                )}
                <NavLink to="/carts"><i class="fa-solid fa-cart-shopping mx-2" title="View cart" style={{fontSize: "20px"}}></i></NavLink>
                <span className="mx-2" style={{ color: "orangered" }}>
                  {usersData.length} users
                  {isAdmin ? (
                    <Link to="/users">
                      <i
                        className="fa-solid fa-pen-to-square mx-2"
                        style={{ fontSize: "16px" }}
                        title="Users management"
                      ></i>
                    </Link>
                  ) : null}
                </span>
              </div>
              <button
                className="btn btn-outline-warning"
                style={{ marginLeft: "15px", fontSize: "12px" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </nav>
      <br />
      <br />
      <br />
    </>
  );
};
export default NavBarComponent;
