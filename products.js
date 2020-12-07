let logoutBtn = document.getElementById("logout-btn");
let productBody = document.getElementById("product-body");

logoutBtn.addEventListener('click', () =>{
    localStorage.setItem("loginStatus", false);
    location.assign('./index.html');
})

if(localStorage.getItem("loginStatus") == "false"){
    window.location.assign("./index.html");
}

let request = new XMLHttpRequest();
request.open('GET', 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products', true);

const productCard = (data) =>{
    
        var tableRow = document.createElement("tr");        
        var tabledata1 = document.createElement("td");        
        tabledata1.classList.add("grey-text");
        tabledata1.setAttribute("id", "product-id");
        tabledata1.innerText = data.id;
        var tabledata2 = document.createElement("td"); 
        tabledata2.setAttribute("id", "medicine");
        tabledata2.innerText = data.medicineName;
        var tabledata3 = document.createElement("td");        
        tabledata3.classList.add("grey-text");
        tabledata3.setAttribute("id", "medicine-brand");
        tabledata3.innerText = data.medicineBrand;
        var tabledata4 = document.createElement("td"); 
        tabledata4.setAttribute("id", "expiry-date");
        tabledata4.innerText = data.expiryDate;
        var tabledata5 = document.createElement("td"); 
        tabledata5.setAttribute("id", "unit-price");
        tabledata5.innerText = `$ ${data.unitPrice}`;
        var tabledata6 = document.createElement("td"); 
        tabledata6.setAttribute("id", "stock");
        tabledata6.innerText = data.stock;

        productBody.appendChild(tableRow);
        tableRow.appendChild(tabledata1);
        tableRow.appendChild(tabledata2);
        tableRow.appendChild(tabledata3);
        tableRow.appendChild(tabledata4);
        tableRow.appendChild(tabledata5);
        tableRow.appendChild(tabledata6);

        return productBody;
}

request.onreadystatechange = function(){
    if(request.readyState === 4){
        var responseArr = JSON.parse(request.responseText);
        for(var i=0; i < responseArr.length; i++){

            // console.log(responseArr[i]);
            productCard(responseArr[i]);
    
        }
        }
    }

request.send();