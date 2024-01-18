import { Container, Alert, Button } from "react-bootstrap";

export const NotFoundPage = () => {
  return (
    <Container>
      <Alert variant="light">
        <h3>404</h3>
        <p>The requested page could not be found.</p>
      </Alert>
    </Container>
  );
};
