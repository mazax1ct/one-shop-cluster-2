// Data
var data = [{
    category: "Квалификационный",
    value: 83.33333,
    full: 100,
    columnSettings: {
      fill: '#FF611D'
    }
  }, {
    category: "Кластерный",
    value: 88.8,
    full: 100,
    columnSettings: {
      fill: '#195DDC'
    }
  }, {
    category: "Личный",
    value: 44.44444,
    full: 100,
    columnSettings: {
      fill: '#18B64D'
    }
}];

function chartInit(divId, data) {
    let seriesFill = '#121225';

    let pageTheme = getMyCookie("PAGE_THEME");

    if (pageTheme === 'LIGHT') {
      seriesFill = '#EDEDF7';
    }

    maybeDisposeRoot(divId);

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");
    root._logo.dispose();

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "none",
      wheelY: "none",
      radius: am5.percent(100),
      innerRadius: am5.percent(30),
      startAngle: -90,
      endAngle: 270
    }));


    // Create axes and their renderers
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
    var xRenderer = am5radar.AxisRendererCircular.new(root, {});

    xRenderer.grid.template.setAll({
      forceHidden: true
    });


    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: 100,
      visible: false
    }));


    var yRenderer = am5radar.AxisRendererRadial.new(root, {});

    yRenderer.labels.template.setAll({
      visible: false,
    });

    yRenderer.grid.template.setAll({
      forceHidden: true
    });


    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      renderer: yRenderer
    }));

    yAxis.data.setAll(data);


    // Create series
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
    var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "full",
      categoryYField: "category",
      fill: seriesFill
    }));

    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
    });

    series1.data.setAll(data);


    var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueXField: "value",
      categoryYField: "category"
    }));

    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      cornerRadius: 20,
      templateField: "columnSettings"
    });

    series2.data.setAll(data);

    // Animate chart and series in
    // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
}

$(document).ready(function () {
  chartInit("chartdiv", data);
});
