import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Footer() {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      //   style={{ height: "500px" }}
      className="bg-secondary shadow"
    >
      <Row className="py-5">
        <Col xs={12} md={6}>
          <h1>Bookstore</h1>
        </Col>
        <Col xs={12} md={6}>
          <Row style={{ fontSize: "0.8rem" }}>
            <Col md={4} className="d-flex flex-column mb-3">
              <h6>Om oss</h6>
              <span>Om Bookstore</span>
            </Col>
            <Col md={4} className="d-flex flex-column mb-3">
              <h6>Följ oss</h6>
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </Col>
            <Col md={4} className="d-flex flex-column mb-3">
              <h6>Medlem</h6>
              <span onClick={() => navigate("/account")}>Mina sidor</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row className="text-light p-3" style={{ fontSize: "0.8rem" }}>
        Copyright © Bookstore 2023
      </Row>
    </Container>
  );
}
