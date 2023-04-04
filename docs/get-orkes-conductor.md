---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get/Install Orkes Conductor

<details open><summary>Use Conductor Playground</summary>
<p>

[Playground](https://play.orkes.io/) is the easiest way to get started on Orkes Conductor.


Using Playground requires __authorization__ keys which you can generate quickly by following the steps below:

1. Login to [https://play.orkes.io/](https://play.orkes.io/) - you can bookmark this URL for easy access.
2. Navigate to __Applications__ from the left menu.
3. Click __Create Application__ button to create a new application and provide a name.
4. Open the newly created application and enable Worker, Metadata API, and Application API permissions.
5. Click __Create Access Key__ to create the KEY and SECRET.  A dialog box opens with the newly generated Key and Secret. 

__Important__: Copy and store the Key and Secret in a safe location, as it is never displayed again.


#### Setup environment variables
```shell
export KEY=<Your KEY>
export SECRET=<Your SECRET>
export CONDUCTOR_SERVER_URL=https://play.orkes.io/api
```

You can generate another pair for your testing if you lose access to your key/secret pair.

</p>
</details>

<details><summary>Install and Run Locally</summary>
<p>

##### Pre-requisites: `Docker` should be installed.
Run the following command on the Unix, Linux or Mac OSX to download the container and start.
```shell
curl https://raw.githubusercontent.com/orkes-io/orkes-conductor-community/main/scripts/run_local.sh | sh
```

Alternatively, you can also run the container command explicitly:
```shell
docker run --init -p 8080:8080 -p 1234:5000 --mount source=redis,target=/redis \
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-community-standalone:latest
```

Note the target folders for Redis and Postgres data. You can empty these if you want to reset your local installation.

<br/>

#### Setup environment variables
```shell
export CONDUCTOR_SERVER_URL=http://localhost:8080/api
```

</p>
</details>

### Video Guides

- [Working on Orkes Playground](/content/videos/access-key-secret).

