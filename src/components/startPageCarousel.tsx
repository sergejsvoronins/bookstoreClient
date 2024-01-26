import { useState } from "react";
import { Carousel, Image } from "react-bootstrap";

export function StartPageCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel
      className="mb-5"
      activeIndex={index}
      onSelect={handleSelect}
      style={{ height: "250px" }}
    >
      <Carousel.Item>
        <Image
          style={{ height: "100%", objectFit: "cover" }}
          alt="Placeholder for reklam"
          src="../../public/images/books-5937716_1280-fotor-2024012615188.png"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="../../public/images/books-5937716_1280-fotor-2024012615188.png" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image src="../../public/images/books-5937716_1280-fotor-2024012615188.png" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
