/*
JavaScript and APIs (Axios)

How this project will function:
1. User submits a form (JS event listener)
2. Form data is brought in and saved (process associated with the event listener)
3. If the form is being resubmitted, display welcome back (you'll see what I mean by this as we get into things) (process associated with the event listener)
4. Query an API with an Axios get request for a CatFact (Axios!)
5. Ignore whether or not the user wants a CatFact (you'll se what I mean by this later) (form related)
6. Display the CatFact for the user in our HTML DOM (creation of HTML elements using JS)
*/

// access to our form
let form = document.querySelector('#catform');
console.log(form);
// some place to store the user data
// plan is for the keys to be user's names (who submitted the form), value will be an array of their CatFacts
let users = {};

// listen for submit event
form.addEventListener('submit', (event) => {
    // stop the page from reloading on form submission
    event.preventDefault();

    // get the form data - 2 options: event.path or querySelector
    // why event.path? we already have access to the event.path - no reason to go re-get the data thru querySelector
    let name = event.path[0][0].value;
    let wishes = event.path[0][1].value;
    
    // use that data - save the user's name in our users object if not already present
    if (users[name]){
        // user exists - display a welcome back message in html
        document.querySelector('#welcome-message').innerHTML = `Welcome back, ${name}!`
    } else {
        // display new user welcome message
        // and add the user to users object
        users[name] = [];
        document.querySelector('#welcome-message').innerHTML = `Welcome to CatFacts, ${name}!`
    }

    // build a little 3 part conditional to use the wishes portion of the form data
    wishes.toLowerCase().includes('yes') ? alert('Thank you for subscribing to CatFacts! Press ok to receive your CatFact!') :
    wishes.toLowerCase().includes('no') ? alert("It's a real shame that you don't want a CatFact. Too bad. You're getting one anyway.") :
    alert("I couldn't tell if you wanted a CatFact or not. So anyway, here's a CatFact.");
    
    // make the API call happen - call the API process function(s)
    loadData(name);

    // reset the form after we're done
    form.reset();
})

// making the APIcall happen: Axios
let getData = async () => {
    // api call
    let response = await axios.get('https://catfact.ninja/fact');
    return response.data.fact
}

// an async process must remain async -> do stuff with our fact
// does stuff with the data from the api call - aka makes an html
let loadData = async (user) => {
    let catFact = await getData();
    console.log(catFact); // we have access to the actual string - we can make an html element to be added to the page
    // add the catFact to the user's array
    users[user].push(catFact);
    console.log(users); // take a peek at the users object
    // create the html element for the catFact
    let html = document.createElement('h3');
    html.className = 'newfact';
    html.innerHTML = catFact;
    document.querySelector('.fact').appendChild(html);
}