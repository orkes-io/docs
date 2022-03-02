# Hello World Codelab 

## Parts 1-3

What we've covered so far:

[Hello World Part 1](./helloworld) We created the Hello World Workflow.

[Hello World Part 2](./helloworld2)  We created V2 of Hello World (Versioning) and added a HTTP Task.

[Hello World Part 3](./helloworld3)  We created V3 of Hello World, and introduced the concept of FORK and JOIN tasks.

## Part 4

In Part 4 of the code lab, we'll add in an inline task to perform simple logic operations during our workflow.

## Where we stand

![Forked workflow](img/hw3_workflow.png)

Our workflow is split into 2 forks, one that creates the "Hello World!" message, and the other fork that grabs the users IP address, and extracts their location.

Let's add a second task that extracts the time of the user, and spits out the local time.  To do this we will utilize the [Inline Task](content/docs/reference-docs/system-tasks/inline-task).

## Inline task

Inline tasks run basic JavaScript calculations.  In this case, we will get the current time (GMT) from the Conductor server, and then calculate the users' current time.  The ```get_IP``` task returns a lot of details about the IP address, and one of the responses is ```offset``` which is the time difference (in seconds) from GMT.

in JavaScript, the code to convert the time from GMT to the current time looks like:

> Note: this code accounts for time zones that have hour fractions in them.

```
function e() {
	var offsetSeconds = $.offsetSeconds;
    var today = new Date($.date);
    var GMTHours = today.getHours();
    var GMTMinutes = today.getMinutes();
    var localHour = 0;
	var hoursSum = 0;
    var extraHour =0;
	var offsetHours=0;
    var localMinute = 0;
    if($.offsetSeconds%3600 == 0){
        //simple time zone
        offsetHours = offsetSeconds/3600;
        hoursSum = GMTHours + offsetHours + extraHour;
		
		localMinute = GMTMinutes;
    }
	else{
	        //complex time zone
	        //figure out number of minutes, and if need be - add an extra hour.
	        var minutesSum = (offsetSeconds%3600)/60 + GMTMinutes;
	        extraHour = 0;
	        if(minutesSum >=60){
	            localMinute = minutesSum-60;
	            extraHour = 1;
	        }else{
	            localMinute = minutesSum;
	        }
	        offsetHours=(offsetSeconds - offsetSeconds%3600)/3600;
	        hoursSum = GMTHours + offsetHours + extraHour;
	    }
	
    if(hoursSum>23){
        localHour = hoursSum- 24;
    }else if( hoursSum <0){
        localHour = hoursSum+ 24;
    }else{
        localHour = hoursSum;
    }
	
	var minuteString = ("0" + localMinute).slice(-2);
	
	return {"hour": localHour, "minute": minuteString};
}
e();
```

An Inline Task has ```inputParameters``` for all the values needed in the computation, and for the ```expression``` to be evaluated.  To add our JavaScript expression, we need to [minify the JS](https://www.toptal.com/developers/javascript-minifier/) using an online JS minifier.  

## Version 4 of the workflow

The inline task calculation will run in the same fork as the getIP.  The JOIN will now wait for the inline task to finish (instead of the get_IP task).

```
{
  "name": "hello_world_<uniqueId>",
  "description": "hello world Workflow",
  "version": 4,
  "tasks": [
    {"name":"hello_world_fork",
     "taskReferenceName":"hw_fork_ref",
     "type":"FORK_JOIN",
     "forkTasks":[
         [
           {
                "name": "hello_world_<uniqueid>",
                "taskReferenceName": "hello_world_ref",
                "inputParameters": {},
                "type": "SIMPLE",
                "decisionCases": {},
                "defaultCase": [],
                "forkTasks": [],
                "startDelay": 0,
                "joinOn": [],
                "optional": false,
                "defaultExclusiveJoinTask": [],
                "asyncComplete": false,
                "loopOver": []
            }     

         ],[
            {
                "name": "Get_IP",
                "taskReferenceName": "get_IP",
                "inputParameters": {
                    "http_request": {
                    "uri": "http://ip-api.com/json/${workflow.input.ipaddress}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,offset,isp,org,as,query",
                    "method": "GET"
                    }
                },
            "type": "HTTP"
            },
            {
                "name": "calculate_local_time",
                "taskReferenceName":"calculate_local_time_ref",
                "type":"INLINE",
                "inputParameters":{
                    "date":"${get_IP.output.response.headers.Date[0]",
                    "offsetSeconds" : "${get_IP.output.response.body.offset}",
                    "evaluatorType": "javascript",
                    "expression":<minified JS>
                }


            }
         ]
     ]},
     {
        "name": "hello_world_join",
        "taskReferenceName": "hw_join_ref",
        "type": "JOIN",
        "joinOn": [
        "calculate_local_time_ref",
        "hello_world_ref"
        ]

     }

  ],
  "outputParameters": {

    "hw_response": "${hello_world_ref.output.hw_response}",
    "hw_location": "We hope the weather is nice near ${get_IP.output.response.body.city}",
    "hw_time": "The Local time is ${calculate_local_time_ref.output.result.hour}:${calculate_local_time_ref.output.result.minute}"

  },
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": true,
  "ownerEmail": "devrel@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}

```

The changes are:  
1. Adding the ```calculate_local_time``` task in the fork after ```get_IP``` with the minified JavaScript code.
2. In the Join, we now ```joinOn calculate_local_time_ref``` instead of ```Get_IP```, because the calculation task is now the last task in the fork.
3.  The ```outputParameters``` now have a ```hw_time``` parameter that gives the local time.

The diagram is now:  

![version four workflow diagram](img/hw4_diagram.png)

When we run the workflow, the workflow output is now:

```
{
"hw_location":"We hope the weather is nice near Kennebunk"
"hw_time":"The Local time is 11:02"
"hw_response":"Hello World!"
}
```

## Next Steps

This completes part 4 of the Hello World Codelab. To review what we've done:


In [Part 1](helloworld), we created a workflow using the Netflix Conductor in the Orkes Playground

In [Part 2](helloworld2), we extended the workflow using versioning, and added a HTTP Task.

In [Part 3](helloworld3), we created parallel workflows using the FORK task.

In Part 4, we created an Inline task, and used JavaScript to complete a simple calculation on the Conductor server, and return the results.

Part 5 will be our last section, and we will use a Switch task and the Set Variable task to complete our Hello World code lab.  Ready to go? [On to Part 5!](helloworld5)

