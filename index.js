//1st Process the command line arguments from user
//2nd Fetch data from the api call
//3rd display reponse

const args = process.argv.slice(2)
if (args.length !== 1){
    process.exit(1);
}

function getData(username){
    const url = `https://api.github.com/users/${username}/events`
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
}

getData(args[0])