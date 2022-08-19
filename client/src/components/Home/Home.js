import React, { useEffect, useState } from 'react'
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from "@material-ui/core";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import {useHistory,useLocation} from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import { getPosts,getPostsBySearch } from '../../actions/posts';
import Paginate from '../Pagination';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId,setCurrentId]=useState(null);
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
    const dispatch=useDispatch();
    const classes= useStyles();
    const query=useQuery();
    const history=useHistory();
    const location=useLocation();
    const page=query.get('page') || 1;
    const searchQuery=query.get('searchQuery');


    const searchPost=()=>{
        if(search.trim() || tags ){
            //dispatch-->  fetch  serach post
            dispatch(getPostsBySearch({search,tags: tags.join(',')}));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            history.push("/")
        }
    }


    const handleKeyPress=(e)=>{
        if(e.keyCode===13){
            //serach Post
        }
    }

    const handleAdd=(tag)=>setTags([...tags,tag]);
    const handleDelete=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete));

  return (
    <Grow in>
        <Container maxWidth="xl">
            <Grid container justifyContent="space-between" className={classes.gridContainer} alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={9}>
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search"
                            variant='outlined'
                            label="Search Memories"
                            fullWidth
                            onKeyPress={handleKeyPress}
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <ChipInput
                            style={{margin:"10px 0"}}
                            value={tags}
                            variant="outlined"
                            label="Search Tags"
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                        />
                        <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={6} className={classes.pagination}>
                        <Paginate page={page}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home