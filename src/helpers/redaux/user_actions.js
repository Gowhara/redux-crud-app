
import { Edit_USER,DELETE_USER, GET_USER, GETALL_USERS, ADD_USER } from './action_types';

export const editUser=(id,userData)=>{
    return {
        type:Edit_USER,
        payload:{id,userData},
    };
}

export const addUser=(userData)=>{
    return {
        type:ADD_USER,
        payload:{userData},
    };
}



export const deleteUser=(id)=>{
        return {
            type:DELETE_USER,
            payload:id,
        };
    
    }

export const getUser=(id)=>{
        return {
            type:GET_USER,
            payload:id,
        };
    
    }


    export const get_all_users=()=>{
        return {
            type:GETALL_USERS,
           
        };
    
    }


