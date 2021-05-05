import { combineReducers } from "redux";
import user from "../reducers/user";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  user,
});
export default rootReducer;
