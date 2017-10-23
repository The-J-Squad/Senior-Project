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
                index: prevState.index > nextProps.images.length ? nextProps.images.length : prevState.index
            }
        })
    }

    handleSelect(selectedIndex) {
        this.setState({
            index: selectedIndex
        });
    }

    render() {
        if (this.images && this.images.length === 0) {
            return <div> No image found </div>
        }
        else if (this.state.images.length === 1) {
            return <img className="carousel-image" src={this.state.images[0]} alt=""/>
        }
        return (
            <div className="carousel-box">
                <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect.bind(this)} interval={100}>
                    {
                        this.state.images.map((element, index) => {
                            return (
                                <Carousel.Item>
                                    <img className="carousel-image" src={element} key={index} alt=""/>
                                    <Carousel.Caption>
                                        {() => {
                                            if (this.props.deleteFunction) {
                                                return <button onClick={() => this.props.deleteFunction(index)}>Delete</button>
                                            }
                                        }
                                        }
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
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
