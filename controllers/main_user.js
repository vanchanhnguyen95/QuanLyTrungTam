/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 02/05/2018
 * Code file main_user.js
 */

var danhSachNguoiDung = new DanhSachNguoiDung();
var service = new NguoiDungService();
var validate = new Validation();

GetStorage();

function DomID(id) {
  var element = document.getElementById(id);
  return element;
}

function BatLoiDuLieu(taikhoan, matkhau, hoten, email, sodt, maloainguoidung) {
  var loi = 0;
  // Kiểm tra validation
  if (KiemTraDauVaoRong("id", taikhoan) == true) {
    loi++;
    DomID("id").setAttribute("placeholder", "Bạn chưa nhập tài khoản");
  }
  if (KiemTraDauVaoRong("matkhau", matkhau) == true) {
    loi++;
    DomID("matkhau").setAttribute("placeholder", "Bạn chưa nhập mật khẩu");
  }
  if (KiemTraDauVaoRong("hoten", hoten) == true) {
    loi++;
    DomID("hoten").setAttribute("placeholder", "Bạn chưa nhập họ tên");
  }
  if (validate.KiemTraEmail(email)) {
    document.getElementById("email").style.borderColor = "green";
  } else {
    document.getElementById("email").style.borderColor = "red";
    loi++;
    DomID("email").setAttribute(
      "placeholder",
      "Bạn chưa nhập email hoặc email không hợp lệ"
    );
  }
  if (validate.KiemTraSoDT(sodt)) {
    document.getElementById("sodt").style.borderColor = "green";
  } else {
    document.getElementById("sodt").style.borderColor = "red";
    loi++;
    DomID("sodt").setAttribute(
      "placeholder",
      "Bạn chưa nhập số điện thoại hoặc SDT không hợp lệ"
    );
  }
  if (KiemTraDauVaoRong("maloainguoidung", maloainguoidung) == true) {
    loi++;
    DomID("maloainguoidung").setAttribute(
      "placeholder",
      "Bạn chưa nhập mã loại người dùng"
    );
  }
  if (loi != 0) {
    return true;
  } else {
    return false;
  }
}

function BatLoiDuLieuCapNhat(
  taikhoan,
  matkhau,
  hoten,
  email,
  sodt,
  maloainguoidung
) {
  var loi = 0;
  // Kiểm tra validation
  if (KiemTraDauVaoRong("idcapnhat", taikhoan) == true) {
    loi++;
    DomID("idcapnhat").setAttribute("placeholder", "Bạn chưa nhập tài khoản");
  }
  if (KiemTraDauVaoRong("matkhaucapnhat", matkhau) == true) {
    loi++;
    DomID("matkhaucapnhat").setAttribute(
      "placeholder",
      "Bạn chưa nhập mật khẩu"
    );
  }
  if (KiemTraDauVaoRong("hotencapnhat", hoten) == true) {
    loi++;
    DomID("hotencapnhat").setAttribute("placeholder", "Bạn chưa nhập họ tên");
  }
  if (validate.KiemTraEmail(email)) {
    document.getElementById("emailcapnhat").style.borderColor = "green";
  } else {
    document.getElementById("emailcapnhat").style.borderColor = "red";
    loi++;
    DomID("emailcapnhat").setAttribute("placeholder", "Bạn chưa nhập email");
  }
  if (validate.KiemTraSoDT(sodt)) {
    document.getElementById("sodtcapnhat").style.borderColor = "green";
  } else {
    document.getElementById("sodtcapnhat").style.borderColor = "red";
    loi++;
    DomID("sodtcapnhat").setAttribute(
      "placeholder",
      "Bạn chưa nhập số điện thoại"
    );
  }
  if (KiemTraDauVaoRong("maloainguoidungcapnhat", maloainguoidung) == true) {
    loi++;
    DomID("maloainguoidungcapnhat").setAttribute(
      "placeholder",
      "Bạn chưa nhập mã loại người dùng"
    );
  }

  if (loi != 0) {
    return true;
  } else {
    return false;
  }
}

