/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code service GhiDanhService.js
 */

function GhiDanhService() {
  this.GhiDanh = function() {
    $("#ghidanh").click(function() {
      var makhoahoc = localStorage.getItem("makhoahoc");
      var taikhoan = localStorage.getItem("TaiKhoan");

      var model = JSON.stringify({ MaKhoaHoc: makhoahoc, TaiKhoan: taikhoan });
      var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc";

      $.ajax({
        type: "POST",
        url: urlApi,
        contentType: "application/json",
        dataType: "json",
        data: model,
        success: function(ketqua) {
          if (taikhoan != null) {
            swal("Good job!", "Bạn đã ghi danh thành công!", "success");
          } else {
            swal("Oops", "Bạn phải đăng nhập trước!", "error");
          }
        },
        error: function(parsedjson, textStatus, errorThown) {
          swal("Oops", "Bạn đã ghi danh khóa học này rồi!", "error");
        }
      });
    });
  };
}
