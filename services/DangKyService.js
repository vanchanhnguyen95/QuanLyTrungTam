/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code service  DangKyService.js
 */
function DangKyService() {
  this.DangKy = function() {
    $("#btnDangKy").click(function() {
      var taikhoan = $("#TK").val();
      var matkhau = $("#MK").val();
      var hoten = $("#HT").val();
      var email = $("#EM").val();
      var sodienthoai = $("#SDT").val();
      var manguoidung = "HV";

      if (
        taikhoan === "" ||
        matkhau === "" ||
        hoten === "" ||
        email === "" ||
        sodienthoai === ""
      ) {
        shakeModalNhapTruong();
        return;
      } else if (!isNaN(hoten) || hoten.length < 6) {
        shakeModalKiemTraChu();
        return;
      } else if (!KiemTraEmail(email)) {
        shakeModalKiemTraEmail();
        return;
      } else if (!KiemTraSoDT(sodienthoai)) {
        shakeModalKiemTraSDT();
        return;
      } else {
        var nguoidung = JSON.stringify({
          TaiKhoan: taikhoan,
          MatKhau: matkhau,
          HoTen: hoten,
          Email: email,
          SoDT: sodienthoai,
          MaLoaiNguoiDung: manguoidung
        });
      }

      var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/DangKy";
      $.ajax({
        type: "POST",
        url: urlApi,
        contentType: "application/json",
        dataType: "json",
        data: nguoidung,
        success: function(ketqua) {
          window.location.href = "javascript: showLoginForm();";
        },
        error: function(parsedjson, textStatus, errorThown) {
          shakeModalTrungTaiKhoan();
        }
      });
    });
  };
}
