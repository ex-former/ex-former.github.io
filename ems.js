var productsElement = document.getElementById("products");
var cartDiv = document.getElementById("cartTable");
var btn = document.getElementById("cartBtn");
var counter = document.getElementById("counter");
var form = document.getElementById("validate");




var products = [
    product1 = {
        name : "SAMSUMG TV",
        price : "500000",
        thumbnail : "https://ex-former.github.io/Project Files/Images/product1.png",
    },
    product2 = {
        name : "PIXEL 4a",
        price : "300000",
        thumbnail : "https://ex-former.github.io/Project Files/Images/product2.png",
    },
    product3 = {
        name : "PS 5",
        price : "330000",
        thumbnail : "https://ex-former.github.io/Project Files/Images/product3.png",
    },
    product4 = {
        name : "MACBOOK AIR",
        price : "700000",
        thumbnail : "https://ex-former.github.io/Project Files/Images/product4.png",
    },
    product5 = {
        name : "APPLE WATCH",
        price : "80000",
        thumbnail : "https://ex-former.github.io/Project Files/Images/product5.png",
    },
    product6 = {
        name : "AIR PODS",
        price : "50000",
        thumbnail : "https://ex-former.github.io/Project Files/Images/product6.png",
    },
]


// ADD PRODUCTS DYNAMICALLY
for (let i in products){
    var nm = products[i].name;
    var cost = products[i].price;
    var img = products[i].thumbnail;

    var pDiv = document.createElement('div');
    pDiv.id = `${nm.replaceAll(" ", "-")}`;
    pDiv.className = "pds";
    pDiv.innerHTML = `
    <div id="imgDiv">
    <img id="img" src="${img}">
    <div id="priceCover">
    <h4> Price </h4>
    <h5>
    &#8358<span id="cost">${cost}</span>
    </h5>
    </div>
    </div>
    <h3 id="name"> ${nm} </h3>
    <button id="add">ADD TO CART</button>
    `;

    productsElement.appendChild(pDiv);
}






productsElement.addEventListener("click", (e) => {
    mediator(e);
});
cartDiv.addEventListener("click", (e) => {
    mediator(e);
});



function mediator(e){
    if (e.target.id == "add"){
        addCartContent(e);
    }else if (e.target.id == "rmv"){
        rmvCartContent(e);
    }else if (e.target.id == "inc"){
        increment(e);
    }else if (e.target.id == "dec"){
        decrement(e);
    }
}





// FUNCTION TO ADD ITEMS TO CART
function addCartContent(e){
    // ACCESSS
    var elem = e.target.parentElement;

    e.target.innerHTML = "REMOVE FROM CART"
    e.target.id = "rmv";
    e.target.className = "btnChange";

    var content = document.querySelector("#cartTable tbody");
    var row = document.createElement("tr");

    
        var info = {
        name : elem.querySelector("#name").textContent,
        price : elem.querySelector("#cost").textContent,
        quantity : 1,
        }

    
        row.id = elem.id;
        row.innerHTML = `
        <td id="index"></td>
        <td id="itemName">${info.name}</td>
        
        <td><p>
        &#8358<span id="price">
        ${info.price}
        </span></p>
        <p>
        <span id="ogPrice">${info.price}</span>
        </p>
        </td>
        
        <td>
        <div id="qDiv">
        <button id="inc"> + </button>
        <p id="quantity">
        ${info.quantity}
        </p>
        <button id="dec"> - </button>
        </div>
        </td>
        <td><button id="rmv" class="rmvCart">Remove</button></td>
        `;
        content.appendChild(row);
        counter.textContent = content.children.length;
        
        fullPrice();
        indexNumber();
    }
    

    
    
