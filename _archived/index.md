---
sidebar_position: 2
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';

# Getting Started
Conductor is a runtime platform for building distributed stateful applications using workflows with event-driven architecture.

## Setup Conductor Server

<details><summary>Use Conductor Playground</summary>
<p>
The Playground is the easiest way to get started; that provides a fully featured enterprise version of Conductor. 
<br/>
In order to use the playground, authorization keys are required, which you can generate quickly by following the steps below:

1. Login to [Playground](https://play.orkes.io/)
2. Navigate to **Access Control > Applications** from the left menu.
3. Click **Create Application**, and provide an app name.
4. Once the application is created, navigate to the **Actions** section and click the edit button.
5. Click __Create Access Key__ to create the KEY and SECRET.  A dialog box opens with the newly generated Key and Secret.

:::info
Ensure to copy and store the Key and Secret in a safe location, as they would be displayed only once.
:::

#### Setup environment variables
```shell
export KEY=<Your KEY>
export SECRET=<Your SECRET>
export CONDUCTOR_SERVER_URL=https://play.orkes.io/api
```
</p>
</details>

<details><summary>Install and Run Locally</summary>
<p>

#### Pre-requisites: `Docker`
Run the following command on the Unix, Linux, or Mac OSX to download the container and start.
```shell
curl https://raw.githubusercontent.com/orkes-io/orkes-conductor-community/main/scripts/run_local.sh | sh
```

Alternatively, you can also run the container command explicitly:
```shell
docker run --init -p 8080:8080 -p 1234:5000 --mount source=redis,target=/redis \
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-community-standalone:latest
```

#### Setup environment variables
```shell
export CONDUCTOR_SERVER_URL=http://localhost:8080/api
```

</p>
</details>


## Run your first Conductor Application
In this section, we will look into an example that creates and runs a simple 2-step workflow application.

<Tabs>
<TabItem value="Java" label="Java">

```shell
git clone https://github.com/conductor-sdk/java-sdk-examples
# Run the main program
./gradlew run

```
</TabItem>
<TabItem value="Golang" label="Golang">

```shell
git clone https://github.com/conductor-sdk/go-sdk-examples
# Run the main program
go run main.go
```
</TabItem>
<TabItem value="Python" label="Python">

```shell
git clone https://github.com/conductor-sdk/python-sdk-examples

# Create a virtual environment
python3 -m venv conductor
# Linux/OSX Activate the environment
source conductor/bin/activate
# Windows - Run the below command instead
# venv\Scripts\activate

# Install dependencies
python3 -m pip install -r requirements.txt

# Run the main program
cd examples/
python3 main.py

```
</TabItem>
<TabItem value="CSharp" label="CSharp">

```shell
git clone https://github.com/conductor-sdk/csharp-sdk-examples
# Run the main program
dotnet run
```
</TabItem>
<TabItem value="Javascript" label="Javascript">

```shell
git clone https://github.com/conductor-sdk/javascript-sdk-examples
yarn #To install dependencies.
yarn test #To run the test examples
```
</TabItem>
<TabItem value="Clojure" label="Clojure">
</TabItem>
</Tabs>

You will see the console output with the workflow execution and link to the server to check the execution graph:

```shell
=======================================================================================
Async Workflow Execution Completed
Workflow Id: 38682137-a002-11ed-9147-36bbe4294242
Workflow Status: COMPLETED
Workflow Execution Flow UI: https://play.orkes.io/execution/38682137-a002-11ed-9147-36bbe4294242
=======================================================================================

=======================================================================================
Sync Workflow Execution Completed
Workflow Id: 38f2adc1-a002-11ed-89b1-f2f2ca2ac145
Workflow Execution Flow UI: https://play.orkes.io/execution/38f2adc1-a002-11ed-89b1-f2f2ca2ac145
=======================================================================================

```
:::info Creating Workflows
Conductor workflows can be defined using UI drag-and-drop, JSON configuration, and **code** using the SDKs in Java, Golang, Python, C#, Typescript, and Clojure.

We are constantly adding support for new languages, with Rust and Kotlin coming soon.
:::

## > Next Steps

### Build a distributed app from scratch using Conductor
<DocCardList />
