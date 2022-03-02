import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./_Languages.module.css";

export const JavaSample = () => (
  <CodeBlock className={`language-java ${styles.codeBlock}`}>
    {`
public class SimpleWorker implements Worker {

    @Override
    public String getTaskDefName() {
        return "simple_worker";
    }

    @Override
    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);
        result.setStatus(TaskResult.Status.COMPLETED);
        String currentTimeOnServer = Instant.now().toString();
        result.log("This is a test log at time: " + currentTimeOnServer);
        result.addOutputData("currentTimeOnServer", currentTimeOnServer);
        result.addOutputData("message", "Hello World!");
        return result;
    }

}
    `}
  </CodeBlock>
);

export const JavascriptSample = () => (
  <CodeBlock className="language-js">
    {`
function helloWorld() {
    console.log('Hello, world!');
}
    `}
  </CodeBlock>
);

export const PythonSample = () => (
  <CodeBlock className="language-py">
    {`
from conductor.client.worker.worker_interface import WorkerInterface


class SimplePythonWorker(WorkerInterface):
    def execute(self, task):
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data('message', 'Hello World')
        task_result.status = 'COMPLETED'
        return task_result
    `}
  </CodeBlock>
);

export const TypescriptSample = () => (
  <CodeBlock className="language-ts">
    {`
const helloWorld:string = "Hello World"
console.log(helloWorld);
    `}
  </CodeBlock>
);

export const RustSample = () => (
  <CodeBlock className="language-rust">
    {`
fn task(arg: i32) -> (i32, u32) {
    let x = random::<u32>();
    let s = x % 5000;
    thread::sleep(Duration::from_millis(s as u64));
    (arg, s)
}
    `}
  </CodeBlock>
);

export const GoSample = () => (
  <CodeBlock className="language-go">
    {`
package task

import (
    "fmt"
)

// Implementation for "task_1"
func Task_1_Execution_Function(t *task.Task) (taskResult *task.TaskResult, err error) {
    log.Println("Executing Task_1_Execution_Function for", t.TaskType)

    //Do some logic
    taskResult = task.NewTaskResult(t)
    
    output := map[string]interface{}{"message":"Hello World"}
    taskResult.OutputData = output
    taskResult.Status = "COMPLETED"
    err = nil

    return taskResult, err
}
    `}
  </CodeBlock>
);

