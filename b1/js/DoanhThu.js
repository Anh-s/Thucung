document.addEventListener("DOMContentLoaded", function () {

    function setToday() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
  
      document.getElementById("dashboardDate").value = `${yyyy}-${mm}-${dd}`;
    }
  
    // Set ngày khi mở trang
    setToday();
  
    // Lắng nghe khi đổi ngày
    document
      .getElementById("dashboardDate")
      .addEventListener("change", function () {
        console.log("Ngày đã chọn:", this.value);
        // 📌 load lịch theo ngày ở đây
      });
  
  });

  /* ===== DOANH THU TUẦN ===== */
  const weekCtx = document.getElementById("weekChart");

  new Chart(weekCtx, {
    data: {
      labels: ["T2","T3","T4","T5","T6","T7","CN"],
      datasets: [
        {
          type: "bar",
          label: "Doanh thu (triệu)",
          data: [5,6,5,6,2.3,0,0],
          backgroundColor: "#4fc3f7",
          borderRadius: 10
        },
        {
          type: "line",
          label: "Lịch hẹn",
          data: [10,12,10,12,9,17,20],
          borderColor: "#16a085",
          tension: 0.4,
          pointRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" }
      }
    }
  });
  
  const monthCtx = document.getElementById("monthChart");

new Chart(monthCtx, {
  type: "line",
  data: {
    labels: ["T8","T9","T10","T11","T12","T1"],
    datasets: [{
      label: "Doanh thu (triệu)",
      data: [60,72,68,80,88,98],
      borderColor: "#2ecc71",
      backgroundColor: "rgba(46,204,113,0.2)",
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});
