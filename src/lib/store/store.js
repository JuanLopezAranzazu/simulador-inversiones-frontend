import { v4 as uuidv4 } from "uuid";
import { writable, derived } from "svelte/store";
//utils
import {
  calculateTotalInvestmentByType,
  calculateTotalResourceByType,
  data,
} from "./../utils/calculate";

const keys = Object.keys(data);

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

// persisting data
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
  {
    _id: uuidv4(),
    name: "EUR",
    value: 3000,
  },
]);
export const investmentData = persist("investment-data", []);
export const resourceData = persist("resource-data", []);
export const selectedInvestment = persist("selected-investment", null);
export const cashFlowData = persist("cash-flow-data", []);
export const growthFactorData = persist("growth-factor-data", {
  units: 1,
  prices: 1,
  costs: 1,
});
export const financingOptionsData = persist("financing-options-data", {
  term: 1,
  periodicity: keys[0],
});
export const cashFlowOptionsData = persist("cash-flow-options-data", {
  amortization: 1,
  taxProvision: 1,
});

// derived stores
export const totalInvestment = derived(
  [investmentData, currencyData],
  ([$investmentData, $currencyData]) =>
    $investmentData.reduce(
      (total, investment) =>
        total +
        investment.subelements.reduce(
          (total, investment) =>
            total +
            investment.price *
              investment.qty *
              $currencyData.find(
                (currency) => currency._id === investment.currency
              ).value,
          0
        ) *
          investment.multiplier,
      0
    )
);

export const totalResources = derived(resourceData, ($resourceData) =>
  $resourceData.reduce((total, resource) => total + resource.value, 0)
);

export const totalInvestmentByType1 = derived(
  [investmentData, currencyData],
  ([$investmentData, $currencyData]) => {
    return calculateTotalInvestmentByType(
      $investmentData,
      $currencyData,
      "Fija"
    );
  }
);

export const totalInvestmentByType2 = derived(
  [investmentData, currencyData],
  ([$investmentData, $currencyData]) => {
    return calculateTotalInvestmentByType(
      $investmentData,
      $currencyData,
      "Variable"
    );
  }
);

export const totalResourceByType1 = derived(resourceData, ($resourceData) => {
  return calculateTotalResourceByType($resourceData, "Propio");
});

export const totalResourceByType2 = derived(resourceData, ($resourceData) => {
  return calculateTotalResourceByType($resourceData, "Externo");
});
