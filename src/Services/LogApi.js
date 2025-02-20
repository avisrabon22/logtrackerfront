import axios from "axios"
class LogApi {
    getLogsApi = import.meta.env.VITE_GET_LOGS;

    async getLogs() {
        try {
           
                const response = await axios.get(this.getLogsApi);
                return response;
            // console.log(response)
        } catch (error) {
            return error;
        }

    }

}
export default new LogApi;