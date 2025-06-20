## Remarks regarding the assignment

I decided to descope the following items from the original brief due to time constraints:

- We only update 1 joint at a time through UI
- We won’t animate gripper (not included in 3D model)
- We don’t animate lift (not included in 3D model)
- We use a simple easing function for trajectory calculations and don't consider maxSpeed and acceleration
- We don’t use authentication for client <--> ws communication
- We don’t make app available offline (Webworkers etc)
- We don’t make app responsive

If I had more time:

- I would do more research to find a JS lib to calculate the movement trajectory properly
- I would add tests for both back-end and front-end
- I would increase error handling and make it more robust for different types or errors
