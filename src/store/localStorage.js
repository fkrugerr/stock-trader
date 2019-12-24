const namespace = 'stockTraderStorage';

export const deserializeStore = () => {
  const store = localStorage.getItem(namespace);
  try {
    if (store) {
      return JSON.parse(store);
    }
    return {};
  } catch (err) {
    console.warn('Failed to parse persistent store');
    return {};
  }
};

export const set = (values) => {
  const store = deserializeStore();
  try {
    localStorage.setItem(namespace, JSON.stringify({
      ...store,
      ...values,
    }));
  } catch (err) {
    console.warn('Failed to save to local store');
  }
};

export const get = (key) => {
  const store = deserializeStore();
  return store[key];
};

export const clear = () => localStorage.removeItem(namespace);
