import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { BookTop, getTopFive } from "../transport/books";
import { Container, Row, Image, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function TopBooks() {
  const [topBooks, setTopBooks] = useState<BookTop[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getTopBooks = async () => {
      try {
        const response = await getTopFive();
        setTopBooks(response);
      } catch (err) {
        if (err instanceof AxiosError) {
          setTopBooks([]);
          console.log(err);
        }
      }
    };
    getTopBooks();
  }, []);
  console.log(topBooks);
  return (
    <Container className="mb-5">
      <Row className="flex-row">
        {topBooks.map((b) => (
          <Col key={b.id} xs={6} sm={4} md={3} lg={2}>
            <section className="" style={{ width: "136px" }}>
              <div
                className="w-100 d-flex align-items-end"
                style={{ height: "160px" }}
              >
                <Image
                  src={b.imgUrl || ""}
                  style={{ height: "160px" }}
                  className="w-100"
                />
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  lineHeight: "18px",
                  height: "75px",
                  overflow: "hidden",
                }}
                className="fw-bolder mt-2"
              >
                <a href="#" onClick={() => navigate(`/book/${b.id}`)}>
                  {b.title}
                </a>
              </div>
            </section>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
