import HashtagHelpers from "./HashtagHelper.js";
import StringHash from "./string-hash.js";

export default class Drop {
    constructor (text, username) {
        let time = Date.now();
        let preHash = `${username}:${time}:${text}`
        let hash = StringHash.getHash(preHash);
        hash = Math.abs(hash);
        this.text = text;
        this.hashtags = HashtagHelpers.parse(text);
        this.username = username;
        this.key = hash;
    }
}