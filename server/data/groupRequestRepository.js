import { loadData, saveData } from "./store.js";

const FILE = "groupRequests.json";
let requests = loadData(FILE, []);

function getRequests() {
    return requests;
}

function addRequest(request) {
    requests.push(request);
    saveData(FILE, requests);
}

function saveRequests() {
    saveData(FILE, requests);
}

export { getRequests, addRequest, saveRequests };