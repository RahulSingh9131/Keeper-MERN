import React,{useState,useEffect} from "react";
import {TextField,Button,Typography,Paper} from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch} from "react-redux"
import {createPost, updatePost} from "../../actions/posts";
import {useSelector} from "react-redux"
import { useHistory } from "react-router-dom";
import useStyles from "./styles";

const Form = ({currentId,setCurrentId})=>{
    const [postData,setPostData]=useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:''
    });
    const user=JSON.parse(localStorage.getItem("profile"));
    const post=useSelector((state)=> currentId?state.posts.posts.find((p)=>p._id===currentId):null);
    const classes = useStyles();
    const dispatch=useDispatch();
    const history=useHistory();
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
        }else{
            dispatch(createPost({...postData,name:user?.result?.name},history));
        }
        clear();
    }
    useEffect(()=>{
        if(post) setPostData(post);
    },[post])
    const clear=()=>{
        setCurrentId(null);
        setPostData({
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        });
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please SignIn to create any Posts.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={classes.form} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId?"Editing":"Creating"} a Memory</Typography>
                    <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    className={classes.fileInput}
                    value={postData.title}
                    onChange={(e)=>setPostData({...postData,title:e.target.value})}
                />
                    <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    className={classes.fileInput}
                    value={postData.message}
                    onChange={(e)=>setPostData({...postData,message:e.target.value})}
                />
                    <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    className={classes.fileInput}
                    value={postData.tags}
                    onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64})=>setPostData({...postData,selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Submit
                </Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    )
}

export default Form;