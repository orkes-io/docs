---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get/Install Orkes Conductor

<details open><summary>Use Conductor Playground</summary>
<p>

[Playground](https://play.orkes.io/) is the easiest way to get started on Orkes Conductor.


Using Playground requires __authorization__ keys which you can generate quickly by following the steps below:

1. Login to [https://play.orkes.io/](https://play.orkes.io/) - you can bookmark this URL for easy access.
2. Navigate to __Applications__ from the left menu.
3. Click __Create Application__ button to create a new application and provide a name.
4. Open the newly created application and enable Worker, Metadata API, and Application API permissions.
5. Click __Create Access Key__ to create the KEY and SECRET.  A dialog box opens with the newly generated Key and Secret. 

__Important__: Copy and store the Key and Secret in a safe location, as it is never displayed again.

Watch how we can login to Orkes Conductor Playground UI.

<center>
<iframe width="510" height="300" src="https://www.youtube.com/embed/tVUaDtoKNgE?si=lBctmC1SeuIr0xtL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe>
</center>

#### Setup environment variables
```shell
export KEY=<Your KEY>
export SECRET=<Your SECRET>
export CONDUCTOR_SERVER_URL=https://play.orkes.io/api
```

You can generate another pair for your testing if you lose access to your key/secret pair.

</p>
</details>

<details><summary>Install and Run Locally</summary>
<p>

##### Pre-requisites: `Docker` should be installed.
Run the following command on the Unix, Linux or Mac OSX to download the container and start.
```shell
curl https://raw.githubusercontent.com/orkes-io/orkes-conductor-community/main/scripts/run_local.sh | sh
```

Alternatively, you can also run the container command explicitly:
```shell
docker run --init -p 8080:8080 -p 1234:5000 --mount source=redis,target=/redis \
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-community-standalone:latest
```

Note the target folders for Redis and Postgres data. You can empty these if you want to reset your local installation.

<br/>

#### Setup environment variables
```shell
export CONDUCTOR_SERVER_URL=http://localhost:8080/api
```

</p>
</details>

<details><summary>Install & Run Orkes Enterprise Edition Locally</summary>
<p>

Orkes publishes containers to [DockerHub](https://hub.docker.com/) under [orkesio](https://hub.docker.com/orgs/orkesio/repositories) organization.

## Orkes Cloud Build for Local Development and Testing

Available to the users of Orkes Cloud, with all the Orkes cloud features on your local machine. Requires subscription to Orkes Cloud.

Orkes publishes *orkes-conductor-standalone* docker container that can be used for local development and testing.

The container is self-contained with the full Orkes development stack that contains a persistent store, Orkes server, and system workers.

:::note
The standalone container is only meant for local development and is not suitable for running any production workload.

*orkes-conductor-standalone* is available to the Orkes Customers and needs an authorization token to download the container.
:::


### Obtaining Authorization Token​

Please reach out to your Orkes contact to obtain the token.

### Download and Run the Container​

Log in to the Docker Hub using Orkes Access Account. When prompted for the password, use the access token provided by the Orkes team.
:::note
* If you do not have an access token (or have lost it), please contact support@orkes.io to issue a new one.
* Standard security measures should be used within the organization when storing and distributing the access token.
:::

#### Download and Run the Latest Container Build​

```shell
export orkes_access_key=<ACCESS_KEY_PROVIDED_BY_ORKES>
echo $orkes_access_key | docker login --username orkesdocker --password-stdin

# Create volumes for persistent stores
docker volume create postgres
docker volume create redis

# Download and start the container
docker run -i -p 8080:8080 -p 3000:5000 --mount source=redis,target=/redis \
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-standalone:latest
```

#### Access Conductor UI

Navigate to [http://localhost:3000](http://localhost:3000).

#### Access Swagger API Documentation

[http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/).

</p>
</details>
