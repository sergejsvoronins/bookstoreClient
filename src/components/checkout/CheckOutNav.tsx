import { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { ChevronLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { IUserContext, UserContext } from "../../context/userContext";

export function CheckOutNav() {
  const { user } = useContext<IUserContext>(UserContext);
  const navigate = useNavigate();
  return (
    <Navbar className="bg-body-tertiary mb-5">
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
            {!user && (
              <Nav.Link
                onClick={() => navigate("/login")}
                className={user ? "text-hide" : ""}
              >
                Logga in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
