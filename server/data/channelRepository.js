import { loadData, saveData } from "./store.js";

const FILE = "channels.json";
let channels = loadData(FILE, []);

function getChannels() {
    return channels;
}

function addChannel(channel) {
    channels.push(channel);
    saveData(FILE, channels);
}

function saveChannels() {
    saveData(FILE, channels);
}

export { getChannels, addChannel, saveChannels };