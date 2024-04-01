import { createStore } from "redux";
import { reducer } from "./user_reducer";

export const store= createStore(reducer);