// FUNCTION TO REMOVE ITEMS FROM CART
function rmvCartContent(e){
    var pointer = e.target;
    var target = e.target.parentElement;


    if (!e.target.parentElement.id){
        var em = target.parentElement;

        el = productsElement.querySelector("#"+target.parentElement.id)
        el.querySelector("#"+pointer.id).innerHTML = "ADD TO CART";
        el.querySelector("#"+pointer.id).className = "";
        el.querySelector("#"+pointer.id).id = "add";
    } else{
        var em = target;

        el = productsElement.querySelector("#"+target.id)
        el.querySelector("#"+pointer.id).innerHTML = "ADD TO CART"
        el.querySelector("#"+pointer.id).id = "add";
        el.querySelector("#"+pointer.id).className = "";
    }

    el = cartDiv.querySelector("#"+em.id)
    var parent = el.parentElement;
    parent.removeChild(el);
    counter.textContent = parent.children.length;
    
    fullPrice();
    indexNumber();
}


// FUNCTION TO INCREMENT QUANTITY
function increment(e){
    var parent = e.target.parentElement.parentElement.parentElement;
    var num = parent.querySelector("#quantity").innerText;
    var price = parent.querySelector("#price").innerText;
    var ogPrice = parent.querySelector("#ogPrice").innerText;
    
    num = Number(num);
    price = Number(price);
    ogPrice = Number(ogPrice);
    
    
    num++;
    price = price + ogPrice;
    
    parent.querySelector("#quantity").innerText = num;
    parent.querySelector("#price").innerText = price;
    
    fullPrice();
}



// FUNCTION TO DECREMENT QUANTITY
function decrement(e){
    var parent = e.target.parentElement.parentElement.parentElement;
    var num = parent.querySelector("#quantity").innerText;
    var price = parent.querySelector("#price").innerText;
    var ogPrice = parent.querySelector("#ogPrice").innerText;

    
    num = Number(num);
    price = Number(price);
    ogPrice = Number(ogPrice);
    
    
    if (num <= 1){
        alert("You cannot have less that 1 item. If you wish to remove the item then click remove.");
    }else{
    num--;
    price = price - ogPrice;
    
    parent.querySelector("#quantity").innerText = num;
    parent.querySelector("#price").innerText = price;
    }
    fullPrice();
}




// FUNCTION TO SHOW FULL PRICE
function fullPrice(){
    container = document.getElementById("fullPrice");
    prices = cartDiv.querySelectorAll("#price");
    var num = 0;
    
    for (let item of prices){
        num += Number(item.innerText)
    }
    container.innerText = num
}



// FUNCTION TO AUTO UPDATE INDEX
 function indexNumber(){
    numbers = cartDiv.querySelectorAll("#index");
    var num = 0;
    
    for (let i of numbers){
        num++;
        i.innerText = num;
    }
}


// FORM VALIDATION SECTION
var checkout = document.querySelector("#checkout");
var inputName = form.querySelector("#name");
var email = form.querySelector("#email");
var phone = form.querySelector("#phone");



checkout.addEventListener("click", function(){
    var child = cartDiv.querySelector("tbody");
    var inp = inputNameValidator(inputName);
    var em = emailValidator(email);
    var ph = phoneValidator(phone);
    if (child.children.length > 0){
    if (inp === true && em === true && ph === true){
        console.log(child.children);
         payWithPaystack();
}}else{
  alert("You cannot checkout with an empty cart.");
}});


inputName.addEventListener("blur", function(){
    inputNameValidator(inputName);
});
email.addEventListener("blur", function(){
    emailValidator(email);
});
phone.addEventListener("blur", function(){
    phoneValidator(phone);
});


function inputNameValidator(i){
    var nerrorDiv = form.querySelector(".nerror");
    var nerrorMsgs = [];

    if (i.value == "" || i.value == null){
        i.style.borderColor = "red";
        nerrorMsgs.push("Please enter your name");
    }else if(/\d+/ig.test(i.value) == true){
        i.style.borderColor = "red";
        nerrorMsgs.push("Name cannot include numbers");
    }else{
        i.style.borderColor = "green";
        i.style.backgroundColor = "rgb(204, 207, 255)";
        nerrorMsgs = [];
        nerrorDiv.innerText = "";
        return true;
    }

    if (nerrorMsgs.length > 0){
        nerrorDiv.innerText = nerrorMsgs.join("\n");
    }
}


