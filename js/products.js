//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var currentProductsArray = [];

const ORDER_ASC_BY_PRECIO = "precio->PRECIO";
const ORDER_DESC_BY_PRECIO = "PRECIO->precio";
const ORDER_DESC_BY_REL= "COSTO->costo";


var minPrecio = undefined;
var maxPrecio = undefined;
var buscar = undefined;








function sortProducts(criterio,array){
    let result = [];

    if (criterio === ORDER_ASC_BY_PRECIO) {
        result = array.sort(function(a,b) {
            if (a.cost < b.cost) {return -1 ;}
            if(a.cost>b.cost) {return 1;}
            return 0;
        });

     } else  if (criterio === ORDER_DESC_BY_PRECIO) {
            result = array.sort(function(a,b) {
                if (a.cost > b.cost) {return -1 ;}
                if(a.cost<b.cost) {return 1;}
                return 0;
            });

    }else if (criterio === ORDER_DESC_BY_REL) {
        result = array.sort(function(a,b){
            if (a.soldCount > b.soldCount) {return -1 ;}
            if(a.soldCount<b.soldCount) {return 1;}
            return 0;
        });
    }
    return result;
}









function showProductsList(array) {

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];


        if(((minPrecio == undefined)||(minPrecio != undefined && parseInt(product.cost)>=minPrecio))&&((maxPrecio == undefined)|| (maxPrecio != undefined&& parseInt(product.cost)<=maxPrecio)))
        {
            if(buscar == undefined || product.name.toLowerCase().indexOf(buscar)!= -1 ){

        
htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">

            
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>

                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1"> `+ product.name +`</h4>
                        
                     <small class="text-muted">` + product.soldCount + ` artículos vendidosp</small>
                    </div>
                <p class="mb-1">` + product.description + `</p>
                <br>
                <h4 class="mb-1"> `+ product.currency + ` `+ product.cost + `</h4>
            </div>

            

        </div>
        </a>
        `
       
 
       
 
    }

   
}


        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            currentProductsArray = resultObj.data;
            currentProductsArray = sortProducts(ORDER_ASC_BY_PRECIO, currentProductsArray)
            
           
            showProductsList(currentProductsArray);
        }
    });



document.getElementById("sortAsc").addEventListener("click",function(){
    currentProductsArray = sortProducts(ORDER_ASC_BY_PRECIO, currentProductsArray);
    showProductsList(currentProductsArray);
});

document.getElementById("sortDesc").addEventListener("click",function(){
    currentProductsArray = sortProducts(ORDER_DESC_BY_PRECIO, currentProductsArray);
    showProductsList(currentProductsArray);
});

document.getElementById("sortByCount").addEventListener("click",function(){
    currentProductsArray = sortProducts(ORDER_DESC_BY_REL, currentProductsArray);
    showProductsList(currentProductsArray);
});





    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        minPrecio = document.getElementById("rangeFilterCountMin").value;
        maxPrecio = document.getElementById("rangeFilterCountMax").value;
 
    if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0) {
        minPrecio = parseInt(minPrecio);
    }   
    else {
        minPrecio = undefined;
    } 
    
    if ((maxPrecio != undefined) &&(maxPrecio != "")&& (parseInt(maxPrecio))>=0){
        maxPrecio = parseInt(maxPrecio);
    }   
    else {
        maxPrecio = undefined;
    } 
 
    showProductsList(currentProductsArray)


});

document.getElementById('clearRangeFilter').addEventListener("click", function()
{
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
 
    minPrecio = undefined;
    maxPrecio = undefined;
    showProductsList(currentProductsArray)
});

});
