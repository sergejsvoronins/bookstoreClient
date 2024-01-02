import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { Bag, List, Person } from "react-bootstrap-icons";
import "../navigation/Navigation.scss";
import { useEffect, useState } from "react";
export function Navigation() {
  const [isSmallScreen, setSmalScreen] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      setSmalScreen(innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbar expand={"md"} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`}>
            <List />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="#action1">Hem</Nav.Link>
                <NavDropdown
                  title="Kategori"
                  id={`offcanvasNavbarDropdown-expand-${"md"}`}
                >
                  <NavDropdown.Item href="/books">Visa alla</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/books?category=kategori1">
                    Kategori 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.4">
                    Kategori 2
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/admin">Adminsida</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Form className="nav-search d-flex ">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <Nav className="justify-content-end px-2">
            <Nav.Link href="/">
              {!isSmallScreen && "Account"} <Person />
            </Nav.Link>
          </Nav>
          <Nav className="px-2 justify-content-end px-2">
            <Nav.Link href="/">
              {!isSmallScreen && "Cart"} <Bag />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
