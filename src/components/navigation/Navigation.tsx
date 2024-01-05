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
} from "react-bootstrap";
import { Bag, List, Person } from "react-bootstrap-icons";
import "../navigation/Navigation.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Category, getCategories } from "../../transport/books";
import { useOutletContext } from "react-router-dom";
import { CartContext, ICartContext } from "../../context/cartContext";
export function Navigation() {
  const [isSmallScreen, setSmalScreen] = useState(window.innerWidth <= 768);
  const [categories, setCategories] = useState<Category[]>([]);
  const [show, setShow] = useState(false);
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
            <Nav.Link href="#" ref={target} onClick={() => setShow(!show)}>
              {!isSmallScreen && "Cart"} <Bag />
              {cartContext.cart.length !== 0 && (
                <Badge bg="danger">
                  {cartContext.cart.reduce((accumulator, item) => {
                    return accumulator + item.amount;
                  }, 0)}
                </Badge>
              )}
            </Nav.Link>
            <Overlay target={target.current} show={show} placement="bottom">
              {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
              }) => (
                <div
                  {...props}
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(255, 100, 100, 0.85)",
                    padding: "2px 10px",
                    color: "white",
                    borderRadius: 3,
                    ...props.style,
                  }}
                >
                  Cart
                </div>
              )}
            </Overlay>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}