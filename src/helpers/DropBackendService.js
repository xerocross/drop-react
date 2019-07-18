import DurableAxios from "./durable-axios.js";
let baseUrl = "https://thin-data-backend.herokuapp.com";

export default {
    saveNewDrop (drop) {
        let url = baseUrl+ `/drop`;
        return DurableAxios.post({
            url : url,
            data : drop,
            numTries : 7
        });
    },
    deleteDrop (id) {
        let deleteUrl = `${baseUrl}/drop/${id}`
        return DurableAxios.delete({
            url: deleteUrl,
            numTries : 7
        });
    },
    getUserDrops (username) {
        let url = `${baseUrl}/drops?username=${encodeURIComponent(username)}`;
        return DurableAxios.get({
            url: url,
            numTries : 7
        });
    }
}