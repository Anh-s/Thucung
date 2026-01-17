
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

  let reviews = [
    {
      id: 1,
      customer: "Nguyễn Thị Lan",
      product: "Thức ăn hạt cho chó Pedigree",
      stars: 5,
      content: "Chó nhà mình rất thích, ăn khỏe hơn hẳn 🐶",
      date: "2025-01-10",
      reply: "Cảm ơn chị Lan đã tin dùng sản phẩm của Pet's Home ❤️"
    },
    {
      id: 2,
      customer: "Trần Minh",
      product: "Pate cho mèo Whiskas",
      stars: 4,
      content: "Mèo ăn ngon nhưng hơi ít so với giá.",
      date: "2025-01-12",
      reply: ""
    },
    {
      id: 3,
      customer: "Lê Hoàng",
      product: "Sữa tắm thú cưng Bio Care",
      stars: 5,
      content: "Mùi thơm dễ chịu, da thú cưng không bị kích ứng.",
      date: "2025-01-15",
      reply: "Shop rất vui vì bé hợp sản phẩm 🐾"
    },
    {
        id: 4,
        customer: "Phạm Anh",
        product: "Thức ăn hạt cho chó Pedigree",
        stars: 3,
        content: "Tạm ổn, chó ăn nhưng không quá thích.",
        date: "2025-01-16",
        reply: ""
    },
    {
        id: 5,
        customer: "Ngọc Mai",
        product: "Pate cho mèo Whiskas",
        stars: 1,
        content: "Mèo nhà mình không chịu ăn.",
        date: "2025-01-18",
        reply: ""
    }
  ];
  
  function renderReviews() {
    const filter = document.getElementById("starFilter").value;
    const list = document.getElementById("reviewList");
    list.innerHTML = "";
  
    reviews
      .filter(r => !filter || r.stars == filter)
      .forEach(r => {
        list.innerHTML += `
          <div class="review-card">
            <div class="review-header">
              <b>${r.customer}</b>
              <span class="stars">${"⭐".repeat(r.stars)}</span>
            </div>
  
            <div class="product">Sản phẩm: ${r.product}</div>
            <div class="review-content">${r.content}</div>
            <div class="date">📅 ${r.date}</div>
  
            <!-- PHẢN HỒI -->
            <div class="reply-section">
              ${
                r.reply
                  ? `<div class="reply-box">
                       <b>Phản hồi từ cửa hàng:</b>
                       <p>${r.reply}</p>
                     </div>`
                  : `
                     <textarea placeholder="Nhập phản hồi..." id="reply-${r.id}"></textarea>
                     <button onclick="sendReply(${r.id})">Gửi phản hồi</button>
                    `
              }
            </div>
          </div>
        `;
      });
  }
  
  // Load khi mở trang
  renderReviews();
  
  function sendReply(id) {
    const textarea = document.getElementById(`reply-${id}`);
    if (!textarea.value.trim()) {
      alert("Vui lòng nhập nội dung phản hồi");
      return;
    }
  
    const review = reviews.find(r => r.id === id);
    review.reply = textarea.value;
  
    renderReviews();
  }
  