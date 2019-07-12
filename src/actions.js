
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

export {NEW_DROPTEXT, UPDATE_DROPS, SET_SYNCING, SET_IS_SYNCED}