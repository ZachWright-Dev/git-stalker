//1st Process the command line arguments from user
//2nd Fetch data from the api call
//3rd display reponse

const args = process.argv.slice(2)
if (args.length !== 1){
    args.length > 1 ? console.log("Please only provide one additional argument, the github username") : console.log("Please provide at least one argument")
    process.exit(1);
}


async function getData(username){
    const url = `https://api.github.com/users/${username}/events`;
    
    try {
        const response = await fetch(url);
        if (response.status === 404){
            console.log("This user was not found :(");
            process.exit(1);
        } else if (response.status === 500) {
            console.log("There was an internal server error :(");
            process.exit(1);
        }
        const data = await response.json();
        logData(username, data);
    } catch(e) {
        console.log("Error fetching data:", e);
    }
}

function logData(username, events) {
    if (events.length === 0){
        console.log(`${username} has no recent activity!`)
    }
    let action;
    console.log(`This is what ${username} has been up to`);
    for (let event of events) {
        switch(event.type.toLowerCase()) {
            case "pushevent":
                console.log(`-  PUSHED ${event.payload.commits.length} commit(s) to ${event.repo.url}`);
                break;
            case "pullrequestevent":
                action = event.payload.action;
                if (action !== "opened" && action !== "closed" && action !== "reopened" && action !== "labeled"){
                    continue;
                }
                console.log(`-  ${action.toUpperCase()} a PR @ ${event.repo.url}`);
                break;
            case "issuesevent":
                action = event.payload.action;
                console.log(`-  ${action.toUpperCase()} an issue @ ${event.repo.url}`)
            default:
                break;
        }
    }
}


const input = args[0]
getData(input)
