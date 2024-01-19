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
  Accordion,
} from "react-bootstrap";
import { Bag, List, Person } from "react-bootstrap-icons";
import { useContext, useEffect, useState } from "react";
import { Category, getCategories } from "../transport/books";
import { CartContext, ICart, ICartContext } from "../context/cartContext";
import { CartToolPanel } from "./CartToolPanel";
import { useNavigate } from "react-router-dom";
import { NavSearch } from "./NavSearch";
import { IUserContext, UserContext } from "../context/userContext";
export function Navigation({ innerWidth }: { innerWidth: number }) {
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
      <Navbar expand={"xs"} className="bg-body-tertiary mb-3">
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${"xs"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"xs"}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"xs"}`}>
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="justify-content-start flex-grow-1 p-0">
              <Accordion>
                <Accordion.Item eventKey="0" className="rounded-0">
                  <Accordion.Header>Kategorier</Accordion.Header>
                  <Accordion.Body>
                    {categories.map((c) => {
                      return (
                        <Nav.Link key={c.id} href={`/category/${c.id}`}>
                          {c.name}
                          <Badge bg="secondary" className="mx-1">
                            {c.booksAmount}
                          </Badge>
                        </Nav.Link>
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
                {userContext.user?.accountLevel === "admin" && (
                  <Accordion.Item eventKey="1" className="rounded-0">
                    <Accordion.Header>Adminsida</Accordion.Header>
                    <Accordion.Body className="py-0 pe-0">
                      <Nav.Link href="/admin/books">Skapa en bok</Nav.Link>
                      <Nav.Link>Skapa/ändra författare</Nav.Link>
                      <Nav.Link>Skapa/ändra kategori</Nav.Link>
                      <Nav.Link>Hantera användare</Nav.Link>
                      <Nav.Link>Hantera beställningar</Nav.Link>
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </Accordion>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Row className="w-100 justify-content-between">
          <Col xs={6} md={3} className="d-flex">
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"xs"}`}>
              <List />
            </Navbar.Toggle>
            <Navbar.Brand href="/">Bookstore</Navbar.Brand>
          </Col>
          {innerWidth >= 768 && (
            <Col md={6}>
              <NavSearch />
            </Col>
          )}
          <Col xs={6} md={3} className="text-end">
            <Nav className="d-flex flex-row justify-content-end gap-3">
              {!userContext.user ? (
                <Nav.Link href="/account/login">
                  <Row className="justify-content-center p-0 m-0">
                    <Col className="text-center">
                      <Person />
                    </Col>
                  </Row>
                  <Row className="justify-content-center p-0 m-0">
                    {innerWidth >= 768 && (
                      <Col className="text-center">Logga in</Col>
                    )}
                  </Row>
                </Nav.Link>
              ) : (
                <NavDropdown
                  title="Min sida"
                  id="basic-nav-dropdown"
                  className="d-flex align-items-center"
                  drop="down-centered"
                >
                  <NavDropdown.Item href="#action/3.3">
                    Mina beställningar
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Personuppgifter
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="/"
                    onClick={() => {
                      localStorage.removeItem("user");
                      localStorage.removeItem("cart");
                      userContext.setUser(null);
                    }}
                  >
                    Logga ut
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link href="#" onClick={() => setShowCart((s) => !s)}>
                {/* <Row className="justify-content-center p-0 m-0"> */}
                <Col className="text-center fs-5 position-relative">
                  <Bag className="fs-3" />{" "}
                  {cartContext.cart.length !== 0 && (
                    <Badge
                      bg="dark"
                      className="rounded-circle position-absolute translate-middle p-2 top-100"
                      style={{ fontSize: "0.6rem" }}
                    >
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
                {/* </Row> */}
                {/* <Row className="justify-content-center p-0 m-0">
                  {innerWidth >= 768 && (
                    <Col className="text-center">Varukorg</Col>
                  )}
                </Row> */}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
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
