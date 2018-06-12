/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 01/05/2018
 * Code models PhanTrang.js
 */
var table = "#mytable";
$("#maxRows").on("change", function() {
  $(".pagination").html("");
  var trnum = 0;
  var maxRows = parseInt($(this).val());
  var totalRows = $(table + " tbody tr").length;
  $(table + " tr:gt(0)").each(function() {
    trnum++;
    if (trnum > maxRows) {
      $(this).hide();
    }
    if (trnum <= maxRows) {
      $(this).show();
    }
  });
  if (totalRows > maxRows) {
    var pagenum = Math.ceil(totalRows / maxRows);
    for (var i = 1; i <= pagenum; ) {
      $(".pagination")
        .append(
          '<li data-page="' +
            i +
            '"><span>' +
            i++ +
            '<span class="sr-only">(current)</span></span></li>'
        )
        .show();
    }
  }
  $(".pagination li:first-child").addClass("active");
  $(".pagination li").on("click", function() {
    var pagenum = $(this).attr("data-page");
    var trIndex = 0;
    $(".pagination li").removeClass("active");
    $(this).addClass("active");
    $(table + " tr:gt(0)").each(function() {
      trIndex++;
      if (
        trIndex > maxRows * pagenum ||
        trIndex <= maxRows * pagenum - maxRows
      ) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
});

$(function() {
  $("table tr:eq(0)").prepend("<th>ID</th>");
  var id = 0;
  $("table tr:gt(0)").each(function() {
    id++;
    $(this).prepend("<td>" + id + "</td>");
  });
});
