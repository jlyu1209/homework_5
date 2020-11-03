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
            console.log (flavorStr);
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


class Rolls {
    constructor (flavors, glaze, quant){
        this.flavors = flavors
        this.glaze = glaze
        this.quant = quant
    }
};


function addToBag() {
   
    var flavors = document.querySelector('#p-modal-flavor').innerText;
    //console.log (flavors);
    
    //var glaze = document.getElementsByClassName ("glazeType").value
    var glaze = document.querySelector("button.glazeType.active-glaze").value;
    //console.log (glaze);
    
    var quant = document.querySelector("#selectedQuant").value;


    var quantCount = parseInt(quant)
	for(var i = 0; i < quantCount; i++) {
		var roll = new Rolls (flavors, glaze, 1)
		productArray.push(roll)	
    };
    

    //var roll = new Rolls (flavors, glaze, quant);

    //productArray.push(roll);
    console.log (productArray);

	
    updateBagNumber(productArray.length);

    document.querySelector ('.addonmodal').style.display = "none";
   
};


function updateBagNumber (num) {
    var bagCount = document.querySelector('#bagCount');
    bagCount.innerHTML = num; 
};


function backToOrder (){
    document.querySelector ('.addonmodal').style.display = "none";
};







