import React from "react";
import Dropzone from "react-dropzone";
import { Grid, Row, Col, Image, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./ImageCarousel.css";

const ImageCarousel = ({
  component,
  onDrop,
  images,
  googleImages,
  deleteImg
}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <div className="margin-top-2">
          <Dropzone
            className="dropzone"
            accept="image/*"
            onDrop={files => onDrop(files, component.id)}
          >
            <Button bsStyle="primary" className="dropzone__button">
              <span>+</span>
            </Button>
          </Dropzone>
        </div>

        <div className="carousel">
          {images &&
            images.map(image => (
              <div key={image} className="carousel__img-container">
                <button
                  role="button"
                  onClick={event => {
                    event.stopPropagation();
                    deleteImg(image, component.id);
                  }}
                >
                  <span>x</span>
                </button>
                <Image src={image} responsive />
              </div>
            ))}
        </div>
      </Col>
    </Row>
  </Grid>
);

export default ImageCarousel;