function emailValidator(i){
    var eerrorDiv = form.querySelector(".eerror");
    var eerrorMsgs = [];

    if (i.value == "" || i.value == null){
        i.style.borderColor = "red";
        eerrorMsgs.push("Please enter your email");
    }else if(/^[\w.]+@[\w.]+$/ig.test(i.value) == false){
        i.style.borderColor = "red";
        eerrorMsgs.push("Invalid email");
    }else{
        i.style.borderColor = "green";
        i.style.backgroundColor = "rgb(204, 207, 255)";
        eerrorMsgs = [];
        eerrorDiv.innerText = "";
        return true;
    }

    if (eerrorMsgs.length > 0){
        eerrorDiv.innerText = eerrorMsgs.join("\n");
    }
}


function phoneValidator(i){
    var perrorDiv = form.querySelector(".perror");
    var perrorMsgs = [];

    if (phone.value == "" || phone.value == null){
        phone.style.borderColor = "red";
        perrorMsgs.push("Please enter your phone number");
    }else if(/[^\d]+/g.test(phone.value) == true){
        phone.style.borderColor = "red";
        perrorMsgs.push("Phone number cannot include letters or spaces");
    }else if(phone.value.length > 11){
        phone.style.borderColor = "red";
        perrorMsgs.push("phone number cannot be more than 11 digits");
    }else{
        phone.style.borderColor = "green";
        i.style.backgroundColor = "rgb(204, 207, 255)";
        perrorMsgs = [];
        perrorDiv.innerText = "";
        return true;
    }

    if (perrorMsgs.length > 0){
        perrorDiv.innerText = perrorMsgs.join("\n");
    }
}



function summaryModal(){
    document.getElementById("container").style.display = "none";
    
    var modal = document.getElementById("cover");
    
    
    
        var content = document.querySelector("#cartTable tbody");
        var summary = document.querySelector("#summaryTable tbody");
        var message = document.querySelector("#summary p");
        
        message.id = "message";
        message.innerHTML = `Thank you, <span class="user">${inputName.value}</span>, Your order has been received`;
    
        
            names = cartDiv.querySelectorAll("#itemName");
            indexs = content.querySelectorAll("#index");
            quantitys = content.querySelectorAll("#quantity");
            
    
        for(let z = 0; z < names.length; z++){
                var row = document.createElement("tr");
                row.innerHTML = `
            <td>
            ${indexs.item(z).textContent}
            </td>
            <td>
            ${names.item(z).textContent}
            </td>
            <td><p>
            ${quantitys.item(z).textContent}
            </p></td>
            `;
            summary.appendChild(row);
    }
    
    
      modal.style.display = "block";
    
    
    
     var span = document.querySelector("#summary .close");
    
     span.onclick = function() {
       modal.style.display = "none";
     }
    
     window.onclick = function(event) {
       if (event.target == modal) {
         modal.style.display = "none";
       }
     }
    }
    
    // CART MODAL
    // Get the modal
    
     var modal = document.getElementById("container");
    
    
    // // Get the <span> element that closes the modal
     var span = document.querySelector("#cart .close");
    
    // // When the user clicks on the button, open the modal
    btn.onclick = function() {
       modal.style.display = "block";
     }
    
    // // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
       modal.style.display = "none";
     }
    
    // // When the user clicks anywhere outside of the modal, close it
     window.onclick = function(event) {
       if (event.target == modal) {
         modal.style.display = "none";
       }
     }




// PAYSTACK FUNCTION SECTION
 function payWithPaystack() {
    let handler = PaystackPop.setup({
      key: 'pk_test_750ac02d8ca82319b4208597d0ba011ed56db466', // Replace with your public key
      email: form.querySelector("#email").value,
      amount: Number(document.getElementById("fullPrice").innerText) * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        summaryModal();
      }
    });
    handler.openIframe();
  }


setTimeout(function() {
    autoFiller();
}, 2000);


// function autoFiller(){
//     // auto click 3 PRODUCTS
//     autoClick = productsElement.querySelectorAll("button");
    
//     for(let i = 0; i < 3; i++){
//         autoClick[i].click();
//     }
    
//     // auto fill form
//     inputName.value = "Bartholomew Kuma";
//     email.value = "nonso.udonne@gmail.com";
//     phone.value = "817161";
// }
