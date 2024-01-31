import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Envelope,
  Telephone,
  Facebook,
  Instagram,
  Linkedin,
} from "react-bootstrap-icons";

export function Footer() {
  const navigate = useNavigate();
  return (
    <Container fluid className="bg-secondary shadow">
      <Row className="py-5">
        <Col xs={12} md={6}>
          <h1>Bookstore</h1>
        </Col>
        <Col xs={12} md={6}>
          <Row style={{ fontSize: "0.8rem" }}>
            <Col md={3} className="d-flex flex-column mb-3">
              <h6>Om oss</h6>
              <span>Om Bookstore</span>
            </Col>
            <Col md={3} className="d-flex flex-column mb-3">
              <h6>Kontakta oss</h6>
              <span className="d-flex align-items-center">
                <Envelope className="me-1" />
                bookstore@epost.se
              </span>
              <span className="d-flex align-items-center">
                <Telephone className="me-1" />
                +46 72 123 45 67
              </span>
            </Col>
            <Col md={3} className="d-flex flex-column mb-3">
              <h6>Följ oss</h6>
              <a href="#" className="d-flex align-items-center">
                <Facebook className="me-1" />
                Facebook
              </a>
              <a href="#" className="d-flex align-items-center">
                <Instagram className="me-1" />
                Instagram
              </a>
              <a href="#" className="d-flex align-items-center">
                <Linkedin className="me-1" />
                LinkedIn
              </a>
            </Col>
            <Col md={3} className="d-flex flex-column mb-3">
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
