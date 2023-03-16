---
displayed_sidebar: orderfulfillment
---

# Building and Deploying a Java Worker

# Order Fulfillment Codelab part 2

You're running order fulfillment at Bob's Widgets, and it's totally manual. You're working with Conductor to create workflows and work to better automate the system.

In part 1 of this codelab, we created our first workflow and task - all built to run the `widget_shipping` worker that Bob gave you on your first day.

In part 2, we'll get the worker (the microservice) up and running and connect the application with our remote Conductor server. Are you ready? Let's get started!

## Worker Code

The worker can be found in the [Orkesworkers GitHub repository](https://github.com/orkes-io/orkesworkers)). This repo has a number of workers for different demos. In this case, we're interested in widgetShipping.java (and also the OrkesWorkersApplication.java).

## Our First worker

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/J-Nk6nlnwxI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

Let's take a look at the code that we received from Bob, modified to make it a Conductor Worker.

A Conductor worker has 2 parts:

- `getTaskDefName` that returns the name of the worker to Conductor (in this case, `widget_shipping_<uniqueId>`).
  - This name must match the name of the task we created in [part 1](/content/docs/codelab/orderfulfillment). This is how we 'wire' our worker into the task.
- `TaskResult` This is the Java that is actually executing the task for us. This is a demo, so there is some _magic_ here. The tracking number is a 16 digit random number, and of course, the label never actually prints anywhere.

```java
@Component
public class widgetShipping implements Worker {
    @Override
    public String getTaskDefName() {
        return "widget_shipping_<uniqueId>";
    }

    @Override
    public TaskResult execute(Task task) {

        TaskResult result = new TaskResult(task);
            String name = (String) task.getInputData().get("name");
            String street = (String) task.getInputData().get("street");
            String city = (String) task.getInputData().get("city");
            String state = (String) task.getInputData().get("state");
            String zip = (String) task.getInputData().get("zip");
            String fullAddress = name + ","+ street + ","+ city + ", "+ state + " " + zip;
            try {
                //generate 16 number shipping label
                int eightdigit1 = (int)(Math.floor(Math.random()*100000000));
                int eightdigit2 = (int)(Math.floor(Math.random()*100000000));

                String tracking = Integer.toString(eightdigit1) + " " +Integer.toString(eightdigit2);

                //magic that creates the label and prints it in the shipping bay

                result.setStatus(TaskResult.Status.COMPLETED);
                result.addOutputData("fullAddress", fullAddress);
                result.addOutputData("trackingNumber", tracking);
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        return result;
    }
}

```

It isn't a huge application, but with Conductor, each app can be small. By combining your small and efficient apps, you can build a big and powerful application. If you are using a local version of Conductor for this workflow, you can move ahead to the next section. However, when using the Orkes Playground, we need to wire up a little bit of application security to keep everything connected and running in a secure and safe manner.

Let's get this application wired into a Conductor Workflow!

## Security

With Orkes Playground, you don't want anyone to be able to call your `widget_shipping` worker. Imagine coming in one morning with 1,000 fake labels printed. You don't want to deal with that.

To prevent such disasters from happening, we've built security for your workers and workflows in the Orkes Playground. For your workflow and task to run your worker, you'll need a key & secret from the playground embedded in your worker. This ensures that only the applications provisioned to create shipping labels will actually create shipping labels.

### Key and secret

<p align="center"><iframe width="560" height="315" src="https://www.youtube.com/embed/o6g6j6lWw-k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

To create your key & secret, click `Applications` in the left nav of the Playground. Click `Create Application` to create the application. We'll name our new application "Bobs_orders." There are two tables (both empty). At the of the page, click the `Create Access Key` button. This will generate an Id and Secret. Record both of these values (if you forget, you can create additional Id/Secrets). We'll use these in the worker application to allow for the connection.

These are added to the `application_properties` file in the orkesworkers application. The OrkesWorkersApplication uses these values to create a JWT authentication token.

### Workflow and Task Permissions

In the 2nd table, click the + to begin adding workflows and tasks to the application. You'll want to add the following:

- Workflow: `Bobs_widget_fulfillment` permissions: Execute
- Task: `widget_shipping_<uniqueId>` permissions: Execute

The Application will look similar to this:

<p align="center"><img src="/content/img/codelab/of2_application.png" alt="application security page" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Now we've given the secure connections between the workflow and task in Conductor to talk with the worker!

## Run the Worker

You can run the OrkesWorkerApplication.java in your IDE. You'll see a lot of errors in the terminal - as only the widgetShipping.java has permission to connect to the Playground. If you wish, you can remove the other workers from the folder to remove these error messages and restart the OrkesWorkerApplication.

Now we're ready to run our first workflow!
