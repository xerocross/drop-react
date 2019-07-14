import COPY from "./configuration/messages-copy.js";

const noop = () => {};

const exampleDrops2 = [
    {
        text: "happy",
        hashtags : [],
        key : "happy"
    },
    {
        text: "day",
        hashtags : [],
        key : "day"
    }
];

const exampleDrops6 = [
    {
        text: "happy",
        hashtags : [],
        key : "happy"
    },
    {
        text: "day",
        hashtags : [],
        key : "day"
    },
    {
        text: "happy0",
        hashtags : [],
        key : "happy0"
    },
    {
        text: "day0",
        hashtags : [],
        key : "day0"
    },
    {
        text: "happy9",
        hashtags : [],
        key : "happy9"
    },
    {
        text: "day9",
        hashtags : [],
        key : "day9"
    }
];
export {noop, exampleDrops2, exampleDrops6, COPY};