import * as React from 'react';
import { Row, Col, Card } from "react-bootstrap";

import image1 from "../../../assets/images/gallery-grid/masonry-1.jpg";
import image2 from "../../../assets/images/gallery-grid/masonry-2.jpg";
import image3 from "../../../assets/images/gallery-grid/masonry-3.jpg";
import image4 from "../../../assets/images/gallery-grid/masonry-4.jpg";
import image5 from "../../../assets/images/gallery-grid/masonry-5.jpg";
import image6 from "../../../assets/images/gallery-grid/masonry-6.jpg";
import image7 from "../../../assets/images/gallery-grid/masonry-7.jpg";
import image8 from "../../../assets/images/gallery-grid/masonry-8.jpg";
import Breadcrumb from "../../../App/components/Breadcrumb";
let brakePoints = [350, 500, 750];
let images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image2,
  image8,
  image4
];
const Tile = ({ src }: { src: string }) => {
  return (
    <div className="tile">
      <img src={src} alt="mg" />
    </div>
  );
};
const TileCard = ({ src }: { src: string }) => {
  return (
    <Card>
      <div className="tile">
        <Card.Img variant="top" src={src} />
      </div>
      <Card.Body>
        <h5 className="job-card-desc">Job Description</h5>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className="job-meta-data mb-1">
          <i className="fa fa-map-marker-alt" />
          washington
        </div>
        <div className="job-meta-data">
          <i className="fa fa-handshake" />
          10 Years
        </div>
      </Card.Body>
    </Card>
  );
};
class MasonryGallery extends React.Component<{}, {}> {
  render() {
    return (
      <>
        <Row className="align-items-center page-header">
          <Col>
            <Breadcrumb />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Gallery Masonry</Card.Title>
              </Card.Header>
              <Card.Body>

              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Gallery With Description</Card.Title>
              </Card.Header>
              <Card.Body>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default MasonryGallery;
