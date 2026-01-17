let products = [];
let id = 1;
let editingId = null;

// POPUP
function openPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

products = [
  {
    id: "SP-001",
    name: "Thức ăn hạt cho chó Pedigree",
    pet: "Chó",
    category: "Thức ăn",
    price: 120000,
    weight: "1kg",
    stock: 30,
    desc: "Thức ăn hạt giúp chó phát triển khỏe mạnh, lông mượt.",
    image: "https://cunyeushop.vn/cdn/images/202111/goods_img/thuc-an-hat-cho-cho-con-pedigree-puppy-13kg-G5265-1636280314699.jpg"
  },
  {
    id: "SP-002",
    name: "Pate cho mèo Whiskas",
    pet: "Mèo",
    category: "Thức ăn",
    price: 25000,
    weight: "85g",
    stock: 50,
    desc: "Pate thơm ngon, bổ sung dinh dưỡng cho mèo.",
    image: "https://product.hstatic.net/200000264739/product/pate_whiskas_2_48673295ef11475ea58b338a4b64b1b9_master.jpg"
  },
  {
    id: "SP-003",
    name: "Sữa tắm thú cưng Bio Care",
    pet: "Chó",
    category: "Chăm sóc",
    price: 95000,
    weight: "300ml",
    stock: 20,
    desc: "Sữa tắm dịu nhẹ, khử mùi và bảo vệ da thú cưng.",
    image: "https://suatamsos.com/wp-content/uploads/2019/06/san-pham-8.jpg"
  }
];

// Cập nhật lại biến id để không bị trùng
id = products.length + 1;

// Hiển thị sản phẩm mẫu
renderProducts();



// ADD PRODUCT
function saveProduct() {
    const data = {
      name: name.value,
      pet: pet.value,
      category: category.value,
      price: price.value,
      weight: weight.value,
      stock: stock.value,
      desc: desc.value,
      image: imageBase64 || "https://via.placeholder.com/300"
    };
  
    if (editingId) {
      const index = products.findIndex(p => p.id === editingId);
      if (index !== -1) {
        products[index] = { ...products[index], ...data };
      }
      editingId = null;
    } else {
      data.id = "SP-" + id++;
      products.push(data);
    }
  
    closePopup();
    renderProducts();
  }
  

// RENDER
function renderProducts() {
  const filter = document.getElementById("petFilter").value;
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products
    .filter(p => !filter || p.pet === filter)
    .forEach(p => {
      list.innerHTML += `
        <div class="product-card">
          <img src="${p.image}">
          <div class="product-info">
            <h4>${p.name}</h4>
            <p>${p.pet} • ${p.category}</p>
            <p class="price">${Number(p.price).toLocaleString()} VNĐ</p>
            <p>Tồn kho: ${p.stock}</p>
            <div class="actions">
            <button onclick="viewDetail('${p.id}')">Chi tiết</button>
            <button onclick="editProduct('${p.id}')">Sửa</button>

            </div>
          </div>
        </div>
      `;
    });
}

function viewDetail(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;
  
    alert(
      `🛍️ TÊN: ${p.name}\n` +
      `🐾 THÚ CƯNG: ${p.pet}\n` +
      `📦 DANH MỤC: ${p.category}\n` +
      `💰 GIÁ: ${Number(p.price).toLocaleString()} VNĐ\n` +
      `📦 TỒN KHO: ${p.stock}\n\n` +
      `📝 MÔ TẢ:\n${p.desc}`
    );
  }
  
  /* EDIT */
  function editProduct(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
  
    editingId = id;
  
    name.value = p.name;
    pet.value = p.pet;
    category.value = p.category;
    price.value = p.price;
    weight.value = p.weight;
    stock.value = p.stock;
    desc.value = p.desc;
  
    imageBase64 = p.image;
    previewImage.src = p.image;
    previewImage.style.display = "block";
  
    formTitle.innerText = "✏️ Chỉnh sửa sản phẩm";
    openPopup();
  }
  



// BUTTON
document.getElementById("btnCreate").onclick = () => {
    editingId = null;
    imageBase64 = "";
    document.getElementById("formTitle").innerText = "➕ Thêm sản phẩm";
    clearForm();
    openPopup();
  };
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("pet").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("image").value = "";
    const preview = document.getElementById("previewImage");
    preview.src = "";
    preview.style.display = "none";
  }  

// DATE
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("dashboardDate").value =
    new Date().toISOString().split("T")[0];
});

let imageBase64 = "";

// PREVIEW IMAGE
document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    imageBase64 = e.target.result;
    const preview = document.getElementById("previewImage");
    preview.src = imageBase64;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
});

