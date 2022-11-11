---
slug: building-a-delivery-workflow-with-typescript
title: Building a Delivery Workflow with TypeScript (TS)
authors: 
- riza
- james
tags: [Netflix Conductor, orchestration, delivery workflow]
---

What do you do when you’re hungry and there is no way to cook food? Definitely, you rely on a food delivery application. Have you ever wondered how this delivery process works? Well, let me walk you through the process of how Conductor helps in orchestrating the delivery process. 

In this article, you will learn how to build a delivery workflow using Conductor, an open-source microservice and workflow orchestration framework. Conductor handles the process as a workflow that divides the delivery process into individual blocks. Let’s see this in action now!

## Delivery Workflow

Consider that we get a request in the delivery app to send a package from an origin to a destination. The application has the details of both the registered clients and riders. It should connect the best-fitting rider to deliver the package. So, the application gets the registered riders list, picks the nearest riders, and lets them compete to win the ride. 

Looks simple? Yeah! Conductor comes into action here! You can simply build your delivery application by connecting small blocks together using Conductor.

## What you need!

* A list of registered riders.
* A way to let our riders know they have a possible delivery.
* A method for our riders to compete or be the first to select the ride.

## Building the application

Let’s begin to bake our delivery app. Initially, we need to get some API calls for processes such as getting the riders list, notifying the riders, etc. We will make use of the [dummy JSON](https://dummyjson.com/) that provides us with fake APIs. 

So, in this case, we will use the user API for pulling our registered riders, and for notifying the rider about a possible ride, we will use the posts API.
 
Since we are creating this workflow as code, instead of using the workflow diagram, let's try to start with the test and build our workflow app from scratch. For the demonstration purpose, we will be using [Orkes Playground](https://play.orkes.io/), a free Conductor platform. However, the process would be the same for Netflix Conductor.

## Workflow as Code

## Project Setup

First, you need to set up a project:
1. Create an npm project with ```npm init``` and install the SDK with ```npm i @io-orkes/conductor-javascript```.
2. You'll need to add jest and typescript support. For this, copy and paste the **jest.config.js** and **tsconfig.json** files into your project in the root folder. Then add the following devDependencies as a separate JSON file:
```json 
"scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "@tsconfig/node16": "^1.0.2",
    "@types/jest": "^29.0.3",
    "@types/node": "^17.0.30",
    "@types/node-fetch": "^2.6.1",
    "@typescript-eslint/eslint-plugin": "^5.23.0",
    "@typescript-eslint/parser": "^5.23.0",
    "eslint": "^6.1.0",
    "jest": "^28.1.0",
    "ts-jest": "^28.0.1",
    "ts-node": "^10.7.0",
    "typescript": "^4.6.4"
  },
```
3.  Run ```yarn``` to fetch them.

So, now you’ve created your project. As we are creating the workflow as code, next, let's create two files; **mydelivery.ts** and **mydelivery.test.ts**. By writing our code along with the test, you will get instant feedback and know exactly what happens with every step.

## Creating Our Workflow

Let’s begin creating our workflow. Initially, we need to calculate the distance between the two points, i.e., the rider and the package to be delivered. We leverage this distance to calculate the shipment cost too. So let's create a workflow that can be reused in both situations.

Let the first workflow be **calculate_distance** that outputs the result of some function. So in our **mydelivery.ts**, let's update the following code:

```json
import {
  generate,
  TaskType,
  OrkesApiConfig,
} from "@io-orkes/conductor-javascript";

export const playConfig: Partial<OrkesApiConfig> = {
  keyId: "your_key_id",
  keySecret: "your_key_secret",
  serverUrl: "https://play.orkes.io/api",
};
export const calculateDistanceWF = generate({
  name: "calculate_distance",
  inputParameters: ["origin", "destination"],
  tasks: [
    {
      type: TaskType.INLINE,
      name: "calculate_distance",
      inputParameters: {
        expression: "12",
      },
    },
  ],
  outputParameters: {
    distance: "${calculate_distance_ref.output.result}",
    identity: "${workflow.input.identity}", // Some identifier for the call will make sense later on
  },
});
```
Now in our test file, create a test that generates the workflow so we can look at it later on the Playground.
```json
import {
  orkesConductorClient,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";
import { calculateDistanceWF, playConfig } from "./mydelivery";

describe("My Delivery Test", () => {
  const clientPromise = orkesConductorClient(playConfig);
  describe("Calculate distance workflow", () => {
    test("Creates a workflow", async () => {
      // const client = new ConductorClient(); // If you are using Netflix conductor
      const client = await clientPromise;
      const workflowExecutor = new WorkflowExecutor(client);
      await expect(
        workflowExecutor.registerWorkflow(true, calculateDistanceWF)
      ).resolves.not.toThrowError();
      console.log(JSON.stringify(calculateDistanceWF, null, 2));
    });
  });
});
```
Now, run ```npm test```. 

We have just created our first workflow, which basically prints the output of its task. If you look at the generated JSON, you'll notice that there are some additional attributes apart from the ones we’ve given as inputs. That's because the *generate* function will generate default values, which you can overwrite later. You'll also notice that I’ve called this **"${calculate_distance_ref.output.distance}"** using the generated task reference name. If you don't specify a *taskReferenceName*, it will generate one by adding **_ref** to the specified name. To reference a task output or a given task, we always use the *taskReferenceName*. Another thing to notice is the true value passed as the first argument of the registerWorkflow function. This flag specifies that the workflow will be overwritten, which is required since we will run our tests repeatedly.

Let's create a test to actually run the workflow now. You can add the origin and destination parameters previously known by the workflow definition (Workflow input parameters). We are not using it for now, but it is relevant in the further steps.

```json
test("Should calculate distance", async () => {
  // Pick two random points
  const origin = {
    latitude: -34.4810097,
    longitude: -58.4972602,
  };

  const destination = {
    latitude: -34.4810097,
    longitude: -58.491168,
  };
  // const client = new ConductorClient(); // If you are using Netflix conductor
  const client = await clientPromise;
  const workflowExecutor = new WorkflowExecutor(client);
  // Run the workflow passing an origin and a destination
  const executionId = await workflowExecutor.startWorkflow({
    name: calculateDistanceWF.name,
    version: 1,
    input: {
      origin,
      destination,
    },
  });
  const workflowStatus = await workflowExecutor.getWorkflow(executionId, true);

  expect(workflowStatus?.status).toEqual("COMPLETED");
  // For now we expect the workflow output to be our hardcoded value
  expect(workflowStatus?.output?.distance).toBe(12);
});
```

Now, run ```yarn test```, and great, we have our first workflow execution run!

## Calculating Actual Distance

Next, we need to calculate the actual or approximate distance between the two points. To get the distance between two points in a sphere, we could use the [Haversine](http://www.movable-type.co.uk/scripts/latlong.html) formula, but since we don't want a direct distance (because our riders can't fly :P), we will implement something like [Taxicab geometry](https://en.wikipedia.org/wiki/Taxicab_geometry).

**Calculating distance using an INLINE Task**

An INLINE task can be utilized in situations where the code is required to be simple. The INLINE task can take input parameters and an expression. If we go back to our **calculate_distance** workflow, it takes no context and returns a hard-coded object. Now, let’s modify our inline task to take the origin and destination to calculate the approximate distance.

```json
export const calculateDistanceWF = generate({
  name: "calculate_distance",
  inputParameters: ["origin", "destination"],
  tasks: [
    {
      name: "calculate_distance",
      type: TaskType.INLINE,
      inputParameters: {
        fromLatitude: "${workflow.input.from.latitude}",
        fromLongitude: "${workflow.input.from.longitude}",
        toLatitude: "${workflow.input.to.latitude}",
        toLongitude: "${workflow.input.to.longitude}",
        expression: function ($: any) {
          return function () {
            /**
             * Converts from degrees to Radians
             */
            function degreesToRadians(degrees: any) {
              return (degrees * Math.PI) / 180;
            }
            /**
             *
             * Returns total latitude/longitude distance 
             *
             */
            function harvisineManhatam(elem: any) {
              var EARTH_RADIUS = 6371;
              var a = Math.pow(Math.sin(elem / 2), 2); // sin^2(delta/2)
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // 2* atan2(sqrt(a),sqrt(1-a))
              return EARTH_RADIUS * c;
            }

            var deltaLatitude = Math.abs(
              degreesToRadians($.fromLatitude) - degreesToRadians($.toLatitude)
            );
            var deltaLongitude = Math.abs(
              degreesToRadians($.fromLongitude) -
                degreesToRadians($.toLongitude)
            );

            var latitudeDistance = harvisineManhatam(deltaLatitude);
            var longitudeDistance = harvisineManhatam(deltaLongitude);

            return Math.abs(latitudeDistance) + Math.abs(longitudeDistance);
          };
        },
      },
    },
  ],
  outputParameters: {
    distance: "${calculate_distance_ref.output.result}",
  },
});
```

If we run the test, it will fail because the result is not 12; i.e., in the workflow **calculate_distance**, the input parameter was defined as 12. 
 
But in accordance with Red-Green-Refactor, we can calculate the distance using Taxicab geometry if we pick the two cardinal points. So this test should pass. So let’s decide the origin and destination points to be the same, so the result is 0. It is actually **.toEqual(0)** since it’s returning an object. So we can fix that in the test.
 
**Note**:  Key takeaway from the above case: I’ve used ES5 javascript on my editor and not as a string. However, you can't use closures with the rest of the file’s code, and the returned function has to be written in ES5. Else the tests will fail.

Running the test now registers a new workflow overwriting the old one.

## Finding Best Rider

Now that we have the **calculate_distance** workflow. We can think of this workflow as a function that can later be invoked into a different project/file. 

And let's create workflow number two, i.e.,**findNearByRiders**, which will hit a microservice that pulls the registered riders list. 

## Hitting Microservice

We can use the HTTP task to hit something simple as an HTTP microservice. The HTTP task will take some input parameters and hit an endpoint with our configuration. It is similar to cURL or Postman. We will be using [dummy json](https://dummyjson.com/users), which returns a list of users with an address. Preferably, consider this address as the last reported address from the riders.

```json
export const nearByRiders = generate({
  name: "findNearByRiders",
  tasks: [
    {
      type: TaskType.HTTP,
      name: "get_users",
      taskReferenceName: "get_users_ref",
      inputParameters: {
        http_request: {
          uri: "http://dummyjson.com/users",
          method: "GET",
        },
      },
    },
  ],
  outputParameters: {
    possibleRiders: "${get_users_ref.output.response.body.users}",
  },
});
```

Our **findNearByRiders** workflow hits an endpoint and returns the list of all available riders. 

Let's write the test.

```json
describe("NearbyRiders", () => {
  // As before, we create the workflow.
  test("Creates a workflow", async () => {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);

    await expect(
      workflowExecutor.registerWorkflow(true, nearByRiders)
    ).resolves.not.toThrowError();
  });

  test("Should return all users with latest reported address", async () => {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);
    const executionId = await workflowExecutor.startWorkflow({
      name: nearByRiders.name,
      input: {
        place: {
          latitude: -34.4810097,
          longitude: -58.4972602,
        },
      },
      version: 1,
    });
    //Let's wait for the response...
    await new Promise((r) => setTimeout(() => r(true), 2000));
    const workflowStatus = await client.workflowResource.getExecutionStatus(
      executionId,
      true
    );
    expect(workflowStatus.status).toBe("COMPLETED");
    expect(workflowStatus?.output?.possibleRiders.length).toBeGreaterThan(0);
    console.log("Riders", JSON.stringify(workflowStatus?.output, null, 2));
  });
});
```
If we run our test, it should pass since the number of users is around 30. Looking at the printed output, you can see that the whole structure is being returned by the endpoint.

Our workflow is incomplete because it only returns the list of every possible rider. But we need to get the distance between the riders and the packages. For this, we must run our previous workflow **calculate_distance** for every rider on the fetched list. Let’s prepare the data to be passed to the next workflow. Here, we utilize the JQ Transform task, which runs a JQ query over the JSON data.

## JSON_JQ_TRANSFORM Task 

Let's add the JQ task.

```json
export const nearByRiders = generate({
  name: "findNearByRiders",
  tasks: [
    {
      type: TaskType.HTTP,
      name: "get_users",
      taskReferenceName: "get_users_ref",
      inputParameters: {
        http_request: {
          uri: "http://dummyjson.com/users",
          method: "GET",
        },
      },
    },
    {
      type: TaskType.JSON_JQ_TRANSFORM,
      name: "summarize",
      inputParameters: {
        users: "${get_users_ref.output.response.body.users}",
        queryExpression:
          ".users | map({identity:{id,email}, to:{latitude:.address.coordinates.lat, longitude:.address.coordinates.lng}} + {from:{latitude:${workflow.input.place.latitude},longitude:${workflow.input.place.latitude}}})",
      },
    },
  ],
  outputParameters: {
    possibleRiders: "${get_users_ref.output.response.body.users}",
  },
});
```

From the task definition here, you can see the mapping of JQ users to the variable output of the HTTP task and then extracting the address. The expected result should have the structure {identity:{id,email}, to:{latitude,longitude}, from:{latitude,longitude}}. 

## Dot Map method 

At this point, we have an array with all possible riders and a workflow to calculate the distance between two points. We must aggregate these to calculate the distance between the package and the riders so that the nearby riders can be chosen. While aggregating in javascript or changing the data for every item in the array, we usually leverage the map method, which takes a function that will be applied to every item in the array.

Since we extracted the distance calculated, and need to map our riders through a “function”. Let’s create a dot map workflow for this. This workflow takes the array of riders as the input parameters and the workflow ID of the **calculate_distance** to run on each rider. 

Note that this new workflow will work for every array and workflow ID provided and is not limited to the riders and the **calculate_distance** workflow.

```json
describe("Mapper Test", () => {
  test("Creates a workflow", async () => {
    const client = await clientPromise;
    await expect(
      client.metadataResource.create(workflowDotMap, true)
    ).resolves.not.toThrowError();
  });

  test("Gets existing workflow", async () => {
    const client = await clientPromise;
    const wf = await client.metadataResource.get(workflowDotMap.name);
    expect(wf.name).toEqual(workflowDotMap.name);
    expect(wf.version).toEqual(workflowDotMap.version);
  });

  test("Can map over an array using a workflow", async () => {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);

    const from = {
      latitude: -34.4810097,
      longitude: -58.4972602,
    };
    const to = {
      latitude: -34.494858,
      longitude: -58.491168,
    };

    const executionId = await workflowExecutor.startWorkflow({
      name: workflowDotMap.name,
      version: 1,
      input: {
        inputArray: [{ from, to, identity: "js@js.com" }],
        mapperWorkflowId: "calculate_distance",
      },
    });

    await new Promise((r) => setTimeout(() => r(true), 1300));

    const workflowStatus = await client.workflowResource.getExecutionStatus(
      executionId,
      true
    );
    expect(workflowStatus?.status).toBe("COMPLETED");
    expect(workflowStatus?.output?.outputArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          distance: 2.2172824347556963,
        }),
      ])
    );
  });
});
```

**Workflow**

```json
export const workflowDotMap = generate({
  name: "workflowDotMap",
  inputParameters: ["inputArray", "mapperWorkflowId"],
  tasks: [
    {
      type: TaskType.JSON_JQ_TRANSFORM,
      name: "count",
      taskReferenceName: "count_ref",
      inputParameters: {
        input: "${workflow.input.inputArray}",
        queryExpression: ".[] | length",
      },
    },
    {
      type: TaskType.JSON_JQ_TRANSFORM,
      name: "dyn_task_builder",
      taskReferenceName: "dyn_task_builder_ref",
      inputParameters: {
        input: {},
        queryExpression:
          'reduce range(0,${count_ref.output.result}) as $f (.;  .dynamicTasks[$f].subWorkflowParam.name = "${workflow.input.mapperWorkflowId}" | .dynamicTasks[$f].taskReferenceName = "mapperWorkflow_wf_ref_\\($f)" | .dynamicTasks[$f].type = "SUB_WORKFLOW")',
      },
    },
    {
      type: TaskType.JSON_JQ_TRANSFORM,
      name: "dyn_input_params_builder",
      taskReferenceName: "dyn_input_params_builder_ref",
      inputParameters: {
        taskList: "${dyn_task_builder_ref.output.result}",
        input: "${workflow.input.inputArray}",
        queryExpression:
          'reduce range(0,${count_ref.output.result}) as $f (.; .dynamicTasksInput."mapperWorkflow_wf_ref_\\($f)" = .input[$f])',
      },
    },
    {
      type: TaskType.FORK_JOIN_DYNAMIC,
      inputParameters: {
        dynamicTasks: "${dyn_task_builder_ref.output.result.dynamicTasks}",
        dynamicTasksInput:
          "${dyn_input_params_builder_ref.output.result.dynamicTasksInput}",
      },
    },
    {
      type: TaskType.JOIN,
      name: "join",
      taskReferenceName: "join_ref",
    },
    {
      type: TaskType.JSON_JQ_TRANSFORM,
      name: "to_array",
      inputParameters: {
        objValues: "${join_ref.output}",
        queryExpression: ".objValues | to_entries | map(.value)",
      },
    },
  ],
  outputParameters: {
    outputArray: "${to_array_ref.output.result}",
  },
});
```

* From the above example workflow, we get the number of arrays. 
* At  "dyn_task_builder", we create a SubWorkflow task template for every item within the array. 
* At "dyn_input_params_builder", we prepare the parameters to pass on to each SubWorkflow. 
* Using FORK_JOIN_DYNAMIC, we create each task using our previously created template and pass the corresponding parameters. After the join operation, use a JSON_JQ_TRANSFORM task to extract the results and return an array with the transformations.

## Calculating distance between package and riders

Given that we now have the origin and destination points, let us modify the **NearbyRiders** workflow so that using the riders' last reported locations, we get the distance between the package and the riders. To achieve this, we pull the riders from the microservice, calculate the distance to the package and sort them by the distance from the package.

```json
describe("NearbyRiders", () => {
  // As before, we create the workflow.
  test("Creates a workflow", async () => {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);

    await expect(
      workflowExecutor.registerWorkflow(true, nearByRiders)
    ).resolves.not.toThrowError();
  });

  // First, let's test that the API responds to all the users.
  test("Should return all users with latest reported address", async () => {
    const client = await clientPromise;
    const workflowExecutor = new WorkflowExecutor(client);
    const executionId = await workflowExecutor.startWorkflow({
      name: nearByRiders.name,
      input: {
        place: {
          latitude: -34.4810097,
          longitude: -58.4972602,
        },
      },
      version: 1,
    });
    // Let’s wait for the response...
    await new Promise((r) => setTimeout(() => r(true), 2000));
    const workflowStatus = await client.workflowResource.getExecutionStatus(
      executionId,
      true
    );
    expect(workflowStatus.status).toBe("COMPLETED");
    expect(workflowStatus?.output?.possibleRiders.length).toBeGreaterThan(0);
  });

  // So now we need to specify input parameters, else we won't know the distance to the package
  test("User object should contain distance to package", async () => {
    const client = await clientPromise;

    const workflowExecutor = new WorkflowExecutor(client);

    const executionId = await workflowExecutor.startWorkflow({
      name: nearByRiders.name,
      input: {
        place: {
          latitude: -34.4810097,
          longitude: -58.4972602,
        },
      },
      version: 1,
    });
    // Let’s wait for the response...
    await new Promise((r) => setTimeout(() => r(true), 2000));

    const nearbyRidersWfResult =
      await client.workflowResource.getExecutionStatus(executionId, true);

    expect(nearbyRidersWfResult.status).toBe("COMPLETED");
    nearbyRidersWfResult.output?.possibleRiders.forEach((re: any) => {
      expect(re).toHaveProperty("distance");
      expect(re).toHaveProperty("rider");
    });
  });
});
```

**Workflow**

```json
export const nearByRiders = generate({
  name: "findNearByRiders",
  inputParameters: ["place"],
  tasks: [
    {
      type: TaskType.HTTP,
      name: "get_users",
      taskReferenceName: "get_users_ref",
      inputParameters: {
        http_request: {
          uri: "http://dummyjson.com/users",
          method: "GET",
        },
      },
    },
    {
      type: TaskType.JSON_JQ_TRANSFORM,
      name: "summarize",
      inputParameters: {
        users: "${get_users_ref.output.response.body.users}",
        queryExpression:
          ".users | map({identity:{id,email}, to:{latitude:.address.coordinates.lat, longitude:.address.coordinates.lng}} + {from:{latitude:${workflow.input.place.latitude},longitude:${workflow.input.place.latitude}}})",
      },
    },
    {
      type: TaskType.SUB_WORKFLOW,
      name: "distance_to_riders",
      subWorkflowParam: {
        name: "workflowDotMap",
        version: 1,
      },
      inputParameters: {
        inputArray: "${summarize_ref.output.result}",
        mapperWorkflowId: "calculate_distance",
      },
    },
    {
      type: TaskType.JSON_JQ_TRANSFORM,
      name: "riders_picker",
      taskReferenceName: "riders_picker_ref",
      inputParameters: {
        ridersWithDistance: "${distance_to_riders_ref.output.outputArray}",
        queryExpression:
          ".ridersWithDistance | map( {distance:.distance, rider:.identity}) | sort_by(.distance) ",
      },
    },
  ],
  outputParameters: {
    possibleRiders: "${riders_picker_ref.output.result}",
  },
});
```
This will give us a list of riders with their distance to the package, sorted by distance from the package.

## Picking a Rider

Now we have all the required data, such as package origin/destination, riders, and their distance from the package. 

Next, we’ll pre-select *N* riders, notify them of the possible ride, and ensure that a rider picks the ride. And for this last part, we will create a worker who will randomly select one.


```json
export const createRiderRaceDefintion = (client: ConductorClient) =>
  client.metadataResource.registerTaskDef([
    {
      name: "rider_race",
      description: "Rider race",
      retryCount: 3,
      timeoutSeconds: 3600,
      timeoutPolicy: "TIME_OUT_WF",
      retryLogic: "FIXED",
      retryDelaySeconds: 60,
      responseTimeoutSeconds: 600,
      rateLimitPerFrequency: 0,
      rateLimitFrequencyInSeconds: 1,
      ownerEmail: "youremail@example.com",
      pollTimeoutSeconds: 3600,
    },
  ]);

export const pickRider = generate({
  name: "pickRider",
  inputParameters: ["targetRiders", "maxCompetingRiders"],
  tasks: [
    {
      name: "do_while",
      taskReferenceName: "do_while_ref",
      type: TaskType.DO_WHILE,
      inputParameters: {
        amountOfCompetingRiders: "${workflow.input.maxCompetingRiders}",
        riders: "${workflow.input.targetRiders}",
      },
      loopCondition: "$.do_while_ref['iteration'] < $.amountOfCompetingRiders",
      loopOver: [
        {
          taskReferenceName: "assigner_ref",
          type: TaskType.INLINE,
          inputParameters: {
            riders: "${workflow.input.targetRiders}",
            currentIteration: "${do_while_ref.output.iteration}",
            expression: ($: {
              riders: {
                distance: number;
                rider: { id: number; email: string };
              }[];
              currentIteration: number;
            }) =>
              function () {
                var currentRider = $.riders[$.currentIteration - 1];
                return {
                  distance: currentRider.distance,
                  riderId: currentRider.rider.id,
                  riderEmail: currentRider.rider.email,
                };
              },
          },
        },
        {
          type: TaskType.HTTP,
          name: "notify_riders_of_ride",
          taskReferenceName: "notify_riders_of_ride",
          inputParameters: {
            http_request: {
              uri: "http://dummyjson.com/posts/add",
              method: "POST",
              body: {
                title:
                  "Are you available to take a ride of a distance of ${assigner_ref.output.result.distance} km  from you",
                userId: "${assigner_ref.output.result.riderId}",
              },
            },
          },
        },
      ],
    },
    {
      type: TaskType.SIMPLE,
      name: "rider_race",
      inputParameters: {
        riders: "${workflow.input.targetRiders}",
      },
    },
  ],
  outputParameters: {
    selectedRider: "${rider_race_ref.output.selectedRider}",
  },
});
```

To select the rider and notify them, we utilize the DO_WHILE task. By simulation, we let the riders know that there is a ride they will be interested in. The notifying order would be from the nearest package to the less near one. Finally, we simulate with a simple task that a rider has accepted our ride.

For this, we need to register the task initially. By doing this, we let the Conductor know that a worker will be doing the simple tasks. The actual [worker](https://orkes.io/content/docs/getting-started/run/running-first-worker) needs to be set up for the scheduled tasks to be executed. Otherwise, while running the above workflow, it will be in a SCHEDULED state and wait for the worker to finish the task, which will never get picked up by a worker.

## Setting up Worker

To implement the worker, we need to create an object of type RunnerArgs. The worker takes a taskDefName which should match our SIMPLE task's reference name. You may have multiple workers waiting for the same task. However, the first one to poll for work with the task name gets the job done.

```json
export const riderRespondWorkerRunner = (client: ConductorClient) => {
  const firstRidertoRespondWorker: RunnerArgs = {
    taskResource: client.taskResource,
    worker: {
      taskDefName: "rider_race",
      execute: async ({ inputData }) => {
        const riders = inputData?.riders;
        const [aRider] = riders.sort(() => 0.5 - Math.random());
        return {
          outputData: {
            selectedRider: aRider.rider,
          },
          status: "COMPLETED",
        };
      },
    },
    options: {
      pollInterval: 10,
      domain: undefined,
      concurrency: 1,
      workerID: "",
    },
  };
  const taskManager = new TaskRunner(firstRidertoRespondWorker);
  return taskManager;
};
```

**Workflow**

```json
// Having the nearby riders, we want to filter out those willing to take the ride.
// For this, we will simulate a POST where we ask the rider if he is willing to take the ride
describe("PickRider", () => {
  test("Creates a workflow", async () => {
    const client = await clientPromise;

    await expect(
      client.metadataResource.create(pickRider, true)
    ).resolves.not.toThrowError();
  });
  test("Every iteration should have the current driver", async () => {
    const client = await clientPromise;
    await createRiderRaceDefintion(client);

    const runner = riderRespondWorkerRunner(client);
    runner.startPolling();

    // Our ‘N’ pre-selected riders
    const maxCompetingRiders = 5;
    const targetRiders = [
      {
        distance: 12441.284548668005,
        rider: {
          id: 15,
          email: "kminchelle@qq.com",
        },
      },
      {
        distance: 16211.662539905119,
        rider: {
          id: 8,
          email: "ggude7@chron.com",
        },
      },
      {
        distance: 17435.548525470404,
        rider: {
          id: 29,
          email: "jissetts@hostgator.com",
        },
      },
      {
        distance: 17602.325904122146,
        rider: {
          id: 20,
          email: "aeatockj@psu.edu",
        },
      },
      {
        distance: 17823.508069312982,
        rider: {
          id: 3,
          email: "rshawe2@51.la",
        },
      },
      {
        distance: 17824.39318092907,
        rider: {
          id: 7,
          email: "dpettegre6@columbia.edu",
        },
      },
      {
        distance: 23472.94011516013,
        rider: {
          id: 26,
          email: "lgronaverp@cornell.edu",
        },
      },
    ];

    const workflowExecutor = new WorkflowExecutor(client);

    const executionId = await workflowExecutor.startWorkflow({
      name: pickRider.name,
      input: {
        maxCompetingRiders,
        targetRiders,
      },
      version: 1,
    });

    await new Promise((r) => setTimeout(() => r(true), 2500));
    const workflowStatus = await client.workflowResource.getExecutionStatus(
      executionId,
      true
    );

    expect(workflowStatus.status).toEqual("COMPLETED");

    // We check our task and select the number of riders we are after.
    const doWhileTaskResult = workflowStatus?.tasks?.find(
      ({ taskType }) => taskType === TaskType.DO_WHILE
    );
    expect(doWhileTaskResult?.outputData?.iteration).toBe(maxCompetingRiders);
    expect(workflowStatus?.output?.selectedRider).toBeTruthy();

    runner.stopPolling();
  });
});
```

## Baking Delivery App - Combining blocks 

Finally, we have all our ingredients ready. Now, let’s bake our delivery app together. 

In a nutshell, when we have a client with a package request with the origin and destination points, we need to pick the best rider to deliver the package from the origin to the destination. As a bonus, let’s compute the delivery cost and make it less expensive if our client is paying by card instead of cash.

So, we run the **nearbyRiders** workflow passing the origin as an input parameter. This would give a list of possible riders, of which one would be picked based on “who answers first”. Next, we calculate the distance from the origin to the destination to compute the cost. Therefore, the workflow delivers the output with the selected rider and the shipping cost. 

**Workflow**

```json
export const deliveryWorkflow = generate({
  name: "deliveryWorkflow",
  inputParameters: ["origin", "packageDestination", "client", "paymentMethod"],
  tasks: [
    {
      taskReferenceName: "possible_riders_ref",
      type: TaskType.SUB_WORKFLOW,
      subWorkflowParam: {
        version: nearByRiders.version,
        name: nearByRiders.name,
      },
      inputParameters: {
        place: "${workflow.input.origin}",
      },
    },
    {
      taskReferenceName: "pick_a_rider_ref",
      type: TaskType.SUB_WORKFLOW,
      subWorkflowParam: {
        version: pickRider.version,
        name: pickRider.name,
      },
      inputParameters: {
        targetRiders: "${possible_riders_ref.output.possibleRiders}",
        maxCompetingRiders: 5,
      },
    },
    {
      taskReferenceName: "calculate_package_distance_ref",
      type: TaskType.SUB_WORKFLOW,
      subWorkflowParam: {
        version: calculateDistanceWF.version,
        name: calculateDistanceWF.name,
      },
      inputParameters: {
        from: "${workflow.input.origin}",
        to: "${workflow.input.packageDestination}",
        identity: "commonPackage",
      },
    },
    {
      type: TaskType.SWITCH,
      name: "compute_total_cost",
      evaluatorType: "value-param",
      inputParameters: {
        value: "${workflow.input.paymentMethod}",
      },
      expression: "value",
      decisionCases: {
        card: [
          {
            type: TaskType.INLINE,
            taskReferenceName: "card_price_ref",
            inputParameters: {
              distance: "${calculate_package_distance_ref.output.distance}",
              expression: ($: { distance: number }) =>
                function () {
                  return $.distance * 20 + 20;
                },
            },
          },
          {
            type: TaskType.SET_VARIABLE,
            inputParameters: {
              totalPrice: "${card_price_ref.output.result}",
            },
          },
        ],
      },
      defaultCase: [
        {
          type: TaskType.INLINE,
          taskReferenceName: "non_card_price_ref",
          inputParameters: {
            distance: "${calculate_package_distance_ref.output.distance}",
            expression: ($: { distance: number }) =>
              function () {
                return $.distance * 40 + 20;
              },
          },
        },
        {
          type: TaskType.SET_VARIABLE,
          inputParameters: {
            totalPrice: "${non_card_price_ref.output.result}",
          },
        },
      ],
    },
  ],
  outputParameters: {
    rider: "${pick_a_rider_ref.output.selectedRider}",
    totalPrice: "${workflow.variables.totalPrice}",
  },
});
```

## Wrapping Up

And our app is finally ready. Building an app this way resembles the same process as app building via coding. But here, we put together small building blocks to make a giant workflow. 
 
Following this article along with [Orkes Playground](https://play.orkes.io/), you can seamlessly visualize the building blocks. You can make further improvements to the application by focusing on that particular block without losing the application's perspective as a whole.
 [
You can test out Conductor for free in [Orkes Playground](https://play.orkes.io/), or if you’re looking for a cloud version, you may have a sneak peek at [Orkes Cloud](https://orkes.io/cloud/).
