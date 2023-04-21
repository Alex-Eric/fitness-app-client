import { useContext } from "react";
import { Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      {!isLoggedIn && (
        <>
          <section className="banner">
            <h2>Find your ideal exercise routine!</h2>
            <Link to="/register">
              <Button variant="danger"> Sign up for free!</Button>
            </Link>
          </section>
        </>
      )}
      <section className="introduction">
        <h2>Welcome to Fitness App</h2>
        <p>
          Our website is a tool to help you maintain a healthy lifestyle through
          exercise and workouts!
        </p>
      </section>
      <Carousel variant="dark" className="carousel">
        <Carousel.Item className="carousel-item">
          <Link to="/muscles">
            <img
              className="d-block w-100"
              src="https://news.gympass.com/wp-content/uploads/2017/07/shutterstock_472916869-1280x640-1024x512.jpg"
              alt="First slide"
            />
          </Link>
          <Carousel.Caption >
            <h1>Muscles!</h1>
            <h6 style={{ color: "white" }}>
              You can see all the muscles with images that you can exercise on
              our website!
            </h6>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Link to="/exercises">
            <img
              className="d-block w-100"
              src="https://setemagym.es/wp-content/uploads/2020/08/Entrenamiento-de-fuerza-para-principiantes-en-el-Gym.jpg"
              alt="Second slide"
            />
          </Link>
          <Carousel.Caption style={{ color: "white" }}>
            <h1>Exercises!</h1>
            <h6>
              Here you will find a series of basic exercises in addition to the
              exercises created by the community
            </h6>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Link to="/workouts">
            <img
              className="d-block w-100"
              src="https://wp.inews.co.uk/wp-content/uploads/2016/11/TRX-Burn-Upper-Body.jpg?resize=1536,1025&strip=all&quality=90"
              alt="Third slide"
            />
          </Link>
          <Carousel.Caption style={{ color: "white" }}>
            <h1>Workouts!</h1>
            <h6>
              Get Stronger, Leaner, and Healthier with These Effective Workout Routines
            </h6>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Sección de características */}
      <section className="features">
        <h2>Fitness App Features</h2>
        <ul>
          <li>Create and save your custom workout routines</li>
          <li>View exercises with muscle images and detailed descriptions</li>
          <li>Progress Log</li>
        </ul>
      </section>

      {/* Llamado a la acción */}
      {!isLoggedIn && (
        <>
          <section className="cta">
            <h2>Sign up to access all features and services exclusive</h2>
            <Link to="/register">
              <Button variant="danger"> Sign up for free!</Button>
            </Link>
          </section>
        </>
      )}
    </div>
  );
}

export default HomePage;
