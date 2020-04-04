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

var todayDate = (day<10 ? '0' : '') + day + '/' +
                (month<10 ? '0' : '') + month + '/' +
                d.getFullYear();

$("#data").html(todayDate);

//Tabela dados países
$(document).ready(function () {
    $('#dtTable').DataTable({
        dom:"<'myfilter'f>tpi",
        "lengthChange": false,
        pageLength: 8,
        "aaSorting": [],
        columnDefs: [{
            orderable: false,
            targets: 0
        }],
        select: {
        style: 'os',
        selector: 'td:first-child'
        },
        "order": [[ 2, "desc" ]],
        language: {
            "sProcessing":    "Processando...",
            "sLengthMenu":    "Mostrar _MENU_ países",
            "sZeroRecords":   "Sem resultados",
            "sEmptyTable":    "Sem dados disponível",
            "sInfo":          "Mostrando _START_ até _END_ num total de _TOTAL_",
            "sInfoEmpty":     "Mostrando 0 a 0 em 0",
            "sInfoFiltered":  "(filtrado num total de _MAX_ países)",
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


// Preencher tabela total países
var countries;

$.ajax({
    url: "http://localhost:8000/countries",
    async: false,
    dataType: 'json',
    success: function(data) {
        countries = data;
    }
});

var totalNumber;
var tbody = '', rowHTML = '';

for (countryKey in countries) {
    var countryName = countries[countryKey];
    var apiAccess = 'http://localhost:8000/countryData?Country=' + countryKey;

    $.ajax({
        url: apiAccess,
        async: false,
        dataType: 'json',
        success: function(data) {
            totalNumber = data.total;
        }
    });

    rowHTML += '<td><div class="checkbox"><label><input type="checkbox" class="check" onchange="updateDate()" id="' + countryKey + '"></label></div></td>';
    rowHTML += '<td class="align-middle">' + countryName + '</td>';
    rowHTML += '<td class="align-middle">' + totalNumber + '</td>';

    tbody += '<tr class="m-0">' + rowHTML + '</tr>';
    rowHTML = ''
}

document.getElementById('table-data').innerHTML = tbody;
// Fim Preencher tabela total países


//Function activated when checklist is clicked
function updateDate() {
    var arr = $('input:checkbox.check:checked').map(function () {
        return this.id;
    }).get();

    if (arr.length == 0) {
        $.getJSON('http://localhost:8000/overallData', function(data) {
            $("#totalGlobal").html(data.total);
            $("#hojeGlobal").html(data.newToday);
            $("#curedGlobal").html(data.cured);
            $("#deathsGlobal").html(data.deaths);
        })
    } else {
        var totalInfetados = 0, maisHoje = 0, recuperados = 0, mortes = 0;
        var countryKeyArr, apiAccess;

        for(countryKeyIdArr in arr){
            countryKeyArr = arr[countryKeyIdArr];

            if (countryKeyArr != "checkAll"){
                apiAccess = 'http://localhost:8000/countryData?Country=' + countryKeyArr;

                $.ajax({
                    url: apiAccess,
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        totalInfetados += data.total;
                        maisHoje += data.newToday;
                        recuperados += data.cured;
                        mortes += data.deaths;
                    }
                });
            }
        }

        $("#totalGlobal").html(totalInfetados);
        $("#hojeGlobal").html(maisHoje);
        $("#curedGlobal").html(recuperados);
        $("#deathsGlobal").html(mortes);
    }
  }

// Tabela dos Dados globais (default)
$.getJSON('http://localhost:8000/overallData', function(data) {
    $("#totalGlobal").html(data.total);
    $("#hojeGlobal").html(data.newToday);
    $("#curedGlobal").html(data.cured);
    $("#deathsGlobal").html(data.deaths);
});
