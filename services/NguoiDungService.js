/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code service NguoiDungService.js
 */

function NguoiDungService() {
  this.LayDanhSachNguoiDung = function() {
    var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung";

    $.ajax({
      type: "GET",
      url: urlApi,
      success: function(ketqua) {
        var DSND = JSON.stringify(ketqua);

        localStorage.setItem("DanhSachND", DSND);
        localStorage.setItem("SoLuongNguoiDung", ketqua.length);
      },
      error: function(parsedjson, textStatus, errorThown) {
        console.log();
      }
    });
  };
  this.ThemNguoiDung = function(nguoidung) {
    var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung";
    $.ajax({
      type: "POST",
      url: urlApi,
      data: nguoidung,
      success: function(ketqua) {
        console.log(ketqua);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        swal("Oops", "Người dùng đã tồn tại!", "error");
      }
    });
  };
  this.XoaNguoiDung = function(id) {
    var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${id}`;
    $.ajax({
      type: "DELETE",
      url: urlAPI,
      contentType: "application/json",
      success: function(ketqua) {
        console.log(ketqua);
      },
      error: function(error) {
        swal(
          "Oops",
          "Không thể xóa người dùng đã đăng ký 1 khóa học trở lên!",
          "error"
        );
      }
    });
  };

  this.CapNhatThongTinNguoiDung = function(nguoidung) {
    var nd = JSON.stringify(nguoidung);
    var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`;
    $.ajax({
      type: "PUT",
      url: urlAPI,
      contentType: "application/json",
      data: nd,
      success: function(ketqua) {
        console.log(ketqua);
      },
      error: function(error) {
        console.log();
      }
    });
  };
}
