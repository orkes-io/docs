---
sidebar_position: 2
---

# Orkes Published Docker Containers

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
