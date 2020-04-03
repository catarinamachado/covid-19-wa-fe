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

var dayProblem = day - 2;

var todayDateEnglish = month + "/" +
                       (dayProblem<10 ? '0' : '') + dayProblem + '/' +
                       d.getFullYear().toString().substr(-2);

console.log(todayDateEnglish);
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
            "sLengthMenu":    "Mostrar _MENU_ registos",
            "sZeroRecords":   "Sem resultados",
            "sEmptyTable":    "Sem dados disponível",
            "sInfo":          "Mostrando _START_ até _END_ num total de _TOTAL_",
            "sInfoEmpty":     "Mostrando 0 a 0 em 0",
            "sInfoFiltered":  "(filtrado num total de _MAX_ registos)",
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

var countries = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AO": "Angola",
    "AR": "Argentina",
    "AM": "Armenia",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BD": "Bangladesh",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BR": "Brazil",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CI": "Ivory Coast",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CO": "Colombia",
    "CG": "Congo",
    "CD": "Democratic Republic of Congo",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czechia",
    "DK": "Denmark",
    "DP": "Diamond Princess",
    "DJ": "Djibouti",
    "DO": "Dominican Republic",
    "CD": "DR Congo",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GR": "Greece",
    "GL": "Greenland",
    "GT": "Guatemala",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KP": "Korea",
    "XK": "Kosovo",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Lao",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MK": "Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "ML": "Mali",
    "MR": "Mauritania",
    "MX": "Mexico",
    "MD": "Moldova",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "KP": "North Korea",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PS": "Palestine",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "XK": "Republic of Kosovo",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "KR": "South Korea",
    "SS": "South Sudan",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "AE": "UAE",
    "UG": "Uganda",
    "GB": "United Kingdom",
    "UA": "Ukraine",
    "US": "USA",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
}

// Preencher tabela total países
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
    var checkBoxAll = document.getElementById("checkAll");

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
        var todayData, countryKeyArr, apiAccess;

        for(countryKeyIdArr in arr){
            countryKeyArr = arr[countryKeyIdArr];

            if (countryKeyArr != "checkAll"){
                apiAccess = 'http://localhost:8000/countryHistory?Country=' + countryKeyArr;

                $.ajax({
                    url: apiAccess,
                    async: false,
                    dataType: 'json',
                    success: function(data) {
                        todayData = data[0][todayDateEnglish];

                        totalInfetados += todayData.total_cases;
                        maisHoje += todayData.new_daily_cases;
                        recuperados += todayData.total_recoveries;
                        mortes += todayData.total_deaths;
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