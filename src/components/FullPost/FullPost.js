import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate() {  
        if(this.props.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                Axios.get(`/${this.props.id}`)
                    .then(response => {
                        this.setState({
                            loadedPost: response.data
                        })
                    })
            }
        }
        
    }

    deletePostHandler = (id) => {
        Axios.delete(`/posts/${id}`)
            .then(response => {
                console.log(response);
            })
    }

    render () {
        const { loadedPost } = this.state;
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Post Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{ loadedPost.title }</h1>
                    <p>{ loadedPost.body }</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
    
            );
        }
        
        return post;
    }
}

export default FullPost;