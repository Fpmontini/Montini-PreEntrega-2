

document.getElementById('recuperarDatos').addEventListener('click', function () {
    const dataUsuarios = JSON.parse(localStorage.getItem('dataUsuarios')) || [];

    const ultimosRegistros = dataUsuarios.slice(-6).reverse(); // se obtienen los ultimos 3 registros siendo el mas reciente el primero
    const cardsContainer = document.getElementById('cards-container');

    // Limpia cualquier card existente antes de agregar las nuevas
    cardsContainer.innerHTML = '';

    ultimosRegistros.forEach((usuario) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Fecha y Hora: ${usuario.timestamp}</h5>
                <p class="card-text"><b>Nombre:</b> ${usuario.nombre}</p>
                <p class="card-text"><b>Edad:</b> ${usuario.edad} años</p>
                <p class="card-text"><b>Altura:</b> ${usuario.altura} cm</p>
                <p class="card-text"><b>Peso:</b> ${usuario.peso} kg</p>
                <p class="card-text"><b>Género:</b> ${usuario.genero}</p>
                <p class="card-text"><b>Nivel de Actividad:</b> ${usuario.actividad}</p>
                <p class="card-text"><b>Objetivo:</b> ${usuario.objetivo}</p>
                <p class="card-text"><b>Resultado:</b> ${usuario.resultado}</p>
                <button class="eliminar-datos form-submit bdr__form" data-id="${usuario.id}">Borrar</button>
            </div>
        `;

        // evento para eliminar card
        card.querySelector('.eliminar-datos').addEventListener('click', function (event) {
            const id = parseInt(event.target.getAttribute('data-id'), 10);
            eliminarRegistro(id);
            card.remove();
            (Swal.fire({
                title: "Registro borrado",
                text: "Este registro se eliminó correctamente",
                icon: "success"
              }))
        });

        cardsContainer.appendChild(card);
    });
});

// Borrar un registro específico del localStorage
function eliminarRegistro(id) {
    let dataUsuarios = JSON.parse(localStorage.getItem('dataUsuarios')) || [];
    dataUsuarios = dataUsuarios.filter(usuario => usuario.id !== id); 
    
    // Actualiza localStorage luego de eliminar la card especifica
    localStorage.setItem('dataUsuarios', JSON.stringify(dataUsuarios));
}

// Vaciar LocalStorage y cards completamente
const borrarTodo = document.getElementById("eliminarDatos");

borrarTodo.addEventListener("click", function() {
    // Verifica si hay datos en localStorage
    const dataUsuarios = JSON.parse(localStorage.getItem('dataUsuarios')) || [];
    
    if (dataUsuarios.length > 0) {
        // Vaciar el localStorage si hay algun dato cargado
        localStorage.clear();
        
        // Eliminar todas las cards
        const cardsContainer = document.getElementById('cards-container');
        cardsContainer.innerHTML = '';

        // Mensaje de confirmación
        Swal.fire({
            title: "Registros eliminados",
            text: "Tus registros fueron eliminados satisfactoriamente",
            icon: "success"
        });
    } else {
        // Mensaje de error si no hay datos en el localStorage
        Swal.fire({
            title: "Error",
            text: "No hay registros para eliminar.",
            icon: "error"
        });
    }
});
