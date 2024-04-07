#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let todoList: string[] = [];
let conditions = true;

// Print welcome message
console.log(
  chalk.cyanBright.bold(
    `\n \t\t <<<=============================================>>>`
  )
);
console.log(
  chalk.cyanBright.bold(
    `\n \t\t <<<=======>>>Welcome to Todo List App <<<=======>>>`
  )
);
console.log(
  chalk.cyanBright.bold(
    `\n \t\t <<<=============================================>>>`
  )
);

let main = async () => {
  while (conditions) {
    let option = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: chalk.green( "Select an option you want to do: "),
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View Todo List",
          "Exit",
        ],
      },
    ]);
    if (option.choice === "Add Task") {
      await addTask();
    } else if (option.choice === "Delete Task") {
      await deleteTask();
    } else if (option.choice === "Update Task") {
      await updateTask();
    } else if (option.choice === "View Todo List") {
      await viewTask();
    } else if (option.choice === "Exit") {
      conditions = false;
    }
  }
};
// function to add new task in the list
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: chalk.green("Enter your new task"),
    },
  ]);
  todoList.push(newTask.task);
  console.log(`\n ${newTask.task} added in your list successfully\n`);
};
// function to view all todo list task
let viewTask = () => {
  console.log(chalk.magenta.bold("\nYour Todo List:\n"));
  todoList.forEach((task, index) => {
    console.log(`${index + 1}: ${task}`);
  });
};
// function to delete a task from list
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green("Enter the 'index no' of the task you want to delete :"),
    },
  ]);
  let deletedTask = todoList.splice(taskIndex.index - 1, 1);
  console.log(`\n ${deletedTask} has been deleted from your list\n`);
};
// function to update a task
let updateTask = async () => {
  await viewTask();
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: chalk.green("Enter the 'index no' of the task you want to update :"),
    },
    {
      name: "new_task",
      type: "input",
      message: chalk.green("Now enter the new task name :"),
    },
  ]);
  todoList[update_task_index.index - 1] = update_task_index.new_task;
  console.log(
    `\n Task at index no. ${update_task_index.index} updated successfully [for updated list check option:"View Todo List"]`
  );
};
main();
