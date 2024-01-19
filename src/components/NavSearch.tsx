import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NavSearch() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?q=${searchText}`);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center w-100 h-100">
      {/* <Row className="justify-content-center">
        <Col md={8}> */}
      <Form onSubmit={handleSubmit} className="nav-search d-flex w-100">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            const formattedText = e.target.value.replace(/\s/g, "+");
            setSearchText(formattedText);
          }}
        />
        <Button variant="secondary" type="submit">
          Sök
        </Button>
      </Form>
      {/* </Col>
      </Row> */}
    </Container>
  );
}
