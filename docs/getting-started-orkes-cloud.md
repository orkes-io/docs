# Getting Started with Orkes Cloud

Orkes Cloud is a self-service offering from Orkes, the leading workflow orchestration platform. It allows developers to scale distributed applications, modernize workflows for durability, and protect against software failures and downtimes.

Orkes Cloud offers a 14-day free trial for the self-service plan with access to all enterprise features.

## Sign Up for Orkes Cloud Free Trial 

:::note
No credit card is required for a free trial.
:::

To get started with the free trial of Orkes Cloud:

1. Sign up for a [14-day free trial](https://cloud.orkes.io/sign-up).
2. Set up an account using Google SSO or email (only business email sign-ups are permitted).
3. Provide the following details:

<p align="center"><img src="/content/img/complete-account-setup-orkes-cloud.png" alt="Orkes Cloud Account Setup details" width="100%" height="auto"></img></p>

4. Verify your phone number with OTP authentication.
5. Select the region for your free trial cluster. You can choose from _Europe_, _North America_, or _APAC_.

<p align="center"><img src="/content/img/cluster-region-orkes-cloud.png" alt="Select cluster region for free-trial" width="100%" height="auto"></img></p>

6. Click **Continue**.

The cluster is provisioned, and the free trial account is activated with 14-day access to all enterprise features. After 14 days, you can upgrade to continue using your account. If you do not upgrade, your account will be deactivated. You’re free to upgrade your account at any time throughout the trial. 

7. Once the cluster provisioning is complete, click the **Open Cluster** button, and it will take you to the sign-up page for Conductor UI.

<p align="center"><img src="/content/img/open-cluster-orkes-cloud.png" alt="Open cluster option after provisioning" width="100%" height="auto"></img></p>

8. Click **Login to Continue** and **Sign-up** for the cluster using the same email used during sign-up. 

<p align="center"><img src="/content/img/cluster-login-orkes-cloud.png" alt="Login to Cluster from Orkes Cloud" width="100%" height="auto"></img></p>

:::info
To access your cluster, you need to “Sign up” for the cluster and not log in. This serves as a security capability: the cloud portal is intended for a DevOps audience, whereas the Conductor cluster is designed for a developer audience. This distinction allows for granular control over these two environments, ensuring that each audience has the appropriate level of access and control, thereby enhancing overall security and operational efficiency.
:::

## Upgrading from Trial to Enterprise Base Subscription Plan

:::note
The **Enterprise Base** plan is the lowest subscription tier for Orkes Enterprise, starting at $695 per month when billed annually, or $825 per month when billed monthly.
:::

### Limits of Enterprise Base Cluster 

Enterprise base cluster has the following limits:

| Enterprise Base Cluster SKU Limits | Values |
| ---------------------------------- | ------ |
| **Execution Limits** | - | 
| Redis limit (in GB) | 1 |
| Tasks/sec | 10 |
| Task size (KB) | 2048 |
| Tasks in workflow execution | 1000 |
| In-memory serialized workflow size (MB) | 20 |
| API calls/sec | 100 |
| API payload size (MB) (incoming and outgoing) | 2048 |
| Webhook calls received/sec | 1 |
| Webhook payload size (MB) | 2048 |
| Events received/sec | 10 |
| Events sent/sec | 10 |
| Event payload size (KB) | 2048 |
| HTTP task duration seconds | 60 |
| Maximum workflow duration (days) | Unlimited |
| Execution history uncompressed (GB) (Orkes Hosted) | 25 | 
| Execution history retention (days) (Orkes Hosted) |  7 |
| Event Task expiration upon completion (sec) | 3600 |
| Event Task expiration if not polled and executed (sec) | 86400 |
| **Definition Limits** | - | 
| Tasks defined | 1000 |
| Workflows defined | 1000 |
| Workflow versions | Unlimited | 
| Tasks in a workflow definition | 1000 |
| Tags | 0 |
| AI prompts | 0 | 
| LLM models | 0 | 
| Vector DB indexes | 0 | 
| Schedules | 5 |
| Minimum schedule interval (seconds) | 10 | 
| Event sources | 2 |
| Webhooks | 2 | 
| Service accounts | 2 |
| Users | 100 |
| User Groups | 0 | 
| Secrets | 0 | 

### Subscribing to Enterprise Base plan

To upgrade your Orkes Enterprise account from trial to the “Enterprise Base" plan:

1. From your free-trial cloud portal, click **Upgrade Plan**.

<p align="center"><img src="/content/img/upgrade-plan-orkes-cloud.png" alt="Upgrading Plan in Orkes Cloud" width="100%" height="auto"></img></p>

2. Choose the “Enterprise” subscription plan and click **Upgrade**.

<p align="center"><img src="/content/img/choosing-plan-orkes-cloud.png" alt="Choosing plan for upgrading Orkes Cloud" width="100%" height="auto"></img></p>

3. Add your card details and check out to complete the payment process.

Once the payment is completed successfully, your portal will be updated to the “Enterprise Base” plan. 

<p align="center"><img src="/content/img/updated-plan-details-orkes-cloud.png" alt="Updated plan details in Orkes Cloud portal" width="100%" height="auto"></img></p>

:::noteNotes
- Workflows using premium features in the trial won’t be runnable when subscribed to the Enterprise Base plan. 
- [Contact our sales team](https://orkes.io/talk-to-an-expert) to upgrade your Enterprise base plan to higher subscription tiers.
:::

### Enterprise Add-Ons

In addition to the features available on the Enterprise base plan, you can purchase add-ons that include additional features and upgrades to cluster sizes and number of users. 

:::note
Enterprise Add-Ons are available at a custom price depending on the types of add-ons you choose. 
:::

To purchase add-ons:

1. Click the **Upgrade Plan** button from the cloud portal.

<p align="center"><img src="/content/img/upgrade-plan-orkes-cloud.png" alt="Upgrading Plan in Orkes Cloud" width="100%" height="auto"></img></p>


2. Browse the features listed under the **Add-ons** section.
3. Click **Contact Us** and fill out the form.

<p align="center"><img src="/content/img/upgrade-plan-for-add-ons-orkes-cloud.png" alt="Upgrading plan for add-ons in Orkes Cloud" width="100%" height="auto"></img></p>

4. A request will be sent to the sales team, and you will receive an email indicating further steps.

## Managing Orkes Cloud Organization

You can manage the Orkes cloud organization settings directly from the cloud portal.

### Conductor Cluster Settings

To access the Conductor cluster details from the cloud portal:

1. Navigate to **Clusters** from the left menu.
2. View all cluster details, such as the cluster name, subscription plan, environment type, etc.

<p align="center"><img src="/content/img/cluster-settings-orkes-cloud.png" alt="Viewing Cluster settings in Orkes Cloud" width="100%" height="auto"></img></p>

3. Click **Conductor UI** to access the cluster.
4. If you are on a paid subscription plan, you can view the cluster details by clicking on the cluster name. You can view details such as URLs, status, network, persistence, application properties authentication, actions history, pods, and more.

<p align="center"><img src="/content/img/cluster-details-orkes-cloud.png" alt="Viewing Cluster details in Orkes Cloud" width="100%" height="auto"></img></p>

### Organization Settings

To access the organization settings from the cloud portal:

1. Navigate to **Organization Settings** from the left menu. Here, you will find the following tabs:

* **Info** - Displays the organization name.

<p align="center"><img src="/content/img/organization-settings-orkes-cloud.png" alt="Viewing organization settings in Orkes Cloud" width="100%" height="auto"></img></p>

* **Payments** - Allows you to update your card details.

<p align="center"><img src="/content/img/payment-settings-orkes-cloud.png" alt="Updating payment settings in Orkes Cloud" width="100%" height="auto"></img></p>

* **Users** - Enables you to add more users to the organization. Users can be assigned one of the following roles:
    - Root - Has all privileges within the cloud portal.
    - Admin - Has administrative privileges within the cloud portal.
    - User - Has limited access to the cloud portal.

<p align="center"><img src="/content/img/adding-users-orkes-cloud.png" alt="Adding users in Orkes Cloud" width="100%" height="auto"></img></p>