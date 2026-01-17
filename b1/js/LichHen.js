
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
  
  let activeCard = null;

  function openPopup(btn) {
    const cardId = btn.getAttribute("data-id");
    activeCard = document.getElementById(cardId);
  
    const code = activeCard.querySelector(".index").innerText; 
    const pet = activeCard.querySelector(".pet strong").innerText;
    const petInfo = activeCard.querySelector(".pet small").innerText;
    const petImg = activeCard.querySelector(".pet img").src;
  
    const owner = activeCard.querySelector(".owner strong").innerText;
    const phone = activeCard.querySelector(".owner small").innerText;
  
    const service = activeCard.querySelector("#card-service").firstChild.textContent.trim();
    const info = activeCard.querySelector("#card-service-info").innerText;
    const status = activeCard.querySelector("#card-status").innerText;
  
    const [minute, price] = info.split("•").map(x => x.trim());
  
    // GÁN VÀO POPUP
    document.getElementById("popup-code").value = code; 

    document.getElementById("popup-pet-name").innerText = pet;
    document.getElementById("popup-pet-info").innerText = petInfo;
    document.getElementById("popup-pet-img").src = petImg;
  
    document.getElementById("popup-owner").value = owner;
    document.getElementById("popup-phone").value = phone;
  
    document.getElementById("popup-service").value = service;
    document.getElementById("popup-minute").value = parseInt(minute) || "";
    document.getElementById("popup-price").value = parseInt(price) || "";
    document.getElementById("popup-status").value = status;
  
    document.getElementById("popup").style.display = "flex";
  }

  function savePopup() {

    const service = document.getElementById("popup-service").value;
    const minute = document.getElementById("popup-minute").value;
    const price = document.getElementById("popup-price").value;
    const status = document.getElementById("popup-status").value;
    const t = document.getElementById("popup-time").value;
    if (t) activeCard.dataset.date = t.split("T")[0];

  
    activeCard.querySelector("#card-service").firstChild.textContent = service + " ";
    activeCard.querySelector("#card-service-info").innerText = `${minute} phút • ${price}đ`;
  
    const statusEl = activeCard.querySelector("#card-status");
    statusEl.innerText = status;
  
    activeCard.className = "appointment-card";
    if (status === "Chờ xác nhận") activeCard.classList.add("waiting");
    if (status === "Đã xác nhận") activeCard.classList.add("confirmed");
    if (status === "Đang chăm sóc") activeCard.classList.add("working");
    if (status === "Hoàn thành") activeCard.classList.add("done");
    if (status === "Hủy") activeCard.classList.add("cancelled");
  
    closePopup();
  }
  
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  
  document.getElementById("btnCreate").addEventListener("click", () => {
    document.getElementById("createPopup").style.display = "flex";
  });
  
  function closeCreatePopup() {
    document.getElementById("createPopup").style.display = "none";
  }
  
  function saveCreatePopup() {
    const code = document.getElementById("create-code").value;
    const pet = document.getElementById("create-pet-name").value;
    const petInfo = document.getElementById("create-pet-info").value;
    const owner = document.getElementById("create-owner").value;
    const phone = document.getElementById("create-phone").value;
    const service = document.getElementById("create-service").value;
    const minute = document.getElementById("create-minute").value;
    const price = document.getElementById("create-price").value;
    const staff = document.getElementById("create-staff").value;
    const note = document.getElementById("create-note").value;
    const time = document.getElementById("create-time").value;
    card.setAttribute("data-date", time.split("T")[0]);

  
    const id = "card-" + Date.now();
  
    // tạo card trước!
    const card = document.createElement("div");
    card.className = "appointment-card waiting";
    card.id = id;
  
    const file = document.getElementById("create-img").files[0];
    let img = "img/default.jpg";
    if (file) img = URL.createObjectURL(file);
  
    card.innerHTML = `
      <div class="index">${code}</div>
      <div class="pet">
        <img src="${img}">
        <div>
          <strong>${pet}</strong>
          <small>${petInfo}</small>
        </div>
      </div>
      <div class="owner">
        <strong>${owner}</strong>
        <small>${phone}</small>
      </div>
      <div class="service grooming" id="card-service">
        ${service}
        <small id="card-service-info">${minute} phút • ${price}đ</small>
      </div>
      <span class="status" id="card-status">Chờ xác nhận</span>
      <button class="detail-btn" onclick="openPopup(this)" data-id="${id}">Chi tiết</button>
      <input type="checkbox" class="delete-check" style="display:none;">
    `;
    
    document.querySelector(".appointment-list").appendChild(card);
    applyFilters();
    closeCreatePopup();
  }
  
  
  function previewCreateImg(e) {
    const preview = document.getElementById("create-img-preview");
    const file = e.target.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
  
  function deleteCard(id) {
    if (!confirm("Bạn chắc chắn muốn xóa lịch này?")) return;
    const el = document.getElementById(id);
    if (el) el.remove();
  }
  
  let deleteMode = false;

  document.getElementById("btnDeleteMode").addEventListener("click", () => {
    deleteMode = true;
    toggleDeleteMode(true);
  });

  document.getElementById("btnCancelDelete").addEventListener("click", () => {
    deleteMode = false;
    toggleDeleteMode(false);
  });
  
  document.getElementById("btnConfirmDelete").addEventListener("click", () => {
    const selected = document.querySelectorAll(".delete-check:checked");
    if (selected.length === 0) {
      alert("⚠ Chưa chọn lịch nào!");
      return;
    }
    selected.forEach(ch => ch.closest(".appointment-card").remove());
    toggleDeleteMode(false);
    deleteMode = false;
  });

  function toggleDeleteMode(state) {
    document.querySelectorAll(".delete-check").forEach(ch => {
      ch.style.display = state ? "inline-block" : "none";
    });
  
    document.querySelectorAll(".detail-btn").forEach(btn => {
      btn.style.display = state ? "none" : "inline-block";
    });
  
    document.getElementById("btnDeleteMode").style.display = state ? "none" : "inline-block";
    document.getElementById("btnConfirmDelete").style.display = state ? "inline-block" : "none";
    document.getElementById("btnCancelDelete").style.display = state ? "inline-block" : "none";
  }

  function applyFilters() {
    const keyword = document.querySelector("#searchInput").value.toLowerCase().trim();
    const cards = document.querySelectorAll(".appointment-card");
  
    cards.forEach(card => {
      let show = true;
  
      if (keyword) {
        const code = card.querySelector(".index")?.innerText.toLowerCase() || "";
        const pet = card.querySelector(".pet strong")?.innerText.toLowerCase() || "";
        const owner = card.querySelector(".owner strong")?.innerText.toLowerCase() || "";
        const phone = card.querySelector(".owner small")?.innerText.toLowerCase() || "";
  
        const matchSearch =
          code.includes(keyword) ||
          pet.includes(keyword) ||
          owner.includes(keyword) ||
          phone.includes(keyword);
  
        if (!matchSearch) show = false;
      }
  
      card.style.display = show ? "flex" : "none";
    });
  }
  
    document.querySelector("#searchInput")
    .addEventListener("input", applyFilters);
  
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
          // Remove active UI
          document.querySelector(".tab.active")?.classList.remove("active");
          tab.classList.add("active");
      
          const range = tab.dataset.range;
          filterByRange(range);
        });
      });
      
      document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", () => {
          document.querySelector(".tab.active")?.classList.remove("active");
          tab.classList.add("active");
          filterByRange(tab.dataset.range);
        });
      });
      
      function filterByRange(range) {
        const cards = document.querySelectorAll(".appointment-card");
        const now = new Date();
      
        cards.forEach(card => {
          const dateStr = card.dataset.date;
          if (!dateStr) {
            card.style.display = "none";
            return;
          }
      
          const date = new Date(dateStr);
          let show = true;
      
          if (range === "day") {
            show = date.toDateString() === now.toDateString();
          }
      
          if (range === "week") {
            const start = new Date(now);
            start.setDate(now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1));
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            show = date >= start && date <= end;
          }
      
          if (range === "month") {
            show = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          }
      
          card.style.display = show ? "flex" : "none";
        });
      
        applyFilters(); // để search vẫn hoạt động
      }
      
      