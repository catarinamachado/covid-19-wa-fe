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
var casesCountry = {}

for (countryKey in countries) {
    var countryName = countries[countryKey];
    var apiAccess = 'http://localhost:8000/countryData?Country=' + countryKey;

    $.ajax({
        url: apiAccess,
        async: false,
        dataType: 'json',
        success: function(data) {
            totalNumber = data.total;
            curedNumber = data.cured;
            deathsNumber = data.deaths;
        }
    });

    rowHTML += '<td><div class="checkbox"><label><input type="checkbox" class="check" onchange="updateDate()" id="' + countryKey + '"></label></div></td>';
    rowHTML += '<td class="align-middle">' + countryName + '</td>';
    rowHTML += '<td class="align-middle">' + totalNumber + '</td>';

    tbody += '<tr class="m-0">' + rowHTML + '</tr>';
    rowHTML = '';

    var key = countryKey
    if (!casesCountry[key]) {
        casesCountry[key] = {}
    }
    casesCountry[key].value = totalNumber
    casesCountry[key].attrs = { "href": "#" }
    casesCountry[key].tooltip = { "content": "<strong>"+countryName+"</strong><br/>Casos: "+totalNumber+"</br>Recuperados: "+curedNumber+"</br>Mortos: "+deathsNumber+"</br>"}
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

//Colors for map cases
var caseLegendAreaColors = [
    {
        min: 100000,
        attrs: {
            fill: "#2A002A"
        }
    },
    {
        min: 10000,
        max: 99999, 
        attrs: {
            fill: "#800080"
        }
    },
    {
        min: 1000,
        max: 9999, 
        attrs: {
            fill: "#9932CC"
        }
    },
    {
        min: 100,
        max: 999, 
        attrs: {
            fill: "#DA70D6"
        }
    },
    {
        min: 10,
        max: 99, 
        attrs: {
            fill: "#DDA0DD"
        }
    },
    {
        min: 1,
        max: 9, 
        attrs: {
            fill: "#EE82EE"
        }
    },
    {
        max: 0, 
        attrs: {
            fill: "#D8BFD8"
        }
    }
]

//Show map with colors of cases
$(function(){
    $(".cases").mapael({
        map: {
            name : "world_countries_miller",
            zoom: {
                enabled: true,
                maxLevel: 10
            },
            defaultArea: {
                attrsHover: {
                    fill: "#C0C0C0"
                },
                attrs : {
                    stroke : "#fff", 
                    "stroke-width" : 1
                }
            }
        },
        legend: {
            area: {
                display : false,
                slices : caseLegendAreaColors
            },
        },
        areas: casesCountry
    });
});

//Fuction that resize map
function resize(){   
    if($(window).width() > 700) {
        var h = $(window).width()/3,
        offsetTop = 60; 
        $(".mapael .map").css('width', h - offsetTop);
    } else {
        $(".mapael .map").css('width', '300px');
    }
}

$(document).ready(function(){
    resize();
    $(window).on("resize", function(){                      
        resize();
    });
});