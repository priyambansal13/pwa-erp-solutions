// third-party
import { combineReducers } from "redux";

// project import
import menu from "./menu";
import authentication from "./authentication";
import adminState from "./admin-user.state";
import organizationUserState from "./organization-user.state";

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  menu,
  authentication,
  adminState,
  organizationUserState,
});

export default reducers;
