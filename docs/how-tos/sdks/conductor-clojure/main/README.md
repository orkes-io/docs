# Conductor Clojure

Software Development Kit for Netflix Conductor, written on and providing support for Clojure

## Get the SDK
https://clojars.org/io.orkes/conductor-clojure

## Quick Guide

1. Create connection options

```clojure
(def options {
                  :url  "http://localhost:8080/api/" ;; Conductor Server Path
                  :app-key "THIS-IS-SOME-APP-KEY" ;; Optional if using Orkes Conductor
                  :app-secret "THIS-IS-SOME-APP-SECRET" ;; Optional if using Orkes Conductor
              } )
```
1. Creating a task using above options 

``` clojure
(ns some.namespace 
    (:require [io.orkes.metadata :as metadata])

    ;; Will Create a task. returns nil
    (metadata/register-tasks options [{
                         :name "cool_clj_task"
                         :description "some description"
                         :ownerEmail "somemail@mail.com"
                         :retryCount 3
                         :timeoutSeconds 300
                         :responseTimeoutSeconds 180 }])
)
```

2. Creating a Workflow that uses the task 

``` clojure
(ns some.namespace 
    (:require [io.orkes.metadata :as metadata])

;; Will Register a workflow that uses the above task returns nil
(metadata/register-workflow-def options {
                                              :name "cool_clj_workflow"
                                              :description "created programatically from clj"
                                              :version 1
                                              :tasks [ {
                                                       :name "cool_clj_task"
                                                       :taskReferenceName "cool_clj_task_ref"
                                                       :inputParameters {}
                                                       :type "SIMPLE" 
                                                       } ]
                                              :inputParameters []
                                              :outputParameters {:message "${clj_prog_task_ref.output.:message}"}
                                              :schemaVersion 2
                                              :restartable true
                                              :ownerEmail "owner@yahoo.com"
                                              :timeoutSeconds 0
                                         }))

```
3. Create and run a list of workers

``` clojure
;; Creates a worker and starts polling for work. will return an instance of Runner which can then be used to shutdown
(def shutdown-fn (runner-executor-for-workers
               (list {
                      :name "cool_clj_task"
                      :execute (fn [someData]
                                 [:completed {:message "Hi From Clj i was created programatically"}])
                      })
               options ))

;; Shutsdown the polling for the workers defined above
(shutdown-fn)
               
```
## Options
Options are a map with optional paremeters
```
(def options {
                  :url  "http://localhost:8080/api/" ;; Api url (Optional will default to "http://localhost:8080")
                  :app-key "THIS-IS-SOME-APP-KEY" ;; Application Key (This is only relevant if you are using Orkes Conductor)
                  :app-secret "THIS-IS-SOME-APP-SECRET" ;; Application Secret (This is only relevant if you are using Orkes Conductor)
              } )
```


## Metadata namespace
Holds the functions to register workflows and tasks.

`(:require [conductor.metadata :as metadata])`

### Registering tasks

Takes the option map and a list/vector of tasks to register. on success it will return nil

```clojure
(metadata/register-tasks options [{
                                                  :name "cool_clj_task_b"
                                                  :description "some description"
                                                  :ownerEmail "mail@gmail.com"
                                                  :retryCount 3
                                                  :timeoutSeconds 300
                                                  :responseTimeoutSeconds 180 },
                                                 {
                                                  :name "cool_clj_task_z"
                                                  :description "some description"
                                                  :ownerEmail "mail@gmail.com"
                                                  :retryCount 3
                                                  :timeoutSeconds 300
                                                  :responseTimeoutSeconds 180 }
                                                 {
                                                  :name "cool_clj_task_x"
                                                  :description "some description"
                                                  :ownerEmail "mail@gmail.com"
                                                  :retryCount 3
                                                  :timeoutSeconds 300
                                                  :responseTimeoutSeconds 180 }
                                                 ])
```
    
### Registering a workspace 
```clojure 
(metadata/register-workflow-def options {
                                                        :name "cool_clj_workflow_2"
                                                        :description "created programatically from clj"
                                                        :version 1
                                                        :tasks [ {
                                                                  :name "cool_clj_task_b"
                                                                  :taskReferenceName "cool_clj_task_ref"
                                                                  :inputParameters {}
                                                                  :type "SIMPLE"
                                                                  },
                                                                {
                                                                 :name "someting",
                                                                 :taskReferenceName "other"
                                                                 :inputParameters {}
                                                                 :type "FORK_JOIN"
                                                                 :forkTasks [[
                                                                               {
                                                                                :name "cool_clj_task_z"
                                                                                :taskReferenceName "cool_clj_task_z_ref"
                                                                                :inputParameters {}
                                                                                :type "SIMPLE"
                                                                                }
                                                                               ]
                                                                              [
                                                                               {
                                                                                :name "cool_clj_task_x"
                                                                                :taskReferenceName "cool_clj_task_x_ref"
                                                                                :inputParameters {}
                                                                                :type "SIMPLE"
                                                                                }
                                                                               ]
                                                                              ]
                                                                 }
                                                                {
                                                                 :name "join"
                                                                 :type "JOIN"
                                                                 :taskReferenceName "join_ref"
                                                                 :joinOn [ "cool_clj_task_z", "cool_clj_task_x"]
                                                                 }
                                                                ]
                                                        :inputParameters []
                                                        :outputParameters {"message" "${clj_prog_task_ref.output.:message}"}
                                                        :schemaVersion 2
                                                        :restartable true
                                                        :ownerEmail "mail@yahoo.com"
                                                        :timeoutSeconds 0
                                                        :timeoutPolicy "ALERT_ONLY"
                                                        })
```


## TaskRunner namespace
The taskrunner namespace holds the function to start a workflow and running a worker

`[io.orkes.taskrunner :as conductor]`
 
``` clojure
;; Creates a worker and starts polling for work. will return an instance of Runner which can then be used to shutdown
(def shutdown-fn (conductor/runner-executor-for-workers
 options              
(list {
                      :name "cool_clj_task"
                      :execute (fn [someData]
                                 [:completed {:message "Hi From Clj i was created programatically"}])
                      })
                ))

;; Shutsdown the polling for the workers defined above
(shutdown-fn)
               
```
The (runner-executor-for-workers) function will take a list of worker implementations map, and options and start pooling for work
it will return a TaskRunnerConfigurer instance, which you can shutdown by calling the .shutdown() java method

## Utils.
Treat conductor workflows as simple tree data structures


`[io.orkes.utils :as ut]`
 
``` clojure
;; Rename every single task to fakeName. Wil transverce the whole tree and aplly the transformation function.

(ut/map-wf-tasks #(assoc % :name "fakeName")
                                                  wf-fork-example)
                                                  
;; Given a workflow wf-fork-example in this case will return a new workflow without the task with the taskReferenceName "cool_clj_task_ref"
(ut/filter-wf-tasks
                           #(not= (:taskReferenceName %) "cool_clj_task_ref")
                           wf-fork-example)
               
```


