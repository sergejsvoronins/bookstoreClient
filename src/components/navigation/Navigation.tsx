import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Form,
  Button,
  Offcanvas,
  Badge,
  Overlay,
  ListGroup,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { Bag, List, Person } from "react-bootstrap-icons";
import "../navigation/Navigation.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Category, getCategories } from "../../transport/books";
import { CartContext, ICart, ICartContext } from "../../context/cartContext";
import { CartToolPanel } from "../carttoolpanel/CartToolPanel";
export function Navigation() {
  const [isSmallScreen, setSmalScreen] = useState(window.innerWidth <= 768);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const target = useRef(null);
  const cartContext = useContext<ICartContext>(CartContext);
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
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`}>
            <List />
          </Navbar.Toggle>
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
                  <NavDropdown.Item href="/books">Visa alla</NavDropdown.Item>
                  <NavDropdown.Divider />
                  {categories.map((c) => {
                    return (
                      <NavDropdown.Item
                        key={c.id}
                        href={`/books?category=${c.id}`}
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
          <Nav className="px-2 justify-content-end px-2 position-relative">
            <Nav.Link href="#" onClick={() => setShowCart((s) => !s)}>
              {!isSmallScreen && "Cart"} <Bag />
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
            </Nav.Link>
          </Nav>
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
        <Button className="m-3 p-3">Till kassan</Button>
      </Offcanvas>
    </>
  );
}
