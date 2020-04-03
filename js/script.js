//Grafico lines
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(105, 0, 132, .2)',
            ],
            borderColor: [
            'rgba(200, 99, 132, .7)',
            ],
            borderWidth: 2
        },
        {
            label: "My Second dataset",
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: [
            'rgba(0, 137, 132, .2)',
            ],
            borderColor: [
            'rgba(0, 10, 130, .7)',
            ],
            borderWidth: 2
        }
    ]
    },
    options: {
        responsive: true
    }
});

// Data atual (Footer)
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var output = (day<10 ? '0' : '') + day + '/' +
             (month<10 ? '0' : '') + month + '/' +
             d.getFullYear();

$("#data").html(output);

// Tabela dos Dados globais
$.getJSON('http://localhost:8000/overallData', function(data) {
    $("#totalGlobal").html(data.total);
    $("#hojeGlobal").html(data.newToday);
    $("#curedGlobal").html(data.cured);
    $("#deathsGlobal").html(data.deaths);
});

//Tabela total países
$(document).ready(function () {
    $('#dtTable').DataTable({
        "searching": false,
        "lengthChange": false,
        "aaSorting": [],
        columnDefs: [{
            orderable: false,
            targets: 0
        }],
        select: {
        style: 'os',
        selector: 'td:first-child'
        },
        language: {
            "sProcessing":    "Processando...",
            "sLengthMenu":    "Mostrar _MENU_ registos",
            "sZeroRecords":   "Sem resultados",
            "sEmptyTable":    "Nenhum dados disponível",
            "sInfo":          "Mostrando _START_ até _END_ em _TOTAL_",
            "sInfoEmpty":     "Mostrando 0 a 0 em 0",
            "sInfoFiltered":  "(filtrado de um total de _MAX_ registos)",
            "sInfoPostFix":   "",
            "sSearch":        "Procurar:",
            "sUrl":           "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Carregando...",
            "oPaginate": {
                "sFirst": "Primeiro",
                "sLast": "Último",
                "sNext": "Seguinte",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Ativar para ordenar a columna de maneira ascendente",
                "sSortDescending": ": Ativar para ordenar a columna de maneira descendente"
            }
        }
    });
    $('.dataTables_length').addClass('bs-select');
});



$("#checkAll").click(function () {
    $(".check").prop('checked', $(this).prop('checked'));
});
