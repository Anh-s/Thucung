
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

  document.addEventListener("DOMContentLoaded", function () {

    /* ===== DATE ===== */
    const dashboardDate = document.getElementById("dashboardDate");
    const today = new Date().toISOString().split("T")[0];
    dashboardDate.value = today;
  
    /* ===== ELEMENTS ===== */
    const modal = document.getElementById("employeeModal");
    const list = document.getElementById("employeeList");
    const form = document.getElementById("employeeForm");
  
    /* ===== DATA ===== */
    let employees = [
      {
        id: 1,
        code: "NV001",
        name: "Nguyễn Văn A",
        phone: "090112233",
        shift: "Sáng (8h - 12h)",
        animals: ["Chó", "Mèo"]
      },
      {
        id: 2,
        code: "NV002",
        name: "Trần Thị B",
        phone: "091344466",
        shift: "Chiều (13h - 17h)",
        animals: ["Mèo"]
      }
    ];
  
    /* ===== RENDER ===== */
    function render() {
        list.innerHTML = employees.map(e => `
          <tr>
            <td class="emp-code">${e.code}</td>
            <td class="emp-name">${e.name}</td>
            <td>${e.phone}</td>
            <td><span class="badge">${e.shift}</span></td>
            <td>${e.animals.join(", ")}</td>
            <td>
              <button class="btn small" onclick="editEmp(${e.id})">Sửa</button>
            </td>
          </tr>
        `).join("");
      }
      
    render();
  
    /* ===== ADD ===== */
    document.getElementById("btnCreate").onclick = () => {
      form.reset();
      empId.value = "";
      modalTitle.innerText = "Thêm nhân viên";
      modal.classList.add("show");
    };
  
    /* ===== EDIT ===== */
    window.editEmp = id => {
      const e = employees.find(x => x.id === id);
      if (!e) return;
  
      empId.value = e.id;
      name.value = e.name;
      phone.value = e.phone;
      shift.value = e.shift;
  
      [...animals.options].forEach(o =>
        o.selected = e.animals.includes(o.value)
      );
  
      modalTitle.innerText = "Sửa nhân viên";
      modal.classList.add("show");
    };
  
    /* ===== SAVE ===== */
    form.onsubmit = e => {
      e.preventDefault();
  
      const selectedAnimals = [...animals.selectedOptions].map(o => o.value);
  
      if (empId.value) {
        const i = employees.findIndex(x => x.id == empId.value);
        employees[i] = {
          ...employees[i],
          name: name.value,
          phone: phone.value,
          shift: shift.value,
          animals: selectedAnimals
        };
      } else {
        const newCode = "NV" + String(employees.length + 1).padStart(3, "0");
        employees.push({
          id: Date.now(),
          code: newCode,
          name: name.value,
          phone: phone.value,
          shift: shift.value,
          animals: selectedAnimals
        });
      }
  
      modal.classList.remove("show");
      render();
    };
  
    /* ===== CANCEL ===== */
    document.getElementById("btnCancel").onclick = () => {
      modal.classList.remove("show");
    };
  
  });
  