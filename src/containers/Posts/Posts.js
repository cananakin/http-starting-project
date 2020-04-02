import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Post from '../../components/Post/Post';

import axios from '../../axios';
import './Posts.css'
import FullPost from '../FullPost/FullPost';

export class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author:'Max'
                    }
                })
                this.setState({
                    posts: updatedPosts,
                    error: false
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            })
    }

    postSelectedHandler = (id) => {
        // this.props.history.push({ pathname : '/posts/' + id})
        this.props.history.push( '/posts/' + id )
        //this.setState({
        //    selectedPostId: id
        //})
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                //<Link key={post.id} to={'/posts/' + post.id}>
                return <Post 
                    key={post.id} 
                    {...post} 
                    clicked={() => this.postSelectedHandler(post.id)}/>
                //</Link>
            });
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id' } exact component={FullPost} />
            </div>
        )
    }
}

export default Posts
