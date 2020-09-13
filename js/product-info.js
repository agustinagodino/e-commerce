//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var producto = {};

function showImages(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImages").innerHTML = htmlContentToAppend;
    }
}

function showcomments(arrayComments){

    let comments= "";



    for(comment in arrayComments){
        let puntos = "";
        

        for (let i =1 ; i<= arrayComments[comment].score; i++)    {
            puntos +=  ` <span class="fa fa-star checked"></span> `;
        }    
        for (let i = arrayComments[comment].score + 1; i<=5; i ++)    {
            puntos +=  ` <span class="fa fa-star"></span> `;
            }

        comments += `
        <a  class="list-group-item list-group-item-action">
            <div class="row">
                
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <dt class="mb-1">`+ arrayComments[comment].user+`</dt>
                        <small class="text-muted">` + arrayComments[comment].dateTime + ` </small>
                    </div>
                    <p class="mb-1">` +arrayComments[comment].description  + `</p>
                    <p class="mb-1">` + puntos + `</p>
                </div>
            </div>
        </a>
        `
        
      
        }


        document.getElementById("productcoment").innerHTML = comments ;
    }



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCount");
            let productCrHTML = document.getElementById("productCriteria");
        let productSoldHTML = document.getElementById("productSold");
        let productCatHTML = document.getElementById("productCat")

           productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCrHTML.innerHTML = product.currency;

            productSoldHTML.innerHTML = product.soldCount;
            productCatHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImages(product.images);
        }
    });
});









    document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                comment = resultObj.data;
               showcomments(comment);
            }
        });

        getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
            if (resultObj.status === "ok") {
                product = resultObj.data;

                
            }});

          
        });







        