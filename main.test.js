const { createPortfolio, createDepositPlan, createCustomer, findDepositPlans } = require("./main");

test('Create Portfolio', () => {
  const id = 1;
  const name = "High Risk";
  const amount = 0;

  expect(
    createPortfolio(id, name, amount))
    .toStrictEqual(
      { id: 1, name: "High Risk", amount: 0 }
    );
});

test('Create Deposit Plan', () => {
  const depositPlanPrototype = { id: 1, name: 'One-Time', recurring: false, attachedPortfolios: [] };
  const plans = [
    { portfolio: { id: 1, name: 'High Risk', amount: 0 }, amount: 10000 },
    { portfolio: { id: 2, name: 'Retirement', amount: 0 }, amount: 500 }
  ];

  expect(
    createDepositPlan(depositPlanPrototype, plans))
    .toMatchObject(
      {
        id: 1,
        name: 'One-Time',
        recurring: false,
        attachedPortfolios: [
          { portfolioID: 1, depositAmount: 10000 },
          { portfolioID: 2, depositAmount: 500 }
        ]
      }
    );
});

test('Create Customer', () => {
  const customerRefCode = 1;
  const portfolios = [
    { id: 1, name: 'High Risk', amount: 0 },
    { id: 2, name: 'Retirement', amount: 0 }
  ];
  const depositPlans = [
    {
      id: 1,
      name: "One-Time",
      recurring: false,
      attachedPortfolios: [
        {
          portfolioID: 1,
          depositAmount: 10000
        },
        {
          portfolioID: 2,
          depositAmount: 500
        }
      ]
    },
    {
      id: 2,
      name: "Monthly",
      recurring: true,
      attachedPortfolios: [
        {
          portfolioID: 1,
          depositAmount: 0
        },
        {
          portfolioID: 2,
          depositAmount: 100
        }
      ]
    }
  ]

  expect(
    createCustomer(customerRefCode, portfolios, depositPlans))
    .toStrictEqual(
      {
        customerRefCode: 1,
        portfolios: [
          {
            id: 1,
            name: "High Risk",
            amount: 0
          },
          {
            id: 2,
            name: "Retirement",
            amount: 0
          }
        ],
        depositPlans: [
          {
            id: 1,
            name: "One-Time",
            recurring: false,
            attachedPortfolios: [
              {
                portfolioID: 1,
                depositAmount: 10000
              },
              {
                portfolioID: 2,
                depositAmount: 500
              }
            ]
          },
          {
            id: 2,
            name: "Monthly",
            recurring: true,
            attachedPortfolios: [
              {
                portfolioID: 1,
                depositAmount: 0
              },
              {
                portfolioID: 2,
                depositAmount: 100
              }
            ]
          }
        ]
      }
    );
});

test('Find Deposit Plans', () => {
  const customerRefCode = 1;
  expect(
    findDepositPlans(customerRefCode))
    .toMatchObject(
      [
        {
          amount: 10500,
          portfolios: [
            {
              portfolioID: 1,
              depositAmount: 10000
            },
            {
              portfolioID: 2,
              depositAmount: 500
            }
          ]
        },
        {
          amount: 100,
          portfolios: [
            {
              portfolioID: 1,
              depositAmount: 0
            },
            {
              portfolioID: 2,
              depositAmount: 100
            }
          ]
        }
      ]
    );
});
