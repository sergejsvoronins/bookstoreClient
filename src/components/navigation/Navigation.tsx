import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Button,
  Offcanvas,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { Bag, List, Person } from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import { Category, getCategories } from "../../transport/books";
import { CartContext, ICart, ICartContext } from "../../context/cartContext";
import { CartToolPanel } from "../carttoolpanel/CartToolPanel";
import { useNavigate } from "react-router-dom";
import { NavSearch } from "../navsearch/NavSearch";
import { IUserContext, UserContext } from "../../context/userContext";
export function Navigation() {
  const [isSmallScreen, setSmalScreen] = useState(window.innerWidth <= 768);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showCart, setShowCart] = useState(false);
  const cartContext = useContext<ICartContext>(CartContext);
  const userContext = useContext<IUserContext>(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getCategoriesList = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    getCategoriesList();
  }, []);
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
  useEffect(() => {
    try {
      const cartString = localStorage.getItem("cart");
      if (cartString) {
        const cartData: ICart[] = JSON.parse(cartString);
        cartContext.updateCart(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart from local storage:", error);
    }
  }, []);
  return (
    <>
      <Navbar expand={"lg"} className="bg-body-tertiary mb-3">
        <Container fluid>
          <div className="d-flex">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`}>
              <List />
            </Navbar.Toggle>
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          </div>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"lg"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"lg"}`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <NavDropdown
                  title="Produkter"
                  id={`offcanvasNavbarDropdown-expand-${"lg"}`}
                >
                  <NavDropdown.Item href="/">Visa alla</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {categories.map((c) => {
                    return (
                      <NavDropdown.Item
                        key={c.id}
                        href={`/category/${c.id}`}
                        className="p-3"
                      >
                        {c.name}
                        <Badge bg="secondary" className="mx-1">
                          {c.booksAmount}
                        </Badge>
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
                {userContext.user?.accountLevel === "admin" && (
                  <Nav.Link href="/admin">Adminsida</Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          {!isSmallScreen && <NavSearch />}

          <Nav className="d-flex flex-row">
            {!userContext.user ? (
              <Nav.Link href="/login">
                <Row className="justify-content-center p-0 m-0">
                  <Col className="text-center">
                    <Person />
                  </Col>
                </Row>
                <Row className="justify-content-center p-0 m-0">
                  {!isSmallScreen && (
                    <Col className="text-center">Logga in</Col>
                  )}
                </Row>
              </Nav.Link>
            ) : (
              <NavDropdown
                title="Min sida"
                id="basic-nav-dropdown"
                className="d-flex align-items-center"
                drop="start"
              >
                <NavDropdown.Item href="#action/3.3">
                  Mina beställningar
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Personuppgifter
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="#action/3.4"
                  onClick={() => userContext.setUser(null)}
                >
                  Logga ut
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link href="#" onClick={() => setShowCart((s) => !s)}>
              <Row className="justify-content-center p-0 m-0">
                <Col className="text-center">
                  <Bag />{" "}
                  {cartContext.cart.length !== 0 && (
                    <Badge bg="danger">
                      {cartContext.cart.reduce((accumulator, item) => {
                        return accumulator + item.amount;
                      }, 0) < 99
                        ? cartContext.cart.reduce((accumulator, item) => {
                            return accumulator + item.amount;
                          }, 0)
                        : "+99"}
                    </Badge>
                  )}
                </Col>
              </Row>
              <Row className="justify-content-center p-0 m-0">
                {!isSmallScreen && <Col className="text-center">Varukorg</Col>}
              </Row>
            </Nav.Link>
          </Nav>
          {isSmallScreen && <NavSearch />}
        </Container>
      </Navbar>
      <Offcanvas
        placement="end"
        show={showCart}
        onHide={() => setShowCart(false)}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Varukorg</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CartToolPanel />
        </Offcanvas.Body>
        <Button
          disabled={cartContext.cart.length === 0}
          className="m-3 p-3"
          onClick={() => navigate("/check-out")}
        >
          Till kassan
        </Button>
      </Offcanvas>
    </>
  );
}
