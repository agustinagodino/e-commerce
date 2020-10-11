//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var carritoArray = [];


function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calcEnvio()
}


function calcSubtotal(precio, i){

    let count = parseInt(document.getElementById(`count${i}`).value);
    subtotal = count * precio;      
    document.getElementById(`carroSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}


function showCarrito(array) {

    let contenido = "";

    for (let i = 0; i < array.length; i++) {
        
        let carro = array[i];

        let sub = carro.unitCost * carro.count;

        contenido += `
        <tr>
            <td><img src='${carro.src}' width="50px"></td>

            <td>${carro.name}</td>
            <td>${carro.currency}</td>

            <td>${carro.unitCost}</td>

            <td><input style="width:60px;" onchange="calcSubtotal(${carro.unitCost}, ${i})" 
                type="number" id="count${i}" value="${carro.count}" min="1"></td>

            <td><span class="subtotal" id="carroSubtotal${i}" style="font-weight:bold;">${sub}</span></td>
        </tr>
        `

        document.getElementById("listado").innerHTML = contenido;
    }
    calcTotal();
}


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carritoArray = resultObj.data.articles;

            
            showCarrito(carritoArray);

            

        }

    });

    


});