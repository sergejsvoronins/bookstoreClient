import { useContext, useEffect, useState } from "react";
import { IUserContext, UserContext } from "../../context/userContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Alert, Button, Col, Container, Fade, Nav, Row } from "react-bootstrap";
import { getOneUser } from "../../transport/user";

export function AccountPage() {
  const { user, setUser } = useContext<IUserContext>(UserContext);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [userName, setUserName] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (user?.id) {
      const getUser = async () => {
        let response = await getOneUser(user.id);
        response.firstName && setUserName(response.firstName);
      };
      getUser();
    }
  }, []);
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
          {userName && (
            <Row className="fw-bolder px-2" style={{ fontSize: "3rem" }}>
              Hej {userName}!
            </Row>
          )}
          <Row className="my-5">
            <Col className="d-flex justify-content-between">
              <Button
                variant="primary"
                className="rounded-pill"
                onClick={() => {
                  navigate("/");
                }}
              >
                Startsida
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                variant="danger"
                className="rounded-pill"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("cart");
                  setUser(null);
                  navigate("/");
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
