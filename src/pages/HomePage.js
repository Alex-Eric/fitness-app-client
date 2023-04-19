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
              src="https://www.incimages.com/uploaded_files/image/1024x576/getty_163226029_970551970450061_44546.jpg"
              alt="First slide"
            />
          </Link>
          <Carousel.Caption style={{ color: "white" }}>
            <h1>Muscles!</h1>
            <p>
              You can see all the muscles with images that you can exercise on
              our website!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Link to="/exercises">
            <img
              className="d-block w-100"
              src="https://www.samedaysupplements.com/blog/wp-content/uploads/2018/06/leg-day-workout-banner.jpg"
              alt="Second slide"
            />
          </Link>
          <Carousel.Caption style={{ color: "white" }}>
            <h1>Exercises!</h1>
            <p>
              Here you will find a series of basic exercises in addition to the
              exercises created by the community
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Link to="/workouts">
            <img
              className="d-block w-100"
              src="https://www.chelseapiersct.com/cpct2015/cache/file/3CB638CD-ECC2-55B3-79E56E1285465BBC_fitness-banner.jpg"
              alt="Third slide"
            />
          </Link>
          <Carousel.Caption style={{ color: "white" }}>
            <h1>Workouts!</h1>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
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
