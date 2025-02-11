import axios from "axios";

class RoleApi {
  get_roles_api = import.meta.env.VITE_GET_ROLES;
  add_role_api = import.meta.env.VITE_ADD_ROLE;
  update_role_api = import.meta.env.VITE_UPDATE_ROLE;
  delete_role_api = import.meta.env.VITE_DELETE_ROLE;
  get_role_api = import.meta.env.VITE_GET_ROLE;

  async getRoles() {
    try {
      const response = await axios.get(this.get_roles_api, {
        withCredentials: true,
      });

      return response;
    } catch (error) {
      return error;
    }
  }

  async addRole(role) {
    try {
      const response = await axios.post(this.add_role_api, role, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateRole(id) {
    try {
      const response = await axios.put(this.update_role_api, id, {
        withCredentials: true,
      });
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteRole(id) {
    try {
      const response = await axios.delete(`${this.delete_role_api}/${id}`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async getRole(id) {
    try {
      const response = await axios.get(`${this.get_role_api}/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new RoleApi();
