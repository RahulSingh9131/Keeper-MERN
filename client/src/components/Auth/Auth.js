import React,{useState} from 'react'
import {Avatar,Button,Paper,Grid,Typography,Container} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
    const classes= useStyles();
    const [showPass,setShowPass]=useState(false);
    const [isSignup,setIsSignup]=useState(false);
    const [formData,setFormData]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
    })
    const dispatch=useDispatch();
    const history=useHistory();

    const handleShowPassword=()=>setShowPass((prev)=>!prev);
    const switchMode=()=>{
        setIsSignup((prev)=>!prev);
        setShowPass(false);
    };
    const handleGuest=()=>{
        setFormData((prev)=>({
            ...prev,
            email:'rahul123@gmail.com',
            password:'qwerty123',
        }));
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
   

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar} >
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">{isSignup?"Sign Up":"Sign In"}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>  
                                <Input name="firstName" label="First Name" handleChange={handleChange} half autoFocus xs={6}/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPass?"text":"password"} handleShowPassword={handleShowPassword}/>
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? "Sign Up":"Sign In" }
                </Button>
                {isSignup ?"":(
                    <Button type="submit" fullWidth variant="contained" color="secondary" onClick={()=>handleGuest()} className={classes.submit}>
                        Login as guest
                    </Button>
                )}
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? "Already have an account SignIn" :"Don't have an account SignUP"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth