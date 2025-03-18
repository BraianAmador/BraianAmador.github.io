const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-c8IpeKMMpmqimvekCqgZbpmiBVGzXXeGZ85u0b9BnwDhC71n4AJkiCazv_lQuszNbhO9qc8OBN-7/pub?output=csv";
let contactos = [];  // Para almacenar todos los contactos

async function cargarContactos() {
    try {
        // Fetch los datos del archivo CSV
        const response = await fetch(sheetURL);
        const data = await response.text();

        // Parsear los datos CSV con PapaParse
        Papa.parse(data, {
            complete: function(results) {
                contactos = results.data;
                let tableBody = document.getElementById("contactTable");
                tableBody.innerHTML = ""; // Limpiar tabla antes de agregar nuevas filas

                // Verificar si hay datos (sin la fila de encabezado)
                if (contactos.length > 1) {
                    // Recorrer las filas de contactos (saltando la primera fila de encabezados)
                    mostrarContactos(contactos.slice(1)); // Empezamos desde la segunda fila
                } else {
                    mostrarError("No hay datos disponibles en la hoja de cálculo.");
                }
            },
            error: function(error) {
                mostrarError("Hubo un error procesando los datos. Intenta de nuevo más tarde.");
            }
        });
    } catch (error) {
        mostrarError("Error al cargar los datos desde Google Sheets.");
        console.error("Error cargando los datos:", error);
    }
}

// Función para mostrar los contactos
function mostrarContactos(contactosFiltrados) {
    let tableBody = document.getElementById("contactTable");
    tableBody.innerHTML = ""; // Limpiar tabla antes de agregar nuevas filas

    contactosFiltrados.forEach(contacto => {
        let newRow = `<tr>
            <td>${contacto[0] || ''}</td>  <!-- Número -->
            <td>${contacto[1] || ''}</td>  <!-- Interno -->
            <td>${contacto[2] || ''}</td>  <!-- Usuario -->
            <td>${contacto[3] || ''}</td>  <!-- Sector -->
            <td>${contacto[4] || ''}</td>  <!-- Ubicación -->
            <td>${contacto[5] || ''}</td>  <!-- Empresa -->
        </tr>`;
        tableBody.innerHTML += newRow;
    });
}

// Función de búsqueda por nombre o apellido
function filtrarContactos() {
    let input = document.getElementById("searchInput");
    let filtro = input.value.toLowerCase();
    let contactosFiltrados = contactos.filter(contacto => {
        // Filtra por nombre o apellido en la columna "Usuario" (índice 2)
        return contacto[2].toLowerCase().includes(filtro);  
    });
    mostrarContactos(contactosFiltrados);
}

// Función para mostrar el mensaje de error
function mostrarError(message) {
    const errorMessageDiv = document.getElementById("error-message");
    errorMessageDiv.style.display = "block";
    errorMessageDiv.innerText = message;
}

// Cargar los contactos cuando se cargue la página
cargarContactos();
