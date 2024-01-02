import { Container, Nav, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function AdminNav() {
  return (
    <Container>
      <Nav className="me-auto">
        <NavDropdown title="Böcker" id="basic-nav-dropdown">
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
        </NavDropdown>
      </Nav>
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
      <Outlet></Outlet>
    </Container>
  );
}
