import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: "",
  });
  const [userImg, setUserImg] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }

    axios
      .get(`/login/${id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setUserData(data);
        setUserImg(data);
      })
      .catch((err) => {});
  }, []);

  const handleTextChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.value;
    setUserData(newUserData);
  };

  const handleImgChange = (ev) => {
    if (ev.target.files.length) {
      setUserImg(ev.target.files[0]);
    }
  };

  const handleCheckboxChange = (ev) => {
    let newUserData = JSON.parse(JSON.stringify(userData));
    newUserData[ev.target.id] = ev.target.checked;
    setUserData(newUserData);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    document.getElementById("name_err_msg").innerHTML = "";

    let name_err = "";

    if (userData.name.length < 2) {
      name_err =
        "<span class='text-danger'>Name needs contain at least 2 characters</span>";
    }

    document.getElementById("name_err_msg").innerHTML = name_err;

    if (name_err === "") {
      try {
        const formData = new FormData();
        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        if (document.getElementById("userimg").files.length > 0)
          formData.append("userimg", userImg);
        formData.append("isAdmin", userData.isAdmin);
        await axios.put(`/login/${id}`, formData, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        history.push("/users");
      } catch (err) {
        toast.error(err.response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="my-3">Edit user</h1>
      <div className="mb-3 form-floating">
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleTextChange}
        />
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <div id="name_err_msg"></div>
      </div>
      <div className="mb-3 form-floating">
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Description"
          value={userData.email}
          disabled="true"
        />
        <label htmlFor="email" className="form-label">
          Email:
        </label>
      </div>
      <div className="mb-3 form-floating">
        <input
          type="hidden"
          id="password"
          value={userData.password}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="userimg" className="form-label">
          Image
        </label>
        <input
          className="form-control"
          type="file"
          id="userimg"
          onChange={handleImgChange}
        />
      </div>
      <div className=" form-check form-switch">
        <input
          type="checkbox"
          className="form-check-input"
          id="isAdmin"
          name="isAdmin"
          role="switch"
          onChange={handleCheckboxChange}
          checked={userData.isAdmin}
        />
        <label htmlFor="isAdmin" className="form-label">
          Admin ?
        </label>
      </div>
      <button className="btn btn-primary my-3">Save</button>
      <Link className="btn btn-secondary my-3 mx-2" to="/users">
        Cancel
      </Link>
    </form>
  );
};

export default EditUserPage;
