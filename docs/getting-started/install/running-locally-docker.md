---
sidebar_position: 2
---

# Orkes Published Docker Containers

Orkes publishes containers to [DockerHub](https://hub.docker.com/) under [orkesio](https://hub.docker.com/orgs/orkesio/repositories) organization.

## Orkes Cloud Build for Local development and testing
Available to the users of Orkes Cloud, with all the features of Orkes cloud on your local machine!  (Requires subscription to Orkes Cloud)
Orkes publishes *orkes-conductor-standalone* docker container that can be used for local development and testing.

The container is self-contained with full orkes development stack that contains persistent store, Orkes server and system workers.

> **Note**
> The standalone container is only meant for the local development and is not suitable for running any production workload
>
> *orkes-conductor-standalone* is available to the Orkes Customers and needs an authorization token to download the container.


### Obtaining the authorization token
Please reach out to your Orkes contact for obtaining the token.

### Download and run the container
Login to the Docker Hub using Orkes Access Account. When prompted for the password, use the access token provided by the Orkes team.
> **Note**
> If you do not have access token (or have lost it), please contact support@orkes.io to issue a new one
>
> Standard security measures should be used within the organization when storing and distributing the access token.
>
>
#### Download and run the latest container build

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

###### Access Conductor UI

Navigate to [http://localhost:3000](http://localhost:3000)

###### Access Swagger API Documentation

[http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/](http://localhost:8080/swagger-ui/index.html?configUrl=/api-docs/swagger-config#/)
