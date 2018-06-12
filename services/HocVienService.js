/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code service HocVienService.js
 */
function HocVienService() {
  this.LayDanhSachHocVien = function() {
    var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachHocvien";
    $.ajax({
      type: "GET",
      url: urlApi,

      success: function(ketqua) {
        var DSHV = JSON.stringify(ketqua);
        localStorage.setItem("DanhSachHV", DSHV);
        localStorage.setItem("SoLuongHocVien", ketqua.length);
      },
      error: function(parsedjson, textStatus, errorThown) {
        console.log();
      }
    });
  };
}
