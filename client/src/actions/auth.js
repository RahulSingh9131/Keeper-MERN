import {AUTH} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const signin=(formData,history)=>async (dispatch)=>{
    try {
        //login the user and navigate the user
        const {data}=await api.signIn(formData);
        dispatch({type:AUTH,data});
        history.push('/');
    } catch (error) {
        console.log("signin error",error);
    }
}

export const signup=(formData,history)=> async (dispatch)=>{
    try {
        //signup the user and navigate to home .
        const {data}=await api.signUp(formData);
        dispatch({type:AUTH,data});
        history.push("/");
    } catch (error) {
        console.log("signup error",error);
    }
}