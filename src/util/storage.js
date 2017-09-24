const storeSet = (key, value, type) => new Promise((resolve) => {
  chrome.storage[type].set({[key]: value}, () => resolve(true));
});

const storeGet = (key, type) => new Promise((resolve) => {
  chrome.storage[type].get(key, (items) => resolve(items));
});

export const sync = {
  get: (key) => storeGet(key, 'sync'),
  set: (key, value) => storeSet(key, value, 'sync'),
};
export const local = {
  get: (key) => storeGet(key, 'local'),
  set: (key, value) => storeSet(key, value, 'local'),
};