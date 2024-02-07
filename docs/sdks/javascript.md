
# Orkes Conductor Javascript SDK

Orkes Conductor Javascript SDK is maintained here: https://github.com/conductor-sdk/conductor-javascript

## Get Conductor Javascript SDK

### Yarn

```shell
yarn add @io-orkes/conductor-javascript
```

### NPM

```shell
npm install --save @io-orkes/conductor-javascript
```

## Initialization

```javascript

    import {
      orkesConductorClient,
    } from "@io-orkes/conductor-javascript";

    export const config = {
      serverUrl: `${process.env.SERVER_URL}`,
    };

    (async () => {
      const clientPromise = orkesConductorClient(config);
      const client = await clientPromise;
    })();

```

### Authentication Settings (optional)

See [Security via Applications](/content/access-control-and-security/applications#generating-access-keys) or this [video](/content/how-to-videos/access-key-and-secret) for details on how to get an access key and secret.

Once we have a key and secret, we can configure the app from properties or environment variables, as shown in this example:

```javascript

    export const config = {
      keyId: process.env.KEY,
      keySecret:process.env.SECRET,
      serverUrl: `${process.env.SERVER_URL}`,
    };

    (async () => {
      const clientPromise = orkesConductorClient(playConfig);
      const client = await clientPromise;
    })();

```

Remember to protect your app secrets like any other secrets or passwords.

## Related Topics

- Video Guide on [Getting Access Key and Secret](/content/how-to-videos/access-key-and-secret)
- [Access Control & Security](/content/category/access-control-and-security)
- [NextJS Example](https://github.com/orkes-io/conductor-nextjs-example/tree/main)

