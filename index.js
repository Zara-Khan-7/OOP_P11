#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    name;
    constructor(n) {
        this.name = n;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
    }
}
const persons = new Person();
const programStart = async (persons) => {
    do {
        console.log(chalk.blue("\n\t***WELCOME TO THE PORTAL!***\n"));
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: chalk.yellow("Whom would you like to interact with?\n"),
            choices: ["Staff", "Student", "Exit"]
        });
        if (ans.select == "Staff") {
            console.log(chalk.greenBright("\nYou have entered in the Staff Room,Feel Free to ask any Question.\n"));
        }
        else if (ans.select == "Student") {
            const ans = await inquirer.prompt({
                name: "student",
                type: "input",
                message: chalk.magentaBright("Enter the Student Name to interact:\n")
            });
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const name = new Student(ans.student);
                persons.addStudent(name);
                console.log(chalk.cyan(`\nHey,! I am ${name.name}, Nice to meet you!\n`));
                console.log(chalk.greenBright("\nNew Student Added..!\n"));
                console.log(chalk.yellow("\nCurrent Student List:\n"));
                console.log(persons.students);
            }
            else {
                console.log(chalk.cyan(`\nHey,! I am ${student.name}, Nice to see you Again!\n`));
                console.log(chalk.yellow("\nExisting Student List:\n"));
                console.log(persons.students);
            }
        }
        else if (ans.select == "Exit") {
            console.log(chalk.redBright("\nExiting the Portal...!\n"));
            process.exit();
        }
    } while (true);
};
programStart(persons);
