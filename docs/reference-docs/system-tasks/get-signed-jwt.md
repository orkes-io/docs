---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get Signed JWT

A system task that allows signing a JWT token.

## Definitions

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
       "ttlInSecond": 3600,
       "scopes": "${workflow.input.scope}",
       "algorithm": "RS256"
     },
     "type": "GET_SIGNED_JWT"
   }
```

### Input Parameters

| Attribute | Description |
| --------- | ----------- |
| subject | The subject of the JWT. Often represents the entity (e.g., user or service) for which the token is issued. |
| issuer | The issuer of the JWT, identifying who created and signed the token. | 
| privateKey | The private key used to sign the JWT. | 
| privateKeyId | An identifier for the private key used to sign the JWT. |
| audience | The intended recipient(s) of the JWT. |
| ttlInSeconds | The time-to-live (TTL) or expiration time of the JWT, specified in seconds. |
| scopes | The scopes associated with the JWT. It defines the access permissions for the token grants. |
| algorithm | The signing algorithm to use for the JWT. Currently, it's set to RS256, which refers to the RSA signature with the SHA-256 hash algorithm. | 

## Examples

<Tabs>
<TabItem value="UI" label="UI" className="paddedContent">

<div className="row">
<div className="col col--4">

<br/>
<br/>

1. Add task type **Get Signed JWT**.
2. Configure the input parameters.

</div>
<div className="col">
<div className="embed-loom-video">

<p><img src="/content/img/get-signed-jwt-ui.png" alt="Get Signed JWT task UI method" width="1024" height="auto"/></p>

</div>
</div>
</div>



</TabItem>
 <TabItem value="JSON" label="JSON">

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
       "ttlInSecond": 3600,
       "scopes": "${workflow.input.scope}",
       "algorithm": "RS256"
     },
     "type": "GET_SIGNED_JWT"
   }
```

</TabItem>
</Tabs>