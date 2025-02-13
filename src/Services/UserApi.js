import axios from "axios";

class UserApi {
    LoginUserApi = import.meta.env.VITE_LOGIN_USER_API;
    SignupUserApi = import.meta.env.VITE_SIGNUP_USER_API;
    UsersApi = import.meta.env.VITE_GET_USERS_API;
    UserApi=import.meta.env.VITE_GET_USER_API;
    DeleteUsersApi = import.meta.env.VITE_DELETE_USERS_API;

    async login(data) {
        try {
            const response = await axios.post(
                this.LoginUserApi, data,
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    async signup(data) {
        try {
            const response = await axios.post(
                this.SignupUserApi, data,
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    async getUsers() {
        try {
            const response = await axios.get(
                this.UsersApi,
                { withCredentials: true }
            );
            // console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }

    async deleteUser(id) {
        try {
            const response = await axios.delete(
                `${this.DeleteUsersApi}/${id}`,
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    async getUser(id){
        try {
            const response = await axios.get(
                `${this.UserApi}/${id}`,
                { withCredentials: true }
            );
            // console.log(response);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new UserApi;