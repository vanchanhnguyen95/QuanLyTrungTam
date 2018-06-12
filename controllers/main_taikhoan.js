/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 17/05/2018
 * Code file main_taikhoan.js
 */

DanhSachCacKhoaHocHienCo();
var serviceDangNhap = new DangNhapService();
serviceDangNhap.DangNhap();
serviceDangNhap.Thoat();

var serviceDangKy = new DangKyService();
serviceDangKy.DangKy();

var serviceThongTin = new ThongTinService();
serviceThongTin.LoadChiTietKhoaHocDangCo();

var serviceGhiDanh = new GhiDanhService();
serviceGhiDanh.GhiDanh();

LuuHoTen();
ThongTinTaiKhoan();

DanhSachCacKhoaHocCuaToi();

function LuuHoTen() {
  var jsonThongTinTK = localStorage.getItem("ThongTinTK");
  var thongtinTK = JSON.parse(jsonThongTinTK);
  var hoten = thongtinTK[0].HoTen;
  document.getElementById(
    "TenChuTK"
  ).innerHTML = `<i class="fa fa-user"></i> Xin chào ${hoten}`;
}

function DomID(id) {
  var element = document.getElementById(id);
  return element;
}

function DanhSachCacKhoaHocCuaToi() {
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
      var lstListCardKhoaHoc = document.getElementById("DSKhoaHocCuaToi");
      lstListCardKhoaHoc.innerHTML = "";
      for (var i = 0; i < ketqua.length; i++) {
        var urlApi =
          "http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/" +
          ketqua[i].MaKhoaHoc;
        $.ajax({
          type: "GET",
          url: urlApi,
          success: function(res) {
            var cardKhoaHoc = document.createElement("div");
            cardKhoaHoc.setAttribute("class", "col-sm-12 col-md-6 col-lg-3");

            var col_item = document.createElement("div");
            col_item.setAttribute("class", "col-item cardkhoahoc");

            var photo = document.createElement("div");
            photo.setAttribute("class", "photo");

            var rand = Math.floor(Math.random() * 19); // 0 -> 4

            var img = document.createElement("img");
            img.setAttribute(
              "src",
              `../../assets/src1/resources/img/img${rand}.jpg`
            );
            img.setAttribute("class", "img-responsive");
            img.setAttribute("alt", "/");

            var info = document.createElement("div");

            var tenKhoaHoc = document.createElement("p");
            tenKhoaHoc.innerHTML = "Khóa : " + res.TenKhoaHoc;

            var nguoiTao = document.createElement("p");
            nguoiTao.innerHTML = "Người tạo: " + res.NguoiTao;

            var luotXem = document.createElement("span");
            luotXem.innerHTML = "Lượt xem: " + res.LuotXem;

            var clearFix = document.createElement("div");
            clearFix.setAttribute("class", "clearfix");

            var footer = document.createElement("div");
            footer.setAttribute("class", "separator clear-left");

            var btnThem = document.createElement("p");
            btnThem.setAttribute("class", "btn-add");

            var theI_1 = document.createElement("i");

            var theA_1 = document.createElement("a");
            theA_1.setAttribute("href", "coursedetail.html");
            theA_1.setAttribute(
              "class",
              "hidden-sm chitiet btn btn-primary btn-block"
            );
            theA_1.innerHTML = "Học tiếp";
            theA_1.setAttribute("makhoahoc", res.MaKhoaHoc);

            var btnChiTiet = document.createElement("p");
            btnChiTiet.setAttribute("class", "btn-details");

            var theI_2 = document.createElement("i");
            theI_2.setAttribute("class", "fa fa-list");

            var theA_2 = document.createElement("a");
            theA_2.setAttribute("href", "#");
            theA_2.setAttribute("class", "hidden-sm ");
            theA_2.innerHTML = "Chi tiết";

            photo.appendChild(img);

            info.appendChild(tenKhoaHoc);
            info.appendChild(nguoiTao);
            info.appendChild(luotXem);

            btnThem.appendChild(theI_1);
            btnThem.appendChild(theA_1);

            btnChiTiet.appendChild(theI_2);
            btnChiTiet.appendChild(theA_2);

            footer.appendChild(btnThem);

            info.appendChild(footer);
            info.appendChild(clearFix);

            col_item.appendChild(photo);
            col_item.appendChild(info);

            cardKhoaHoc.appendChild(col_item);

            lstListCardKhoaHoc.appendChild(cardKhoaHoc);

            TinhToanKichThuocTab(ketqua.length, "Paris");

            serviceThongTin.LuuChiTietKhoaHoc();
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
}

function TinhToanKichThuocTab(soKhoaHoc, id) {
  var tongSoKhoaHoc = soKhoaHoc;
  var soKhoaHoc1Dong = 4;
  var soDong = Math.ceil(tongSoKhoaHoc / soKhoaHoc1Dong);

  var tabTatCaKhoaHoc = DomID(id);
  tabTatCaKhoaHoc.style.height = "soDong * 400";
}

function DanhSachCacKhoaHocHienCo() {
  var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";
  $.ajax({
    type: "GET",
    url: urlApi,
    success: function(ketqua) {
      var lstListCardKhoaHoc = document.getElementById("DSKhoaHocDangCo");
      lstListCardKhoaHoc.innerHTML = "";
      for (var i = 0; i < ketqua.length; i++) {
        var cardKhoaHoc = document.createElement("div");
        cardKhoaHoc.setAttribute(
          "class",
          "col-sm-12 col-md-6 col-lg-3 cardkhoahoc"
        );

        var col_item = document.createElement("div");
        col_item.setAttribute("class", "col-item");

        var photo = document.createElement("div");
        photo.setAttribute("class", "photo");

        var rand = Math.floor(Math.random() * 19); // 0 -> 4

        var img = document.createElement("img");
        img.setAttribute(
          "src",
          `../../assets/src1/resources/img/img${rand}.jpg`
        );
        img.setAttribute("class", "img-responsive");
        img.setAttribute("alt", "/");

        var info = document.createElement("div");

        var tenKhoaHoc = document.createElement("p");
        tenKhoaHoc.innerHTML = "Khóa : " + ketqua[i].TenKhoaHoc;
        tenKhoaHoc.setAttribute("class", "tenkhoahoc");

        var nguoiTao = document.createElement("p");
        nguoiTao.innerHTML = "Tên giáo vụ: " + ketqua[i].NguoiTao;

        var luotXem = document.createElement("span");
        luotXem.innerHTML = "Lượt xem: " + ketqua[i].LuotXem;

        var clearFix = document.createElement("div");
        clearFix.setAttribute("class", "clearfix");

        var footer = document.createElement("div");
        footer.setAttribute("class", "separator clear-left");

        var btnThem = document.createElement("p");
        btnThem.setAttribute("class", "btn-add");

        var theI_1 = document.createElement("i");
        theI_1.setAttribute("class", "fa fa-sign-in");

        var theA_1 = document.createElement("a");
        theA_1.setAttribute("href", "#");
        theA_1.setAttribute("class", "hidden-sm btn btn-primary");
        theA_1.setAttribute("id", "btnLayMaKH");
        theA_1.innerHTML = "Lấy";

        var btnChiTiet = document.createElement("p");
        btnChiTiet.setAttribute("class", "btn-details");

        var theI_2 = document.createElement("i");

        var theA_2 = document.createElement("a");
        theA_2.setAttribute("class", "hidden-sm chitiet btn btn-primary");
        theA_2.innerHTML = "Chi tiết";
        theA_2.setAttribute("href", "chitietkhoahoc.html");
        theA_2.setAttribute("id", "btnChiTiet");
        theA_2.setAttribute("makhoahoc", ketqua[i].MaKhoaHoc);

        photo.appendChild(img);

        info.appendChild(tenKhoaHoc);
        info.appendChild(nguoiTao);
        info.appendChild(luotXem);


        btnChiTiet.appendChild(theI_2);
        btnChiTiet.appendChild(theA_2);

        footer.appendChild(btnThem);
        footer.appendChild(btnChiTiet);

        info.appendChild(footer);
        info.appendChild(clearFix);

        col_item.appendChild(photo);
        col_item.appendChild(info);

        cardKhoaHoc.appendChild(col_item);

        lstListCardKhoaHoc.appendChild(cardKhoaHoc);
      }

      TinhToanKichThuocTab(ketqua.length, "Courses");

      serviceThongTin.LuuChiTietKhoaHoc();
    },
    error: function(parsedjson, textStatus, errorThown) {
      console.log();
    }
  });
}

function ThongTinTaiKhoan() {
  var jsonThongTinTK = localStorage.getItem("ThongTinTK");
  var thongtinTK = JSON.parse(jsonThongTinTK);

  document.getElementById("TaiKhoan").innerHTML = thongtinTK[0].TaiKhoan;
  document.getElementById("HoTen").innerHTML = thongtinTK[0].HoTen;
  document.getElementById("Email").innerHTML = thongtinTK[0].Email;
  document.getElementById("SoDienThoai").innerHTML = thongtinTK[0].SoDT;
  document.getElementById("MaLoaiNguoiDung").innerHTML =
    thongtinTK[0].MaLoaiNguoiDung;
  document.getElementById("TenLoaiNguoiDung").innerHTML =
    thongtinTK[0].TenLoaiNguoiDung;
}

function LocKhoaHoc() {
  var input, filter, dskhoahoc, card, name, i;
  input = document.getElementById("tukhoa");
  filter = input.value.toUpperCase();
  dskhoahoc = document.getElementById("DSKhoaHocDangCo");
  card = dskhoahoc.getElementsByClassName("cardkhoahoc");

  for (i = 0; i < card.length; i++) {
    name = card[i].getElementsByTagName("p")[0];
    if (name) {
      if (name.innerHTML.toUpperCase().indexOf(filter) > -1) {
        card[i].style.display = "";
      } else {
        card[i].style.display = "none";
      }
    }
  }
}

function TimKhoaHocAjax() {
  var input, filter, result, name;

  $("#result").html("");
  input = document.getElementById("tukhoa");
  filter = input.value.toUpperCase();

  var urlApi = "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc";

  $.get(urlApi, function(data, status) {
    for (var i = 0; i < data.length; i++) {
      var rand = Math.floor(Math.random() * 17); // 0 -> 4
      name = data[i].TenKhoaHoc;
      if (name) {
        if (name.toUpperCase().search(filter) != -1) {
          $("#result").append(
            '<a href = "chitietkhoahoc.html" class="list-group-item list-group-item-action chitiet" makhoahoc = "' +
              data[i].MaKhoaHoc +
              '"><img src="' +
              `../../assets/src1/resources/img/img${rand}.jpg` +
              '" height="40" width="40" class="img-thumbnail" /> ' +
              data[i].TenKhoaHoc
          );
        }
      }
    }
    serviceThongTin.LuuChiTietKhoaHoc();
  });

  $("#result").on("click", "li", function() {
    var click_text = $(this)
      .text()
      .split("|");
    $("#tukhoa").val($.trim(click_text[0]));
    $("#result").html("");
  });
}
