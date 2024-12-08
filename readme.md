# Stashway Assignment

## Task
Build a function that takes in the following input:

- A list of 1 one-time and/or 1 monthly deposit plan (max 2 plans total)
- A list of deposits for a customer
This function must return the final allocation of funds among the customer’s portfolios (see
above example).
When you design the data structures, keep in mind:
- Each deposit plan must contain the related portfolios for that plan & the absolute amount
of money to allocate to each portfolio
- Deposits can only contain the absolute amount of money & a reference code. Deposits
cannot have any deposit plan linked to them- the bank processing customer transfers
doesn’t know or care about deposit plans

## Installation

In the main directory install the dependencies.

```bash
npm install
```

## Running

Use a terminal to run the application. This is a console application which will print the results to the console. So, please use a terminal that shows output.

```bash
npm start
```

## Test Cases

The application uses [Jest](https://jestjs.io/) to run unit tests. Open a terminal and run the follwing command. It will display in the terminal if the tests pass.

```bash
npm test
```
Thanks for checking out! :)