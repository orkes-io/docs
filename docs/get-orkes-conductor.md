---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Setting Up Orkes Conductor

Orkes Conductor can be set up in the cloud or locally, depending on your use case and requirements.

## Orkes Cloud

Orkes Cloud is the fully managed enterprise version of Orkes Conductor. With Orkes Cloud, you can deploy dedicated Conductor clusters on preferred cloud providers. 

There are two hosting options:

* Orkes-hosted - End-to-end hosting managed by Orkes.
* Customer-hosted -  Deploy within your own infrastructure (Azure, AWS, GCP, or private cloud).

You can try [Orkes Developer Edition](https://developers.orkes.cloud/?utm_campaign=set-up-orkes-conductor&utm_source=orkes-doc&utm_medium=web) for immediate testing. A [14-day free trial of Orkes Cloud](https://cloud.orkes.io/signupset-up-orkes-conductororkes-doc&utm_medium=web) is also available for setting up custom Conductor clusters.

## Orkes Conductor - Local Setup

Orkes Cloud users can utilize the Orkes Cloud containers available on [DockerHub](https://hub.docker.com/) under the [orkesio](https://hub.docker.com/orgs/orkesio/repositories) organization for local development and testing of the Orkes Conductor clusters. These containers include all the Cloud features but **require an Orkes Cloud subscription**.

The `orkes-conductor-standalone` container is ideal for local development and testing. It includes the full Orkes stack, with a persistent store, server, and system workers. To download it, you'll need an authorization token from the Orkes team.

:::note
These containers are not meant for production environments.
:::

<Tabs>
<TabItem value="mac linux commands" label="macOS, Linux">

**Pre-requisites:**
* Docker must be installed.
* Subscription to Orkes Cloud.
* Authorization token from Orkes team. (Contact support@orkes.io for an authorization token.)​

**To download and run the container:**
1. Log in to DockerHub using your Orkes access account. When prompted for a password, use the access token provided by Orkes.
2. Download and run the latest container build​​:

```bash
export orkes_access_key=<ACCESS_KEY_PROVIDED_BY_ORKES>
echo $orkes_access_key | docker login --username orkesdocker --password-stdin

# Create volumes for persistent stores
docker volume create postgres
docker volume create redis

# Download and start the container
docker run -i -p 8080:8080 -p 3000:5000 --mount source=redis,target=/redis \
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-standalone:latest
```
The UI can be accessed at [http://localhost:3000](http://localhost:3000) and API docs at [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/). 

</TabItem>
<TabItem value="windows commands" label="Windows">

**Pre-requisites:**
* Subscription to Orkes Cloud.
* Authorization token from the Orkes team. (Contact support@orkes.io to obtain Docker Hub credentials.)

**Step 1: Install Windows Subsystem for Linux (WSL) on Windows**

The Windows devices should have Windows Subsystem for Linux (WSL) installed.

**To install WSL:**
1. Open PowerShell or Windows Command Prompt in administrator mode by right-clicking and selecting **Run as administrator**.
2. Enter the following command and restart your computer once completed:
```bash
wsl --install
```
If you face any issues, refer to the official Microsoft documentation on [installing Linux with WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

**Step 2: Install Docker Desktop for Windows**

Orkes containers are distributed as Docker containers and require a Docker runtime with WSL support. Make sure to download the correct binary based on your CPU type.

**To install Docker Desktop for Windows:**
1. Download and install Docker Desktop by following the [instructions on Docker](https://docs.docker.com/desktop/install/windows-install/).
2. When prompted, select WSL.
3. Restart your computer.

Ensure that Docker is running automatically after the restart. If not, search for Docker in your Applications and start it.

**Step 3: Download and run container**
1. Open PowerShell in administrator mode by right-clicking and selecting **Run as administrator**.
2. Run the following PowerShell commands individually, or save the commands into a script file (e.g., orkes-enterprise.ps1) and run the script.
```bash
# Set the Orkes access key
$env:orkes_access_key = "<ACCESS KEY PROVIDED BY ORKES>"

# Log in to Docker
$env:orkes_access_key | docker login --username orkesdocker --password-stdin

# Create volumes for persistent stores
docker volume create postgres
docker volume create redis

# Download and start the container
docker run -i -p 8080:8080 -p 3000:5000 --mount source=redis,target=/redis --mount source=postgres,target=/pgdata orkesio/orkes-conductor-standalone:latest
```
If succeessful, the Orkes Conductor welcome screen will appear on the terminal. The UI can be accessed at [http://localhost:3000](http://localhost:3000) and API docs at [http://localhost:8080/swagger-ui/](http://localhost:8080/swagger-ui/). 
</TabItem>
</Tabs>

