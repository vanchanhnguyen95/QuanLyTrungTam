/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 30/05/2018
 * Code file bieudo.js
 */

Highcharts.chart("bieudotron", {
  chart: {
    plotBackgroundColor: true,
    plotBorderWidth: true,
    plotShadow: true,
    type: "pie"
  },
  title: {
    text: "Thống kê tình hình khóa học năm 2018"
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: [
    {
      name: "Tỷ lệ",
      colorByPoint: true,
      data: [
        {
          name: "Lập trình Front End",
          y: 61.41,
          sliced: true,
          selected: true
        },
        {
          name: "Dữ liệu & Giải thuật",
          y: 11.84
        },
        {
          name: "Full stack Js",
          y: 10.85
        },
        {
          name: "NodeJs",
          y: 4.67
        },
        {
          name: "ReacJs",
          y: 4.18
        },
        {
          name: "Lập trình Backend",
          y: 7.05
        }
      ]
    }
  ]
});
