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
    (:require [conductor.metadata :as metadata])

    ;; Will Create a task. returns nil
    (metadata/register-tasks options [{
                         :name "cool_clj_task"
                         :description "some description"
                         :owner-email "somemail@mail.com"
                         :retry-count 3
                         :timeout-seconds 300
                                   :response-timeout-seconds 180 }])
)
```

2. Creating a Workflow that uses the task 

``` clojure
(ns some.namespace 
    (:require [conductor.metadata :as metadata])

;; Will Register a workflow that uses the above task returns nil
(metadata/register-workflow-def options {
                                              :name "cool_clj_workflow"
                                              :description "created programatically from clj"
                                              :version 1
                                              :tasks [ {
                                                       :name "cool_clj_task"
                                                       :task-reference-name "cool_clj_task_ref"
                                                       :input-parameters {}
                                                       :type :simple
                                                       } ]
                                              :input-parameters []
                                              :output-parameters {:message "${clj_prog_task_ref.output.:message}"}
                                              :schema-version 2
                                              :restartable true
                                              :owner-email "owner@yahoo.com"
                                              :timeout-seconds 0
                                         }))

```
3. Create and run a list of workers

``` clojure
;; Creates a worker and starts polling for work. will return an instance of Runner which can then be used to shutdown
(def instance (runner-executor-for-workers
               (list {
                      :name "cool_clj_task"
                      :execute (fn [someData]
                                 [:completed {:message "Hi From Clj i was created programatically"}])
                      })
               options ))

;; Shutsdown the polling for the workers defined above
(.shutdown instance)
               
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
                                                  :owner-email "mail@gmail.com"
                                                  :retry-count 3
                                                  :timeout-seconds 300
                                                  :response-timeout-seconds 180 },
                                                 {
                                                  :name "cool_clj_task_z"
                                                  :description "some description"
                                                  :owner-email "mail@gmail.com"
                                                  :retry-count 3
                                                  :timeout-seconds 300
                                                  :response-timeout-seconds 180 }
                                                 {
                                                  :name "cool_clj_task_x"
                                                  :description "some description"
                                                  :owner-email "mail@gmail.com"
                                                  :retry-count 3
                                                  :timeout-seconds 300
                                                  :response-timeout-seconds 180 }
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
                                                                  :task-reference-name "cool_clj_task_ref"
                                                                  :input-parameters {}
                                                                  :type :simple
                                                                  },
                                                                {
                                                                 :name "someting",
                                                                 :task-reference-name "other"
                                                                 :input-parameters {}
                                                                 :type :fork-join
                                                                 :fork-tasks [[
                                                                               {
                                                                                :name "cool_clj_task_z"
                                                                                :task-reference-name "cool_clj_task_z_ref"
                                                                                :input-parameters {}
                                                                                :type :simple
                                                                                }
                                                                               ]
                                                                              [
                                                                               {
                                                                                :name "cool_clj_task_x"
                                                                                :task-reference-name "cool_clj_task_x_ref"
                                                                                :input-parameters {}
                                                                                :type :simple
                                                                                }
                                                                               ]
                                                                              ]
                                                                 }
                                                                {
                                                                 :name "join"
                                                                 :type :join
                                                                 :task-reference-name "join_ref"
                                                                 :join-on [ "cool_clj_task_z", "cool_clj_task_x"]
                                                                 }
                                                                ]
                                                        :input-parameters []
                                                        :output-parameters {"message" "${clj_prog_task_ref.output.:message}"}
                                                        :schema-version 2
                                                        :restartable true
                                                        :owner-email "mail@yahoo.com"
                                                        :timeout-seconds 0
                                                        :timeout-policy :alert-only
                                                        })
```

Current supported task types :

```clojure
:simple
:dynamic
:fork-join
:fork-join-dynamic
:decision 
:switch 
:join 
:do-while 
:sub-workflow 
:event 
:wait 
:user-defined 
:http 
:lambda 
:inline 
:exclusive-join 
:terminate 
:kafka-publish
:json-jq-transform
:set-variable
```

## Client namespace
The client namespace holds the function to start a workflow and running a worker

`[conductor.client :as conductor]`
 
``` clojure
;; Creates a worker and starts polling for work. will return an instance of Runner which can then be used to shutdown
(def instance (runner-executor-for-workers
               (list {
                      :name "cool_clj_task"
                      :execute (fn [someData]
                                 [:completed {:message "Hi From Clj i was created programatically"}])
                      })
               options ))

;; Shutsdown the polling for the workers defined above
(.shutdown instance)
               
```
The (runner-executor-for-workers) function will take a list of worker implementations map, and options and start pooling for work
it will return a TaskRunnerConfigurer instance, which you can shutdown by calling the .shutdown() java method

## Mapper-Utils namespace
The  `[conductor.mapper-utils :as mapper-utils]` namespace holds the functions to map to java object which are mostly not necesary.

### The mapper-utils/java-map->clj-map protocol
Will map a java map to a clojure map which may come in handy for workers implementation. for example consider a worker that sums two input parameters. For a workflow defined like this :

``` clojure
(metadata/register-workflow-def options {:name "simple_wf"
                                         :description "created programatically from clj"
                                         :version 1
                                         :tasks [{:name "simplest_task"
                                                  :task-reference-name "repl_task_ref"
                                                  :input-parameters {"firstNumber" "${workflow.input.firstNumber}"
                                                                     "secondNumber" "${workflow.input.secondNumber}"}
                                                  :type :simple}]
                                         :input-parameters ["firstNumber" "secondNumber"]
                                         :output-parameters {"result" "${repl_task_ref.output.:result}"}
                                         :schema-version 2
                                         :restartable true
                                         :owner-email "mail@yahoo.com"
                                         :timeout-seconds 0
                                         :timeout-policy :alert-only})
```

To be able to use the input params you would need to use the string names like this:

``` clojure
(def instance (conductor/runner-executor-for-workers
               (list {:name "simplest_task"
                      :execute (fn [someData]
                                                            
                                 [:completed {"result" (+ (get someData "firstNumber") (get someData "secondNumber"))}])})
               options))
```

A more clojure friendly way would be to convert to clojure our map :

``` clojure
(def instance (conductor/runner-executor-for-workers
               (list {:name "simplest_task"
                      :execute (fn [someData]
                      (let [convertedToClj (-> someData mapper-utils/java-map->clj-map)]
                        [:completed {"result" (+ (:firstNumber convertedToClj) (:secondNumber convertedToClj))}]
                      ))})
               options))
```



