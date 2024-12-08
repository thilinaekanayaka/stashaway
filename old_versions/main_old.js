const depositTypes = {
  oneTime: {
    id: 1,
    name: "One-Time",
    recurring: false
  },
  monthly: {
    id: 2,
    name: "Monthly",
    recurring: true
  }
}

const customerData = [];

function createPortfolio(name, startAmount) {
  const portfolio = {
    name,
    startAmount
  }
  return portfolio;
}

function createDepositPlan(depositType, portfolios) {
  const depositPlan = {
    depositType,
    portfolios
  }
  return depositPlan;
}

function createCustomer(customerRefCode, depositPlans) {
  const customer = {
    customerRefCode,
    depositPlans
  }
  customerData.push(customer);
}

function main() {
  const highRiskPortfolio1 = createPortfolio("High Risk", 10000);
  const retirementPortfolio1 = createPortfolio("Retirement", 500);
  const oneTimeDepositPlan = createDepositPlan(depositTypes.oneTime, [highRiskPortfolio1, retirementPortfolio1]);

  const highRiskPortfolio2 = createPortfolio("High Risk", 0);
  const retirementPortfolio2 = createPortfolio("Retirement", 100);
  const monthlyDepositPlan = createDepositPlan(depositTypes.monthly, [highRiskPortfolio2, retirementPortfolio2]);

  const depositPlans = [];
  depositPlans.push(oneTimeDepositPlan);
  depositPlans.push(monthlyDepositPlan);
  createCustomer(1, depositPlans);

  console.log('customers', JSON.stringify(customerData));
}

main();
