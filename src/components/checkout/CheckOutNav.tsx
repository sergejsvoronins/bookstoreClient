import { Navbar, Container, Nav } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";

export function CheckOutNav() {
  return (
    <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-between"
        >
          <Nav>
            <Nav.Link href="/">
              <ChevronLeft />
              Fortsätt handla
            </Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Brand>Bookstore</Navbar.Brand>
          </Nav>
          <Nav>
            <Nav.Link href="#">Logga in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
