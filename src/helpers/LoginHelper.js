import LocalStorageUsername from "./LocalStorageUsername.js";
export default {
    tryToGetUsernameFromStorage () {
        let localUsername = LocalStorageUsername.getUsername();
        return localUsername ? localUsername : undefined;
    },
    setLocalUsername (username) {
        LocalStorageUsername.setUsername(username);
    }
}