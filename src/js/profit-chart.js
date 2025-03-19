function chartInit(divId, chartType) {
  let interfaceColorsGrid = am5.color(0x666587);
  let interfaceColorsText = am5.color(0x666587);

  let tooltipFill = am5.color(0x1D4BFF);
  let tooltipStroke = am5.color(0x1D4BFF);
  let tooltipLabelFill = am5.color(0xFFFFFF);

  let tooltip_2Fill = am5.color(0x1D4BFF);
  let tooltip_2Stroke = am5.color(0x1D4BFF);
  let tooltip_2LabelFill = am5.color(0xFFFFFF);

  let seriesColumnsStart = am5.color(0x1336AC);
  let seriesColumnsStop = am5.color(0xA301A6);
  let seriesColumnsShadow = am5.color(0x1336AC);
  let seriesColumnsShadowHover = am5.color(0x1E73FF);

  let scrollbarXFill = am5.color(0xffffff);
  let scrollbarXThumb = am5.color(0x1D4BFF);

  let pageTheme = getMyCookie("PAGE_THEME");

  if (pageTheme === 'LIGHT') {
    interfaceColorsGrid = am5.color(0x666587);
    interfaceColorsText = am5.color(0x666587);

    tooltipFill = am5.color(0x6D55D8);
    tooltipStroke = am5.color(0x6D55D8);
    tooltipLabelFill = am5.color(0xFFFFFF);

    tooltip_2Fill = am5.color(0x6D55D8);
    tooltip_2Stroke = am5.color(0x6D55D8);
    tooltip_2LabelFill = am5.color(0xFFFFFF);

    seriesColumnsStart = am5.color(0x7D61FB);
    seriesColumnsStop = am5.color(0x40AEE5);

    scrollbarXFill = am5.color(0xffffff);
    scrollbarXThumb = am5.color(0x8975E3);
  }

    maybeDisposeRoot(divId);

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new(divId);
    root._logo.dispose();
    root.locale = am5locales_ru_RU;

    const myTheme = am5.Theme.new(root);

    myTheme.rule("Label").setAll({
        fontFamily: 'Geologica Roman'
    });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root),
        myTheme,
        am5themes_Responsive.new(root)
    ]);

    root.interfaceColors.set("grid", interfaceColorsGrid);
    root.interfaceColors.set("text", interfaceColorsText);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: false,
        wheelX: "none",
        wheelY: "panX",
        paddingLeft: 0
    }));

    chart.zoomOutButton.set("forceHidden", true);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, {
        minorGridEnabled: false,
        minorLabelsEnabled: false,
    });

    xRenderer.grid.template.set("visible", false);

    //if(chartType === 'day') {
        xRenderer.labels.template.setAll({
            centerX: am5.p0
        });
    //}


    var tooltip = am5.Tooltip.new(root, {
        autoTextColor: false
    });

    tooltip.get("background").setAll({
        fill: tooltipFill,
        stroke: tooltipStroke,
        cornerRadius: 5
    });

    tooltip.label.setAll({
        fill: tooltipLabelFill,
        fontFamily: 'Geologica Roman'
    });

    var xAxis;

    if(chartType === 'day') {
        xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
            baseInterval: {
                timeUnit: "day",
                count: 1
            },
            maxDeviation: 0,
            gridIntervals: [
                { timeUnit: "day", count: 30 },
                { timeUnit: "month", count: 1 }
            ],
            renderer: xRenderer,
            tooltip: tooltip
        }));
        xAxis.get("dateFormats")["day"] = "dd.MM.yyyy";
        xAxis.get("periodChangeDateFormats")["day"] = "dd.MM.yyyy";
    } else {
        xRenderer.labels.template.setAll({
            text: "{categoryAxis}"
        });
        xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            maxDeviation: 0,
            renderer: xRenderer,
            tooltip: tooltip
        }));
    }


    var yRenderer = am5xy.AxisRendererY.new(root, {});

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        strictMinMax: true,
        renderer: yRenderer
    }));

    yRenderer.labels.template.set('visible', false);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var tooltip_2 = am5.Tooltip.new(root, {
        autoTextColor: false,
        getFillFromObject: false,
        getFillFromSprite: false,
        labelText: "{valueY}"
    });

    var series;

    if(chartType === 'day') {
        series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: tooltip_2
        }));
    } else {
        series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "category",
            tooltip: tooltip_2
        }));
    }

    tooltip_2.get("background").setAll({
        stroke: tooltip_2Stroke,
        fill: tooltip_2Fill,
        fillOpacity: 1,
        cornerRadius: 5,
    });

    tooltip_2.label.setAll({
        fill: tooltip_2LabelFill,
        fontFamily: 'Geologica Roman'
    });

    series.columns.template.set("fillGradient", am5.LinearGradient.new(root, {
        stops: [{
            color: seriesColumnsStart
        }, {
            color: seriesColumnsStop
        }],
        rotation: 90,
        target: chart.plotContainer
    }));

    if (pageTheme !== 'LIGHT') {
      series.columns.template.setAll({
          shadowColor: seriesColumnsShadow,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          cornerRadiusTL: 20,
          cornerRadiusTR: 20,
          cornerRadiusBR: 20,
          cornerRadiusBL: 20,
          strokeOpacity: 0,
          width: 8
      });
    } else {
      series.columns.template.setAll({
          cornerRadiusTL: 20,
          cornerRadiusTR: 20,
          cornerRadiusBR: 20,
          cornerRadiusBL: 20,
          strokeOpacity: 0,
          width: 8
      });
    }

      if (pageTheme !== 'LIGHT') {
        series.columns.template.events.on("pointerover", function(ev) {
            ev.target.animate({
                key: "shadowColor",
                to: seriesColumnsShadowHover,
                duration: 500,
                easing: am5.ease.linear
            });
        }, this);

        series.columns.template.events.on("pointerout", function(ev) {
            ev.target.animate({
                key: "shadowColor",
                to: seriesColumnsShadow,
                duration: 500,
                easing: am5.ease.linear
            });
        }, this);
      }

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    var scrollbarX = chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal",
    }));

    chart.bottomAxesContainer.children.push(scrollbarX);

    scrollbarX.startGrip.set("forceHidden", true);
    scrollbarX.endGrip.set("forceHidden", true);

    scrollbarX.get("background").setAll({
        fill: scrollbarXFill,
        fillOpacity: 0
    });

    scrollbarX.thumb.setAll({
        fill: scrollbarXThumb,
        fillOpacity: 1
    });

    ///local/ajax/json_transaction_list.php
    $.get("/json/data.json",{TIME:chartType},function (jsonData) {
        if(chartType === 'day') {
            if(jsonData.length >= 30) {
                series.events.once("datavalidated", function(ev) {
                    ev.target.get("xAxis").zoomToDates(new Date(jsonData[0].date), new Date(jsonData[30].date));
                });
            }
            scrollbarX.set("forceHidden", false);
            series.data.setAll(jsonData);
        } else {
            if($('body').width() < 768) {
                series.events.once("datavalidated", function(ev) {
                    ev.target.get("xAxis").zoomToIndexes(0, 10);
                });
                if(jsonData.length > 10) {
                    scrollbarX.set("forceHidden", false);
                } else {
                    scrollbarX.set("forceHidden", true);
                }
            } else {
                series.events.once("datavalidated", function(ev) {
                    ev.target.get("xAxis").zoomToIndexes(0, 30);
                });

                if(jsonData.length > 30) {
                    scrollbarX.set("forceHidden", false);
                } else {
                    scrollbarX.set("forceHidden", true);
                }
            }

            xAxis.data.setAll(jsonData);
            series.data.setAll(jsonData);
        }
    }, "json");

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000, 100);
    chart.appear(1000, 100);
}

$(document).ready(function () {
    var chartType = getMyCookie("CHART_TYPE");

    if (chartType === undefined) {
        chartType = 'month';
        setMyCookie('CHART_TYPE', chartType);
    }

    chartInit("chartdiv", chartType);

    $('.js-data-toggler').removeClass('is-active');
    $('.js-data-toggler[data-interval="'+chartType+'"]').addClass('is-active');

    $(document).on('click', '.js-data-toggler', function () {
        $('.js-data-toggler').removeClass('is-active');
        $(this).addClass('is-active');

        chartType = $(this).attr('data-interval');

        setMyCookie('CHART_TYPE', chartType);

        chartInit("chartdiv", chartType);

        return false;
    });
});
