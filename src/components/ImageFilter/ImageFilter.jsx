import React, { Component } from "react";
import "./image-filter.styles.css";
import FilterInput from "../FilterInput/FilterInput";
import blurIcon from "../../assets/blur.svg";
import saturationIcon from "../../assets/saturation.svg";
import brightnessIcon from "../../assets/brightness.svg";
import contrastIcon from "../../assets/contrast.svg";
import { connect } from "react-redux";
import { updateFilters } from "../../redux/canvas/canvas-action";

class ImageFilter extends Component {
  constructor() {
    super();
    this.state = {
      saturation: "100",
      blur: "0",
      brightness: "100",
      contrast: "80",
    };
  }

  componentDidMount() {
    const { card } = this.props;
    if (card?.filters) {
      this.setState({
        saturation: card?.saturation,
        blur: card?.blur,
        brightness: card?.brightness,
        contrast: card?.contrast,
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.handleFilters();
  };

  handleFilters = () => {
    const filterValues = {
      char_id: this.props.card.char_id,
      saturation: this.state.saturation,
      blur: this.state.blur,
      brightness: this.state.brightness,
      contrast: this.state.contrast,
    };
    this.props.updateFilters(filterValues);
  };

  render() {
    const { saturation, blur, brightness, contrast } = this.state;
    return (
      <div className="model-filter">
        <FilterInput
          name="saturation"
          icon={saturationIcon}
          value={saturation}
          handleChange={this.handleChange}
        />
        <FilterInput
          name="blur"
          icon={blurIcon}
          value={blur}
          handleChange={this.handleChange}
        />
        <FilterInput
          name="brightness"
          icon={brightnessIcon}
          value={brightness}
          handleChange={this.handleChange}
        />
        <FilterInput
          name="contrast"
          icon={contrastIcon}
          value={contrast}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateFilters: (filters) => dispatch(updateFilters(filters)),
});

export default connect(null, mapDispatchToProps)(ImageFilter);
