const depositPlanPrototypes = {
  oneTime: {
    id: 1,
    name: "One-Time",
    recurring: false,
    attachedPortfolios: []
  },
  monthly: {
    id: 2,
    name: "Monthly",
    recurring: true,
    attachedPortfolios: []
  }
}

const customerData = [];

function createPortfolio(id, name, amount) {
  const portfolio = {
    id,
    name,
    amount
  }

  return portfolio;
}

function createDepositPlan(depositPlanPrototype, portfolios) {
  const depositPlan = structuredClone(depositPlanPrototype);

  const attachedPortfolioPrototype = {
    portfolioID: null,
    depositAmount: 0
  }

  portfolios.map(portfolio => {
    const attachedPortfolio = structuredClone(attachedPortfolioPrototype);
    attachedPortfolio.portfolioID = portfolio.id;
    attachedPortfolio.depositAmount = 10000;
    depositPlan.attachedPortfolios.push(attachedPortfolio);
  });

  return depositPlan;
}

function createCustomer(customerRefCode, portfolios, depositPlans) {
  const customer = {
    customerRefCode,
    portfolios,
    depositPlans
  }

  customerData.push(customer);
}

function main() {
  const highRiskPortfolio = createPortfolio(1, "High Risk", 0);
  const retirementPortfolio = createPortfolio(2, "Retirement", 0);

  const oneTimeDepositPlan = createDepositPlan(
    depositPlanPrototypes.oneTime,
    [highRiskPortfolio, retirementPortfolio]
  );
  
  const monthlyDepositPlan = createDepositPlan(
    depositPlanPrototypes.monthly,
    [highRiskPortfolio, retirementPortfolio]
  );

  createCustomer(1, [highRiskPortfolio, retirementPortfolio], [oneTimeDepositPlan, monthlyDepositPlan]);

  console.log('customers', JSON.stringify(customerData));
}

main();
