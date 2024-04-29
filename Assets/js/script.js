$(document).ready(function() {
    cargarIndicadores();
    $('#formulario').submit(function(event) {
        event.preventDefault();
        
       
        var fecha = $('#fecha').val();
        var valor = $('#valor').val();
        
        
        $.ajax({
            type: 'POST',
            url: 'crud.php',
            data: JSON.stringify({ fecha: fecha, valor: valor }),
            contentType: 'application/json',
            success: function(response) {
                if (response) {
                    alert('Indicador UF agregado correctamente');
                    $('#fecha').val('');
                    $('#valor').val('');
                    cargarIndicadores();
                } else {
                    alert('Error al agregar el indicador UF');
                }
            }
        });
    });


    function cargarIndicadores() {
        $.ajax({
            type: 'GET',
            url: 'crud.php',
            success: function(response) {
                mostrarIndicadores(response);
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    }

    function mostrarIndicadores(indicadores) {
        var listaIndicadores = $('#lista-indicadores');
        listaIndicadores.empty();
        $.each(indicadores, function(index, indicador) {
            var li = $('<li>').addClass('list-group-item');
            li.text('Fecha: ' + indicador.fecha + ', Valor: ' + indicador.valor);
            listaIndicadores.append(li);
        });
    }
});
