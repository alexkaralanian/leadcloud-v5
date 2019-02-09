import React from "react";
import Dropzone from "react-dropzone";
import { Row, Col, Button, Card, CardImg } from "reactstrap";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "./ImageCarousel.css";

class SimpleSlider extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        {this.props.images &&
          this.props.images.map(image => (
            <div>
              <img src={image} />
              {/*<Button
                color="danger"
                onClick={event => {
                  event.stopPropagation();
                  this.props.deleteImg(image, this.props.component.id);
                }}
              >
                <span>Delete</span>
              </Button>*/}
            </div>
          ))}
      </Slider>
    );
  }
}

const ImageCarousel = ({ component, onDrop, images, googleImages, deleteImg }) => (
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

    {/*<Col xs={12}>
      <SimpleSlider images={images} deleteImg={deleteImg} component={component} />
    </Col>*/}

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
