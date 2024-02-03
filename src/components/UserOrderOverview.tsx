import { format } from "date-fns";
import { useState } from "react";
import { Button, Col, Collapse, Row, Image } from "react-bootstrap";
import { OrderDetails } from "../transport/orders";

export function UserOrderOverview({ order }: { order: OrderDetails }) {
  const [open, setOpen] = useState(false);

  const getLocalStatusTitle = (title: string) => {
    let status = "";
    switch (title) {
      case "new":
        status = "behandlas";
        return status;
      case "processing":
        status = "behandlas";
        return status;
      case "shipped":
        status = "skickat";
        return status;
      case "completed":
        status = "klart";
        return status;
      case "canceled":
        status = "borttagen";
        return status;
      case "returned":
        status = "returnerad";
        return status;
    }
  };
  return (
    <>
      <Row className="w-100">
        <Col xs={4} className="text-center">
          <Row className="gap-3">
            <Col xs={12} className="fs-5">
              Order: {order.id}
            </Col>
            <Col style={{ fontSize: "0.8rem" }}>
              {order.orderDate
                ? format(order.orderDate * 1000, "yy-MM-dd")
                : ""}
            </Col>
          </Row>
        </Col>
        <Col xs={4} className="text-center">
          <Row className="text-end gap-3">
            <Col xs={12}>
              <span
                className="bg-dark text-light rounded-5 px-3 py-1"
                style={{ fontSize: "0.8rem" }}
              >
                {getLocalStatusTitle(order.orderStatus)}
              </span>
            </Col>
            <Col>{order.totalPrice} SEK</Col>
          </Row>
        </Col>
        <Col xs={4} className="text-center">
          <Button
            variant={open ? "dark" : "outline-dark"}
            className="rounded-pill"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            {open ? "Dölj" : "Visa"}
          </Button>
        </Col>
      </Row>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Row>
            <Col xs={12} md={6} className="">
              {order.books.map((b) => (
                <Row key={b.bookId} className="w-100 mb-3 py-3 bg-light ">
                  <Col xs={4}>
                    <Image src={b.imgUrl || ""} className="w-75"></Image>
                  </Col>
                  <Col
                    xs={8}
                    className="p-0 d-flex flex-wrap align-items-between"
                  >
                    <h6 className="w-100">{b.title}</h6>
                    <Row className="w-100 p-0">
                      <Col className="d-flex align-items-end">
                        <span>{b.bookPrice} SEK</span>
                      </Col>
                      <Col className="d-flex align-items-end justify-content-end">
                        <span>{b.amount}st</span>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col>
              <Row className="py-3">
                <h6 className="px-0">
                  {order.books.reduce((accumulator, item) => {
                    return accumulator + item.amount;
                  }, 0)}
                  {order.books.reduce((accumulator, item) => {
                    return accumulator + item.amount;
                  }, 0) === 1
                    ? " produkt"
                    : " produkter"}
                </h6>
              </Row>
              <Row>
                <h6 className="px-0">
                  TOTALSUMMA ink frakt: {order.totalPrice} SEK
                </h6>
              </Row>
              <hr />
              <Row>
                <h6 className="px-0 mb-3">Leveransadress</h6>
                <p className="p-0 m-0 fs-5">
                  {order.shipmentDetails.firstName}{" "}
                  {order.shipmentDetails.lastName}
                </p>
                <p className="p-0 m-0">{order.shipmentDetails.address}</p>
                <p className="p-0 m-0">{order.shipmentDetails.city}</p>
                <p className="p-0 m-0">{order.shipmentDetails.zipCode}</p>
                <p className="p-0 m-0">Sverige</p>
              </Row>
            </Col>
          </Row>
        </div>
      </Collapse>
      <hr />
    </>
  );
}
