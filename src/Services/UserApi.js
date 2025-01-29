import axios from "axios";

class UserApi{
    LoginUserApi=import.meta.env.VITE_LOGIN_USER_API;
    SignupUserApi=import.meta.env.VITE_SIGNUP_USER_API;

   async login(data){
        try {
            const response = await axios.post(this.LoginUserApi,data,{withCredentials:true});
            return response;
        } catch (error) {
            return error;
        }
    }

    async signup(data){
        try {
            const response = await axios.post(this.LoginUserApi,data,{withCredentials:true});
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new UserApi;