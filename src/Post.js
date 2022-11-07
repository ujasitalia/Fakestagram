import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';
//import InstagramEmbed from 'react-instagram-embed';
import { db } from './firebase';
import { VscHeart } from "react-icons/vsc";
//import { FcLikePlaceholder } from 'react-icons/fc';
import './css/post.css';

function Post({url, username, caption, postId, likes, user}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [noOfLikes, setnoOfLikes] = useState(likes);

    useEffect(() => {
        let unsubscribe;
        if(postId) {
            unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp').onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });            
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    };

    const likeButtonClicked = (e) => {
        e.preventDefault();
        
        if(!isLiked) {
            setnoOfLikes(noOfLikes + 1);
            db.collection("posts").doc(postId).update({likes: noOfLikes});
            setIsLiked(!isLiked);
        }else{
            setnoOfLikes(noOfLikes - 1);
            db.collection("posts").doc(postId).update({likes: noOfLikes});
            setIsLiked(!isLiked);
        }
    }

    return (
        <div className=' container'>
            <div className="row">            
                <div className="col post-main">
                    {/* header -> avatar, username */}
                    <div className="post-header">
                        <Avatar className='post-avatar' alt={username} src="image.png" />
                        <h4>{username}</h4>
                    </div>
                    { /* image */}
                    <img src={url} alt="image" className='post-image'/>

                    {/* like, comment, share buttons*/}
                    <div className="like-section container">
                        <p><span><button type='button' className='like-button' id='like-button' onClick={likeButtonClicked}><VscHeart /></button></span> {likes} likes</p>
                    </div>                    

                    {/* username and caption */}
                    <h4 className='post-text'>{username}: <span>{caption}</span></h4>

                    {/* comments from firebase   */}
                    <div className="post-comments">
                        {
                            comments.map((comment, index) => {
                                return(
                                    <h4 key={index}>
                                        {comment.username} <span>{comment.text}</span> 
                                    </h4> 
                                );                                
                            })
                        }
                    </div> 
                    
                    {/* new comments to post */}
                    {user && 
                        <form className='post-comment-form form'>
                            <input
                                type="text"
                                className='post-comment-input'
                                placeholder='Add a comment...'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button
                                disabled={!comment}
                                className='post-comment-button'
                                type='submit'
                                onClick={postComment}
                            >
                                post
                            </button>
                        </form>
                    }
                    
                </div>

                {/* dont know why its not working ----> work on it later */}
                {/* <div className="col">                    
                    <InstagramEmbed
                        url='https://www.instagram.com/p/CLs84N-grqh/'
                        clientAccessToken='123|456'
                        maxWidth={320}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        injectScript
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                    />      
                </div> */}

            </div>
                
                
                    
                  
        </div>
    )
}

export default Post
