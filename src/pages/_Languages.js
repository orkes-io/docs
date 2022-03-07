import React from "react";
import CodeBlock from "@theme/CodeBlock";
import styles from "./_Languages.module.css";


const CodeBlockWrapper = ({lang,children})=>(
  <CodeBlock className={`language-${lang} ${styles.codeBlock}`}>
    {children}
  </CodeBlock>
)

export const JavaSample = () => (
  <CodeBlockWrapper lang="java">
    {`
    @Override
    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);
        result.setStatus(TaskResult.Status.COMPLETED);
        String currentTimeOnServer = Instant.now().toString();
        result.addOutputData("currentTimeOnServer", currentTimeOnServer);
        result.addOutputData("message", "Hello World!");
        return result;
    }
    `}
  </CodeBlockWrapper>
);

export const JavascriptSample = () => (
  <CodeBlockWrapper lang="js">
    {`
function helloWorld() {
    console.log('Hello, world!');
}
    `}
  </CodeBlockWrapper>
);

export const PythonSample = () => (
  <CodeBlockWrapper lang="py">
    {`
class SimplePythonWorker(WorkerInterface):
    def execute(self, task):
        task_result = self.get_task_result_from_task(task)
        task_result.add_output_data('message', 'Hello World')
        task_result.status = 'COMPLETED'
        return task_result
    `}
  </CodeBlockWrapper>
);

export const TypescriptSample = () => (
  <CodeBlockWrapper lang="ts">
    {`
const helloWorld:string = "Hello World"
console.log(helloWorld);
    `}
  </CodeBlockWrapper>
);

export const RustSample = () => (
  <CodeBlockWrapper lang="rust">
    {`
fn task(arg: i32) -> (i32, u32) {
    let x = random::<u32>();
    let s = x % 5000;
    thread::sleep(Duration::from_millis(s as u64));
    (arg, s)
}
    `}
  </CodeBlockWrapper>
);

export const GoSample = () => (
  <CodeBlockWrapper lang="go">
    {`
func Hello_World_Execute_Function(t *task.Task) (taskResult *task.TaskResult, err error) {
    taskResult = task.NewTaskResult(t)
    
    output := map[string]interface{}{"message":"Hello World"}
    taskResult.OutputData = output
    taskResult.Status = "COMPLETED"
    err = nil

    return taskResult, err
}
    `}
  </CodeBlockWrapper>
);

