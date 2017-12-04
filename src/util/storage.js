const storeSetItems = (items, type) => new Promise((resolve) => {
  chrome.storage[type].set(items, () => resolve(true));
});

const storeSetSingle = (key, value, type) => new Promise((resolve) => {
  chrome.storage[type].set({[key]: value}, () => resolve(true));
});

const storeSet = (key, value, type) => {
  if (typeof key === 'string') return storeSetSingle(key, value, type);
  return storeSetItems(key, type);
}

const storeGet = (key, type) => new Promise((resolve) => {
  chrome.storage[type].get(key, (items) => resolve(items));
});

const storeRemove = (key, type) => new Promise((resolve) => {
  chrome.storage[type].remove(key, () => resolve());
});

export const sync = {
  get: (key) => storeGet(key, 'sync'),
  set: (key, value) => storeSet(key, value, 'sync'),
  remove: (key) => storeRemove(key, 'sync'),
};
export const local = {
  get: (key) => storeGet(key, 'local'),
  set: (key, value) => storeSet(key, value, 'local'),
  remove: (key) => storeRemove(key, 'local'),
};