document.addEventListener("DOMContentLoaded", () => {
    // ===== DATE =====
    const dashboardDate = document.getElementById("dashboardDate");
    dashboardDate.value = new Date().toISOString().split("T")[0];
  
    // ===== DATA =====
    let customers = [
      { id: 1, name: "Nguyễn Văn A", phone: "090112233", pet: "Mèo Anh", lastVisit: "12/01/2026", spending: 3200000, status: "vip" },
      { id: 2, name: "Trần Thị B", phone: "091344466", pet: "Chó Poodle", lastVisit: "08/01/2026", spending: 1200000, status: "normal" },
      { id: 3, name: "Lê Minh C", phone: "098887755", pet: "Mèo Ba Tư", lastVisit: "05/01/2026", spending: 800000, status: "normal" }
    ];

    
  
    // ===== ELEMENTS =====
    const modal = customerModal;
    const form = customerForm;
  
    let deleteMode = false;
    let selected = new Set();
  
    let currentPage = 1;
    const pageSize = 5;
  
    // ===== RENDER =====
    function renderCustomers() {
      let data = [...customers];
  
      const search = searchInput.value.toLowerCase();
      const vip = filterVip.value;
      const sort = sortSelect.value;
  
      data = data.filter(c =>
        (c.name.toLowerCase().includes(search) || c.phone.includes(search)) &&
        (vip === "" || c.status === vip)
      );
  
      if (sort === "spending") {
        data.sort((a, b) => b.spending - a.spending);
      }
  
      if (sort === "lastVisit") {
        data.sort((a, b) =>
          new Date(b.lastVisit.split('/').reverse().join('-')) -
          new Date(a.lastVisit.split('/').reverse().join('-'))
        );
      }
  
      renderPagination(data.length);
  
      const start = (currentPage - 1) * pageSize;
      data = data.slice(start, start + pageSize);
  
      customerList.innerHTML = data.map(c => `
        <tr class="${selected.has(c.id) ? 'selected' : ''}">
          <td>
            ${deleteMode ? `<input type="checkbox" ${selected.has(c.id) ? 'checked' : ''} onchange="toggleSelect(${c.id})">` : ""}
            <strong>${c.name}</strong>
          </td>
          <td>${c.phone}</td>
          <td>${c.pet}</td>
          <td>${c.lastVisit}</td>
          <td>${c.spending.toLocaleString()}đ</td>
          <td><span class="badge ${c.status}">${c.status === "vip" ? "VIP" : "Thường"}</span></td>
          <td><button class="btn small" onclick="editCustomer(${c.id})">Sửa</button></td>
        </tr>
      `).join("");
    }
  
    // ===== PAGINATION =====
    function renderPagination(total) {
        const pages = Math.ceil(total / pageSize);
        pagination.innerHTML = "";
      
        if (pages <= 1) return; // 👈 CHỈ 1 TRANG → KHÔNG HIỆN
      
        for (let i = 1; i <= pages; i++) {
          pagination.innerHTML += `
            <button class="${i === currentPage ? "active" : ""}"
                    onclick="goPage(${i})">${i}</button>
          `;
        }
      }
      
  
    window.goPage = page => {
      currentPage = page;
      renderCustomers();
    };
  
    // ===== DELETE =====
    window.toggleSelect = id => {
      selected.has(id) ? selected.delete(id) : selected.add(id);
      renderCustomers();
    };
  
    btnDeleteMode.onclick = () => {
      deleteMode = true;
      btnDeleteMode.style.display = "none";
      btnConfirmDelete.style.display = "inline-block";
      btnCancelDelete.style.display = "inline-block";
      renderCustomers();
    };
  
    btnConfirmDelete.onclick = () => {
      if (!confirm("Xóa các khách đã chọn?")) return;
      customers = customers.filter(c => !selected.has(c.id));
      resetDeleteMode();
    };
  
    function resetDeleteMode() {
      deleteMode = false;
      selected.clear();
      btnDeleteMode.style.display = "inline-block";
      btnConfirmDelete.style.display = "none";
      btnCancelDelete.style.display = "none";
      renderCustomers();
    }
  
    btnCancelDelete.onclick = resetDeleteMode;
  
    // ===== ADD / EDIT =====
    btnCreate.onclick = () => {
        form.reset();
        customerId.value = "";
        modalTitle.innerText = "🧑‍💼 Thêm khách hàng";
        modal.classList.add("show");
    };
      
    window.editCustomer = id => {
        const c = customers.find(x => x.id === id);
        if (!c) return;
      
        customerId.value = c.id;
        name.value = c.name;
        phone.value = c.phone;
        pet.value = c.pet;
        status.value = c.status;
      
        modalTitle.innerText = "✏️ Sửa khách hàng";
        modal.classList.add("show");
    };
    btnCancel.onclick = () => modal.classList.remove("show");

      
  
    form.onsubmit = e => {
      e.preventDefault();
  
      const id = customerId.value;
      const data = {
        name: name.value,
        phone: phone.value,
        pet: pet.value,
        status: status.value,
        lastVisit: new Date().toLocaleDateString("vi-VN"),
        spending: 0
      };
  
      if (id) {
        const index = customers.findIndex(c => c.id == id);
        customers[index] = { ...customers[index], ...data };
      } else {
        customers.push({ id: Date.now(), ...data });
      }
  
      modal.classList.remove("show");
      renderCustomers();
    };

  
    // ===== FILTER =====
    searchInput.oninput = renderCustomers;
    filterVip.onchange = renderCustomers;
    sortSelect.onchange = renderCustomers;
  
    renderCustomers();
  });
  
  