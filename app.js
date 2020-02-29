const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
class Team {
    // Save a reference for `this` in `this` as `this` will change inside of inquirer
    constructor() {
      this.teamSize = 0;
      this.team =[];
    }
    start(){
      if (this.teamSize ===0 ){
        this.askForManager()
      } else {this.askForNext()}
    }
    askForManager() {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is your manager's name?"
            },
            {
              type: "input",
              name: "id",
              message: "What is your manager's id?"
            },
            {
              type: "input",
              name: "email",
              message: "What is your manager's email?"
            },
            {
              type: "input",
              name: "officeNumber",
              message: "What is your manager's officeNumber?"
            }
          ])
          .then(val => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
            this.teamSize += 1;
            this.team.push(manager);
            this.askForNext()
          });
    }
    askForEngineer() {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is your engineer's name?"
            },
            {
              type: "input",
              name: "id",
              message: "What is your engineer's id?"
            },
            {
              type: "input",
              name: "email",
              message: "What is your engineer's email?"
            },
            {
              type: "input",
              name: "github",
              message: "What is your engineer's github?"
            }
          ])
          .then(val => {
            const engineer = new Engineer(val.name, val.id, val.email, val.github);
            this.teamSize += 1;
            this.team.push(engineer)
            this.askForNext()
          });
    }
    askForIntern() {
        inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is your intern's name?"
            },
            {
              type: "input",
              name: "id",
              message: "What is your intern's id?"
            },
            {
              type: "input",
              name: "email",
              message: "What is your intern's email?"
            },
            {
              type: "input",
              name: "school",
              message: "What is your intern's school?"
            }
          ])
          .then(val => {
            const intern = new Intern(val.name, val.id, val.email, val.school);
            this.teamSize += 1;
            this.team.push(intern)
            this.askForNext()
          });
    };
    askForNext() {
        inquirer
            .prompt([
                {
                    type: "confirm",
                    name: "moreTeam",
                    message: "Are you adding more members to your team?"
                }
            ]).then( val => {
                if (val.moreTeam===true){
                    this.askType()
                } else {this.renderTime()}
            }   
        )
    };
    askType(){
        inquirer.prompt([
            {
                type: "input",
                name: "type",
                message: "Are you adding an Intern or an Engineer to your team?"
            },
        ]).then(val => {
            if (val.type==="intern"){
                this.askForIntern()
            } else if (val.type==="engineer") {
                this.askForEngineer()
            } else {this.askForNext()}
         }
        );
    };
    renderTime(){
        fs.writeFile(outputPath, render(this.team), function(err) {

            if (err) {
              return console.log(err);
            }
          
            console.log("Success!");
          
          });
    };
};

var team = new Team();

team.start();