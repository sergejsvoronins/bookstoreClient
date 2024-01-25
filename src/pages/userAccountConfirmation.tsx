import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MainOutletContext } from "../components/Main";
import { NotFoundPage } from "./NotFoundPage";

export function UserAccountConfirmation() {
  const { userIsCreated } = useOutletContext<MainOutletContext>();
  const navigate = useNavigate();
  return (
    <>
      {userIsCreated ? (
        <Container>
          <Row className="justify-content-center mt-5">
            <Col xs={6}>
              <p className="fs-5">
                Grattis, du har registrerat dig. Fortsätt vidare till
                <a
                  // href="/account/login"
                  onClick={() => navigate("/account/login")}
                >
                  {" "}
                  inloggningssida.
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
