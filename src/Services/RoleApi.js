import axios from "axios";

class RoleApi {
    get_roles_api = import.meta.env.VITE_GET_ROLES;
    add_role_api = import.meta.env.VITE_ADD_ROLE;


    async getRoles() {
        try {
            const response = await axios.get(this.get_roles_api);
            return response;
        } catch (error) {
            return error;
        }
    }

    async addRole(role) {
        try {
            const response = await axios.post(this.add_role_api, role);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default new RoleApi;