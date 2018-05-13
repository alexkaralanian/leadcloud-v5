import React from "react";
import Dropzone from "react-dropzone";
import { Grid, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./ImageCarousel.css";

const ImageCarousel = ({
  component,
  onDrop,
  images,
  googleImages,
  deleteImg
}) => {
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <div className="carousel">
            <Dropzone
              className="dropZone"
              accept="image/*"
              onDrop={files => onDrop(files, component.id)}
            >
              <div className="dropButton">
                <span>+</span>
              </div>
            </Dropzone>
          </div>

          <div className="imagesContainer">
            {images &&
              images.map(image => (
                <div key={image} className="imageContainer">
                  <div
                    className="imgDelete"
                    onClick={event => {
                      event.stopPropagation();
                      deleteImg(image, component.id);
                    }}
                  >
                    <span>x</span>
                  </div>
                  <img src={image} className="imageStyle" />
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default ImageCarousel;
