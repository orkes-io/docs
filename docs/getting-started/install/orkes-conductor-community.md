# Orkes Conductor
Orkes Conductor is a fully compatible version of Netflix Conductor with **Orkes certified stack**.

[![CI](https://github.com/orkes-io/orkes-conductor-community/actions/workflows/ci.yaml/badge.svg)](https://github.com/orkes-io/orkes-conductor-community/actions/workflows/ci.yml)
[![CI](https://img.shields.io/badge/license-orkes%20community%20license-green)](https://github.com/orkes-io/licenses/blob/main/community/LICENSE.txt)


```
  ______   .______       __  ___  _______     _______.
 /  __  \  |   _  \     |  |/  / |   ____|   /       |
|  |  |  | |  |_)  |    |  '  /  |  |__     |   (----`
|  |  |  | |      /     |    <   |   __|     \   \    
|  `--'  | |  |\  \----.|  .  \  |  |____.----)   |   
 \______/  | _| `._____||__|\__\ |_______|_______/    
                                                      
  ______   ______   .__   __.  _______   __    __    ______ .___________.  ______   .______      
 /      | /  __  \  |  \ |  | |       \ |  |  |  |  /      ||           | /  __  \  |   _  \     
|  ,----'|  |  |  | |   \|  | |  .--.  ||  |  |  | |  ,----'`---|  |----`|  |  |  | |  |_)  |    
|  |     |  |  |  | |  . `  | |  |  |  ||  |  |  | |  |         |  |     |  |  |  | |      /     
|  `----.|  `--'  | |  |\   | |  '--'  ||  `--'  | |  `----.    |  |     |  `--'  | |  |\  \----.
 \______| \______/  |__| \__| |_______/  \______/   \______|    |__|      \______/  | _| `._____| 
```

## Stack
1. **Redis** as the primary store for running workflows
2. **Postgres** for storing completed workflows and indexing enabling full text search
3. **[Orkes-Queues](https://github.com/orkes-io/orkes-queues)** Redis based queues that improve upon dyno-queues and providers higher performance and are built from ground up to support Redis standalone and cluster mode
### Dependency Versions

| Dependency                              | Supported Version |
|-----------------------------------------|-------------------|
| Redis (Standalone, Cluster or Sentinel) | 6.2+              |
| Postgres                                | 14+               |

## Getting Started
### Docker
Easiest way to run Conductor.  Each release is published as `orkesio/orkes-conductor-community` docker images.

#### Fully self-contained standalone server with all the dependencies
Container image useful for local development and testing.  
>**Note** self-contained docker image shouldn't be used in production environment.

#### Simple self-contained script to launch docker image
```shell
curl https://raw.githubusercontent.com/orkes-io/orkes-conductor-community/main/scripts/run_local.sh | sh
```
#### Using `docker run` manually (provides more control)
```shell

# Create volumes for persistent stores
# Used to create a persistent volume that will preserve the 
docker volume create postgres
docker volume create redis

docker run --init -p 8080:8080 -p 1234:5000 --mount source=redis,target=/redis \
--mount source=postgres,target=/pgdata orkesio/orkes-conductor-community-standalone:latest
```
Navigate to http://localhost:1234 once the container starts to launch UI

#### Server + UI Docker
```shell
docker pull orkesio/orkes-conductor-community:latest
```
>**Note** To use specific version of Conductor, replace `latest` with the release version
> e.g. 
> 
> ```docker pull orkesio/orkes-conductor-community:latest```

### Published Artifacts

* **Group:** `io.orkes.conductor`
* **Artifacts:** `orkes-conductor-community-{server,persistence,archive}`

| Artifact    | Gradle                                                                            |
|-------------|-----------------------------------------------------------------------------------|
| server      | `implementation 'io.orkes.conductor:orkes-conductor-community-server:VERSION'`      |
| persistence | `implementation 'io.orkes.conductor:orkes-conductor-community-persistence:VERSION'` |  
| archive     | `implementation 'io.orkes.conductor:orkes-conductor-community-archive:VERSION'`     |

#### Production Configuration Recommendations
The container and server jar published comes with sensible defaults that works for most use cases.

Please see [CONFIGURATION](CONFIGURATION.md) for details.

### Contributions
We welcome community contributions and PRs to this repository.

### Get Support 
Use GitHub issue tracking for filing issues and Discussion Forum for any other questions, ideas or support requests.
Orkes (http://orkes.io) development team creates and maintains the Orkes-Conductor releases.

## License
Copyright 2022 Orkes, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
