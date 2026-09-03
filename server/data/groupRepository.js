import { loadData, saveData } from "./store.js";

const FILE = "groups.json";
let groups = loadData(FILE, []);

function getGroups() {
    return groups;
}

function addGroup(group) {
    groups.push(group);
    saveData(FILE, groups);
}

function saveGroups() {
    saveData(FILE, groups);
}

export { getGroups, addGroup, saveGroups };