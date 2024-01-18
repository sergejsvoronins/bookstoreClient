import { Accordion, Col, Container, Nav, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function AdminNav() {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Nav
            className="me-auto flex-column flex-grow"
            defaultActiveKey="/home"
            variant="underline"
          >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Böcker</Accordion.Header>
                <Accordion.Body>
                  <Nav.Link>Visa alla</Nav.Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Författare</Accordion.Header>
                <Accordion.Body>Visa all</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Kategorier</Accordion.Header>
                <Accordion.Body>Visa all</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Användare</Accordion.Header>
                <Accordion.Body>Visa all</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Beställningar</Accordion.Header>
                <Accordion.Body>Visa all</Accordion.Body>
              </Accordion.Item>
            </Accordion>
            {/* <NavDropdown title="Böcker" id="basic-nav-dropdown">
          <NavDropdown.Item href="/admin/books/create">Skapa</NavDropdown.Item>
          <NavDropdown.Item href="/admin/books/update">Ändra</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Användare" id="basic-nav-dropdown">
          <NavDropdown.Item href="/admin/users/create">Skapa</NavDropdown.Item>
          <NavDropdown.Item href="/admin/users/update">Ändra</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Författare" id="basic-nav-dropdown">
          <NavDropdown.Item href="/admin/authors/create">
            Skapa
          </NavDropdown.Item>
          <NavDropdown.Item href="/admin/authors/update">
            Ändra
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Kategorier" id="basic-nav-dropdown">
          <NavDropdown.Item href="/admin/categories/create">
            Skapa
          </NavDropdown.Item>
          <NavDropdown.Item href="/admin/categories/update">
            Ändra
          </NavDropdown.Item>
        </NavDropdown> */}
          </Nav>
        </Col>
        <Col md={8}>
          <Outlet></Outlet>
        </Col>
      </Row>
      {/* <Nav variant="tabs" defaultActiveKey="/admin">
        <Nav.Item>
          <Nav.Link href="/admin/books">Böcker</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/users">Användare</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/authors">Författare</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/admin/categories">Kategorier</Nav.Link>
        </Nav.Item>
      </Nav> */}
    </Container>
  );
}
