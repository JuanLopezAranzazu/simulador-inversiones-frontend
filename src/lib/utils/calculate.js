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

export function calculateTotalResourceByType(resources, type) {
  return resources
    .filter((resource) => resource.type === type)
    .reduce((total, resource) => total + resource.value, 0);
}

export function calculateTotalInvestmentByType(investments, type) {
  return investments
    .filter((investment) => investment.type === type)
    .reduce(
      (total, investment) =>
        total + investment.price * investment.qty * investment.currency.value,
      0
    );
}
