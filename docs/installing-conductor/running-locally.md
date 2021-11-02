---
sidebar_position: 1
---

# Running From Code

In this article we will explore how you can set up Netflix Conductor on your local machine for trying out some of its
features.

After following the steps listed in this article, you will be able to have:

1. A local instance of Netflix Conductor API server running
2. Have the UI spun up against the API server without the ability to search

Ok, you might ask, why not the ability to search? For enabling search we will need an additional installation step which is
basically to set up an Elasticsearch instance. Our next article shows you how to do this.

You can find that here: `TODO - Add Link`

In this article, we will taking the option of building and running from the codebase. We are doing this so that you can
also see the codebase that conductor runs from. In the follow up to this blog here, we will review another option of
running Conductor locally with the support of UI search functionality.

## Prerequisites

1. You will need JDK installed in your local machine
    1. You can run this off the latest version of JDK, we tried the steps in this blog using JDK 13
2. If you want to build the code base with tests, you will also need Docker installed: https://docs.docker.com/desktop/

## Steps to Running Conductor

### 1. Clone the Netflix Conductor repository

Clone conductor code from the repo: https://github.com/Netflix/conductor

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

### 2. Compile and run Server

Let’s run the gradle command to run the Conductor Server. You don't have to install gradle, it comes with the code
repository. Assuming you ran the clone command, first change directory into the `conductor` directory as shown below:

```shell
$ cd conductor
conductor $ cd server
server $ ../gradlew bootRun
```

If you are running this for the first time, it will take a minute or two but soon you will see something like this in
the console:

![Conductor Console](/img/tutorial/conductorConsole.png)

Once you see something like this in your log, your server is up and ready to serve requests.

```shell
com.netflix.conductor.Conductor [] - Started Conductor in 5.912 seconds (JVM running for 6.953)
```

Conductor Server ships with a basic page which also has a link to the Swagger API browser. Head over to the default
URL: [http://localhost:8080/](http://localhost:8080/)

![Conductor Server Home Page](/img/tutorial/conductorHome.png)

**Congrats** you have your API server up and running. Click on the Swagger Documentation to browse all the APIs from
Conductor

### 3. Running the UI

Since we are running from the code, you will also need to spin up the UI. The UI module is designed to be plug and play
and conductor repository comes with a default UI. Let's get that up and running.

To run the UI locally, you will need to install a few dependencies. The UI code base is written Node.JS so let’s install
that using instructions [here](https://nodejs.org/en/download/package-manager/)

```shell
$ node --version
V16.6.1
```

Next you will need to install yarn using the
instructions [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable).

```shell
$ yarn --version
1.22.10
```

Once you have install node and yarn, you can go do the directory and perform an install

```shell
$ cd conductor/ui
ui $ yarn install
```

This will take a couple of mins, and it should run successfully. And then you can use the following command to start the
UI:

```shell
ui $ yarn run start
```

Once running you will see the link to access this in your console. When running in this way - it starts in a development
mode include a ReactJS console. You can close this.

```shell
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:5000

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Click on the [link](http://localhost:5000) to open the UI

![Conductor Server Home Page](/img/tutorial/conductorUI.png)


> Congrats! You have successfully installed a fully working version of Conductor Server and UI on your local.

* By default the UI will connect with the API server on 8080 port, if you need to change this port for any reason you
  have to edit the configuration files to do so
* The UI will not have search capabilities as it requires Indexing via Elasticsearch. You can refer to the follow up
  blog post here on how to use a local Elasticsearch instance to see the power of search functionality
* All the data is stored in memory, so if you restart the services you will lose all the data. We will be publishing
  guides on how to set up a persisted data store on your local shortly. Look out for it!

## Summary

In this blog post — we learned how to install Conductor locally including the UI in less than a few minutes.

Concepts we touched on:

1. Running the Conductor API server locally
2. Running the Conductor UI server locally without the search indexing functionality

Thank you for reading, and we hope you found this helpful. Please feel free to reach out to us for any questions, we
are happy to help in any way we can. You can use the GitHub discussions, or our Slack to chat with us.
