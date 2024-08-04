# BACKEND FOR TASK MANAGER

## Please run **(npm i)** before you move forward

## ALL NPM SCRIPTS

- **npm run test** _To run the testcases_
- **npm run lint** _To run lint_
- **npm run start** _To run the server_
- **npm run dev** _To run the server using nodemon_

After you run the project you can access the backend on **<http://localhost:3000>**

## A TASK

A task will consist of a **taskName (Task description), dueBy (Deadline), status (new/ongoing/completed)**

## ALL API ROUTES

- **/tasks** GET (To fetch list of tasks)

  ```
  Response:
  {
    "status": true,
    "data": [
        {
            "_id": "66af6b83b3a915fb60dcf2f8",
            "taskName": "This is a task",
            "dueBy": "2024-08-14T00:00:00.000Z",
            "status": "completed",
            "__v": 0
        },
        ...
    ],
    "message": "success"
  }
  ```

- **/tasks** POST (To add a task )

  ```
  Payload: {
    taskName: "This is a task",
    dueBy: "2024-08-04",
    status: "new"
  }

  Response:
  {
    "status": true,
    "data":
        {
            "_id": "66af6b83b3a915fb60dcf2f8",
            "taskName": "This is a task",
            "dueBy": "2024-08-04T00:00:00.000Z",
            "status": "new",
            "__v": 0
        },
    "message": "success"
  }
  ```

- **/tasks/:id** PUT (To update a task )

  ```
  Param: /tasks/66af6b83b3a915fb60dcf2f8

  Payload: {
    taskName: "This is a task 1",
    dueBy: "2024-08-04",
    status: "new"
  }

  Response:
  {
    "status": true,
    "data":
        {
            "_id": "66af6b83b3a915fb60dcf2f8",
            "taskName": "This is a task",
            "dueBy": "2024-08-04T00:00:00.000Z",
            "status": "new",
            "__v": 0
        },
    "message": "success"
  }
  ```

- **/tasks/:id** DELETE (To delete a task )

  ```
  Param: /tasks/66af6b83b3a915fb60dcf2f8

  Response:
  {
    "status": true,
    "data":
        {
            "_id": "66af6b83b3a915fb60dcf2f8",
            "taskName": "This is a task",
            "dueBy": "2024-08-04T00:00:00.000Z",
            "status": "new",
            "__v": 0
        },
    "message": "success"
  }
  ```
