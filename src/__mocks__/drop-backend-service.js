export default {
    saveNewDrop : jest.fn(() => Promise.resolve({ data: {} })),
    getUserDrops : jest.fn(() => {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ called getUserDrops");
        return Promise.resolve({ data: {} })
    })
}