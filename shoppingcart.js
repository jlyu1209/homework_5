window.onload = (event) => {
    getFromLocalStorage ();
    displayCart ();
    subTotalLoad ();
    taxLoad ();
    deliveryFeeLoad ();
    grandTotal ();
    removeItem ();
};


var productArray = [];

function getFromLocalStorage () {
    productArray = JSON.parse (localStorage.getItem ("selectedProducts"));
};


function createCartItems (parentEl, flavors, glaze, quantity, price){
    let divContainer = document.createElement("div");
    divContainer.className = "cartItem";
    parentEl.appendChild(divContainer);

    //let img = document.createElement ("img");

    let cartFlavorsGlaze = document.createElement("div");
    cartFlavorsGlaze.className = "cartFlavors-Glaze";
    divContainer.appendChild(cartFlavorsGlaze);

    let cartFlavors = document.createElement ("div");
    cartFlavors.className = "cartFlavors";
    cartFlavors.innerHTML = flavors;
    cartFlavorsGlaze.appendChild(cartFlavors);

    let cartGlaze = document.createElement ("div");
    cartGlaze.className = "cartGlaze";
    cartGlaze.innerHTML = "Glaze: " + glaze;
    cartFlavorsGlaze.appendChild(cartGlaze);

    let minusIcon = document.createElement('i');
    minusIcon.className = "far fa-minus-square";
    divContainer.appendChild(minusIcon);

    let cartQuantity = document.createElement("div");
    cartQuantity.className = "cartQuantity"
    cartQuantity.innerHTML = quantity;
    divContainer.appendChild(cartQuantity);

    let plusIcon = document.createElement('i');
    plusIcon.className = "far fa-plus-square";
    divContainer.appendChild (plusIcon);

    let xIcon = document.createElement('i');
    xIcon.className = "fas fa-times";
    divContainer.appendChild(xIcon);

    let cartPricePiece = document.createElement("div");
    cartPricePiece.className = "price-piece";
    cartPricePiece.innerHTML = price + "/ ea";
    divContainer.appendChild(cartPricePiece);  
   
    let equalSign = document.createElement('i');
    equalSign.className = "fas fa-equals";
    divContainer.appendChild(equalSign);

    let total = document.createElement("div");
    total.className = "price-piece"
    total.innerHTML = "$" + (parseFloat(price.slice(1,5)) * quantity).toFixed (2);
    divContainer.appendChild (total);   

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "REMOVE";
    removeBtn.onclick = function (e) {
        e.preventDefault();
      };
    divContainer.appendChild(removeBtn);


    return divContainer;

};


function displayCart () {
    for (let i = 0; i < productArray.length; i++) {
        let biggerParent = document.querySelector(".cartdetails");
        let flavors = productArray[i].flavors;
        let glaze = productArray[i].glaze;
        let quantity = productArray[i].quant;
        let price = productArray [i].price;

        createCartItems (biggerParent, flavors, glaze, quantity, price);
    }
};



function addTotal (){
    var totalAdd = 0
    for (let i = 0; i < productArray.length; i++) {
        let quantity = productArray[i].quant;
        let price = parseFloat ((productArray [i].price).slice(1,5));
        let total = quantity * price;
        totalAdd += total;
    }    
    return totalAdd;
};




function subTotalLoad (){
    let subTotal = document.querySelector(".subtotal");
    subTotal.innerHTML = "$" + addTotal ().toFixed(2);

};

function taxLoad () {
    let tax = document.querySelector(".tax");
    tax.innerHTML = "$" + ((addTotal ())* 0.07).toFixed(2);
};


function deliveryFeeLoad () {
    let deliveryFee = document.querySelector(".deliveryfee");
    deliveryFee.innerHTML = "$" + ((addTotal ())* 0.1).toFixed(2);
};


function grandTotal () {
    let sum = (addTotal () + addTotal()*0.1 + addTotal()*0.07).toFixed(2);
    let grandTotal = document.querySelector (".total");
    grandTotal.innerHTML = "$" + sum;
};
  
    


function removeItem () {
    let deleteBtn = document.querySelectorAll("button");

    for (let i = 0; i < deleteBtn.length; i ++) {
        deleteBtn[i].addEventListener ('click', () => {

            productFlavor = deleteBtn[i].parentElement.querySelector('.cartFlavors').textContent;
            console.log (productFlavor);
            
            productGlaze =  deleteBtn[i].parentElement.querySelector('.cartGlaze').textContent.replace("Glaze: ", "");
            console.log (productGlaze);

            productQuant =  deleteBtn[i].parentElement.querySelector('.cartQuantity').textContent;
            console.log (productQuant);

            if (productFlavor == productArray[i].flavors && productGlaze == productArray[i].glaze && productQuant == productArray[i].quant) {
                productArray.splice (i,1);
                //delete productArray[i];
            };
            
           localStorage.setItem ('selectedProducts', JSON.stringify (productArray));

           location.reload ();

        })
    }

};