function ThemNguoiDung() {
  // trước khi thêm phải xóa trước -> đã thêm phương thức XoaCacTruong ở file html

  // Lấy dữ liệu người dùng nhập vào
  var taikhoan = DomID("id").value;
  var matkhau = DomID("matkhau").value;
  var hoten = DomID("hoten").value;
  var email = DomID("email").value;
  var sodt = DomID("sodt").value;
  var maloainguoidung = DomID("maloainguoidung").value;

  if (BatLoiDuLieu(taikhoan, matkhau, hoten, email, sodt, maloainguoidung)) {
    swal("Oops", "Dữ liệu nhập chưa hợp lệ!", "error");
    return;
  } else {
    // Thêm người dùng
    // nếu thêm thành công -- > Alert thành công

    swal("Thành công!", "Đã thêm 1 người dùng!", "success");
    var nguoidung = new NguoiDung(
      taikhoan,
      matkhau,
      hoten,
      email,
      sodt,
      maloainguoidung
    );
    danhSachNguoiDung.ThemNguoiDung(nguoidung);
    CapNhatDanhSachNguoiDung(danhSachNguoiDung);
    console.log(nguoidung);
    console.log(danhSachNguoiDung);
    service.ThemNguoiDung(nguoidung);
  }
}

function XoaCacTruong() {
  DomID("id").value = "";
  DomID("matkhau").value = "";
  DomID("hoten").value = "";
  DomID("email").value = "";
  DomID("sodt").value = "";
  DomID("maloainguoidung").value = "";
}

function CapNhatDanhSachNguoiDung(DanhSachNguoiDung) {
  var lstTableND = DomID("tbodyND");
  lstTableND.innerHTML = "";
  for (var i = 0; i < DanhSachNguoiDung.DSND.length; i++) {
    var nd = danhSachNguoiDung.DSND[i];
    // Tạo thẻ tr
    var trNguoiDung = document.createElement("tr");
    trNguoiDung.id = nd.TaiKhoan;
    trNguoiDung.className = "trNguoiDung";
    //trNguoiDung.setAttribute("onclick","ChinhSuaNguoiDung('"+nd.TaiKhoan+"')");
    // tạo các thẻ td và filter dữ người dùng thứ i vào

    var tdCheckBox = document.createElement("td");
    var ckbTaiKhoan = document.createElement("input");
    ckbTaiKhoan.setAttribute("class", "ckbTaiKhoan");
    ckbTaiKhoan.setAttribute("type", "checkbox");
    ckbTaiKhoan.setAttribute("value", nd.TaiKhoan);
    tdCheckBox.appendChild(ckbTaiKhoan);

    var tdTaiKhoan = TaoTheTD("TaiKhoan", nd.TaiKhoan);
    var tdMatKhau = TaoTheTD("MatKhau", nd.MatKhau);
    var tdHoTen = TaoTheTD("HoTen", nd.HoTen);
    var tdEmail = TaoTheTD("Email", nd.Email);
    var tdSoDT = TaoTheTD("SoDT", nd.SoDT);
    var tdMaLoaiNguoiDung = TaoTheTD("MaLoaiNguoiDung", nd.MaLoaiNguoiDung);

    var tdXoaSua = document.createElement("td");
    var btnSua = document.createElement("button");
    btnSua.setAttribute("class", "btn btn-info btn-simple btn-xs");
    btnSua.setAttribute("rel", "tooltip");
    btnSua.setAttribute("title", "Cập nhật");
    btnSua.setAttribute("onclick", "LuuThongTin('" + nd.TaiKhoan + "')");
    btnSua.setAttribute("data-toggle", "modal");
    btnSua.setAttribute("data-target", "#updateUserModal");

    var btnXoa = document.createElement("button");
    btnXoa.setAttribute("class", "btn btn-danger btn-simple btn-xs");
    btnXoa.setAttribute("rel", "tooltip");
    btnXoa.setAttribute("title", "Xóa");
    btnXoa.setAttribute("onclick", "");
    var iconDelete = document.createElement("i");
    iconDelete.setAttribute("class", "fa fa-remove");
    btnXoa.appendChild(iconDelete);

    var iconEdit = document.createElement("i");
    iconEdit.setAttribute("class", "fa fa-edit");
    btnSua.appendChild(iconEdit);
    tdXoaSua.appendChild(btnSua);
    tdXoaSua.appendChild(btnXoa);

    trNguoiDung.appendChild(tdCheckBox);
    trNguoiDung.appendChild(tdTaiKhoan);
    //trNguoiDung.appendChild(tdMatKhau);
    trNguoiDung.appendChild(tdHoTen);
    trNguoiDung.appendChild(tdEmail);
    trNguoiDung.appendChild(tdSoDT);
    trNguoiDung.appendChild(tdMaLoaiNguoiDung);
    trNguoiDung.appendChild(tdXoaSua);
    // Append các tr vào tbodyHV
    lstTableND.appendChild(trNguoiDung);
  }
}

