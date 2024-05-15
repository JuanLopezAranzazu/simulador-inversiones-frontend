export const data = {
  Mensual: 12,
  Bimestral: 6,
  Trimestral: 4,
  Cuatrimestral: 3,
  Semestral: 2,
};

export function calculateNominalRate(rate, periods) {
  return periods * (Math.pow(1 + rate / 100, 1 / periods) - 1);
}

export function calculatePeriodicRate(nominalRate, periods) {
  return nominalRate / periods;
}

export function calculateShare(value, rate, term) {
  return (value * rate) / (1 - Math.pow(1 + rate, -term));
}

export function calculateTotalResourceByType(resources, type) {
  return resources
    .filter((resource) => resource.type === type)
    .reduce((total, resource) => total + resource.value, 0);
}

// export function calculateTotalInvestmentByType(investments, type) {
//   return investments
//     .filter((investment) => investment.type === type)
//     .reduce(
//       (total, investment) =>
//         total + investment.price * investment.qty * investment.currency.value,
//       0
//     );
// }

export function calculateTotalSubelement(subelement, valueCurrency) {
  return subelement.price * subelement.qty * valueCurrency;
}

export function calculateTotalInvestment(investment, currencyData) {
  return investment.subelements.reduce(
    (total, investment) =>
      total +
      investment.price *
        investment.qty *
        currencyData.find((currency) => currency._id === investment.currency)
          .value,
    0
  );
}

export function calculateTotalInvestmentByType(
  investments,
  currencyData,
  type
) {
  return investments
    .filter((investment) => investment.type === type)
    .reduce(
      (total, investment) =>
        total +
        investment.subelements.reduce(
          (total, investment) =>
            total +
            investment.price *
              investment.qty *
              currencyData.find(
                (currency) => currency._id === investment.currency
              ).value,
          0
        ) *
          investment.multiplier,
      0
    );
}
