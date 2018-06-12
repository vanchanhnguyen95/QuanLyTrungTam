/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 14/05/2018
 * Code file main_hocvien.js
 */

var danhSachKhoaHoc = new DanhSachKhoaHoc();
var danhSachNguoiDung = new DanhSachNguoiDung();
var danhSachHocVien = new DanhSachHocVien();

var service = new HocVienService();
service.LayDanhSachHocVien();

GetStorage();

function DomID(id) {
  var element = document.getElementById(id);
  return element;
}

function CapNhatDanhSachHocVien(DanhSachHocVien) {
  var lstTableHV = DomID("tbodyHV");
  lstTableHV.innerHTML = "";

  for (var i = 0; i < DanhSachHocVien.DSHV.length; i++) {
    var hv = danhSachHocVien.DSHV[i];
    // Tạo thẻ tr
    var trHocVien = document.createElement("tr");
    trHocVien.id = hv.MaKhoaHoc;
    trHocVien.className = "trHocVien";

    var tdCheckbox = document.createElement("td");
    var ckbHocVien = document.createElement("input");
    ckbHocVien.setAttribute("class", "ckbHocVien");
    ckbHocVien.setAttribute("type", "checkbox");
    ckbHocVien.setAttribute("value", hv.MaKhoaHoc);
    tdCheckbox.appendChild(ckbHocVien);

    var tdTaiKhoan = TaoTD("TaiKhoan", hv.TaiKhoan);
    var tdHoTen = TaoTD("HoTen", hv.HoTen);
    var tdEmail = TaoTD("Email", hv.Email);
    var tdSoDT = TaoTD("SoDT", hv.SoDT);
    var tdMaLoaiNguoiDung = TaoTD("MaLoaiNguoiDung", hv.MaLoaiNguoiDung);

    trHocVien.appendChild(tdCheckbox);
    trHocVien.appendChild(tdTaiKhoan);
    trHocVien.appendChild(tdHoTen);
    trHocVien.appendChild(tdEmail);
    trHocVien.appendChild(tdSoDT);
    trHocVien.appendChild(tdMaLoaiNguoiDung);

    lstTableHV.appendChild(trHocVien);
  }
}

function TaoTD(className, value) {
  var td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  return td;
}

function SetStorage() {
  var jsonDanhSachHocVien = JSON.stringify(danhSachHocVien.DSHV);
  localStorage.setItem("DanhSachHV", jsonDanhSachHocVien);
}

 function GetStorage() {
  var jsonDanhSachHocVien = localStorage.getItem("DanhSachHV");
  var mangDSHV = JSON.parse(jsonDanhSachHocVien);
  danhSachHocVien.DSHV = mangDSHV;
  CapNhatDanhSachHocVien(danhSachHocVien);
}

function TimKiemHocVien() {
  var input, filter, table, tr, td, i;

  input = document.getElementById("tukhoa");
  filter = input.value.toUpperCase();
  table = document.getElementById("mytable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
