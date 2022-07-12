# DataDog Integration

Conductor has a wealth of metrics that can be used to monitor the server.  If you are already using Datadog, you might just want to integrate these metrics into your DataDog instance.  Read on to learn how!


## Conductor integration

There is a Datadog integration in the [Conductor Community](https://github.com/Netflix/conductor-community) version of Conductor, so this guide will walk through migrating this integration into the Open Source version of Conductor.

## Setting up DataDog

We'll start with the assumption that Conductor is currently running on your system.  If not, clone the GitHub repository and get it [running locally](/content/docs/getting-started/install/running-locally).  

1. First, we will add the metrics dependency to the `server/build.gradle` file.  

```java
     implementation 'com.netflix.conductor:conductor-metrics:3.10.0'
```
2. Update the `application.properties` file with the datadog parameters.  This can be found in `server/src/main/resources`.  There are already a few Datadog entries here, but let's just fully replace then with the following:


```shell
#turn on the metrics
management.metrics.export.datadog.enabled=true
# Check the url of your datadog instance. By default they are sent tp https://app.datadoghq.com/
management.metrics.export.datadog.uri=https://us5.datadoghq.com
# your secret key from Datadog
management.metrics.export.datadog.api-key=<key>
# optional
management.metrics.export.datadog.step=10s
# Turns on the Conductor specific metrics
conductor.metrics-datadog.enabled=true

```

Now you are ready to restart your Conductor server, and you should see metrics flowing into your Datadog instance right away!