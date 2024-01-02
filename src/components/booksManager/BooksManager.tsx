import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function BooksManager() {
  return (
    <Container>
      <Outlet></Outlet>
    </Container>
  );
}
