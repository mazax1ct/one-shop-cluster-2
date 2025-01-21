function getMyCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setMyCookie(value) {
  var date = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
  document.cookie = "CHART_TYPE="+value+"; path=/; expires=" + date.toUTCString();
}

function maybeDisposeRoot(divId) {
  am5.array.each(am5.registry.rootElements, function(root) {
    if (root.dom.id == divId) {
      root.dispose();
    }
  });
}

function dayChartInit(divId) {
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

  root.interfaceColors.set("grid", am5.color(0x666587));
  root.interfaceColors.set("text", am5.color(0x666587));


  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0
  }));


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

  var tooltip = am5.Tooltip.new(root, {
      autoTextColor: false
  });

  var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0,
      baseInterval: {
          timeUnit: "day",
          count: 1
      },
      renderer: xRenderer,
      tooltip: tooltip
  }));

  tooltip.get("background").setAll({
      fill: am5.color(0x1D4BFF),
      stroke: am5.color(0x1D4BFF),
      cornerRadius: 5
  });

  tooltip.label.setAll({
      fill: am5.color(0xffffff),
      fontFamily: 'Geologica Roman'
  });

  xRenderer.grid.template.set("visible", false);

  xRenderer.labels.template.setAll({
      centerX: am5.p0
  });

  var yRenderer = am5xy.AxisRendererY.new(root, {});

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
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

  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: "date",
      tooltip: tooltip_2
  }));

  tooltip_2.get("background").setAll({
      stroke: am5.color(0x1D4BFF),
      fill: am5.color(0x1D4BFF),
      fillOpacity: 1,
      cornerRadius: 5,
  });

  tooltip_2.label.setAll({
      fill: am5.color(0xffffff),
      fontFamily: 'Geologica Roman'
  });

  series.columns.template.set("fillGradient", am5.LinearGradient.new(root, {
      stops: [{
          color: am5.color(0x1336AC)
      }, {
          color: am5.color(0xA301A6)
      }],
      rotation: 90
  }));

  series.columns.template.setAll({
      strokeOpacity: 0,
      shadowColor: am5.color(0x1336AC),
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0
  });

  series.columns.template.setAll({
      cornerRadiusTL: 20,
      cornerRadiusTR: 20,
      cornerRadiusBR: 20,
      cornerRadiusBL: 20,
      strokeOpacity: 0,
      width: 8
  });

  series.columns.template.events.on("pointerover", function(ev) {
      ev.target.animate({
          key: "shadowColor",
          to: am5.color(0x1E73FF),
          duration: 500,
          easing: am5.ease.linear
      });
  }, this);

  series.columns.template.events.on("pointerout", function(ev) {
      ev.target.animate({
          key: "shadowBlur",
          to: 10,
          duration: 500,
          easing: am5.ease.linear
      });
      ev.target.animate({
          key: "shadowColor",
          to: am5.color(0x1336AC),
          duration: 500,
          easing: am5.ease.linear
      });
  }, this);

  // Set data
  am5.net.load("json/day.json").then(function(result) {
      var data = am5.JSONParser.parse(result.response);
      series.data.setAll(data);
  }).catch(function(result) {
      console.log("Error loading " + result.xhr.responseURL);
  });

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000, 100);
  chart.appear(1000, 100);
}

function weekChartInit(divId) {
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

  root.interfaceColors.set("grid", am5.color(0x666587));
  root.interfaceColors.set("text", am5.color(0x666587));


  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0
  }));

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);
  cursor.lineX.set("visible", false);


  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minorGridEnabled: false,
    minorLabelsEnabled: false
  });

  xRenderer.labels.template.setAll({
    centerX: am5.p50
  });

  xRenderer.grid.template.setAll({
    location: 1
  })

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "category",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  }));

  var yRenderer = am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1
  })

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: yRenderer
  }));

  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  }));

  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });


  // Set data
  am5.net.load("json/week.json").then(function(result) {
      var data = am5.JSONParser.parse(result.response);

      xAxis.data.setAll(data);
      series.data.setAll(data);
  }).catch(function(result) {
      console.log("Error loading " + result.xhr.responseURL);
  });


  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000, 100);
  chart.appear(1000, 100);
}

function monthChartInit(divId) {
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

  root.interfaceColors.set("grid", am5.color(0x666587));
  root.interfaceColors.set("text", am5.color(0x666587));


  // Create chart
  // https://www.amcharts.com/docs/v5/charts/xy-chart/
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      paddingLeft: 0
  }));

  // Add cursor
  // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);
  cursor.lineX.set("visible", false);


  // Create axes
  // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
  var xRenderer = am5xy.AxisRendererX.new(root, {
    minorGridEnabled: false,
    minorLabelsEnabled: false
  });

  xRenderer.labels.template.setAll({
    centerX: am5.p50,
  });

  xRenderer.grid.template.setAll({
    location: 1
  })

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "category",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  }));

  var yRenderer = am5xy.AxisRendererY.new(root, {
    strokeOpacity: 0.1
  })

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: yRenderer
  }));

  // Create series
  // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "category",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  }));

  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });

  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });


  // Set data
  am5.net.load("json/month.json").then(function(result) {
      var data = am5.JSONParser.parse(result.response);

      xAxis.data.setAll(data);
      series.data.setAll(data);
  }).catch(function(result) {
      console.log("Error loading " + result.xhr.responseURL);
  });


  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear(1000, 100);
  chart.appear(1000, 100);
}

$(document).ready(function () {
  var chartType = getMyCookie("CHART_TYPE");

  if (chartType === undefined || chartType === "day") {
    chartType = 'day';
    setMyCookie(chartType);
    dayChartInit("chartdiv");
  } else if (chartType === "week") {
    weekChartInit("chartdiv");
  } else if (chartType === "month") {
    monthChartInit("chartdiv");
  }

  $('.js-data-toggler').removeClass('is-active');
  $('.js-data-toggler[data-interval="'+chartType+'"]').addClass('is-active');

  $(document).on('click', '.js-data-toggler', function () {
    $('.js-data-toggler').removeClass('is-active');
    $(this).addClass('is-active');

    chartType = $(this).attr('data-interval');

    setMyCookie(chartType);

    if (chartType === "day") {
      dayChartInit("chartdiv");
    }

    if (chartType === "week") {
      weekChartInit("chartdiv");
    }

    if (chartType === "month") {
      monthChartInit("chartdiv");
    }

    return false;
  });
});
