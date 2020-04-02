import React, { Component } from 'react';

import './FullPost.css';
import axios from '../../axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {  
        this.loadData();
    }

    componentDidUpdate () {
        this.loadData();
    }

    loadData = () => {
        if(this.props.match.params.id){
            if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id)) {
                axios.get(`/posts/${this.props.match.params.id}`)
                    .then(response => {
                        this.setState({
                            loadedPost: response.data
                        })
                    })
            }
        }
    }

    deletePostHandler = (id) => {
        axios.delete(`/posts/${id}`)
            .then(response => {
                console.log(response);
            })
    }

    render () {
        const { loadedPost } = this.state;
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
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