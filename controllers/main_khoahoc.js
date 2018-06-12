/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 12/05/2018
 * Code file main_khoahoc.js
 */
var danhSachKhoaHoc = new DanhSachKhoaHoc();
var service = new KhoaHocService();

GetStorage();
function DomID(id) {
  var element = document.getElementById(id);
  return element;
}

function ThemKhoaHoc() {
  var makhoahoc = DomID("makhoahoc").value;
  var tenkhoahoc = DomID("tenkhoahoc").value;
  var mota = DomID("mota").value;
  var luotxem = DomID("luotxem").value;
  //var nguoitao = DomID("nguoitao").value;
  var hinhanh = DomID("hinhanh").value;

  var jsonThongTinTK = localStorage.getItem("ThongTinTK");
  var thongtinTK = JSON.parse(jsonThongTinTK);
  var nguoitao = thongtinTK[0].TaiKhoan;

  var khoahoc = new KhoaHoc(
    makhoahoc,
    tenkhoahoc,
    mota,
    luotxem,
    nguoitao,
    hinhanh
  );

  danhSachKhoaHoc.ThemKhoaHoc(khoahoc);
  CapNhatDanhSachKhoaHoc(danhSachKhoaHoc);
  console.log(khoahoc);
  console.log(danhSachKhoaHoc);
  service.ThemKhoaHoc(khoahoc);
}

function CapNhatDanhSachKhoaHoc(DanhSachKhoaHoc) {
  var lstTableKH = DomID("tbodyKH");
  lstTableKH.innerHTML = "";

  for (var i = 0; i < DanhSachKhoaHoc.DSKH.length; i++) {
    var kh = danhSachKhoaHoc.DSKH[i];
    // Tạo thẻ tr
    var trKhoaHoc = document.createElement("tr");
    trKhoaHoc.id = kh.MaKhoaHoc;
    trKhoaHoc.className = "trKhoaHoc";
    // tạo các thẻ td và filter dữ người dùng thứ i vào
    var tdCheckbox = document.createElement("td");
    var ckbKhoaHoc = document.createElement("input");
    ckbKhoaHoc.setAttribute("class", "ckbKhoaHoc");
    ckbKhoaHoc.setAttribute("type", "checkbox");
    ckbKhoaHoc.setAttribute("value", kh.MaKhoaHoc);
    tdCheckbox.appendChild(ckbKhoaHoc);

    var tdXoaSua = document.createElement("td");
    var btnSua = document.createElement("button");
    btnSua.setAttribute("class", "btn btn-info btn-simple btn-xs");
    btnSua.setAttribute("rel", "tooltip");
    btnSua.setAttribute("title", "Cập nhật");
    btnSua.setAttribute("onclick", "LuuThongTin('" + kh.MaKhoaHoc + "')");
    btnSua.setAttribute("data-toggle", "modal");
    btnSua.setAttribute("data-target", "#updateCourseModal");

    var iconEdit = document.createElement("i");
    iconEdit.setAttribute("class", "fa fa-edit");
    btnSua.appendChild(iconEdit);
    tdXoaSua.appendChild(btnSua);

    var tdMaSoKhoaHoc = TaoTD("MaSoKhoaHoc", kh.MaKhoaHoc);
    var tdTen = TaoTD("Ten", kh.TenKhoaHoc);
    var tdLuotXem = TaoTD("LuotXem", kh.LuotXem);
    var tdMoTa = TaoTD("MoTa", kh.MoTa);
    var tdHinhAnh = TaoTD("HinhAnh", null);

    var rand = Math.floor(Math.random() * 17); // 0 -> 4

    var img = document.createElement("img");
    img.setAttribute("src", `../../assets/src1/resources/img/img${rand}.jpg`);
    tdHinhAnh.appendChild(img);
    var tdNguoiTao = TaoTD("NguoiTao", kh.NguoiTao);

    trKhoaHoc.appendChild(tdCheckbox);
    trKhoaHoc.appendChild(tdMaSoKhoaHoc);
    trKhoaHoc.appendChild(tdTen);
    trKhoaHoc.appendChild(tdLuotXem);
    trKhoaHoc.appendChild(tdMoTa);
    trKhoaHoc.appendChild(tdHinhAnh);
    trKhoaHoc.appendChild(tdNguoiTao);
    trKhoaHoc.appendChild(tdXoaSua);

    lstTableKH.appendChild(trKhoaHoc);
  }
}

function XoaKhoaHoc() {
  // Mảng checkbox
  var lstKhoaHoc = document.getElementsByClassName("ckbKhoaHoc");
  // Mảng khóa học được chọn
  var lstKhoaHocDuocChon = [];
  for (var i = 0; i < lstKhoaHoc.length; i++) {
    if (lstKhoaHoc[i].checked) {
      lstKhoaHocDuocChon.push(lstKhoaHoc[i].value);
      // Xóa khóa học trên server
      service.XoaKhoaHoc(lstKhoaHoc[i].value);
    }
  }
  danhSachKhoaHoc.XoaKhoaHoc(lstKhoaHocDuocChon);
  CapNhatDanhSachKhoaHoc(danhSachKhoaHoc);
}

function AlertXoaKhoaHoc() {
  swal({
    title: "Bạn có chắc chắn muốn xóa khóa học?",
    text: "Khi đã xóa, không thể khôi phục!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      XoaKhoaHoc();
    }
  });
}

function TaoTD(className, value) {
  var td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  return td;
}

function SetStorage() {
  var jsonDanhSachKhoaHoc = JSON.stringify(danhSachKhoaHoc.DSKH);
  localStorage.setItem("DanhSachKH", jsonDanhSachKhoaHoc);
}

function GetStorage() {
  service.LayDanhSachKhoaHoc();
  var jsonDanhSachKhoaHoc = localStorage.getItem("DanhSachKH");
  var mangDSKH = JSON.parse(jsonDanhSachKhoaHoc);
  danhSachKhoaHoc.DSKH = mangDSKH;
  CapNhatDanhSachKhoaHoc(danhSachKhoaHoc);
}

function LuuThongTin(makhoahoc) {
  var khoahoc = danhSachKhoaHoc.TimKHTheoMaKhoaHoc(makhoahoc);
  if (khoahoc != null) {
    DomID("makhoahoccapnhat").value = khoahoc.MaKhoaHoc;
    DomID("tenkhoahoccapnhat").value = khoahoc.TenKhoaHoc;
    DomID("motacapnhat").value = khoahoc.MoTa;
    DomID("luotxemcapnhat").value = khoahoc.LuotXem;
    DomID("hinhanhcapnhat").value = khoahoc.HinhAnh;
  }
}

function ChinhSuaKhoaHoc() {
  // Lấy dữ liệu người dùng nhập vào
  var makhoahoccapnhat = DomID("makhoahoccapnhat").value;
  var tenkhoahoccapnhat = DomID("tenkhoahoccapnhat").value;
  var motacapnhat = DomID("motacapnhat").value;
  var luotxemcapnhat = DomID("luotxemcapnhat").value;
  var hinhanhcapnhat = DomID("hinhanhcapnhat").value;

  // cập nhật khóa học
  var khoahoc = new KhoaHoc(
    makhoahoccapnhat,
    tenkhoahoccapnhat,
    motacapnhat,
    luotxemcapnhat,
    hinhanhcapnhat
  );
  danhSachKhoaHoc.SuaKhoaHoc(khoahoc);
  CapNhatDanhSachKhoaHoc(danhSachKhoaHoc);
  service.CapNhatThongTinKhoaHoc(khoahoc);
}

function TimKiemKhoaHoc() {
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
