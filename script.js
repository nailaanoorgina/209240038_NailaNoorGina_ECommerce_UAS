const produkList = {
  gshock: { id: "gshock", nama: "Casio G-Shock", harga: 2500000 },
  edifice: { id: "edifice", nama: "Casio Edifice", harga: 3200000 },
  protrek: { id: "protrek", nama: "Casio Pro Trek", harga: 4000000 },
  vintage: { id: "vintage", nama: "Casio Vintage", harga: 800000 },
  classic: { id: "classic", nama: "Casio Classic", harga: 500000 },
  babyg: { id: "babyg", nama: "Casio Baby-G", harga: 2000000 },
  oceanus: { id: "oceanus", nama: "Casio Oceanus", harga: 6500000 }
};

function tambahKeKeranjang(idProduk) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const produk = produkList[idProduk];
  const index = keranjang.findIndex(item => item.id === idProduk);

  if (index !== -1) {
    keranjang[index].jumlah += 1;
  } else {
    keranjang.push({ ...produk, jumlah: 1 });
  }

  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  tampilkanKeranjang();
  alert(${produk.nama} telah ditambahkan ke keranjang.);
}

function tampilkanKeranjang() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const container = document.getElementById("isiKeranjang");

  if (keranjang.length === 0) {
    container.innerHTML = "<p>Keranjang masih kosong.</p>";
    return;
  }

  let html = "";
  let total = 0;

  keranjang.forEach((item, index) => {
    total += item.harga * item.jumlah;
    html += `
      <div class="keranjang-item">
        <span>${item.nama} - Rp ${item.harga.toLocaleString()} x ${item.jumlah}</span>
        <button class="hapus-produk" onclick="hapusItem(${index})">&times;</button>
      </div>
     `;
     });

     html += <p><strong>Total: Rp ${total.toLocaleString()}</strong></p>;
     container.innerHTML = html;
}


function hapusKeranjang() {
  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
    localStorage.removeItem("keranjang");
    tampilkanKeranjang();
  }
}

function checkout() {
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }
  alert("Pembelian berhasil!");
  localStorage.removeItem("keranjang");
  tampilkanKeranjang();
}

function hapusItem(index) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.splice(index, 1);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  tampilkanKeranjang();
}


document.addEventListener("DOMContentLoaded", () => {
  tampilkanKeranjang();
  document.querySelectorAll(".produk-detail button").forEach(tombol => {
    const idProduk = tombol.getAttribute("data-id");
    tombol.addEventListener("click", () => tambahKeKeranjang(idProduk));
  });
});
