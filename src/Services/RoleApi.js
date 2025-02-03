import axios from "axios";

class RoleApi {
    get_roles_api = import.meta.env.VITE_GET_ROLES;


    async getRoles() {
        try {
            const response = await axios.get(this.get_roles_api,{ withCredentials: true });
            return response;
        } catch (error) {
            return error;
        }
    }
}