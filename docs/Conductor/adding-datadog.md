# DataDog Integration

Datadog is an observability service that monitors various tools and servers through a SaaS platform. Conductor is a microservice and workflow orchestration platform with a wealth of metrics that can be used to monitor the server. If you are already using Datadog, you might just want to integrate these metrics into your DataDog instance. Read on to learn how!

## Conductor Integration

You can find the instance of Datadog integration in the [Community](https://github.com/Netflix/conductor-community) version of Conductor. This guide will take you through the steps in integrating Datadog with the Open Source version of Conductor. 

## Setting Up DataDog

We'll assume that the Conductor is currently running on your system.  If not, clone the GitHub repository and get it [running locally](/content/docs/getting-started/install/running-locally-docker).  

1. First, we will add the metrics dependency to the `server/build.gradle` file.  

```java
     implementation 'com.netflix.conductor:conductor-metrics:3.10.0'
```
2. Next, update the `application.properties` file with the Datadog parameters.  This can be found in `server/src/main/resources`.  There are already a few Datadog entries here, but let's just fully replace them with the following:


```shell
# Turn on the metrics
management.metrics.export.datadog.enabled=true
# Check the URL of your datadog instance. By default, they are sent to https://app.datadoghq.com/
management.metrics.export.datadog.uri=https://us5.datadoghq.com
# Your secret key from Datadog
management.metrics.export.datadog.api-key=<key>
# Optional
management.metrics.export.datadog.step=10s
# Turns on the Conductor specific metrics
conductor.metrics-datadog.enabled=true

```

Now restart your Conductor server,  and you should see metrics flowing into your Datadog instance right away!