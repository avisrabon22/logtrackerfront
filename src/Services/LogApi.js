import axios from "axios"
class LogApi{
    getLogsApi=import.meta.env.VITE_GET_LOGS;

    async getLogs(){
     try{
             const response=await axios.get(this.getLogs); 
     }catch(error){

     }

    }

}