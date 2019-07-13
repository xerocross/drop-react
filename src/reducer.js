import HashtagHelper from "./helpers/HashtagHelper";


const initialState = (obj) => {
    return Object.assign(obj, {
        droptext : "",
        drops : [],
        selectedDrops : [],
        hashtags : [],
        isSyncing : false,
        username : undefined,
        isUsernameSet : false,
        unsavedDrops : []
    });
}

let cloneObj = (obj) => {
    let newObj = {};
    return Object.assign(newObj, obj);
}

function getHashtags (previousState, state) {
    let prevHashtags = previousState.hashtags;
    let newHashtagList = HashtagHelper.parse(state.droptext);
    if (prevHashtags.length !== newHashtagList.length) {
        return newHashtagList;
    }
    else {
        for (let i = 0; i < prevHashtags.length; i++) {
            if (prevHashtags[i] !== newHashtagList[i]) {
                return newHashtagList;
            }
        }
        return prevHashtags;
    }
}


function getSelectedDrops (previousState, state) {
    if (previousState.hashtags === state.hashtags && previousState.drops === state.drops) {
        return previousState.selectedDrops;
    }
    let hashtags = state.hashtags;
    let selectedDrops = state.drops.slice();
    function testFunc (drop, hashtag) {
        let pattern = new RegExp(hashtag, "i");
        return pattern.test(drop.text);
    }
    for (let tag of hashtags) {
        selectedDrops = selectedDrops.filter(drop => testFunc(drop, tag));
    }
    return selectedDrops;
}

export default function (state, action) {
    if (typeof state === "undefined") {
        return initialState({});
    }
    let newState = cloneObj(state);
    let unsavedDrops;
    let index;
    switch(action.type) {
    case "NEW_DROPTEXT":
        newState.droptext = action.payload;
        newState.hashtags = getHashtags(state, newState);
        newState.selectedDrops = getSelectedDrops(state, newState);
        break;
    case "UPDATE_DROPS":
        newState.drops = action.payload;
        newState.selectedDrops = getSelectedDrops(state, newState);
        break;
    case "SET_SYNCING":
        newState.isSyncing = true;
        break;
    case "SET_IS_SYNCED":
        newState.isSyncing = false;
        break;
    case "POST_USERNAME_SET":
        newState.isUsernameSet = true;
        newState.username = action.payload;
        break;
    case "UNSET_USERNAME":
        newState.isUsernameSet = false;
        newState.usernam = undefined;
        break;
    case "ADD_UNSAVED_DROP":
        unsavedDrops = state.unsavedDrops.slice();
        unsavedDrops.push(action.payload);
        newState.unsavedDrops = unsavedDrops;
        break;
    case "REMOVE_UNSAVED_DROP":
        unsavedDrops = state.unsavedDrops.slice();
        index = unsavedDrops.indexOf(action.payload);
        if (index > -1) {
            unsavedDrops.splice(index, 1);
        }
        state.unsavedDrops = unsavedDrops;
        break;
    default:
        break;
    }
    return newState;
}