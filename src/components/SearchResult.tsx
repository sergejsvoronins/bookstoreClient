import { useContext, useEffect, useState } from "react";
import { Book, getSearchResult } from "../transport/books";
import { CartContext, ICartContext } from "../context/cartContext";
import { AxiosError } from "axios";
import { BooksOverview } from "./booksoverview/BooksOverview";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export function SearchResult() {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [searchBooks, setSearchBooks] = useState<Book[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const cartContext = useContext<ICartContext>(CartContext);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setSearchText(query.get("q"));
  }, [location.search]);

  useEffect(() => {
    if (searchText) {
      const getSearchBooks = async () => {
        try {
          let response = await getSearchResult(searchText);
          setSearchBooks(response);
          console.log(response);
        } catch (err) {
          if (err instanceof AxiosError) {
            setSearchBooks([]);
            setErr(err.message);
          }
        }
      };
      getSearchBooks();
    }
  }, [searchText]);

  return (
    <>
      <Row className="justify-content-center">
        <Col>Rusultat för: {searchText}</Col>
      </Row>
      <Row>
        <Col>
          <BooksOverview
            books={searchBooks}
            err={err}
            cartContext={cartContext}
          />
        </Col>
      </Row>
    </>
  );
}
