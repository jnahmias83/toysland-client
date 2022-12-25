import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

const HomePage = () => {
  const [toys, setToys] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
    if (jwtPayload.exp <= Date.now() / 1000) {
      localStorage.removeItem("token");
      dispatch(authActions.logout());
      history.push("/login");
    }

    axios
      .get(`/toys/fewtoys`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(({ data }) => {
        setToys(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
    <div className="container mt-3 mb-4">
      <div
        id="carouselExampleCaptions"
        className="carousel slide display-carousel"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="images/slider1.jpg"
              className="d-block img_max_height"
              alt="slide 1"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/slider2.jpg"
              className="d-block img_max_height"
              alt="slide 2"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/slider3.jpg"
              className="d-block img_max_height"
              alt="slide 3"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/slider4.jpg"
              className="d-block img_max_height"
              alt="slide 4"
            />
          </div>
          <div className="carousel-item">
            <img
              src="images/slider5.jpg"
              className="d-block img_max_height"
              alt="slide 5"
            />
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="row display-images">
        <div className="col-md-4 mt-5 mb-3">
          <img src="images/slider1.jpg" className="img_max_height" alt="slide 1" />
        </div>
        <div className="col-md-4 my-3">
          <img src="images/slider2.jpg" className="img_max_height" alt="slide 2" />
        </div>
        <div className="col-md-4 my-3">
          <img src="images/slider3.jpg" className="img_max_height" alt="slide 3" />
        </div>
        <div className="col-md-4 my-3">
          <img src="images/slider4.jpg" className="img_max_height" alt="slide 4" />
        </div>
        <div className="col-md-4 my-3">
          <img src="images/slider5.jpg" className="img_max_height" alt="slide 5" />
        </div>
      </div>
    </div>

    {toys.length > 0 ? (
        <>
          <h3 >See few toys ...</h3>
          <div className="row gap-4 m-4">
            {toys.map((toyItem) => (
                <div
                  className="card col-md-6 col-12"
                  key={toyItem._id}
                  style={{ width: "18rem" }}
                >
                  {toyItem.img !== "" ? (
                    <>
                      <img
                        src={toyItem.img}
                        className="card-img-top py-2"
                        alt={toyItem.name}
                      />
                    </>
                  ) : (
                    <div>No image</div>
                  )}

                  <div className="card-body">
                    <h5 className="card-title">{toyItem.name}</h5>
                    <p className="card-text">
                      <small>{toyItem.description}</small>
                      <br />
                      <strong>Category:</strong> {toyItem.category}
                      <br />
                      <strong>Price:</strong> {toyItem.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default HomePage;
