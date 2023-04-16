import { Container } from "react-bootstrap";
import "../assets/styles/main.css";
import "../assets/styles/home.css";
import homeGif from "../assets/img/home-gif-alt.gif";

const Home = () => {
  return (
    <Container>
      <Container className="row mx-2">
        <Container className="my-5 text-container col-md-4">
          <h1 className="fw-bold text-primary my-3">
            Simple, yet powerful tools to help you organize...
          </h1>
          <h4 className="py-4 text-primary">
            Optimate is the ideal productivity partner. We believe in combining
            technology, tricks and science to optimize workflow.
          </h4>
        </Container>

        <Container className="my-5 animation-container animation col-md-8">
          <img src={homeGif} alt="" className="animation img-fluid float" />
        </Container>
      </Container>
    </Container>
  );
};

export default Home;
