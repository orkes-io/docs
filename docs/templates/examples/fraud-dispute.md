
# Building Applications to handle fraud disputes using Conductor

In the modern digital era, where everything is being digitalized, including transactions, the rate of fraudulent transactions is growing at an alarming rate. Therefore, the number of requests to be addressed by the bank is also increasing. Situations like these are to be handled quickly, and conventional manual human interventions can cause delays. However, a microservice orchestration platform like Conductor can create workflows to handle such situations, aiding in quickly resolving customer issues. 

This documentation deals with a sample workflow through which you can make use of Conductor in settling a fraud dispute transaction. 

## Sample Workflow - Fraud Dispute Flow

Let’s see another sample workflow on settling a credit card fraud dispute transaction. This workflow can be achieved by executing each block as tasks/microservices.

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/illustration_of_fraud_dispute_flow.png"
alt="Fraud dispute flow for credit card transaction dispute" width="100%" height="auto" style={{paddingBottom: 20}} /></center>

Let’s see how this can be achieved using a sample workflow created with Conductor. 

:::note
This workflow is for visualization purposes only.
:::

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/fraud_dispute_workflow_created_in_conductor.png"
alt="Transaction dispute workflow created in Conductor" width="100%" height="auto" style={{paddingBottom: 20}} /></center>

The workflow begins when a customer dispute is raised regarding the credit card transaction.

1. The initial step is fetching the transaction details. Let’s say we fetch the details using the SIMPLE task **fetch_transaction_details**.
2. Next, we need to check the credit eligibility of the transaction using the SWITCH task **eligibility**.
3. If the transaction is not eligible, the process is to notify the customer and the workflow ends here. This is evaluated by the switch case no, and the customer is notified via email using the SIMPLE task **notify_cx**. Finally, the workflow is terminated using the terminate task **ends**.
4. On the other hand, if the transaction is eligible, then the eligibility task gets executed using the switch case **defaultCase**. (Here, we’ve considered the default case of the SWITCH task to be yes).
5. The next step is getting the customer details and it is executed using the SIMPLE task **get_cx_details**.
6. Once we have the customer details, we need to check whether they are high-value customers from a banking perspective. It is executed using the SWITCH task **high_value_cx**. 
7. If it is not a high-value customer, the workflow proceeds as shown below.

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/workflow_proceeding_if_not_a_high_valued_customer.png"
alt="The path of the workflow if the customer is not a high-valued one" width="70%" height="auto" style={{paddingBottom: 20}} /></center>

8. The bank will assign an agent for resolution, notify the customer via email, wait for the agent to resolve the issue, decide if the charges will be reversed, and the workflow ends. Let us indicate this entire process using another workflow **assign_agent**. And it is called into the original workflow using the concept of SUB WORKFLOW. Here’s what the **assign_agent** workflow looks like:

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/sub_workflow_for_assigning_agents.png"
alt="The illustration of sub-workflow assign_agents" width="90%" height="auto" style={{paddingBottom: 20}} /></center>

9. This workflow is called into the original workflow using the concept of SUB WORKFLOW.

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/calling_sub_workflow_within_a_workflow.png"
alt="Including a sub-workflow inside a workflow" width="90%" height="auto" style={{paddingBottom: 20}} /></center>

So, if it is not a high-value customer, the workflow ends using this **assign_agent** sub-workflow.

10. If it is a high-value customer, the workflow proceeds using the switch case **defaultCase**. (Here, we’ve considered the default case of the SWITCH task to be yes).
11. Next, we check if the transaction amount is less than the average monthly balance. It is evaluated using the SWITCH task **transaction_amount < monthly_balance**. 
12. If the transaction amount is not less than the monthly balance, the switch task proceeds with case **no**, and the workflow proceeds in the same manner as mentioned above in Step 7. 

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/workflow_proceeding_if_transaction_amount_is_less_than_balance.png"
alt="The path of the workflow if transaction amount is less than balance" width="70%" height="auto" style={{paddingBottom: 20}} /></center>

13. This entire process is also evaluated using the same sub-workflow **assign_agent**. You cannot use the same reference name. Hence it is denoted using **assign_agent_1**.

<center><img src="https://raw.githubusercontent.com/conductor-sdk/conductor-examples/main/finance/images/calling_same_sub_workflow_within_a_workflow.png"
alt="Including same sub-workflow inside workflow" width="90%" height="auto" style={{paddingBottom: 20}} /></center>

14. If the transaction amount is less than the average monthly balance, it is evaluated using the switch case **defaultCase**. (Here, we’ve considered the default case of the SWITCH task to be yes).
15. Now, the charges need to be reversed, the customer is to be notified, and the workflow ends. The reversing charge process is handled via SIMPLE task **reverse_charges**.
16. The customer is notified using the SIMPLE task **notify_cx**, and the workflow terminates here via the terminate task **task_ends_here**.

## Advantages

The advantages of using Conductor for these use cases are:
* Conductor has an in-built option for retry so that if something goes wrong, then Conductor automatically retries the operation.
* Conductor is scalable, so that you can use this to scale per your requirements.
* When something goes wrong, you can debug that particular block alone, making it easier to fix issues rather than debugging the entire code.
* If long workflows are to be created, then concepts like sub-workflow make the process less cluttered and easy to manage.
* Future additions can be seamlessly integrated using additional tasks/workflows as and when required, thus making your existing processes future-proof. 