import axios from "axios";


class FloorMapApi {
getFloorData = import.meta.env.VITE_GET_FLOOR_MAPS;

async getFloorMapData(){
    try {
        const response = await axios.get(this.getFloorData);
        console.log(response);
        return response;     
    } catch (error) {
        return error;
    }

}



}
export default new FloorMapApi;