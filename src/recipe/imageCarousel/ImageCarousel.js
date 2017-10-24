import React from 'react';
import PropTypes from 'prop-types';
import {
    Carousel
} from 'react-bootstrap';
import './ImageCarousel.css';

class RecipeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: props.images,
            index: 1
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState, props) => {
            return {
                images: nextProps.images,
                index: 1
            }
        })
    }

    handleSelect(selectedIndex) {
        this.setState({
            index: selectedIndex
        });
    }

    getCaption() {
        if (this.props.deleteFunction) {
            return <Carousel.Caption>
                <button type="button" onClick={() => this.props.deleteFunction(this.state.index)}>Delete</button>
            </Carousel.Caption>
        }
    }
    render() {
        if (!this.images || this.images.length === 0) {
            return <div> No image found </div>
        }
        else if (this.state.images.length === 1) {
            return <img className="carousel-image" src={this.state.images[0]} alt="" />
        }
        return (
            <div className="carousel-box">
                <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)}>
                    {
                        this.state.images.map((element, index) => {
                            let caption = <span></span>;
                            if (this.props.deleteFunction) {
                                caption = <Carousel.Caption>
                                    <button type="button" onClick={() => this.props.deleteFunction(index)}>Delete</button>
                                </Carousel.Caption>
                            }

                            return (
                                <Carousel.Item key={index}>
                                    <img className="carousel-image" src={element} key={index} alt="" />
                                    {caption}
                                </Carousel.Item>
                            )
                        }, this)
                    }
                </Carousel>
            </div>
        );
    }
}

RecipeEditor.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    deleteFunction: PropTypes.func
};
export default RecipeEditor;
