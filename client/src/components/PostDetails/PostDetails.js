import React,{useEffect} from 'react';
import {Paper,CircularProgress,Typography,Divider} from "@material-ui/core"
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import {useParams,useHistory} from "react-router-dom";
import useStyles from "./styles";
import CommentSection from './CommentSection';
import { getPost,getPostsBySearch } from '../../actions/posts';

const PostDetails = () => {
    const {post,posts,isLoading}=useSelector((state)=>state.posts);
    const dispatch=useDispatch();
    const history=useHistory();
    const {id}=useParams();
    const classes=useStyles();

    useEffect(()=>{
        if(post){
            dispatch(getPostsBySearch({search:'none',tags:post?.tags.join(',')}));
        }
    },[post,dispatch]);

    useEffect(()=>{
        dispatch(getPost(id));
    },[id,dispatch]);

    if(!post) return null;
    if(isLoading){
        return <Paper elevation={6} >
            <CircularProgress size="7em"/>
        </Paper>
    }
    
    const recommendedPost= posts.filter(({_id})=>_id!==post._id);

    const openPost=(_id)=>history.push(`/posts/${_id}`);

  return (
    <Paper style={{padding:'20px',borderRadius:'15px'}} elevation={6}>
        <div className={classes.card}>
            <div className={classes.section}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created By: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{margin:'20px 0'}}/>
                <CommentSection post={post} />
                <Divider style={{margin:'20px 0'}}/>
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile} alt="post-image"/>
            </div>
        </div>
        {recommendedPost.length && (
            <div className={classes.section}>
                <Typography gutterBottom variant="h5">You might also like</Typography>
                <Divider/>
                <div className={classes.recommendedPosts}>
                    {recommendedPost.map(({title,message,name,likes,selectedFile,_id})=>(
                        <div style={{margin:'20px',cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
                            <Typography gutterBottom variant="h6">{title}</Typography>
                            <Typography gutterBottom variant="subtitle2">{name}</Typography>
                            <Typography gutterBottom variant="subtitle1">{message}</Typography>
                            <Typography gutterBottom variant="subtitle1"> Likes : {likes.length}</Typography>
                            <img src={selectedFile} width="200px" alt="recommendedPost-image"/>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </Paper>
  )
}

export default PostDetails