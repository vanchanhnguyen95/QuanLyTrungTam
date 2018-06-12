/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code service ThongTinService.js
 */

function ThongTinService() {
  this.ThongTinKhoaHoc = function() {
    var jsonThongTinTK = localStorage.getItem("ThongTinTK");
    var thongtinTK = JSON.parse(jsonThongTinTK);
    var taikhoan = thongtinTK[0].TaiKhoan;
    $("#btnDSKhoaHocNguoiDung").click(function() {
      var urlApi =
        "http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=" +
        taikhoan;
      $.ajax({
        type: "GET",
        url: urlApi,
        success: function(ketqua) {
          console.log(ketqua);
        },
        error: function(parsedjson, textStatus, errorThown) {
          console.log();
        }
      });
    });
  };
  this.ThongTinNguoiDung = function() {
    $("#btnThongTinNguoiDung").click(function() {
      var jsonThongTinTK = localStorage.getItem("ThongTinTK");
      var thongtinTK = JSON.parse(jsonThongTinTK);
      var taikhoan = thongtinTK[0].TaiKhoan;
      var urlApi =
        "http://sv.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=" +
        taikhoan;
      $.ajax({
        type: "GET",
        url: urlApi,
        success: function(ketqua) {
          console.log(ketqua);
        },
        error: function(parsedjson, textStatus, errorThown) {
          console.log();
        }
      });
    });
  };
  this.ChiTietCacKhoaHoc = function() {
    var jsonThongTinTK = localStorage.getItem("ThongTinTK");
    var thongtinTK = JSON.parse(jsonThongTinTK);
    var taikhoan = thongtinTK[0].TaiKhoan;
    var urlApi =
      "http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=" +
      taikhoan;
    $.ajax({
      type: "GET",
      url: urlApi,
      success: function(ketqua) {
        for (var i = 0; i < ketqua.length; i++) {
          var urlApi =
            "http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/" +
            ketqua[i].MaKhoaHoc;
          $.ajax({
            type: "GET",
            url: urlApi,
            success: function(res) {
              var ChiTietKH = JSON.stringify(res);
              localStorage.setItem("ChiTietKH", ChiTietKH);
            },
            error: function(parsedjson, textStatus, errorThown) {
              console.log();
            }
          });
        }
      },
      error: function(parsedjson, textStatus, errorThown) {
        console.log();
      }
    });
  };
  this.LuuChiTietKhoaHoc = function() {
    var makhoahoc;
    $(".chitiet").click(function() {
      makhoahoc = $(this).attr("makhoahoc");
      console.log(makhoahoc);
      localStorage.setItem("makhoahoc", makhoahoc);
    });
  };
  this.LoadChiTietKhoaHocDangCo = function() {
    var urlApi =
      "http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/" +
      localStorage.getItem("makhoahoc");
    $.ajax({
      type: "GET",
      url: urlApi,
      success: function(ketqua) {
        var rand = Math.floor(Math.random() * 17); // 0 -> 4
        document.getElementById("tenkhoahoc1").innerHTML = ketqua.TenKhoaHoc;
        document.getElementById("tenkhoahoc2").innerHTML = ketqua.TenKhoaHoc;
        document.getElementById("nguoitao1").innerHTML = ketqua.NguoiTao;
        document
          .getElementById("hinhanh1")
          .setAttribute(
            "src",
            `../../assets/src1/resources/img/img${rand}.jpg`
          );
        document
          .getElementById("hinhanh2")
          .setAttribute(
            "src",
            `../../assets/src1/resources/img/img${rand}.jpg`
          );
        document.getElementById("luotxem1").innerHTML =
          "Lượt xem: " + ketqua.LuotXem;

        document.getElementById("mota1").innerHTML = ketqua.MoTa;
      },
      error: function(parsedjson, textStatus, errorThown) {
        console.log();
      }
    });
  };
}
