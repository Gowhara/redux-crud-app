
import {ADD_USER, DELETE_USER, Edit_USER,   GETALL_USERS,   GET_USER} from "./action_types";
import data from '../../data.json';

const intialState= 
{
  users:data,
  loading:true
}
console.log(intialState.users);

export const reducer =(state = intialState ,action)=>{
    switch (action.type){
        case DELETE_USER:
          return {
            ...state,
            users: state.users.filter(user => user.id !== action.payload),
            loading:false,
          } 

          case Edit_USER:
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
              const updatedUser = [...state.users];
              updatedUser[index] = { ...updatedUser[index], ...action.payload.userData };
              return {
                ...state,
                users: updatedUser,
                loading:false,
              };
            } else {
              return state; 
            }

            case ADD_USER:
                const updatedData = [...state.users,action.payload.userData];
                  return {
                  ...state,
                  users: updatedData,
                  loading:false,
                };
              
          
          case GET_USER:
            return {
             users: state.users.filter(user => user.id === action.payload),
             loading:false,
           }

            
          case GETALL_USERS:
            return {
              ...state,
              loading:false,
           }
          default : return state
    }

}