/**
 * Dự án Quản Lý Trung Tâm
 * Người Tạo: Nguyễn Văn Chanh
 * Ngày Tạo: 01/05/2018
 * Code models DanhSachHocVien.js
 */
function DanhSachHocVien() {
  this.DSHV = [];
  this.ThemHocVien = function(HocVien) {
    this.DSHV.push(HocVien);
  };
}
