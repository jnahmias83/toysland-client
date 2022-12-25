import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const UsersPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filtername, setFiltername] = useState("");
  const [filteremail, setFilteremail] = useState("");
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }

    axios
      .get(`/login`, {
        headers: { Authorization: `${localStorage.getItem("token")}` }
      })
      .then(({ data }) => {
        setUsersData(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <h1 className="my-3">Users Management</h1>

      {usersData.length > 0 ? (
        <>
          <div className="my-4">
            <div className="form-floating">
              <input
                type="search"
                className="form-control search"
                id="filtername"
                placeholder="Name"
                onChange={(e) => setFiltername(e.target.value.toLowerCase())}
              />
              <label htmlFor="filtername" className="form-label">
                Search by name
              </label>
            </div>
            <div className="form-floating my-3">
              <input
                type="search"
                className="form-control search"
                id="filteremail"
                placeholder="Email"
                onChange={(e) => setFilteremail(e.target.value.toLowerCase())}
              />
              <label htmlFor="filteremail" className="form-label">
                Search by email
              </label>
            </div>
          </div>

          <div className="row gap-4 m-4">
            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Admin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {usersData
                    .filter(
                      (userItem) =>
                        userItem.name.toLowerCase().includes(filtername) &&
                        userItem.email.toLowerCase().includes(filteremail)
                    )
                    .map((userItem) => (
                      <>
                        <tr key={userItem._id} style={{ alignItems: "center" }}>
                          <td>{userItem.name}</td>
                          <td>{userItem.email}</td>
                          <td>
                            {userItem.img !== "" ? (
                              <img
                                src={userItem.img}
                                width="70"
                                height="70"
                                alt="user img"
                              />
                            ) : (
                              <img
                                src="../../images/user_image.jpg"
                                width="70"
                                height="70"
                                alt="user img"
                              />
                            )}
                          </td>
                          <td>{userItem.isAdmin ? <>Yes</> : <>No</>}</td>
                          <td>
                            <Link
                              to={`/users/${userItem._id}`}
                              title="Edit"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center">No users</p>
      )}
    </>
  );
};

export default UsersPage;
