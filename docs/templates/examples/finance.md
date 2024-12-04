---
slug: "/templates/examples/finance"
description: "Check out this template for an example Conductor workflow on loan origination."
---

# Loan Origination made easier using Conductor

In the modern era, financial services are crucial for the functioning of an economy. With the latest technological advancements, gone are the days when people rely on traditional banking. The transition from conventional banking to modern banking is something that we’ve witnessed over the past decade. 

This documentation deals with a sample workflow through which you can leverage the use of Conductor in solving the loan processing process.

:::note
This workflow does not have workers that evaluate the loan parameters and is for visualization purposes only.
:::

You can get the JSON file for the sample workflow detailed [here](https://github.com/conductor-sdk/conductor-examples/blob/main/finance/loan_banking.json).

| [See it in Orkes Developer Edition](https://developer.orkescloud.com/workflowDef/loan_banking) |
|------------------------------------------------------------------------------| 

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/loan.png"
alt="Sample workflow created for loan origination using Conductor" width="100%" height="auto" style={{paddingBottom: 20}} /></center>

Let’s quickly see what each block in the diagram stands for.

1. The initial step is fetching the customer details. Let’s say we fetch the details with the **customer_details** task.  
2. The next step is deciding on the loan type, which is evaluated by the switch task **loan_type**. It splits the process into three classes; business, education and personal.
3. Based on the loan type chosen, corresponding details need to be fetched. This is done using the tasks **education_details** / **business_details** / **employment_details**.
4. Now, the fetched details are to be verified, and this is executed using the tasks **education_details_verification** / **business_details_verification** / **employment_details_verification**.
5. Once the details are verified, the credit score risk is calculated using the task **credit_score_risk**.
6. The result of the **credit_store_risk** is passed on to the switch task **credit_result**, which evaluates if the loan is to be permitted or not. If the loan is rejected, the workflow ends using the terminate task **terminate_due_to_bank_rejection**. On the other hand, if the loan is approved, the workflow proceeds with the **possible** switch case.
7. Now, the workflow proceeds with the interest calculation, and the loan is offered to the customer using the tasks **principal_interest_calculation** and **loan_offered_to_customer**, respectively.
8. Next is the customer’s decision to accept/reject the loan. It is evaluated using the switch task **customer_decision**. If the customer rejects the loan, the task is terminated by the task **terminate_due_to_customer_rejection** and the workflow ends here. On the other hand, if the customer proceeds with the loan, the amount is transferred to the customer’s account using the task **loan_transfer_to_customer_account** and the workflow ends.

And that’s a quick overview of the workflow. Wanna visualize a successful workflow? Have a look at our blog, [Modern Loan Banking (Lending) Using Conductor](https://orkes.io/content/blog/loan-banking-using-conductor). 

## Advantages

The advantages of using Conductor for these use cases are:
* Conductor has an in-built option for retry so that if something goes wrong, then Conductor automatically retries the operation.
* Conductor is scalable, so that you can use this to scale per your requirements.
* When something goes wrong, you can debug that particular block alone, making it easier to fix issues rather than debugging the entire code.
* If long workflows are to be created, then concepts like sub-workflow make the process less cluttered and easy to manage.
* Future additions can be seamlessly integrated using additional tasks/workflows as and when required, thus making your existing processes future-proof. 