# Authentication and Access Keys

Authentication is required for programmatic access to Conductor SDKs and APIs. Every connection to Orkes Conductor requires an authorization header with a valid JSON Web Token (JWT).

The JWTs are created using access keys. In Orkes Conductor, the access keys are application-based, so each project can use a different access key, which can be generated and retrieved from Conductor.

When using the Conductor SDKs, the authentication is handled automatically. Alternatively, you can also create a JWT using an API call.

:::note
Authentication does not grant full access to all the resources in your Conductor cluster. Since programmatic access to resources is also application-based, ensure that your application is configured with the appropriate roles and permissions before you start using the SDK or API. Learn more about application permissions in [Access Control and Security](docs/access-control-and-security/index).
:::


## Retrieving access keys​​

Access keys are required to create a valid JWT. Before retrieving your access key, you must first create an application in Orkes Conductor.

<details><summary>To create an application</summary>

1. In the left navigation menu, go to **Access Control** > **Applications**.
2. Select **(+) Create application**.
3. Enter the application name.
4. Select **Save**.
    <br/>The application has been created. You can proceed to retrieve an access key.

Learn more about applications in [Managing Applications](docs/access-control-and-security/applications.md).

</details>


**To retrieve the access key:**
1. In the left navigation menu, go to **Access Control** > **Applications**.
2. Select the application name or the **Edit** icon located next to the application name.
3. In the Access Keys section, select **(+) Create access key** to generate a unique Key Id and Key Secret.
 <br/>The Key Secret is shown only once, so make sure to copy and store it securely.


Once the access key has been created, you can perform the following actions on the key:
* **Copy**—Copy the key ID.
* **Pause**—Temporarily restrict access to the application.
* **Delete**—Permanently delete the key.

<center><iframe width="510" height="300" src="https://www.youtube.com/embed/f1b5vZRKn2Q?si=bIzOcN2tRbXD28Hq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></center>


## API authentication

Use the application key and secret to call `/api/token`, which retrieves a JWT token that provides authentication for Conductor API.

**Example - Request**


``` shell
curl -X 'POST' \
  'https://<YOUR_CLUSTER_URL>/api/token' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "keyId": "<YOUR_KEYID>",
    "keySecret": "<YOUR_SECRET>"
  }'
```


**Example - Response**


``` shell
{
  "token": "<YOUR_JWT>"
}
```


Use the JWT token in the X-Authorization header for all your API calls.

**Example**


``` shell
// API call to a workflow called super_weather

curl -X "POST" "https://play.orkes.io/api/workflow/super_weather" \
  -H 'Content-Type: application/json; charset=utf-8'  \
  -H 'X-Authorization:  <YOUR_JWT>'\
  -d '{
    "zip": "90210"
  }'
```



## SDK authentication

To start using Conductor SDK in your project, set the application key and secret in your project’s environment variables.

**Example**


```
export CONDUCTOR_AUTH_KEY=your_key
export CONDUCTOR_AUTH_SECRET=your_key_secret
```



## Quick access for prototyping​​

For quick testing on Orkes Conductor without creating an application, you can obtain a user-based JWT token. This token remains valid for your current session and has the same access as your user account.

:::warning
This token should never be used in a production setting.
:::

**To retrieve the user-based JWT token:**

In the bottom left corner of the screen, select **Copy Token**. 

<p align="center"><img src="/content/img/SDKs/authentication-copying_token.png" alt="Copying user-based token in Orkes Platform" width="80%" height="auto"></img></p>