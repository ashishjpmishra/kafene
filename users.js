let logoutBtn = document.getElementById("logout-btn");
let userBody = document.getElementById("user-body");
let searchBody = document.getElementById("search-body");
let searchInput = document.getElementById("search-input");
let searchSubmit = document.getElementById("search-bar");
let reset = document.getElementById("reset-btn");

const searchedName = [];

logoutBtn.addEventListener('click', () =>{
    localStorage.setItem("loginStatus", false);
    location.assign('./index.html');
})

if(localStorage.getItem("loginStatus") == "false"){
    window.location.assign("./index.html");
}

searchSubmit.addEventListener("submit", (e)=>{
    e.preventDefault();
})

reset.addEventListener('click', () =>location.reload())

let request = new XMLHttpRequest();
request.open('GET', 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users', true);

const userCard = (data) =>{
       

        var tableRow = document.createElement("tr");        
        var tabledata1 = document.createElement("td");        
        tabledata1.classList.add("grey-text");
        tabledata1.setAttribute("id", "id");
        tabledata1.innerText = data.id;
        var tabledata2 = document.createElement("td"); 
        tabledata2.setAttribute("id", "profilePic");
        var avatar = document.createElement("img");
        avatar.src = data.profilePic;
        var tabledata3 = document.createElement("td");        
        tabledata3.classList.add("grey-text");
        tabledata3.setAttribute("id", "fullName");
        tabledata3.innerText = data.fullName;
        var tabledata4 = document.createElement("td"); 
        tabledata4.setAttribute("id", "dob");
        tabledata4.innerText = data.dob;
        var tabledata5 = document.createElement("td"); 
        tabledata5.setAttribute("id", "gender");
        tabledata5.innerText = data.gender;
        var tabledata6 = document.createElement("td");                
        tabledata6.classList.add("grey-text"); 
        tabledata6.setAttribute("id", "location");
        tabledata6.innerText = data.currentCity + ', ' + data.currentCountry;

        userBody.appendChild(tableRow);
        tableRow.appendChild(tabledata1);
        tabledata2.appendChild(avatar);
        tableRow.appendChild(tabledata2);
        tableRow.appendChild(tabledata3);
        tableRow.appendChild(tabledata4);
        tableRow.appendChild(tabledata5);
        tableRow.appendChild(tabledata6);


        return userBody;

}

const searchUserCard = (data) =>{
       

    var tableRow = document.createElement("tr");        
    var tabledata1 = document.createElement("td");        
    tabledata1.classList.add("grey-text");
    tabledata1.setAttribute("id", "id");
    tabledata1.innerText = data.id;
    var tabledata2 = document.createElement("td"); 
    tabledata2.setAttribute("id", "profilePic");
    var avatar = document.createElement("img");
    avatar.src = data.profilePic;
    var tabledata3 = document.createElement("td");        
    tabledata3.classList.add("grey-text");
    tabledata3.setAttribute("id", "fullName");
    tabledata3.innerText = data.fullName;
    var tabledata4 = document.createElement("td"); 
    tabledata4.setAttribute("id", "dob");
    tabledata4.innerText = data.dob;
    var tabledata5 = document.createElement("td"); 
    tabledata5.setAttribute("id", "gender");
    tabledata5.innerText = data.gender;
    var tabledata6 = document.createElement("td");                
    tabledata6.classList.add("grey-text"); 
    tabledata6.setAttribute("id", "location");
    tabledata6.innerText = data.currentCity + ', ' + data.currentCountry;

    searchBody.appendChild(tableRow);
    tableRow.appendChild(tabledata1);
    tabledata2.appendChild(avatar);
    tableRow.appendChild(tabledata2);
    tableRow.appendChild(tabledata3);
    tableRow.appendChild(tabledata4);
    tableRow.appendChild(tabledata5);
    tableRow.appendChild(tabledata6);


    return searchBody;

}

const findMatch = (wordsToMatch, searchedName) =>{
    
    return searchedName.filter(name =>{
        const regex = new RegExp(wordsToMatch, 'gi');
        return name.fullName.match(regex)
    })
}

const showMatch = (e) =>{
    if(e.target.value.length >= 2){
        userBody.style.display = 'none';
        // searchBody.innerHTML = none;
        const matchedName = findMatch(e.target.value , searchedName);
        for(var i in matchedName){
        console.log(matchedName[i]);
        searchUserCard(matchedName[i]);
    }      
    }
    else{
        alert("please enter atleast two letters to search")
    }
};

searchInput.addEventListener("search", showMatch)

request.onreadystatechange = function(){
    if(request.readyState === 4){
        var responseArr = JSON.parse(request.responseText);
        for(var i in responseArr){

            // console.log(responseArr[i]);
            userCard(responseArr[i]);
            searchedName.push(responseArr[i]);
            
        }
        }
    }

request.send();