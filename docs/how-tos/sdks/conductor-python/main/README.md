# Netflix Conductor SDK

`conductor-python` repository provides the client SDKs to build Task Workers in Python

## Quick Start

1. [Setup conductor-python package](#Setup-conductor-python-package)
2. [Create and run Task Workers](docs/worker/README.md)
3. [Create workflows using Code](docs/workflow/README.md)

### Setup conductor python package

Create a virtual environment to build your package:
```shell
virtualenv conductor
source conductor/bin/activate
```

Get Conductor Python SDK
```shell
python3 -m pip install conductor-python
```

### Server settings
Everything related to server settings should be done within `Configuration` class, by setting the required parameter when initializing an object, like this:

```python
configuration = Configuration(
    server_api_url='https://play.orkes.io/api',
    debug=True
)
```

* server_api_url : Conductor server address.  e.g. `http://localhost:8000/api` if running locally 
* debug: `true` for verbose logging `false` to display only the errors

#### Authentication settings (optional)
Use if your conductor server requires authentication.

##### Access Control Setup
See [Access Control](https://orkes.io/content/docs/getting-started/concepts/access-control) for more details on role based access control with Conductor and generating API keys for your environment.

```python
configuration = Configuration(
    authentication_settings=AuthenticationSettings(
        key_id='key',
        key_secret='secret'
    )
)
```

### Metrics settings (optional)
Conductor uses [Prometheus](https://prometheus.io/) to collect metrics.

```python
metrics_settings = MetricsSettings(
    directory='/path/to/folder',
    file_name='metrics_file_name.extension',
    update_interval=0.1,
)
```

* `directory`: Directory where to store the metrics
  * make sure that you have created this folder before, or the program have permission to create it for you
* `file_name`: File where the metrics are stored
  * example: `metrics.log`
* `update_interval`: Time interval in seconds to refresh metrics into the file 
  * example: `0.1` means metrics are updated every 0.1s, or 100ms

### Next: [Create and run Task Workers](docs/worker/README.md)
