/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code service  DangNhapService.js
 */
function DangNhapService() {
  this.DangNhap = function() {
    $("#btnDangNhap").click(function() {
      var taikhoan_dn = $("#taikhoan_dn").val();
      var matkhau_dn = $("#matkhau_dn").val();
      var urlApi =
        "http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=" +
        taikhoan_dn +
        "&matkhau=" +
        matkhau_dn;

      $.ajax({
        type: "GET",
        url: urlApi,
        success: function(ketqua) {
          var ThongTinTK = JSON.stringify(ketqua);
          localStorage.setItem("ThongTinTK", ThongTinTK);
          localStorage.setItem("TaiKhoan", ketqua[0].TaiKhoan);
          for (var i = 0; i < ketqua.length; i++) {
            if (ketqua[i].MaLoaiNguoiDung === "HV") {
              window.location.href = "khoahoc.html";
            } else if (ketqua[i].MaLoaiNguoiDung === "GV") {
              window.location.href = "quanly.html";
            } else {
              shakeModal();
            }
          }
        },
        error: function(parsedjson, textStatus, errorThown) {}
      });
    });
  };
  this.Thoat = function() {
    $("#btnThoat").click(function() {
      window.location.href = "index.html";
      localStorage.removeItem("ThongTinTK");
      localStorage.removeItem("TaiKhoan");
      localStorage.removeItem("makhoahoc");
    });
  };
}
