---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Signed JWT

The Get Signed JWT task is used to sign a JWT (JSON Web Token).

Using the RS256 algorithm, the task ensures robust cryptographic security during JWT signing. The resulting token effectively encapsulates specified authorization scopes and incorporates a TTL (time-to-live) mechanism to enforce its expiration, thereby maintaining secure access control.

## Task configuration

Configure these parameters for the Get Signed JWT task.

| Parameter | Description | Required/Optional | 
| --------- | ----------- | ----------------- |
| inputParameters.**subject** | The subject of the JWT, typically representing the entity (e.g., user or service) for which the token is issued. | Required. | 
| inputParameters.**issuer** | The entity issuing the JWT, identifying who created and signed the token. | Required. | 
| inputParameters.**privateKey** | The private key used to sign the JWT. | Required. | 
| inputParameters.**privateKeyId** | The identifier for the private key used to sign the JWT. | Required. |
| inputParameters.**audience** | The intended recipient(s) of the JWT. | Required. | 
| inputParameters.**ttlInSeconds** | The time-to-live (TTL) or expiration time of the JWT, specified in seconds. | Required. |
| inputParameters.**scopes** | The scopes associated with the JWT, defining the access permissions granted by the token. It can be a string or an array of strings. | Required. |
| inputParameters.**algorithm** | The signing algorithm to use for the JWT. Currently set to RS256, which refers to the RSA signature with the SHA-256 hash algorithm. | Required. | 

## Task definition

This is the JSON schema for a Get Signed JWT task definition.

```json
{
  "name": "get_signed_jwt",
  "taskReferenceName": "get_signed_jwt_ref",
  "inputParameters": {
    "subject": "${workflow.input.subject}",
    "issuer": "${workflow.input.issuer}",
    "privateKey": "${workflow.secrets.jwt-privatekey}",
    "privateKeyId": "key-123",
    "audience": "${workflow.input.audience}",
    "ttlInSeconds": 3600,
    "scopes": "${workflow.input.scope}",
    "algorithm": "RS256"
  },
  "type": "GET_SIGNED_JWT"
}
```

## Adding a Get Signed JWT task in UI

**To add a Get Signed JWT task:**

1. In your workflow, select the (**+**) icon and add a **Get Signed JWT** task.
2. Enter the **Subject** and **Issuer** of the JWT.
3. Provide the **PrivateKey** and **PrivateKeyId** used for signing JWT.
4. Set the **Audience**, **TTL (in seconds)**, **Scopes**, and **Algorithm** as required.

<center><p><img src="/content/img/get-signed-jwt-ui.png" alt="Adding Get Signed JWT task" width="80%" height="auto"/></p></center>