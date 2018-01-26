AmCharts.ready( function() {
    Number.prototype.noExponents = function () {
        var data = String(this).split(/[eE]/);
        if (data.length == 1) return data[0];

        var z = '',
            sign = this < 0 ? '-' : '',
            str = data[0].replace('.', ''),
            mag = Number(data[1]) + 1;

        if (mag < 0) {
            z = sign + '0.';
            while (mag++) z += '0';
            return z + str.replace(/^\-/, '');
        }
        mag -= str.length;
        while (mag--) z += '0';
        return str + x;
    }

    function myValue(value, valueText, valueAxis) {
        return value
    }


    var chartData = [];

    var chart = AmCharts.makeChart( "chartdiv", {
        type: "stock",
        "theme": "light",
        height:'404',
        dataDateFormat: "YYYY-MM-DD HH:NN:SS",
        balloonDateFormat: "YYYY-MM-DD HH:NN:SS",
        numberFormatter: {
            usePrefixes: false,
            precision: -1,
            decimalSeparator: ".",
            thousandsSeparator: " "
        },
        categoryAxesSettings: {
            maxSeries: 0,
            minPeriod: "ss",
            equalSpacing: true,
        },
        dataSets: [ {
            fieldMappings: [ {
                fromField: "oopen",
                toField: "oopen"
            }, {
                fromField: "oclose",
                toField: "oclose"
            }, {
                fromField: "ohigh",
                toField: "ohigh"
            }, {
                fromField: "olow",
                toField: "olow"
            }, {
                fromField: "ovolume",
                toField: "ovolume"
            }, {
                fromField: "close",
                toField: "value"
            }, {
                fromField: "average",
                toField: "average"
            } ],

            color: "rgba(95,204,41,0.4)",//底部矩形颜色设置
            dataProvider: chartData,
            title: " ",
            categoryField: "date"
        } ],
        panels: [ {
            title: "Price(24HR)",
            color:"#dde1e7",
            showCategoryAxis: false,
            marginRight: 80,
            percentHeight: 75,
            valueAxes: [ {
                labelFunction: function (value, valueText, valueAxis) {
                    return value.noExponents();
                },
                gridAlpha: 0.25,
                id: "v1",
                dashLength: 1,
                position: "left",
            }],

            categoryAxis: {
                dashLength: 1,
                gridAlpha: 0.25,
            },

            stockGraphs: [ {
                type: "candlestick",
                id: "g1",
                balloonText: "Open:<b>[[oopen]]</b><br>Low:<b>[[olow]]</b><br>High:<b>[[ohigh]]</b><br>Close:<b>[[oclose]]</b><br>Average:<b>[[average]]</b>",
                openField: "oopen",
                closeField: "oclose",
                highField: "ohigh",
                lowField: "olow",
                valueField: "oclose",
                lineColor: "rgba(95,204,41,0.6)",  //上边绿色边框
                fillColors: "rgba(95,204,41,0.6)", //上边边框颜色
                negativeLineColor: "rgba(220,48,48,0.6)",  //上边红色边框
                negativeFillColors: "rgba(220,48,48,0.6)", // 上边红色填充
                fillAlphas: 1,
                useDataSetColors: false,
                showBalloon: true,
                proCandlesticks: true
            } ],

            stockLegend: {
                markerType: "none",
                color:"#dde1e7",
                markerSize: 0,
                forceWidth: true,
                labelWidth: 0,
                labelText: "",
                periodValueText: "",
                periodValueTextRegular: "[[close]]"
            }
        },

            {
                title: "Volume(24HR)",
                color:"#999ea3",
                percentHeight: 25,
                marginTop: 1,
                showCategoryAxis: true,
                valueAxes: [ {
                    labelFunction: function (value, valueText, valueAxis) {
                        return value.noExponents();
                    },
                    inside: false,
                    precision: 8,
                    position: "right",
                    dashLength: 5
                } ],

                categoryAxis: {
                    dashLength: 5
                },

                stockGraphs: [ {
                    valueField: "ovolume",
                    type: "column",
                    showBalloon: true,
                    fillAlphas: 1
                } ],

                stockLegend: {
                    markerType: "none",
                    color:"#dde1e7",
                    markerSize: 0,
                    periodValueText: "",
                    periodValueTextRegular: "[[value]]"
                }
            }
        ],

        chartScrollbarSettings: {
            enabled: false,
        },

        chartCursorSettings: {
            valueLineEnabled: true,
            valueBalloonsEnabled: true,
            zoomable: false
        }
    });
    // console.log($(".panel-heading").html('<ul><li><span style="color:#fff">O</span><span style="color:red">12345678.12345678</span></li></ul>'))
    // $(".panel-heading").text('')
    var myButton = $("#c1D");

    $(".candleget").on("click", function() {
        var myself = $(this);
        myButton.removeClass('btn-success btn-danger btn-warning').addClass('btn-default')
        myself.removeClass('btn-success btn-danger btn-default').addClass('btn-warning')
        myButton = myself;
        updateChart($("#marketid").html(), $("#marketname").html(), $(this).attr('data-size'), $(this).attr('data-time'), myself);
    });

    $("#candlesize").on("change", function() {
        var myself = $("#c1D");
        myButton.removeClass('btn-success btn-danger btn-warning').addClass('btn-default')
        myself.removeClass('btn-success btn-danger btn-default').addClass('btn-warning')
        myButton = myself;
        updateChart($("#marketid").html(), $("#marketname").html(), $("#candlesize").val(), $("#history").val(), myself);
    });

    $("#history").on("change", function() {
        var myself = $("#c1D");
        myButton.removeClass('btn-success btn-danger btn-warning').addClass('btn-default')
        myself.removeClass('btn-success btn-danger btn-default').addClass('btn-warning')
        myButton = myself;
        updateChart($("#marketid").html(), $("#marketname").html(), $("#candlesize").val(), $("#history").val(), myself);
    });

    chart.addListener("dataUpdated", function (event) {
        chart.zoomOut();
    });

    var updatechart_c = 300;
    var updatehistory = setTimeout(updateChart, 100);

    function updateChart(marketid, marketname, candlesize, history, myself) {
        chartData.length = 0;

        // (myself) ? myself = myself : myself = myButton;
        // (marketid) ? marketid = marketid : marketid = $("#marketid").html();
        // (marketname) ? marketname = marketname : marketname = $("#marketname").html();
        // (candlesize) ? candlesize = candlesize : candlesize = myButton.attr('data-size');
        // (history) ? history = history : history = myButton.attr('data-time');

        // $.post("https://novaexchange.com/api/public/getohlc/",{'marketid': marketid, 'marketname': marketname, 'candlesize': candlesize, 'history': history}).done(function(data) {
        //     var result = JSON.parse(data);
            var result = [{
                'average':'0.00000014',
                'close':'0.00000014',
                'high':'0.00000014',
                'low':'0.00000014',
                'open':'0.00000014',
                'ticker':'2017-10-12 03:55:12',
                'volume':'0.00000014'},
                {'average':'0.00000018',
                'close':'0.00000018',
                'high':'0.00000018',
                'low':'0.00000018',
                'open':'0.00000018',
                'ticker':'2017-10-12 04:09:36',
                'volume':'0.00000018'},
                {'average':'0.00000020',
                'close':'0.00000050',
                'high':'0.00000060',
                'low':'0.00000020',
                'open':'0.00000020',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000020'},
                {'average':'0.00000022',
                'close':'0.00000022',
                'high':'0.00000012',
                'low':'0.00000002',
                'open':'0.00000042',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000022'},
                {'average':'0.00000028',
                'close':'0.00000028',
                'high':'0.00000028',
                'low':'0.00000028',
                'open':'0.00000028',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000000'},
                {'average':'0.00000035',
                'close':'0.00000035',
                'high':'0.00000065',
                'low':'0.00000005',
                'open':'0.00000025',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000052'},
                {'average':'0.00000064',
                'close':'0.00000084',
                'high':'0.00000084',
                'low':'0.00000064',
                'open':'0.00000064',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000064'},
                {'average':'0.00000084',
                'close':'0.00000084',
                'high':'0.00000084',
                'low':'0.00000084',
                'open':'0.00000084',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000084'},
                {'average':'0.00000123',
                'close':'0.00000123',
                'high':'0.00000123',
                'low':'0.00000123',
                'open':'0.00000123',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000123'},
                {'average':'0.00000073',
                'close':'0.00000073',
                'high':'0.00000073',
                'low':'0.00000073',
                'open':'0.00000073',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000073'},
                {'average':'0.00000068',
                'close':'0.00000068',
                'high':'0.00000068',
                'low':'0.00000068',
                'open':'0.00000068',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000068'},
                {'average':'0.00000052',
                'close':'0.00000052',
                'high':'0.00000052',
                'low':'0.00000052',
                'open':'0.00000052',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000052'},
                {'average':'0.00000053',
                'close':'0.00000053',
                'high':'0.00000043',
                'low':'0.00000043',
                'open':'0.00000043',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000043'},
                {'average':'0.00000025',
                'close':'0.00000025',
                'high':'0.00000025',
                'low':'0.00000025',
                'open':'0.00000025',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000000'},
                {'average':'0.00000014',
                'close':'0.00000014',
                'high':'0.00000014',
                'low':'0.00000014',
                'open':'0.00000014',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000000'},
                {'average':'0.00000034',
                'close':'0.00000054',
                'high':'0.00000054',
                'low':'0.00000014',
                'open':'0.0000003 4',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000023'},
                {'average':'0.00000014',
                'close':'0.00000014',
                'high':'0.00000014',
                'low':'0.00000014',
                'open':'0.00000014',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000000'},
                {'average':'0.00000034',
                'close':'0.00000054',
                'high':'0.00000064',
                'low':'0.00000024',
                'open':'0.00000034',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000034'},
                {'average':'0.00000014',
                'close':'0.00000014',
                'high':'0.00000014',
                'low':'0.00000014',
                'open':'0.00000014',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000000'},
                {'average':'0.00000024',
                'close':'0.00000034',
                'high':'0.00000064',
                'low':'0.00000024',
                'open':'0.00000024',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000010'},
                {'average':'0.00000014',
                'close':'0.00000014',
                'high':'0.00000014',
                'low':'0.00000014',
                'open':'0.00000014',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000200'},
                {'average':'0.00000014',
                'close':'0.00000004',
                'high':'0.00000054',
                'low':'0.00000014',
                'open':'0.00000024',
                'ticker':'2017-10-12 08:00:00',
                'volume':'0.00000011'}]
            var i = 0;
            // if (result.length == 0) {
            //     myself.removeClass('btn-success btn-warning btn-default').addClass('btn-danger');
            //     $("#chartdiv").removeClass('cls-show').addClass("cls-hidden").fadeOut("slow");
            //     $("#nodatadiv").removeClass('cls-hidden').addClass("cls-show").fadeIn("slow");
            // } else {
            //     myself.removeClass('btn-danger btn-warning btn-default').addClass('btn-success');
            //     $("#chartdiv").removeClass('cls-hidden').addClass("cls-show").fadeIn("slow");
            //     $("#nodatadiv").removeClass('cls-show').addClass("cls-hidden").fadeOut("slow");
            // }
            for (var key in result) {
                if (!result.hasOwnProperty(key)) continue;
                var row = result[key];

                chartData[i] = {
                    date: row.ticker,
                    oopen: row.open,
                    oclose: row.close,
                    ohigh: row.high,
                    olow: row.low,
                    ovolume: row.volume,
                    average: row.average,
                    value: row.average
                };
                // console.log(chartData[i].date)
                // chartData[i].date.color = yellow
                i++;
            }
            chart.validateData();
            

        // });
        if (updatechart_c >= 1) {
            var updatehistory = setTimeout(updateChart, 30000);
            updatechart_c = updatechart_c - 1;
        }

    }

//updateChart()
});