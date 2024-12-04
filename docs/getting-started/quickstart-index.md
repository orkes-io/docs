---
slug: "../quickstarts"
description: "Learn how to set up your development environment for building applications with Orkes Conductor."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quickstarts

Orchestration lets you develop distributed systems without worrying about coordinating complexity. Conductor is an orchestration engine that runs sequences of tasks, known as workflows, using a worker-task queue architecture. 

In these quickstarts, you will learn the basics of developing with Conductor:
1. How to create workflows
2. How to write custom workers
3. How to deploy workflows to production
4. How to debug workflow

:::tip
Familiarize yourself with the [Core Concepts](core-concepts) in Conductor before diving into our quickstarts.
:::

With Orkes’ suite of SDKs, APIs, and Orkes Platform, you can mix-and-match our products to develop with Conductor.
* **Conductor SDKs**—Manage, test, and deploy workflows; write workers;  or integrate Conductor into your applications. Available in Python, Java, Javascript, C#, Go, and Clojure.
* **Conductor APIs**—Manage resources (workflows, tasks, users, etc) programmatically.
* **Orkes Platform**—Manage resources from a user interface.


## Preparing your tools

Before you begin, prepare the following:
* Get UI access to your Orkes Conductor cluster.
* Set up your development environment.
* Configure programmatic access to your Orkes Conductor cluster.


### Get UI access

Orkes Platform offers single-tenancy access. If you have an Orkes account, access your cluster and log in using your organization’s SSO provider.


<p align="center"><img src="/content/img/getting-started/getting_started-log_in_page.png" alt="Screenshot of Orkes log in screen." width="100%" height="auto"></img></p>

### Set up your development environment

A key part of developing with Conductor involves using our SDKs to write workers, create workflows as code, or develop client applications. Set up your development environment in your preferred language.

<Tabs groupId="language">
<TabItem value="python" label="Python">

:::info Prerequisites
* [Python 3.9+](https://www.python.org/downloads/) or higher
:::

In your project directory, create and activate your virtual environment (eg `myProject`).

**Mac:**
``` bash
// Using venv
python -m venv myProject
source myProject/bin/activate

// Using virtualenv
virtualenv myProject
source myProject/bin/activate
```

**Windows:**
``` shell
// Using venv
python -m venv myProject
myProject\Scripts\activate

// Using virtualenv
virtualenv myProject
myProject\Scripts\activate
```

In your terminal, run the following command to get the Conductor SDK.

``` bash
python3 -m pip install conductor-python
```

</TabItem>

<TabItem value="java" label="Java">

:::info Prerequisites
* JDK 17 from v2.1.2 onwards
* A Gradle or Maven project properly set up
:::


**Gradle:**

In the `build.gradle` file, add the following dependencies.

``` java
dependencies {
    implementation 'org.conductoross:conductor-client:4.0.0'
    implementation 'io.orkes:orkes-conductor-client:4.0.0'
}
```

**Maven:**

In the `pom.xml` file, add the following dependencies.

``` xml
<dependency>
    <groupId>org.conductoross</groupId>
    <artifactId>conductor-client</artifactId>
    <version>4.0.0</version>
</dependency>
<dependency>
    <groupId>io.orkes</groupId>
    <artifactId>orkes-conductor-client</artifactId>
    <version>4.0.0</version>
</dependency>
```

</TabItem>

<TabItem value="javascript" label="JavaScript">

:::info Prerequisites
* NodeJS 18 or higher
:::

Get the Conductor Javascript package using npm or yarn.

**npm:**
``` shell
npm i @io-orkes/conductor-javascript
```

**yarn:**
``` bash
yarn add @io-orkes/conductor-javascript
```

</TabItem>

<TabItem value="csharp" label="C#">

:::info Prerequisites
* .NET Standard 2.0 or higher
:::

In your terminal, run the following command to get the Conductor SDK.

``` shell
dotnet add package conductor-csharp
```

</TabItem>

<TabItem value="go" label="Go">

:::info Prerequisites
* Go 1.17 or higher
:::

Initialize your Go module.

```
go mod init <module-path>
```

Add the Conductor SDK to your module.

```
go get github.com/conductor-sdk/conductor-go
```

</TabItem>

<TabItem value="clojure" label="Clojure">

:::info Prerequisites
* Clojure v1.11.0 or higher
:::

Get the Conductor Clojure package from [clojars](https://clojars.org/io.orkes/conductor-clojure).

```
:deps {org.clojure/clojure {:mvn/version "1.11.0"}
        io.orkes/conductor-clojure {:mvn/version "0.3.0"}}
```

</TabItem>
</Tabs>


### Configure programmatic access to Conductor

Once your development environment is set up, you need to configure your access to the Conductor server. In Orkes, programmatic access to Conductor is enabled by application-based access keys. To get authenticated, you must first create an application in Orkes Platform, then create an access key for your application.

**To create an application:**
1. Log in to your Orkes cluster or the [Orkes Developer Edition](https://developer.orkescloud.com/).
2. In the left navigation menu, go to **Access Control** > **Applications**.
3. Select **(+) Create application**.
4. Enter the application name, such as “myFirstWorkflow”. Use this application while following along with the quickstarts.
5. Select **Save**.

The application has been created. You can proceed to retrieve an access key.

**To retrieve the access key:**

In the Access Keys section, select **(+) Create access key** to generate a unique Key Id and Key Secret.

The Key Secret is shown only once. Make sure to copy and store it securely, so you can use it when following along with the quickstarts.


## Ready to start?
* **[Quickstart 1: Learn how to create your first workflow](/quickstarts/create-first-workflow)**. You can define workflows as code or on Orkes Platform.
* **[Quickstart 2: Learn how to use custom tasks](/quickstarts/write-workers)**. Write workers in any language using Conductor SDKs.
* **[Quickstart 3: Learn how to deploy your workflow](/quickstarts/deploy-workflows)**. There are many ways to do this, such as creating a client application.
* **[Quickstart 4: Learn how to debug and monitor your workflow](/quickstarts/debug-and-monitor-workflows)**.