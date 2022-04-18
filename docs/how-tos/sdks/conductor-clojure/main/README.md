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

