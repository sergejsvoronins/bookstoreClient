import { Navbar, Container, Nav } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function CheckOutNav() {
  const navigate = useNavigate();
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            <Nav.Link onClick={() => navigate("/")}>
              <ChevronLeft />
              Fortsätt handla
            </Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Brand>Bookstore</Navbar.Brand>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigate("/books")}>Logga in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
