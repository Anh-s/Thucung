document.addEventListener("DOMContentLoaded", function () {

    function setToday() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
  
      document.getElementById("dashboardDate").value = `${yyyy}-${mm}-${dd}`;
    }
  
    setToday();
  
    loadSampleServices(); // ⭐ THÊM DỊCH VỤ MẪU
  
    document
      .getElementById("dashboardDate")
      .addEventListener("change", function () {
        console.log("Ngày đã chọn:", this.value);
      });
  
  });
  
  let services = [];
  let editingId = null;
  
  function loadSampleServices() {
    services = [
      {
        id: 1,
        name: "Tắm & sấy cơ bản",
        price: 120000,
        duration: "30 phút",
        pets: ["Chó", "Mèo"],
        desc: "Tắm sạch, sấy khô, làm thơm lông cho thú cưng."
      },
      {
        id: 2,
        name: "Cắt tỉa lông tạo kiểu",
        price: 200000,
        duration: "60 phút",
        pets: ["Chó", "Mèo"],
        desc: "Cắt tỉa lông theo yêu cầu, tạo kiểu gọn gàng."
      },
      {
        id: 3,
        name: "Vệ sinh lồng Hamster",
        price: 50000,
        duration: "20 phút",
        pets: ["Hamster"],
        desc: "Làm sạch lồng, thay mùn cưa, khử mùi."
      },
      {
        id: 4,
        name: "Chăm sóc & làm sạch lông Vẹt",
        price: 150000,
        duration: "40 phút",
        pets: ["Vẹt"],
        desc: "Vệ sinh lông, kiểm tra móng và mỏ."
      }
    ];
  
    renderServices();
  }
  
  /* POPUP */
  function openPopup(edit = false) {
    popup.style.display = "flex";
    formTitle.innerText = edit ? "✏️ Sửa dịch vụ" : "➕ Thêm dịch vụ";
  }
  
  function closePopup() {
    popup.style.display = "none";
    editingId = null;
    resetForm();
  }
  
  /* RESET */
  function resetForm() {
    name.value = "";
    price.value = "";
    duration.value = "";
    desc.value = "";
    [...pets.options].forEach(o => o.selected = false);
  }
  
  /* SAVE */
  function saveService() {
  
    const selectedPets = [...pets.selectedOptions].map(o => o.value);
  
    if (editingId) {
      const s = services.find(i => i.id === editingId);
      s.name = name.value;
      s.price = price.value;
      s.duration = duration.value;
      s.pets = selectedPets;
      s.desc = desc.value;
    } else {
      services.push({
        id: Date.now(),
        name: name.value,
        price: price.value,
        duration: duration.value,
        pets: selectedPets,
        desc: desc.value
      });
    }
  
    closePopup();
    renderServices();
  }
  
  /* RENDER */
  function renderServices() {
    serviceList.innerHTML = "";
  
    services.forEach(s => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML = `
        <h4>${s.name}</h4>
        <p class="price">${Number(s.price).toLocaleString()} VNĐ</p>
        <p>⏱ ${s.duration}</p>
        <div class="tags">
          ${s.pets.map(p => `<span>${p}</span>`).join("")}
        </div>
        <p>${s.desc || ""}</p>
        <div class="actions">
          <button class="edit" onclick="editService(${s.id})">Sửa</button>
          <button class="delete" onclick="deleteService(${s.id})">Xóa</button>
        </div>
      `;
      serviceList.appendChild(card);
    });
  }
  
  /* EDIT */
  function editService(id) {
    const s = services.find(i => i.id === id);
    if (!s) return;
  
    editingId = id;
    name.value = s.name;
    price.value = s.price;
    duration.value = s.duration;
    desc.value = s.desc;
    [...pets.options].forEach(o => o.selected = s.pets.includes(o.value));
  
    openPopup(true);
  }
  
  /* DELETE */
  function deleteService(id) {
    if (confirm("Xóa dịch vụ này?")) {
      services = services.filter(s => s.id !== id);
      renderServices();
    }
  }
  
  /* BUTTON */
  btnCreate.onclick = () => openPopup();
  