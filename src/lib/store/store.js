import { v4 as uuidv4 } from "uuid";
import { writable } from "svelte/store";

function persist(key, value) {
  const isLocalStorageAvailable = typeof localStorage !== "undefined";
  const storedValue = isLocalStorageAvailable
    ? localStorage.getItem(key)
    : null;
  const initial = storedValue ? JSON.parse(storedValue) : value;
  const store = writable(initial);

  store.subscribe(($value) => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify($value));
    }
  });

  return store;
}

export const currencyData = persist("currency-data", [
  {
    _id: uuidv4(),
    name: "COP",
    value: 1,
  },
  {
    _id: uuidv4(),
    name: "USD",
    value: 3000,
  },
]);
export const investmentData = persist("investment-data", []);
export const resourceData = persist("resource-data", []);
