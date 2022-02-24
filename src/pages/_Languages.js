import React from "react";
import CodeBlock from "@theme/CodeBlock";

export const JavaSample = () => (
  <CodeBlock className="language-java">
    {`
class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello, World");
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
def hello_world():
  print 'Hello, world!'
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

export const CurlSample = () => (
  <CodeBlock className="language-shell">
    {`
curl -i -X POST 
-H "Content-Type: application/json; charset=UTF-8"
-d '{"id":"123","name":"bob"}' "http://www.example.com/service?id=123"
    `}
  </CodeBlock>
);

