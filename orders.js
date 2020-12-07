let logoutBtn = document.getElementById("logout-btn");
let orderBody = document.getElementById("order-body");
let checkBoxes =  document.querySelectorAll("input");

let filteredArray = [];
let mArr = ['new', 'packed', 'intransit', 'delivered'];

logoutBtn.addEventListener('click', () =>{
    localStorage.setItem("loginStatus", false);
    location.assign('./index.html');
})

if(localStorage.getItem("loginStatus") == "false"){
    window.location.assign("./index.html");
}
// checkBoxes.forEach(item => {
//     item.addEventListener("change", (e) => {
//         if (e.target.checked == true) {
//             let localCount = 0;
//             mArr.push(e.target.value);
//             orderBody.innerHTML = '';
//             filteredArray.map(item => {
//               if (mArr.includes(item.orderStatus.toLowerCase())) {
//                 console.log(item)
//                 // orderCard(item);
//                 // localCount++
//                 // console.log(localCount)
//               }
//             })
//         }
//     })
// })
             
   

let request = new XMLHttpRequest();
request.open('GET', 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders', true);

const orderCard = (data) =>{
    
        var tableRow = document.createElement("tr");        
        var tabledata1 = document.createElement("td");        
        tabledata1.classList.add("grey-text");
        tabledata1.setAttribute("id", "order-id");
        tabledata1.innerText = data.id;
        var tabledata2 = document.createElement("td"); 
        tabledata2.setAttribute("id", "customer");
        tabledata2.innerText = data.customerName;
        var tabledata3 = document.createElement("td"); 
        tabledata3.setAttribute("id", "date");
        tabledata3.innerText = data.orderDate;
        var tabledata4 = document.createElement("td");        
        tabledata4.classList.add("grey-text");
        tabledata4.setAttribute("id", "amount");
        tabledata4.innerText = `$ ${data.amount}`;
        var tabledata5 = document.createElement("td"); 
        tabledata5.setAttribute("id", "status");
        tabledata5.innerText = data.orderStatus;

        
        tableRow.appendChild(tabledata1);
        tableRow.appendChild(tabledata2);
        tableRow.appendChild(tabledata3);
        tableRow.appendChild(tabledata4);
        tableRow.appendChild(tabledata5);

        return tableRow;
}

request.onreadystatechange = function(){
    if(request.readyState === 4){
        var responseArr = JSON.parse(request.responseText);
        for(var i=0; i < responseArr.length; i++){

            // console.log(responseArr[i]);
            const tableRow = orderCard(responseArr[i]);
            orderBody.appendChild(tableRow);
            filteredArray.push(responseArr[i])
        }
    }
}

request.send();