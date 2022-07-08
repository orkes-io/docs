# DataDog Integration

Conductor has a wealth of metrics that can be used to monitor the server.  If you are already using Datadog, you might just want to integrate these metrics into your DataDog instance.  Read on to learn how!

## Conductor integration

There is a Datadog integration in the [Conductor Community](https://github.com/Netflix/conductor-community) version of Conductor, so this guide will walk through migrating this integration into the Open Source version of Conductor.

If you are using the community version of Conductor, follow through the dependency list and the `application.properties` settings.  There are a few things that need to be added there for you as well.

## Setting up DataDog

We'll start with the assumption that Conductor is currently running on your system.  If not, clone the GitHub repository and get it [running locally](/content/docs/getting-started/install/running-locally).  

1. Add [DatadogMetricsConfiguration.java](https://github.com/Netflix/conductor-community/blob/main/metrics/src/main/java/com/netflix/conductor/contribs/metrics/DatadogMetricsConfiguration.java) from the conductor-community repository to `/server/src/main/java/com/netflix/conductor` (the same directory that has `Conductor.java` in it). 

2. Next, we will add some dependencies to the `server/build.gradle` file.  

* For the `conductor-community` repository, we need just one: 

```java
    implementation "io.micrometer:micrometer-registry-datadog:1.9.1"
```
* For `netflix/conductor`, there are three dependencies to add:

```java
    implementation "com.netflix.spectator:spectator-reg-metrics3:0.122.0"
    implementation "com.netflix.spectator:spectator-reg-micrometer:0.122.0"
    implementation "io.micrometer:micrometer-registry-datadog:1.9.1"
```
3. Finally, we need to update the `application.properties` file.  This can be found in `server/src/main/resources`.  There are already a few Datadog entries here, but let's just fully replace then with the following:


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