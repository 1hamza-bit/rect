import React, { Component } from 'react';
import axios from 'axios'
import ImageList from './imagelist';

class Get extends Component {
    constructor(props) {
        super(props);
        this.state = {images:[]}
            this.handleSubmit = this.handleSubmit.bind(this)
        }

     handleSubmit = event => {
        event.preventDefault();
        axios.get('https://pixabay.com/api/?key=26412237-b3cc23642656fa47649588302&q=yellow+flowers&image_type=photo&pretty=true')
        .then(res => {
            const images = res.data;
            console.log("res.data.hits",images);
            this.setState({ image:images });
            })

     }
    render() { 
        return (
            <div>
                <button type='button' onClick={this.handleSubmit} >vh</button>
      <ImageList images = {this.state.images} />
                </div>
        );
    }
}
 
export default Get;