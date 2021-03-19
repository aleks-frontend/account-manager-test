# Account Management Frontend - Level 3

### The task 🧩

Your task is to build a frontend service that integrates with the [Account Management API](api-specification.yml) backend. This API defines a set of operations for creating and reading account transactions. You can use [editor.swagger.io](https://editor.swagger.io/) to visualize the spec.

### App mockup 🧱

![Mockup](mockup.png)

### App specification 📘
* There's a form with two input fields: Account ID and Amount. Whenever the form is submitted, a new transaction with the collected data should be created on the backend, and the corresponding input fields are cleared. The HTML elements must have the following HTML attributes:
  * Account ID input field: `data-type="account-id"`
  * Amount input field: `data-type="amount"`
  * Form: `data-type="transaction-form"`
* There's a list of the previously submitted transactions. Every newly submitted transaction should appear at the top of the list. The HTML element that represents a transaction should include the following HTML attributes: `data-type=transaction`, `data-account-id={transaction-account-id}`, `data-amount={transaction-amount}`, and `data-balance={current-account-balance}`
* A warning message should appear if there was an attempt to submit a duplicate transaction within 5 seconds from the original one. The message should say: `You need to wait for 5 seconds before sending a duplicate transaction.`. The transaction should not be created on the server in this case. The warning message HTML element should have the following HTML attribute: `data-type=warning-message`.

### What we expect from you ⏳

- **Commit your code to a new branch called `implementation`**.
- **Integrate with the REST API**. Using the provided API spec, figure out the right service endpoints to use.
- **Make the provided API tests pass**. We added a set of API tests that run every time you push to a remote branch other than `master`/`main`. See the instructions below covering how to run them locally.
- **Implement client-side form data validation**. The API has restrictions on the allowed data format. Make sure to do the required checks client-side before sending the data to the server.
- **Organize your code with components**. Extract components that help you avoid duplication, but don't break things apart needlessly. We want to see that you can implement the UI with sound HTML semantics.
- **Implement graceful handling of network failures**. Your app should provide a way for re-sending failed transactions. A transaction might fail to send due to one of the following reasons:
  - The backend is down.
  - The browser has no Internet connection.
  - The backend returns an HTTP 5xx error.
- **Document your choices**. Extend this README.md with info about how to run your application along with any hints that will help us review your submission and better understand the decisions you made. Specifically, please describe your solution for re-sending failed transactions.

### Before you get started ⚠️

Configure your repository. You have 2 options:

#### Set up boilerplate:

1. [Complete a boilerplate import](https://docs.devskills.co/collections/85-the-interview-process/articles/342-importing-challenge-boilerplate).
2. Configure the predefined backend:
    1. Run `npm install @devskills/account-management-api`.
    2. Add the following scripts to [package.json](package.json):
        1. `"start:backend": "node_modules/.bin/account-management-api",`
        2. `"start:fullstack": "npm run start:backend & npm run start",`

#### Alternatively, use the manual setup:

1. Update the `apiUrl` (where your app will run) in [cypress.json](cypress.json).
2. Update the [`build`](package.json#L5) and [`start`](package.json#L6) scripts in [package.json](package.json) to respectively build and start your app. **[See examples](https://www.notion.so/Frontend-c614dbc47cca407788a29c3130cc1523)**.

### Running the E2E tests locally ⚙️

* Run `npm install`.
* Spin up the backend on **port 8080** with `npm run start:backend` (repeat before each test run).
* Run your app.
* Run the tests with `npm run test`.

### When you're done ✅

1. Create a Pull Request from the `implementation` branch.
2. Answer the questions you get on your Pull Request.

**If you don't have enough time to finish**, push what you got and describe how you'd do the rest in a `.md` file.

### Need help? 🤯

Start with [Troubleshooting](https://www.notion.so/Troubleshooting-d18bdb5d2ac341bb82b21f0ba8fb9546), and in case it didn't help, create a new GitHub issue. A human will help you. 

### Time estimate ⏳

About **3 hours**.

---

Made by [DevSkills](https://devskills.co). 

How was your experience? **Give us a shout on [Twitter](https://twitter.com/DevSkillsHQ) / [LinkedIn](https://www.linkedin.com/company/devskills)**.

---

### About my solution 💡

#### Creating a new transaction

- With each `account_id` and `amount` input update, the `inputData` state is updated
- When a new transaction is submitted, two error handling mechanisms are started:
  - _DUPLICATE TRANSACTION_: if the duplicate transaction gets submited after less than 5 seconds, the form is reset and the warning appears. So the new transaction is not created in this scenario
  - _INVALID INPUTS_: if either `account_id` or `amount` values are not valid (UUID format in the first case and number format in second case), the `invalidInputs` state is updated and the corresponding input group section gets the true boolean value via styled-component props. `invalid` prop is telling the styled-component to show the `::before` pseudo element with an error message and sets inputs border color to red. Transaction is again not created but the form inputs are not cleared either, so the user can see what error he made (I wasn't sure about this decission, so if needed, the form get be cleared in this case as well)
- If both error handling mechanisms are passed the API call is initialized: 
  - `amount/` endpoint is called. If no errors appear during the API call, another API call is made right after the first one is resolved (graceful handling of network failures will be explained in a separate chapter).
  - `balance/` endpoint is called and after it's resolved, 3 states are set:
    - `transactionHistory` - this state lives in the `App` component and it will be populated with additional item. New item is an object with the current transaction ID and current account balance. These values will be needed later when the recent transactions will need to be rendered (this will be mentioned in a later chapter)
    - `lastTransactionData` - this is a local state of the TransactionForm component and will be used for checking the duplicate transactions within last 5 seconds. State will be updated with 3 values: timeStamp, account_id and amount (these are the three values that need to be compared in the transaction duplicate error handling)
    - `warningVisible` - another state that lives in the top `App` component which controls the visibility of the warning message that appears if the duplicate transaction was made within 5 seconds. I wanted to make sure that this warning is hidden after a successful transaction. (I was also thinking to add a condition and check if the warning is visible before setting the state to false, but this would mean that the `warningVisible` state and not just its setter function would have to be passed via props) 
- I also created the `Generate Account ID` buton which just sets the account ID input value (and state) to a random UUID.

#### Listing the recently submitted transactions (transactions history)

- I created a separate directory (/transactions-history/) inside the components directory for the two components needed here: `Container` and `Item`
- `Container` component gets the `transactionHistory` state from the `App` component via props.
  - If the received `transactionHistory` is an empty array, the message is shown: `No transactions yet`
  - If the received array is not empty, the `transactionHistory` is mapped and for each transaction item the separate `Item` component is rendered and `transaction_id` and `current_balance` values are passed via props.
  - This array is reversed in the end, cause we want to render the last transaction first (on the top of the list)
- `Item` component gets the `transaction_id` and `current_balance` from its `Container` parent.
  - After the component is mounted, the `transaction/` endpoint is called
  - Once the API call is resolved, the `account_id` and `amount` values received from the server are set to a `transaction` local state
  - `loaded` state is also set to `true`
  - the entire render logic is abstraced into a separate helper function (renderTransaction) and the custom text of the component is set dyncamically there

#### Graceful handling of network failures

First I created a separate module for handling all the API calls (not related withe graceful handling, just a note) and tried making it as reusable and flexible as possible

##### API abstraction overview 

- two properties: `url` and `attemptsLeft`
- three private methods: `_resetAttempts()`, `_handleError()`, `_handleContentType()`
- two public methods: `get()` and `post()`

##### Graceful handling mechanism

The logic is placed inside the `_handleError()` private method.  
So, if the response is not ok and `this.attemptsLeft` is greater than zero, we show the alert box to the user telling him that the request has failed and that we will automatically try 3 more times (number of attempts can be changed by updating the `MAX_ATTEMPTS` constant).

After that the `this.attemptsLeft` value is reduced by one and depending on the method of the request, corresponding public method is returned and called again with the same arguments.

In the end either the response or the reject will be returned.

---

#### Additional notes

##### Local Storage
I was using `localStorage` in the primary version, thinking that the recently submitted transactions should remain even after the browser is refreshed. But after receiving some answers from Catherine, I decided to remove it completely and to simplify the code as much as possible. If needed we can discuss my previous localStorage implementation in a later call.

##### Context API
I was thinking of implementing the Context API but it seemed like it wasn't really needed here. Since we don't have some deep nesting and 'props drilling'. Again if needed, this can be updated and demonstrated in the future.

##### Tests
Cypress tests are passing but I realised a problem.  
When the test is ran for the first time everything is ok, but if I try running the test again without restarting the backend application, the tests fail. 

This is becuase the the balance of each of the transactions is no longer correct. If we take the first example:
(submit a transaction & verify the position on the list)  
1. This account ID is typed into an amount id input: `70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4`
2. Number 30 is typed into an amount field 
3. The form is submitted
4. Everything is fine, the div with these attributes appears the first on the list of transactions: [data-account-id=70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4][data-amount=30][data-balance=30]

But if we try running the test again it will no longer pass, cause the account with this id already exists (70ad2f95-aa52-4e04-a085-c5cc2a4d4ee4) and its balance is no longer zero, but 30 and once another transfer is made with another amount of 30, his balance will not be 30 but 60.

Just wanted to note that I realised this and wasn't sure if it was a problem or the test was meant to be ran only once initialy.



