function logout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      // Ví dụ chuyển về trang đăng nhập
      window.location.href = "login.html";
    }
  }
  
  document.getElementById("darkMode").addEventListener("change", function () {
    if (this.checked) {
      document.body.style.background = "#1e1e2f";
    } else {
      document.body.style.background = "#f5f7fb";
    }
  });
  