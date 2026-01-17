let editCard = null;


const popup = document.getElementById("popup");
const viewPopup = document.getElementById("viewPopup");
const newsList = document.getElementById("newsList");

/* OPEN FORM */
function openForm(edit = false) {
  popup.classList.add("show");
  document.getElementById("formTitle").innerText = edit ? "✏️ Sửa tin thú cưng" : "📝 Thêm tin thú cưng";
}

function closeForm() {
  popup.classList.remove("show");
  editCard = null;
}

/* SAVE */
function saveNews() {
  const title = newsTitle.value.trim();
  const desc = newsDesc.value.trim();
  const content = newsContent.value.trim();
  const imgFile = newsImage.files[0];
  const imgURL = imgFile ? URL.createObjectURL(imgFile) : "img/default.jpg";

  if (!title || !desc) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  const now = new Date();
  const fullTime = now.toLocaleString("vi-VN");

  if (editCard) {
    editCard.querySelector("h3").innerText = title;
    editCard.querySelector("p").innerText = desc;
    editCard.querySelector(".time").innerText = "Đăng lúc: " + fullTime;
    editCard.querySelector("img").src = imgURL;
  } else {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <div class="thumb"><img src="${imgURL}"></div>
      <div class="news-content">
        <h3>${title}</h3>
        <p>${desc}</p>
        <span class="time">Đăng lúc: ${fullTime}</span>
        <div class="actions">
          <button onclick="viewNews(this)">Chi tiết</button>
          <button onclick="editNews(this)">Sửa</button>
          <button class="danger" onclick="deleteNews(this)">Xóa</button>
        </div>
      </div>
    `;
    newsList.appendChild(card);
  }

  closeForm();
}

/* VIEW */
function viewNews(btn) {
  const card = btn.closest(".news-card");
  viewTitle.innerText = card.querySelector("h3").innerText;
  viewImage.src = card.querySelector("img").src;
  viewContent.innerText = card.querySelector("p").innerText + "\n\n" + card.querySelector(".time").innerText;
  viewPopup.classList.add("show");
}

function closeView() {
  viewPopup.classList.remove("show");
}

/* EDIT */
function editNews(btn) {
  editCard = btn.closest(".news-card");
  newsTitle.value = editCard.querySelector("h3").innerText;
  newsDesc.value = editCard.querySelector("p").innerText;
  openForm(true);
}

/* DELETE */
function deleteNews(btn) {
  if (confirm("Bạn có chắc muốn xóa tin này?")) {
    btn.closest(".news-card").remove();
  }
}

/* TAB SWITCH */
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active")?.classList.remove("active");
    tab.classList.add("active");
  });
});

/* OPEN FORM BUTTON */
document.getElementById("btnCreate").onclick = () => openForm();

/* DELETE SELECT MODE */
const btnDeleteMode = document.getElementById("btnDeleteMode");
const btnConfirm = document.getElementById("btnConfirmDelete");
const btnCancel = document.getElementById("btnCancelDelete");

let deleteMode = false;
let selectedCards = new Set();

btnDeleteMode.addEventListener("click", () => {
  deleteMode = true;
  btnDeleteMode.style.display = "none";
  btnConfirm.style.display = "inline-block";
  btnCancel.style.display = "inline-block";
});

newsList.addEventListener("click", (e) => {
  if (!deleteMode) return;
  const card = e.target.closest(".news-card");
  if (!card) return;

  if (selectedCards.has(card)) {
    selectedCards.delete(card);
    card.classList.remove("delete-select");
  } else {
    selectedCards.add(card);
    card.classList.add("delete-select");
  }
});

btnConfirm.addEventListener("click", () => {
  selectedCards.forEach(card => card.remove());
  resetDeleteMode();
});

btnCancel.addEventListener("click", resetDeleteMode);

function resetDeleteMode() {
  deleteMode = false;
  selectedCards.forEach(card => card.classList.remove("delete-select"));
  selectedCards.clear();
  btnDeleteMode.style.display = "inline-block";
  btnConfirm.style.display = "none";
  btnCancel.style.display = "none";
}

/* DATE PICKER DASHBOARD */
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("dashboardDate");
  const today = new Date();
  input.value = today.toISOString().split("T")[0];

  input.addEventListener("change", () => {
    console.log("Ngày đã chọn: ", input.value);
  });
});
