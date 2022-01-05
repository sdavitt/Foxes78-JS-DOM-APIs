console.log('Hello, World.');

/*
JavaScript and the HTML DOM

We can use JS to directly access and modify the HTML DOM, HTML attributes, classses, tags, whatever
We do that through the document object
*/

// accessing an element by tag name
let main_header = document.getElementsByTagName('h1');
console.log(main_header);
console.log(main_header[0]);
console.log(main_header[0].innerHTML);
console.log(typeof main_header[0].innerHTML);
main_header[0].innerHTML = main_header[0].innerHTML.toUpperCase(); // modifying the innerhtml of an element

// accessing an element by ID
let main_header_access_2 = document.getElementById('header');
console.log(main_header_access_2);
main_header_access_2.innerHTML = 'SharkFact:'; // further modifying the innerhtml of an element


// accessing our button
let color_button = document.getElementById('color-button');
console.log(color_button);

// let's come up with a process for when the button is pressed
let color_change = () => {
    let e = document.getElementById('header');
    if (e.className == '') {
        e.className = 'color-change';
    } else if (e.className == 'color-change') {
        e.className = 'color-change-two';
    } else {
        e.className = '';
    }
}

// how do we get the button press to run this process?
// remember that we talked about JS being an event-based language
// we need to tell our JS to 'listen' for the event of the button press
// we do that through EventListeners!

// add a click eventlistener to the color_button to run color_change when clicked
color_button.addEventListener('click', color_change);

// create an html element through my javascript
let new_button = document.createElement('button');
let to_be_displayed = document.createElement('p');

// add some text to the button
new_button.innerHTML = 'Click for a SharkFact.'

//add a className and hide to_be_displayed
to_be_displayed.className = 'color-change';
to_be_displayed.hidden = true;

// add the new button and p tag to the page
document.body.append(new_button);
document.body.append(to_be_displayed);

// create a process for what happens when the new button is clicked
let sharkfacts = () => {
    if (to_be_displayed.hidden){
        to_be_displayed.innerHTML = 'Most Greenland sharks are blind. Due to their slow swimming speed, their eyes are succeptible to a specific species of parasite.';
        new_button.innerHTML = 'Hide SharkFact';
        to_be_displayed.hidden = false;
    } else {
        new_button.innerHTML = 'Click for a SharkFact.';
        to_be_displayed.hidden = true;
    }
}

// event listener for new button
new_button.addEventListener('click', sharkfacts);

/* Interacting with an HTML Form */

// access my form
let sharkfactform = document.getElementById('sharkForm');
console.log(sharkfactform);

// let's have our JavaScript control what happens when the form is submitted
// event listener for submit!

sharkfactform.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
    // 2 ways to get the form data
    // my favorite way - through the event.path
    let sharkname = event.path[0][0].value;
    let sharkfact = event.path[0][1].value;
    console.log(`Event path data: ${sharkname} | ${sharkfact}`);
    // the other way to get form data - through the query selector
    let qsharkname = document.querySelector('#shark-name').value;
    let qsharkfact = document.querySelector('#shark-fact').value;
    console.log(`Query selector data: ${qsharkname} | ${qsharkfact}`);

    // reset form
    sharkfactform.reset();
});