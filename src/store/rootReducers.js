import authReducer from "./Reducers/authReducer";
import productReducer from "./Reducers/productReducer";
import userReducer from "./Reducers/userReducer";
import chatReducer from "./Reducers/chatReducer";
import dashboardReducer from "./Reducers/dashboardReducer";
import memberReducer from "./Reducers/memberReducer";


const rootReducer = {
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    chat: chatReducer,
    dashboard: dashboardReducer,
    members: memberReducer,
}

export default rootReducer;