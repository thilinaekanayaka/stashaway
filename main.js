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

function createDepositPlan(depositPlanPrototype, plans) {
  const depositPlan = structuredClone(depositPlanPrototype);

  const attachedPortfolioPrototype = {
    portfolioID: null,
    depositAmount: 0
  }

  plans.map(plan => {
    const attachedPortfolio = structuredClone(attachedPortfolioPrototype);

    attachedPortfolio.portfolioID = plan.portfolio.id;
    attachedPortfolio.depositAmount = plan.amount;

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
  return customer;
}

function findDepositPlans(customerRefCode) {
  const { depositPlans } = customerData.find(customer => customer.customerRefCode === customerRefCode);
  const depositPlanAmounts = [];

  depositPlans.map(plan => {
    const { attachedPortfolios } = plan;

    const newPlan = {
      amount: 0,
      portfolios: []
    }

    attachedPortfolios.map(portfolio => {
      newPlan.amount = newPlan.amount + portfolio.depositAmount;
      newPlan.portfolios.push(portfolio);
    })

    depositPlanAmounts.push(newPlan);
  })

  return depositPlanAmounts;
}

function deposit(customerRefCode, depositAmount) {
  const depositPlans = findDepositPlans(customerRefCode);
  depositPlans.sort((a, b) => b.amount - a.amount);

  const matchingPlan = depositPlans.find(plan => plan.amount === depositAmount);

  if (matchingPlan) {
    const { portfolios } = customerData.find(customer => customer.customerRefCode === customerRefCode);

    portfolios.map(portfolio => {
      const { depositAmount } = matchingPlan.portfolios.find(item => item.portfolioID === portfolio.id);
      portfolio.amount = portfolio.amount + depositAmount;
    });
  } else {
    throw new Error('No matching deposit plan found');
  }
}

function main(depositsList) {
  /**
   * ~ DEV COMMENTS ~
   * This is the portion of the code that creates,
   * 1. New portfolios
   * 2. New deposit plans
   * 2. A new customer for us to deposit money
   */
  const highRiskPortfolio = createPortfolio(1, "High Risk", 0);
  const retirementPortfolio = createPortfolio(2, "Retirement", 0);

  const oneTimeDepositPlan = createDepositPlan(
    depositPlanPrototypes.oneTime,
    [
      {
        portfolio: highRiskPortfolio,
        amount: 10000
      },
      {
        portfolio: retirementPortfolio,
        amount: 500
      }
    ]
  );

  const monthlyDepositPlan = createDepositPlan(
    depositPlanPrototypes.monthly,
    [
      {
        portfolio: highRiskPortfolio,
        amount: 0
      },
      {
        portfolio: retirementPortfolio,
        amount: 100
      }
    ]
  );

  createCustomer(
    1,
    [
      highRiskPortfolio,
      retirementPortfolio
    ],
    [
      oneTimeDepositPlan,
      monthlyDepositPlan
    ]
  );

  // console.log('customers', JSON.stringify(customerData));
  /**
   * ~ DEV COMMENTS ~
   * END of creating a new customer
   */

  /**
   * ~ DEV COMMENTS ~
   * This is depositing different amounts for the created customer
   */
  depositsList.map(item => {
    deposit(item.customerRefCode, item.amount);
  });
  console.log('Updated Customer Data', JSON.stringify(customerData));
}

/**
 * ~ DEV COMMENTS ~
 * Calling the main function with a deposit list
 */
const depositsList = [
  {
    customerRefCode: 1,
    amount: 10500
  },
  {
    customerRefCode: 1,
    amount: 100
  },
  // {
  //   customerRefCode: 1,
  //   amount: 300
  // }
];

main(depositsList);

/**
 * ~ DEV COMMENTS ~
 * Exporting for testing purposes
 */
module.exports = { createPortfolio, createDepositPlan, createCustomer, findDepositPlans };
