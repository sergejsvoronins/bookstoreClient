import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Search } from "react-bootstrap-icons";

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
      <Form
        onSubmit={handleSubmit}
        className="nav-search d-flex w-100 position-relative"
      >
        <Form.Control
          type="search"
          placeholder="Search"
          style={{ paddingLeft: "50px" }}
          className="me-2 rounded-pill"
          aria-label="Search"
          onChange={(e) => {
            const formattedText = e.target.value.replace(/\s/g, "+");
            setSearchText(formattedText);
          }}
        />
        <button
          type="submit"
          className="position-absolute rounded-pill border-0 h-100 bg-transparent"
          style={{ left: "8.8px" }}
        >
          <Search className="text-secondary" />
        </button>
      </Form>
    </Container>
  );
}
