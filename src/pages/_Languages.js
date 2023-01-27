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
    @WorkerTask("hello_world")
    public String hello(@InputParam("name") String name) {
        return "Hello, " + name;
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
def get_user_info(task: Task) -> UserInfo:
    userId = task.input_data['userId']
    return UserInfo(name='User X', id=userId)
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
func GetUserInfo(task *model.Task) (interface{}, error) {
	userId, err := GetValueFromTaskInputData(task, "userId")
	if err != nil {
		return nil, err
	}
	userInfo := NewUserInfo("User X", userId)
	userInfo.Email = fmt.Sprintf("%s@example.com", userId)
	userInfo.PhoneNumber = "555-555-5555"
	return userInfo, nil
}
    `}
  </CodeBlockWrapper>
);

