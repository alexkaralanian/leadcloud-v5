import React from "react";
import Dropzone from "react-dropzone";
import { Row, Col, Button, Card, CardImg } from "reactstrap";
import PropTypes from "prop-types";
import "./ImageCarousel.css";

const ImageCarousel = ({
  component,
  onDrop,
  images,
  googleImages,
  deleteImg
}) => (
  <Row>
    <Col xs={12}>
      <Card className="dropzone__card-container margin-top-2">
        <Dropzone
          className="dropzone"
          accept="image/*"
          onDrop={files => onDrop(files, component.id)}
        >
          <Button color="primary" className="dropzone__button">
            <i className="fa fa-plus" />
          </Button>
        </Dropzone>
      </Card>
    </Col>
    <Col className="carousel">
      {images &&
        images.map(image => (
          <Card className="carousel__img-card">
            <CardImg top width="100%" src={image} />
            <Button
              color="danger"
              onClick={event => {
                event.stopPropagation();
                deleteImg(image, component.id);
              }}
            >
              <span>Delete</span>
            </Button>
          </Card>
        ))}
    </Col>
  </Row>
);

export default ImageCarousel;
