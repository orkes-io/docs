# Running Conductor in 5 Minutes
You will need JDK installed in your local machine


## 1. Clone the Netflix Conductor repository

```shell
$ git clone https://github.com/Netflix/conductor.git
```

## 2. Build and run server

```shell
$ cd conductor
conductor $ cd server
server $ ../gradlew bootRun
```
![Conductor Console](/img/tutorial/conductorConsole.png)

```shell
com.netflix.conductor.Conductor [] - Started Conductor in 5.912 seconds (JVM running for 6.953)
```

Navigate to the server URL: [http://localhost:8080/](http://localhost:8080/)

![Conductor Server Home Page](/img/tutorial/conductorHome.png)

## 3. Launch UI
Building UI requires `node` and `yarn` to be installed.  Download them if required:
1. https://nodejs.org/en/download/
2. https://classic.yarnpkg.com/lang/en/docs/install/

Once downloaded, build and install UI

```shell
$ cd conductor/ui
yarn install
yarn run start
```

Navigate to [http://localhost:5000](http://localhost:5000) to open the UI

<img src="/docs/img/tutorial/conductorUI.png" width="300" height="200"/>


> Congrats! You have successfully installed a fully working version of Conductor Server and UI on your local.

* By default the UI will connect with the API server on 8080 port, if you need to change this port for any reason you
  have to edit the configuration files to do so
* All the data is stored in memory, so if you restart the services you will lose all the data. We will be publishing
  guides on how to set up a persisted data store on your local shortly. Look out for it!