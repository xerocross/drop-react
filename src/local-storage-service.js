let base_key = "drop-local-storage"

export default {
    getDropListKey(username) {
        return `${base_key}:${username}`;
    },
    getDropKey (dropId) {
        return  `${base_key}:${dropId}`;
    },
    addToList(username, drop) {
        const listKey = this.getDropListKey(username);
        let list = JSON.parse(localStorage.getItem(listKey));
        list = list || [];
        list.push(drop._id);
        localStorage.setItem(listKey, JSON.stringify(list));
    },
    saveDrop (drop) {
        let username = drop.username;
        localStorage.setItem(this.getDropKey(drop._id), JSON.stringify(drop));
        this.addToList(username, drop);
    },
    getDrop (id) {
        return JSON.parse(localStorage.getItem(this.getDropKey(id)));
    }
}