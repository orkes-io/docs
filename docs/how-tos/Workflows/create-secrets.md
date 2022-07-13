import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Secrets

Many applications require the use of sensitive values that should be protected from exposure.  Items like usernames, passworkds, API keys etc. are all sensitive values that should not be kept in a workflow (that might end up on GitHub or another public site.)

Just as GitHub has the concept of `secrets`, so does Orkes Conductor.Now you can define your variables in a secure and safe way, knowing that they will not be exposed in the workflow, or shared with other teammates.

## Creating a secret

We'll walk through a few approaches to create a secret, and then examples of implementing a secret.  To create a secret, you can use the API or you can use the Orkes Dashboard.  

<Tabs groupId="code" values={[
        {label: 'API', value: 'api'},
        {label: 'Orkes Dashboard', value: 'orkes'},
    ]}>
  
<TabItem value="api">

 Each secret must have a unique key for your Conductor instance.  The first step in creating a secret key:value pair is to ensure that the key is not in use.

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

This creates the secret key:value pair of ```pinetree:needle```.  The only response to the API is HTTP 200.



</TabItem>
<TabItem value="orkes">
The Orkes Dashboard allows you to create secret key:value pairs via the UI.

1. Login to your Orkes Cloud dashboard
2. Click "Workflow Definitions."
3. Click the "Manage Secrets" button at the top of the page.

Or you can simply navigate to the url `secrets` in your Orkes Cloud dashboard. 

## Secrets UI

The Secrets dashboard lists all of the secrets connected to your account:
<p align="center"><img src="/content/img/secrets_dashboard.jpg" alt="the Orkes Cloud Secrets dashboard" width="700" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Clicking the "eye" icon next the secret will expose the secret's value and also gives you the options to change the secret value, or delete the secret altogether.

To add a secret click the `Add Secret` button at the top.  Add your Key:value and click the `Add` button.  If you receive an error, it is likely because the key is already in use, so simply select a different key.
  
</TabItem>

</Tabs>

## Example

The US Postal Service offers APIs to help automate the shipping process with the post office.  Each API call requires a UserId to be submitted.  This UserId can be used to buy postage, so it needs to be kept secure.

In the following API call, we're not buying postage, but just getting the shipping rate for a package. (This workflow can be found is the [Conductor Examples](https://github.com/conductor-sdk/conductor-examples) github repository.  The API call to the post office is a bit messy, but in the request, we must include the username (line two in the example below):

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
By using `${workflow.secrets.post_office_username}`, we obfuscate this sensitive value, and it never appears in the workflow execution, or in any output files of Conductor, yet we are able to connect with the USPS, and obtain the postage price for our package ($82.10, in case you're wondering).


## Permissions

If the task using the Secret utilizes a worker, we need to add permissions for the worker to access the secret (just as an [application gives access to a workflow or task](/content/docs/getting-started/concepts/access-control-applications)).

There is not UI to add a secret permission, but the API does work.  The endpoint is `/api/auth/authorization`.

Using the Playground and Curl, the command looks like 

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

In this call, we are give the application `orkes-workers` `READ` access to our `post_office_username` secret.

