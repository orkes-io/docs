# Order Fulfillment Codelab

IN this codelab, we'll follow Bob (owner of the growing company Bob's Widgets), as he build s a workflow to ship his widgets to customers around the USA.

Bob's Widgets has just moved out of Bob's garage, and he's excited to  unveil online ordering and building an automated workflow to efficiently get the orders out to his growing customer base.

Bob has heard of Netflix Conductor, and has read bout the flexibility of a microservice-based architecture, and hes keen to give that a shot - since he knows that the initial workflow will be really simple (these widgets don't ship themselves, you know!), but will quickly grow in complexity as the company grows.

In this codelab, we'll follow Bob as be builds out a Conductor workflow to handle his shipping.

## A simple order Fulfillment workflow

Bob's in a bind.  The business is taking off, and he needs to get orders shipped, and that leaves him just a little bit of time to build the workflow, but he knows he can take on small pieces at a time.  

He has a warehouse full of widgets, and he's built a Java shipping application that prints a label for one widget box.  Let's look at this application, and then figure out a workflow for Bob's order fulfillment.

##  The Shipping workflow

Bob's application is completely integrated with his shipping partner 

