let loginForm = document.getElementById("login-form");

if(localStorage.getItem("loginStatus") == "true"){
    window.location.assign("./orders.html");
}

loginForm.addEventListener("submit",(e) =>{
    e.preventDefault();

    let loginData={
        username: e.target.username.value,
        password: e.target.password.value
    }

    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login', true);    
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhttp.send(JSON.stringify(loginData));
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState === 4){
            if(loginData.username === loginData.password){
                localStorage.setItem("loginStatus", true);
                alert("login successful");
                window.location.assign("./orders.html")
            }
            else  alert("Please enter valid credentials");
        }

    }
})