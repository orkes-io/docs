---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 4: Running an inline function

So far, we haven't done anything here even if the fraud check fails. How can we handle the case where the fraud check returned a fail and we want to skip
processing the deposit transaction, but we can add another inline task that can check for the outcome of fraud check and sends a different message to our users via SMS or Email.


<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">

1. In your current workflow, add a [Inline](/content/reference-docs/system-tasks/inline) task after the switch case
2. Add another switch case to process the deposit only if the fraud check passes
3. Add an inline to compose the correct message for users
4. Pass the message as inputs to the send-message tasks
5. Run workflow

</div>
<div className="col">
<div className="embed-loom-video">
<iframe
  width="100%"
  height="300px"
  allow="fullscreen;"
  src={"https://player.vimeo.com/video/814101164?h=e8e6172101"}
></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

:::tip
INLINE task is a great tool for writing basic logic, such as a predicate condition or object data transforms. With Javascript, you can
write complex actions that will be executed by Conductor without having to find a place to host and run this worker.
:::

INLINE tasks can be scripted from the following template
```javascript
(function() { 
   // Your code here
   // Variables for this function needs to be explicitly added as inputs and once added you can 
   // refer to them using the $.<variable-name> notation.
   return $.amount > 10000; 
})();
```

Read more on INLINE tasks [here](/content/reference-docs/system-tasks/inline)

## Related Topics

- Passing [inputs into workflow for tasks](/content/guides/passing-data-task-to-task#task-inputs-referred-from-workflow-inputs)
- Passing the [output of one task to the input](/content/guides/passing-data-task-to-task#task-inputs-referred-from-other-task-outputs) of another
- [Client SDKs](/content/conductor-clients)