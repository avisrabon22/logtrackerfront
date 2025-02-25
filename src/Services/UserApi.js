import axios from "axios";

class UserApi {
    LoginUserApi = import.meta.env.VITE_LOGIN_USER_API;
    SignupUserApi = import.meta.env.VITE_SIGNUP_USER_API;
    UsersGetApi = import.meta.env.VITE_GET_USERS_API;
    UserGetApi=import.meta.env.VITE_GET_USER_API;
    UserUpdateApi=import.meta.env.VITE_UPDATE_USER_API;
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
                this.UsersGetApi,
                { withCredentials: true }
            );
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
            // console.log(id);
            const response = await axios.get(
                `${this.UserGetApi}/${id}`,
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            return error;
        }
    }

    async updateUser(data) {
        try {
            console.log(data);
            const response = await axios.put(
                this.UserUpdateApi,
                data,
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            return error;
        }

    }
}

export default new UserApi;