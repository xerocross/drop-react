export default {
    removeDuplicates (arr) {
        let returnList = [];
        for (let item of arr) {
            if (returnList.indexOf(item) === -1) {
                returnList.push(item);
            }
        }
        return returnList;
    },
    parse (str) {
        let pattern = /#[0-9a-zA-Z]+/g;
        let hashtags = str.match(pattern);
        hashtags =  this.removeDuplicates(hashtags || []);
        hashtags = hashtags.map(val => (val.toLowerCase()));
        return hashtags;
    }
}