function TaoTheTD(className, value) {
  var td = document.createElement("td");
  td.className = className;
  td.innerHTML = value;
  return td;
}

function KiemTraDauVaoRong(ID, value) {
  if (validate.KiemTraRong(value) == true) {
    DomID(ID).style.borderColor = "red";
    return true;
  } else {
    DomID(ID).style.borderColor = "green";
    return false;
  }
}

function SetStorage() {
  var jsonDanhSachNguoiDung = JSON.stringify(danhSachNguoiDung.DSND);
  localStorage.setItem("DanhSachND", jsonDanhSachNguoiDung);
}

function GetStorage() {
  service.LayDanhSachNguoiDung();
  var jsonDanhSachNguoiDung = localStorage.getItem("DanhSachND");
  var mangDSND = JSON.parse(jsonDanhSachNguoiDung);
  danhSachNguoiDung.DSND = mangDSND;
  CapNhatDanhSachNguoiDung(danhSachNguoiDung);
}

function XoaNguoiDung() {
  var lstTaiKhoan = document.getElementsByClassName("ckbTaiKhoan");
  var lstTaiKhoanDuocChon = [];
  for (var i = 0; i < lstTaiKhoan.length; i++) {
    if (lstTaiKhoan[i].checked) {
      lstTaiKhoanDuocChon.push(lstTaiKhoan[i].value);
      // Xóa sinh viên trên server
      service.XoaNguoiDung(lstTaiKhoan[i].value);
    }
  }
  danhSachNguoiDung.XoaNguoiDung(lstTaiKhoanDuocChon);
  CapNhatDanhSachNguoiDung(danhSachNguoiDung);
}

function AlertXoaNguoiDung() {
  swal({
    title: "Bạn có chắc chắn muốn xóa người dùng?",
    text: "Khi đã xóa, không thể khôi phục!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      XoaNguoiDung();
    }
  });
}

function LuuThongTin(taikhoan) {
  var nguoidung = danhSachNguoiDung.TimNDTheoTaiKhoan(taikhoan);
  if (nguoidung != null) {
    DomID("idcapnhat").value = nguoidung.TaiKhoan;
    DomID("matkhaucapnhat").value = nguoidung.MatKhau;
    DomID("hotencapnhat").value = nguoidung.HoTen;
    DomID("emailcapnhat").value = nguoidung.Email;
    DomID("sodtcapnhat").value = nguoidung.SoDT;
    DomID("maloainguoidungcapnhat").value = nguoidung.MaLoaiNguoiDung;
  }
}

function ChinhSuaNguoiDung() {
  // Lấy dữ liệu người dùng nhập vào
  var taikhoan = DomID("idcapnhat").value;
  var matkhau = DomID("matkhaucapnhat").value;
  var hoten = DomID("hotencapnhat").value;
  var email = DomID("emailcapnhat").value;
  var sodt = DomID("sodtcapnhat").value;
  var maloainguoidung = DomID("maloainguoidungcapnhat").value;

  if (
    BatLoiDuLieuCapNhat(taikhoan, matkhau, hoten, email, sodt, maloainguoidung)
  ) {
    swal("Oops", "Dữ liệu nhập chưa hợp lệ!", "error");
    return;
  } else {
    swal("Thành công!", "Đã cập nhật người dùng!", "success");
    // cập nhật người dùng
    var nguoidung = new NguoiDung(
      taikhoan,
      matkhau,
      hoten,
      email,
      sodt,
      maloainguoidung
    );
    danhSachNguoiDung.SuaNguoiDung(nguoidung);
    CapNhatDanhSachNguoiDung(danhSachNguoiDung);
    service.CapNhatThongTinNguoiDung(nguoidung);
  }
}

function TimKiemNguoiDung() {
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
