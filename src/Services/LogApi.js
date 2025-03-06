import axios from "axios"
class LogApi {
    getLogsApi = import.meta.env.VITE_GET_LOGS;
    getLogOnBoardApi = import.meta.env.VITE_GET_LOG_ON_BOARD;

    async getLogs() {
        try {
           
                const response = await axios.get(this.getLogsApi);
                // console.log(response)
                return response;
        } catch (error) {
            return error;
        }

    }


    async getLogOnBoard() {
        try {
            const response = await axios.get(this.getLogOnBoardApi);
            // console.log(response)
            return response;
        } catch (error) {
            return error;
        }
    }

}
export default new LogApi;