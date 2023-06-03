function loguear()
{
    let correo = document.getElementById("correo").value;
    let clave = document.getElementById("clave").value;

    if(correo == "usuario@gmail.com" && clave == "1234")
    {
        window.location= "home.html";
    }
    else{
        alert("Los datos ingresados son incorrectos");
    }
}