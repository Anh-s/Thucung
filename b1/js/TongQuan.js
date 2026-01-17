// Gradient cho Bar chart
const ctx = document.getElementById("revenueChart").getContext("2d");
let gradient = ctx.createLinearGradient(0,0,0,200);
gradient.addColorStop(0, "#6ED3FF");
gradient.addColorStop(1, "#3AB8D8");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["T2","T3","T4","T5","T6","T7","CN"],
    datasets: [
      {
        label: "Doanh thu (triệu)",
        data: [5,6,5,6,2.3,0,0],
        backgroundColor: gradient,
        borderRadius: 8
      },
      {
        label: "Lịch hẹn",
        data: [10,12,10,12,9,17,20],
        type: "line",
        borderColor: "#2A9D8F",
        borderWidth: 3,
        tension: 0.3,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  }
});

new Chart(document.getElementById("customerChart"), {
    type: "doughnut",
    data: {
      labels: ["Quay lại (%)", "Khách mới (%)"],
      datasets: [{
        data: [68, 32],
        backgroundColor: ["#3EB7F6", "#E8E8E8"],
        borderWidth: 0
      }]
    },
    options: {
      plugins: {
        legend: {
          position: "bottom",
        }
      },
      cutout: "65%"
    }
  });
  
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
  document.getElementById("dashboardDate").addEventListener("change", function() {
    console.log("Ngày đã chọn:", this.value);
    // 📌 thêm logic tải dữ liệu theo ngày ở đây nếu cần
  });
  

  document.querySelectorAll('.progress').forEach(item => {
    const percent = item.getAttribute('data-percent');
    const fill = item.querySelector('.fill');
    const label = item.querySelector('small');

    fill.style.width = percent + '%';
    label.textContent = percent + '%';
  });