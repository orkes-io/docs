
# Automating Extract, Transform, and Load (ETL) process using Conductor

Various business processes can be automated by leveraging Conductor workflows. This documentation deals with a sample use case based on ETL, i.e., Extract, Transform, and Load process.  

Let’s consider an example use case where a workflow extracts data from GitHub, transforms it, and then uploads it to Orbit.

|[Try it in Orkes Playground](https://play.orkes.io/workflowDef/Github_star_workflow)|
|---|

:::note
You need API keys for both GitHub and Orbit to use this workflow.
:::

## ETL Workflow

![ETL GitHub to Orbit workflow](https://orkes.io/content/img/blogassets/orbitworkflow.png)

Let’s see the workflow in detail to what each block stands for:

1. The workflow is initiated by providing input data to connect your GitHub account with Orbit. 

| Input Parameters  | Description   |
| ----------------  | -----------   |
| gh_account        | The name of the GitHub account hosting the repository. |
| gh_repo           | GitHub repository name. |
| star_offset       | Provide the repo’s current star count when the workflow begins. |
| gh_token          | GitHub account’s API token. |
| orbit_workspace   | The Orbit workspace where data is to be uploaded. |
| activity_name     | Provide the activity name that is being carried out in the Orbit. In this case, it would be *starredConductor* as how we mark when Conductor has been starred. |
| orbit_api_key     | The Orbit account’s API key to authenticate the uploads. |

2. Once the inputs are given, the workflow begins with the task to calculate the preview's cut-off time, i.e., This workflow runs every 24 hours. So, what you need is to calculate the stars gained in the last 24 hours only. This is executed using the **calculate_start_cutoff** task, an inline task that takes a javascript expression to calculate the 24 hours preview. 
3. The next step is getting the repository details which is executed using the **Get_repo_details** task. It is an HTTP task that polls the GitHub repo to get the details, such as the total number of current stars, etc.
4. Now the workflow moves into a do-while loop **get_all_stars** that extracts the data from the GitHub. This loop calculates the number of queries to be made based on the start cut-off value from the input data and the end cut-off value, which is the total number of stars now. 
5. Each of the loops runs three tasks:
    * **pagination_calc** - An inline task to create the GitHub page counter.
    * **100_stargazers**  - The task to extract 100 entries from GitHub.
    * **jq_cleanup_stars** - Simplifies and formats the GitHub output to Orbit’s input data.
6. The next step is combining all the orbit inputs into a single JSON array. It is done using the **jq_start_combine** task; a JSON JQ transform task.
7. Now we need to load the activities to Orbit. Each activity is to be uploaded individually and is accomplished via another loop task, **loop_through_users**.
8. Each of the loops runs two tasks:
    * **zero_offset_fix** - This task is used to avoid an off-by-one error caused because the do/while iterator starts at one and the JSON array starts at index zero.
    * **post_to_orbit** - An HTTP task that sends the data to Orbit. 

Wanna know in detail about each of these tasks? Have a look at our blog on [ETL workflow](https://orkes.io/content/blog/conductor-etl-example).