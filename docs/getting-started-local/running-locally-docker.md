---
sidebar_position: 2
---

# Running Locally - Docker Compose

In this article we will explore how you can set up Netflix Conductor on your local machine for trying out some of its
features.

This article follows the quickest way to set up your local development instance of Conductor. In comparison to the
previous article, we will be using Docker Compose which simplifies all required steps into a smaller set.

After completing the steps in this article, you will have:

> A local instance of Netflix Conductor API server running

> Have the UI spun up against the API server with the ability to search


### Prerequisites

1. Install Docker desktop: [https://docs.docker.com/desktop/](https://docs.docker.com/desktop/)


### Important Notes

1. This will only work in an Intel or x86 based chip. If you are using a Mac M1 or arm64 based CPU, you might run into
   issues loading up the Elasticsearch. This is because the image that is referred by docker compose is x86 based and at
   the time of writing this article, the default ES version is 6.8.x. There is no known image for arm64 for
   Elasticsearch 6.8.x. You can upgrade to ES 7 and solve this but that requires additional steps.

2. You will need a reasonable about of RAM to run everything locally. Recommended minimum is 16 GB.

### Steps

#### 1. Clone the Conductor Code

```shell
$ git clone https://github.com/Netflix/conductor.git
Cloning into 'conductor'...
remote: Enumerating objects: 53328, done.
remote: Counting objects: 100% (1555/1555), done.
remote: Compressing objects: 100% (1032/1032), done.
remote: Total 53328 (delta 298), reused 1351 (delta 206), pack-reused 51773
Receiving objects: 100% (53328/53328), 20.53 MiB | 9.50 MiB/s, done.
Resolving deltas: 100% (20544/20544), done.
```

#### 2. Build the Docker Compose

```shell
$ cd conductor
conductor $ cd docker
docker $ docker-compose build
```

#### 3. Run Docker Compose

```shell
docker $ docker-compose up
```

Once up and running, you will see the following in your Docker dashboard:

![Conductor Docker Compose](/img/tutorial/dockerHome.png)

You will see three containers:

1. Elasticsearch
2. Conductor UI
3. Conductor Server

You can access all three on your browser to verify that it is running correctly:

Conductor Server URL: [http://localhost:8080/](http://localhost:8080/)

![Conductor Server Home Page](/img/tutorial/conductorHome.png)

Conductor UI URL: [http://localhost:5000/](http://localhost:5000/)

![Conductor Server Home Page](/img/tutorial/conductorUIHome.png)

Note that the developer console is enabled by default when running locally. You can dismiss it as shown in the image
above.

Elasticsearch URL: [http://localhost:9200/](http://localhost:9200/)

![Conductor Elasticsearch Console](/img/tutorial/elasticSearchHome.png)

Awesome! You now have a working version of Conductor on your local which includes the search functionality.

This documentation is also available
at: [Netflix Conductor Github - Docker](https://github.com/Netflix/conductor/tree/main/docker)

### Potential problems

1. Not enough memory
    1. You will need at least 16 GB of memory to run everything. You can modify the docker compose to skip using
       Elasticsearch if you have no option to run this with your memory options.
    2. To disable Elasticsearch using Docker Compose - follow the steps listed here: **TODO LINK**
2. Elasticsearch fails to come up in arm64 based CPU machines
    1. As of writing this article, Conductor relies on 6.8.x version of Elasticsearch. This version doesn't have an
       arm64 based Docker image. You will need to use Elasticsearch 7.x which requires a bit of customization to get up
       and running
    2. You can find the instructions here - **TODO LINK**
3. Elasticsearch remains in Yellow health
    1. When you run Elasticsearch, sometimes the health remains in Yellow state. Conductor server by default requires
       Green state to run when indexing is enabled. To work around this, you can use the following property: 
       `conductor.elasticsearch.clusteHealthColor=yellow` Reference: [Issue 2262](https://github.com/Netflix/conductor/issues/2262)

