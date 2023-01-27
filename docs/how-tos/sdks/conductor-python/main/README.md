# Netflix Conductor SDK - Python

The `conductor-python` repository provides the client SDKs to build task workers in Python.

Building the task workers in Python mainly consists of the following steps:

1. Setup conductor-python package
2. Create and run task workers
3. Create workflows using code

## Setup Conductor Python Package​

* Create a virtual environment to build your package
```shell
virtualenv conductor
source conductor/bin/activate
```

* Get Conductor Python SDK
```shell
python3 -m pip install conductor-python
```

### Server Settings
Everything related to server settings should be done within the `Configuration` class by setting the required parameter (when initializing an object) like this:

```python
configuration = Configuration(
    server_api_url='https://play.orkes.io/api',
    debug=True
)
```

* server_api_url : Conductor server address. For example, if you are running locally, it would look like; `http://localhost:8000/api`.
* debug: It can take the values true/false. `true` for verbose logging `false` to display only the errors

### Authentication Settings (Optional)
Configure the authentication settings if your Conductor server requires authentication.

### Access Control Setup
See [Access Control](https://orkes.io/content/docs/getting-started/concepts/access-control) for more details on role-based access control with Conductor and generating API keys for your environment.

```python
configuration = Configuration(
    authentication_settings=AuthenticationSettings(
        key_id='key',
        key_secret='secret'
    )
)
```

### Metrics Settings (Optional)
Conductor uses [Prometheus](https://prometheus.io/) to collect metrics.

```python
metrics_settings = MetricsSettings(
    directory='/path/to/folder',
    file_name='metrics_file_name.extension',
    update_interval=0.1,
)
```

* `directory`: Directory to store the metrics.
  * Ensure that you have already created this folder, or the program should have permission to create it for you.
* `file_name`: File where the metrics are stored.
  * example: `metrics.log`
* `update_interval`: Time interval in seconds to refresh metrics into the file.
  * example: `0.1` means metrics are updated every  0.1s or 100ms.

## Create and Run Task Workers

The next step is to [create and run task workers](https://github.com/conductor-sdk/conductor-python/tree/main/docs/worker).

## Create Workflows using Code

Finally, you can [create workflows using code](https://github.com/conductor-sdk/conductor-python/tree/main/docs/workflow).
