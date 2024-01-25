import { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../context/userContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Col, Container, Fade, Nav, Row } from "react-bootstrap";

export function AccountPage() {
  const { user, setUser } = useContext<IUserContext>(UserContext);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (showAlert) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);
  useEffect(() => {
    !user && navigate("/login");
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getAlert = () => {
    setShowAlert(true);
  };

  return (
    <Container>
      {user && (
        <>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button
                variant="danger"
                className="rounded-pill"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("cart");
                  setUser(null);
                  navigate("/books");
                }}
              >
                Logga ut
              </Button>
            </Col>
          </Row>
          <Nav
            variant="pills"
            className="mb-5"
            defaultActiveKey={location.pathname}
          >
            <Nav.Item className={innerWidth < 576 ? "w-100" : ""}>
              <Nav.Link
                eventKey="/account/orders"
                onClick={() => navigate("/account/orders")}
              >
                Beställningar
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={innerWidth < 576 ? "w-100" : ""}>
              <Nav.Link
                eventKey="account/profile"
                onClick={() => navigate("/account/profile")}
              >
                Profilinställningar
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Outlet context={{ setShowAlert: getAlert }}></Outlet>
        </>
      )}
    </Container>
  );
}
