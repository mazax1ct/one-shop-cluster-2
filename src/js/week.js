function weekChartInit() {
  // Create root element
  // https://www.amcharts.com/docs/v5/getting-started/#Root_element
  var root = am5.Root.new("chartdiv");
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
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15
  });

  xRenderer.grid.template.setAll({
    location: 1
  })

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "week",
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
    categoryXField: "week",
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
  series.appear(1000);
  chart.appear(1000, 100);
}
