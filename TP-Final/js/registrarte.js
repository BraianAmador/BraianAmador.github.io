function registrar()
{
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;
    var clave2 = document.getElementById("clave2").value;
    const correosValidos = ["@gmail.com", "@hotmail.com", "@yahoo.com"];
    var datos = [nombre, apellido, correo, clave, clave2];

    if(datos.some(dato => dato.length < 0)){
        alert = ("Por favor debe completar todos los campos");
    }
    else if(correosValidos.some(elem => correo.includes(elem)) && clave == clave2)
    {
        window.location = "home.html";
    }
    else{
        alert = ("Por favor revise los datos ingresados");
    }
}



