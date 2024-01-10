import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function NavSearch() {
  const [searchText, setSearchText] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    navigate(`/search?q=${searchText}`);
  };
  return (
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
      <Button variant="outline-success" type="submit">
        Sök
      </Button>
    </Form>
  );
}
