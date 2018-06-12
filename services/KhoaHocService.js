/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code service KhoaHocService.js
 */

function KhoaHocService() {
  this.LayDanhSachKhoaHoc = function() {
    var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";
    $.ajax({
      type: "GET",
      url: urlApi,

      success: function(ketqua) {
        var DSKH = JSON.stringify(ketqua);
        localStorage.setItem("DanhSachKH", DSKH);
        localStorage.setItem("SoLuongKhoaHoc", ketqua.length);
      },
      error: function(parsedjson, textStatus, errorThown) {
        console.log();
      }
    });
  };

  this.ThemKhoaHoc = function(khoahoc) {
    var urlApi = `http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc`;
    $.ajax({
      type: "POST",
      url: urlApi,
      data: khoahoc,
      success: function(ketqua) {
        swal("Thành công!", "Đã thêm khóa học!", "success");
      },
      error: function(xhr, ajaxOptions, thrownError) {
        swal("Oops", "Khóa học đã tồn tại!", "error");
      }
    });
  };
  this.XoaKhoaHoc = function(id) {
    var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${id}`;
    $.ajax({
      type: "DELETE",
      url: urlAPI,
      contentType: "application/json",
      success: function(ketqua) {
        console.log(ketqua);
      },
      error: function(error) {
        swal("Oops", "Không thể xóa khóa học có người đăng ký!", "error");
      }
    });
  };
  this.CapNhatThongTinKhoaHoc = function(khoahoc) {
    var kh = JSON.stringify(khoahoc);
    var urlAPI = `http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc`;
    $.ajax({
      type: "PUT",
      url: urlAPI,
      contentType: "application/json",
      data: kh,
      success: function(ketqua) {
        console.log(ketqua);
        swal("Thành công!", "Đã cập nhật khóa học!", "success");
      },
      error: function(error) {
        swal("Oops", "Không thể cập nhật khóa học có người đăng ký!", "error");
      }
    });
  };
}
