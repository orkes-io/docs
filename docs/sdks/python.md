
# Orkes Conductor Python SDK

Orkes Conductor Python SDK is maintained here: https://github.com/conductor-sdk/conductor-python

## Get Conductor Python SDK

```shell
python3 -m pip install conductor-python
```

## Initialization

Everything related to server settings should be done within the `Configuration` class by setting the required parameter (when initializing an object) like this:

```python
configuration = Configuration(
    server_api_url='https://play.orkes.io/api',
    debug=True
)
```

* server_api_url: Conductor server address. If you are running the server locally on port `8080`, this would be `http://localhost:8080/api`
* debug: `true` for verbose logging `false` to display only the errors

### Authentication Settings (optional)

See [Security via Applications](/content/access-control-and-security/applications#generating-access-keys) or this [video](/content/how-to-videos/access-key-and-secret) for details on how to get an access key and secret.

Once we have a key and secret, we can configure the app from properties or environment variables, as shown in this example:

```python
configuration = Configuration(
    authentication_settings=AuthenticationSettings(
        key_id='key',
        key_secret='secret'
    )
)
```

Remember to protect your app secrets like any other secrets or passwords.

## Related Topics

- Video Guide on [Getting Access Key and Secret](/content/how-to-videos/access-key-and-secret)
- [Access Control & Security](/content/category/access-control-and-security)

