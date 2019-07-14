let getQueryObject = function () {
    var queryString = window.location.search.substring(1);
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}


export default {
    queryObj : getQueryObject(),
    exists (prop) {
        let condition = this.queryObj.hasOwnProperty(prop);
        return {
            then: (callback) => {
                if (condition) {
                    callback();
                }
            }
        }
    },
    exampleDrops : [
        {
            text: "candy #apple",
            hashtags : ["#apple"],
            key : "0"
        },
        {
            text: "candy #pear",
            hashtags : ["#pear"],
            key : "1"
        },
        {
            text: "candy #watermelon",
            hashtags : ["#watermelon"],
            key : "2"
        }
    ]
}