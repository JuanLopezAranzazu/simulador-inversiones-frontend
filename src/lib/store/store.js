import { v4 as uuidv4 } from "uuid";
import { writable, derived } from "svelte/store";
//utils
import {
  calculateTotalInvestmentByType,
  calculateTotalResourceByType,
} from "./../utils/calculate";

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

export const totalInvestment = derived(investmentData, ($investmentData) =>
  $investmentData.reduce(
    (total, investment) =>
      total + investment.price * investment.qty * investment.currency.value,
    0
  )
);

export const totalResources = derived(resourceData, ($resourceData) =>
  $resourceData.reduce((total, resource) => total + resource.value, 0)
);

export const totalInvestmentByType1 = derived(
  investmentData,
  ($investmentData) => {
    return calculateTotalInvestmentByType($investmentData, "Fija");
  }
);

export const totalInvestmentByType2 = derived(
  investmentData,
  ($investmentData) => {
    return calculateTotalInvestmentByType($investmentData, "Variable");
  }
);

export const totalResourceByType1 = derived(resourceData, ($resourceData) => {
  return calculateTotalResourceByType($resourceData, "Propio");
});

export const totalResourceByType2 = derived(resourceData, ($resourceData) => {
  return calculateTotalResourceByType($resourceData, "Externo");
});
