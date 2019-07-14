
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

const CREATE_NEW_DROP = () => {
    return {
        type: "CREATE_NEW_DROP"
    }
}


const DROP_SUCCESSFULLY_SAVED = (drop) => {
    return {
        type: "DROP_SUCCESSFULLY_SAVED",
        payload : drop
    }
}
const ATTEMPT_SAVE_DROP = (drop) => {
    return {
        type: "ATTEMPT_SAVE_DROP",
        payload: drop
    }
}
const INIT_DELETE_DROP = (drop) => {
    return {
        type: "INIT_DELETE_DROP",
        payload: drop
    }
}
const DROP_FAILED_TO_SAVE = (drop) => {
    return {
        type: "DROP_FAILED_TO_SAVE",
        payload: drop
    }
}
const TRY_SAVING_FAILED_DROPS_AGAIN = () => {
    return {
        type: "TRY_SAVING_FAILED_DROPS_AGAIN",
    }
}


export {NEW_DROPTEXT, UPDATE_DROPS, SET_SYNCING, SET_IS_SYNCED, UNSET_USERNAME, POST_USERNAME_SET, ADD_UNSAVED_DROP, REMOVE_UNSAVED_DROP, TRY_SAVE_UNSAVED_DROPS, DROP_SUCCESSFULLY_SAVED, ATTEMPT_SAVE_DROP, CREATE_NEW_DROP, INIT_DELETE_DROP, DROP_FAILED_TO_SAVE, TRY_SAVING_FAILED_DROPS_AGAIN
};