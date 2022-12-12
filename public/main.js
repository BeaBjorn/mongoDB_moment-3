"use strict";

/*

Student: Beatrice Björn
Senast uppdaterad: 2022-11-17
För: Moment 3 - DT162G - Javascriptbaserad webbutveckling

*/

//Stores url in variable
let url = "http://localhost:3000/courses";


// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function(){ 

// Using fetch and GET to retrieve data from json-file
//Using a for-loop to loop through tha data in the json-file and put it into html-elements
//Using inner.HTML to print data to screen
//Catch is used to print any error messages in console
    fetch(url, {method: 'GET'})
        .then(response => response.text())
            .then(data => {
                let jsonData = JSON.parse( data );
                let c = "<table><th>Kurs-id</th><th>Kurskod</th><th>Kursnamn</th><th>Kursperiod</th><th>Radera</th>";
                for(let i=0; i < jsonData.length; i++){
                    c += "<tr><td>"+jsonData[i]._id+"</td><td>"+jsonData[i].courseId+"</td><td>"+jsonData[i].courseName+
                        "</td><td>"+jsonData[i].coursePeriod+
                        "</td><td class='radera' alt='Delete user' id=" + jsonData[i]._id + ">Radera</td></tr>";    
                }
                c += "</table>";
                document.getElementById("kurs").innerHTML = c;
             })
        .catch(error => {
            console.log('There was an error '+error);
        });


//Gets the element with the id "kurs" and adds an event listener listening to click to the element
//Stores the url plus the given id in a variable called "urlPlusId"
//Using fetch and DELETE to delete the object with the goven id and the reloads the window to update list of courses
//Catch is used to print any errors in the console
document.getElementById("kurs").addEventListener("click", function(e){
    let urlPlusId = url+e.target.id;
    fetch(urlPlusId, {method: 'DELETE'})
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            console.log('Något gick snett, kursen har inte raderats..' + error);
        });
});


//Gets the element with the id "addButton" and adds an eventlistener taht listens to click
//Stores two curly brackets (json-object) in a variable calles json
//Gets the values of the html/elements with the given id:s and adds them to a json object
document.getElementById("addbutton").addEventListener("click", function(e){
    let json = {};
    json.courseId = document.getElementById("id").value;
    json.courseName = document.getElementById("name").value;
    json.coursePeriod = document.getElementById("period").value;

//Using fetch and POST to add the data in the html-input fields
//Converts the string data in the input fields to json-format
//reloads the page to update list of courses
//Catches any errors and prints them in console    
    fetch(url, {method: 'POST', 
                    body: JSON.stringify(json), 	
                        headers: { 'Content-type': 'application/json; charset=UTF-8'} })
        .then(response => response.text())
            .then(data => {
                location.reload();
             })
        .catch(error => {
            console.log('Något gick snett, kursen har inte lagts till..' + error);
        });
});
});

