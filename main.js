window.onload = (event) => {
    addClickHandlersForGlazeButtons();
    addClickHandlersForProductCards();
};



function addClickHandlersForGlazeButtons() {
    let glazeButtons = document.querySelectorAll("button.glazeType");
    for (let glazeButton of glazeButtons) {
        glazeButton.onclick = function(e) {
            let prevActiveGlazeButton = document.querySelector("button.glazeType.active-glaze")
            if (prevActiveGlazeButton) {
                // when there is an active glaze type button,
                // remove the active-ness from it
                prevActiveGlazeButton.classList.remove("active-glaze")
            }
            // change the background color
            glazeButton.classList.add("active-glaze")
        }
    }
}



function chooseFlavor(targetId) {
    if (targetId == "pumpkin-pic") {
        return "PUMPKIN SPICE"
    } else if (targetId == "blueberry-pic") {
        return "BLUEBERRY"
    } else if (targetId == "original-pic") {
        return "ORIGINAL"
    } else if (targetId == "walnut-pic") {
        return "WALNUT"
    }else if (targetId == "caramel-pic") {
        return "CARAMEL"
    }else if (targetId == "gluten-pic") {
        return "GLUTEN-FREE"
    }
}




function addClickHandlersForProductCards() {
    // for handling clicking product cards => pop the appropriate modal
    let productCards = document.querySelectorAll('.productcard')
    for (let productCard of productCards) {
        productCard.onclick = function(e) {
            console.log(e)
            // popping-up the modal
            document.querySelector('.addonmodal').style.display = 'flex';

            // change the image of the modal div
            let imgDiv = document.querySelector("#div-img-modal");
            let targetId = e.target.id;
            //console.log (imgDiv);
            //console.log (targetId);
            imgDiv.classList.add(targetId);

            // change the text of the modal paragraphs
            let pFlavor = document.querySelector("#p-modal-flavor")
            let flavorStr = chooseFlavor(targetId)
            //console.log (flavorStr);
            pFlavor.innerText = flavorStr

            // change the price of modal  
            let pPrice = document.querySelector ("#p-modal-price")
            let parentElem = e.target.parentElement;
            let priceStr = (parentElem.querySelector ('.price')).innerHTML;
            pPrice.innerText = priceStr

        }
    }
}

var productArray = []
//var cartProducts = []


class Rolls {
    constructor (flavors, glaze, quant, price){
        //this.productPic = productPic;
        this.flavors = flavors;
        this.glaze = glaze;
        this.quant = quant;
        this.price = price;
    }
};


function addToBag() {

    //var productPic = document.querySelector()
   
    var flavors = document.querySelector('#p-modal-flavor').innerText;
    var glaze = document.querySelector("button.glazeType.active-glaze").value;
    var price = document.querySelector("#p-modal-price").innerText;
    var quant = document.querySelector("#selectedQuant").value;

    var quantCount = parseInt(quant);
    
    var roll = new Rolls (flavors, glaze, quantCount, price);
    
	productArray.push(roll);
    //console.log (productArray);

    updateBagNumber(productArray);

    document.querySelector('.addonmodal').style.display = "none";

   
    window.localStorage.setItem ('selectedProducts', JSON.stringify (productArray));


};


function updateBagNumber (productArray) {
    let count = 0;
    for (let i = 0; i < productArray.length; i++) {
        count = count + productArray[i].quant
    }
    var bagCount = document.querySelector('#bagCount');
    bagCount.innerHTML = count; 
};


function backToOrder (){
    document.querySelector ('.addonmodal').style.display = "none";
};










