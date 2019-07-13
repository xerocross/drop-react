
const NEW_DROPTEXT = (val) => {
    return {
        type: "NEW_DROPTEXT",
        payload : val
    }
}
const UPDATE_DROPS = (droplist) => {
    return {
        type: "UPDATE_DROPS",
        payload : droplist
    }
}

const SET_SYNCING = () => {
    return {
        type: "SET_SYNCING",
    }
}

const SET_IS_SYNCED = () => {
    return {
        type: "SET_IS_SYNCED",
    }
}

const POST_USERNAME_SET = (username) => {
    return {
        type: "POST_USERNAME_SET",
        payload: username
    }
}

const UNSET_USERNAME = () => {
    return {
        type: "UNSET_USERNAME",
    }
}

const ADD_UNSAVED_DROP = (drop) => {
    return {
        type: "ADD_UNSAVED_DROP",
        payload: drop
    }
}
const REMOVE_UNSAVED_DROP = (drop) => {
    return {
        type: "REMOVE_UNSAVED_DROP",
        payload: drop
    }
}

const TRY_SAVE_UNSAVED_DROPS = () => {
    return {
        type: "TRY_SAVE_UNSAVED_DROPS"
    }
}

export {NEW_DROPTEXT, UPDATE_DROPS, SET_SYNCING, SET_IS_SYNCED, UNSET_USERNAME, POST_USERNAME_SET, ADD_UNSAVED_DROP, REMOVE_UNSAVED_DROP, TRY_SAVE_UNSAVED_DROPS}