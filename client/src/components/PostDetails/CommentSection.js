import React,{useState,useRef} from 'react'
import {Typography,TextField,Button} from "@material-ui/core"
import { useDispatch } from 'react-redux'
import useStyles from "./styles";
import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) => {
    const [comments,setComments]=useState(post?.comments);
    const [comment,setComment]=useState('');
    const commentRef=useRef();
    const user=JSON.parse(localStorage.getItem("profile"))
    const classes=useStyles();
    const dispatch=useDispatch();


    const addComment= async ()=>{
        const finalComment=`${user.result.name}: ${comment}`;
        const newComments= await dispatch(commentPost(finalComment,post._id));
        setComments(newComments)
        setComment('');

        commentRef.current.scrollIntoView({behavior:'smooth'});
    };

  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {comments?.map((c,i)=>(
                    <Typography gutterBottom variant="subtitle1" key={i}>
                        <strong>{c.split(': ')[0]}</strong>
                        {c.split(':')[1]}
                    </Typography>
                ))}
                <div ref={commentRef}/>
            </div>
            {user?.result?.name && (
                <div stle={{width:'70%'}}>
                    <Typography gutterBottom variant="h6">Write a Comment</Typography>
                    <TextField
                        fullWidth
                        row={4}
                        variant="outlined"
                        label="Comment"
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />
                    <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={addComment}>
                        Comment
                    </Button>
                </div>
            )}
        </div>
    </div>
  )
}

export default CommentSection