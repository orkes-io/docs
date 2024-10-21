---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Install from '@site/src/components/install.mdx';


# Step 4: Running an Inline Function

[Continuing from Step 3](/getting-started/adding-custom-code-worker)

So far, we haven't done anything here, even if the fraud check fails. How can we handle the case where the fraud check returned a fail, and we want to skip processing the deposit transaction? We can add another inline task that can check for the outcome of the fraud check and send a different message to our users via SMS or Email.

<Tabs>
<TabItem value="UI" label="UI">

<div className="row">
<div className="col col--4">

1. In your current workflow, add an [Inline](/content/reference-docs/system-tasks/inline) task after the switch case.
2. Add another switch case to process the deposit only if the fraud check passes.
3. Add an inline to compose the correct message for users.
4. Pass the message as input to the send-message tasks.
5. [Run workflow](/developer-guides/running-workflows#run-in-ui).

</div>
<div className="col">
<div className="embed-loom-video">
<iframe width="500" height="315" src="https://www.youtube.com/embed/y66AKuKLf2s?si=yaYNEazXWoh1tExU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="allowfullscreen"
mozallowfullscreen="mozallowfullscreen"
msallowfullscreen="msallowfullscreen"
oallowfullscreen="oallowfullscreen"
webkitallowfullscreen="webkitallowfullscreen"></iframe></div>
</div>
</div>
</TabItem>
</Tabs>

:::tip
INLINE task is a great tool for writing basic logic, such as a predicate condition or object data transforms. With JavaScript, you can
write complex actions that will be executed by Conductor without having to find a place to host and run this worker.
:::

INLINE tasks can be scripted from the following template:
```javascript
(function() { 
   // Your code here
   // Variables for this function needs to be explicitly added as inputs and once added you can 
   // refer to them using the $.<variable-name> notation.
   return $.amount > 10000; 
})();
```

Read more on [INLINE tasks here](/content/reference-docs/system-tasks/inline).

* **[Step 5: Adding Wait Conditions](/getting-started/adding-wait-conditions)**
* **[Step 6: Executing Tasks in Parallel](/getting-started/executing-tasks-in-parallel)**