import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using Secrets in a Workflow

You may often be required to use sensitive values that shouldn’t be exposed, like usernames, passwords, API keys, authorization tokens, etc. Using such values directly in the workflow can end up with your private keys being opened up to vulnerabilities.

With Conductor, you can save these values as Secrets and then use them in your workflow without exposing the actual values.

## Creating Secrets

To create a secret, you can use the API, or you can use the Orkes Dashboard.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/O_Ngo1Gg2Co" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

<Tabs groupId="code" values={[
{label: 'Orkes Dashboard', value: 'orkes'},
{label: 'API', value: 'api'},
]}>

<TabItem value="orkes">

Follow the below steps to create and store secrets in Conductor:

1. From your Orkes Console, navigate to the **Secrets** option from the left menu. The **Secrets** page lists all the secrets associated with your account.

<p align="center"><img src="/content/img/secrets_dashboard.jpg" alt="the Orkes Cloud Secrets dashboard" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>

2. Click **Add Secrets** and provide the following values:<ul><li>**Secret Name** - Provide a name to store your secret.</li>
<li><b>Secret Value</b> - Copy and paste the required value to be stored as secret.</li></ul>
3. Clicking **Add** saves the secret to your Conductor console.

## Viewing/Editing/Deleting Secrets

- **View** - Once you have created your secret, click on the eye icon next to the secret name to view the secret key.
- **Edit** - Click the pencil icon next to the secret name to edit and replace the secret key.
- **Delete** - Click the trash icon next to the secret name to delete redundant keys.

## Using Secrets in Workflow

Once the secret is created, you can use them in the workflow using the variable `${workflow.secrets.secret_name}`.

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/yC4kOEHFfqE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

</TabItem>
<TabItem value="api">

Each secret must have a unique key for your Conductor instance. The first step in creating a secret key:value pair is to ensure that the key is not in use.

## Check key usage

The endpoint to check for key existence is `api/secrets/{key}/exists`.

> Note: Here's how to quickly get an [Orkes Access Token](/content/docs/getting-started/concepts/access-control-applications#prototyping), and here's the [programmatic way to get an Access Token](/content/docs/getting-started/concepts/access-control-applications#generating-a-token)

If the key for the secret is to be `pinetree`, you could use curl to do the following:

```curl
curl -X GET "https://play.orkes.io/api/secrets/pinetree/exists" \
-H  "accept: application/json" \
-H  "X-Authorization: <access_token>"
```

In this case, the response comes back

```
false
```

As this key is not in use, we can now create a secret with the key pinetree. This uses a `PUT` to the endpoint `api/secrets/{key}`

```curl
curl -X PUT "https://play.orkes.io/api/secrets/pinetree" \
-H  "accept: application/json" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d "needles"
```

This creates the secret key:value pair of `pinetree:needle`. The only response to the API is HTTP 200.

</TabItem>
</Tabs>

## Adding Tags to Secrets

Conductor also provides the provision to add tags to secret keys. This helps in quickly sharing the secret to a group/application.

### Enabling Permissions for Secrets via Groups

If a secret is to be shared among a User Group in Conductor,

1. Add the required tag in the format **key:value** to the secret.
2. Navigate to **ACCESS CONTROL** > **Groups** and click the edit icon near your group name.
3. From the **Workflow and Task Permissions** section, click **+Add Permission**.
4. Choose the **Target Type** as **Tag**, and choose your tag with the required permissions. You can select from READ, UPDATE, CREATE, EXECUTE & DELETE permissions.
5. Clicking **Add Permissions** adds the tag to the group, thus enabling permission to all group members.

## Enabling Permissions for Secrets via Applications

<Tabs groupId="code" values={[
{label: 'Orkes Dashboard', value: 'orkes'},
{label: 'API', value: 'api'},
]}>

<TabItem value="api">

The endpoint is `/api/auth/authorization`.

Using the Playground and Curl, the command looks like:

```shell
curl -X POST "https://play.orkes.io/api/auth/authorization" \
-H  "accept: application/json" \
-H  "X-Authorization: <access_token>" \
-H  "Content-Type: application/json" \
-d '{"subject":
        {"type":"user",
        "id":"app:orkes-workers"},
    "target":
        {"type":"SECRET_NAME",
        "id":"post_office_username"},
    "access":["READ"]}'
```

Note that the type is `SECRET_NAME`.

In this call, we give the application `orkes-workers` `READ` access to our `post_office_username` secret.
</TabItem>
<TabItem value="orkes">

If a workflow uses a Secret, we need to add access control permissions for the application to access the secret.

1. Add the required tag in the format **key:value** to the secret.
2. Navigate to **ACCESS CONTROL** > **Applications** and click the edit icon near your app name.
3. Scroll down to the **Workflow and Task Permissions** section, and click **+Add Permission**.
4. Choose the **Target Type** as **Tag**, and choose your tag with the required permissions. You can select from READ, UPDATE, CREATE, EXECUTE & DELETE permissions.
5. Clicking **Add Permissions** adds the tag to the group, thus enabling permission to the application.

</TabItem>
</Tabs>

## Example

The US Postal Service offers APIs to help automate the shipping process with the post office. Each API call requires a UserId to be submitted. This UserId can be used to buy postage, so it needs to be kept secure. We've created a secret called `post_office_username` that we can now use in all API calls. (This workflow can be found in the [Conductor Examples](https://github.com/conductor-sdk/conductor-examples) Github repository.):

```shell
https://production.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=<RateV4Request \
// highlight-next-line
USERID=${workflow.secrets.post_office_username}> \
<Revision>2</Revision> \
<Package ID="0"><Service>priority</Service> \
<ZipOrigination>04046</ZipOrigination> \
<ZipDestination>98260</ZipDestination> \
<Pounds>20</Pounds> \
<Ounces>0</Ounces> \
<Container>variable</Container> \
<Width>12</Width> \
<Length>12</Length> \
<Height>12</Height> \
<Girth></Girth> \
<Machinable>TRUE</Machinable> \
</Package></RateV4Request>
```

By using `${workflow.secrets.post_office_username}`, we obfuscate this sensitive value, and it never appears in the workflow execution, or any output files of Conductor. Yet, we can connect with the USPS and obtain the postage price for our package ($82.10, in case you're wondering).
