
const tableBody = document.getElementById("tabel-mahasiswa");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const detailBox = document.getElementById("mahasiswa-detail");
const detailContent = document.getElementById("detail-content");

function showDetailMahasiswa(mhs) {
  detailContent.innerHTML = `
    <div class="detail-grid">
      <div class="detail-item">
        <strong>NIM</strong>
        <span>${mhs.nim}</span>
      </div>
      <div class="detail-item">
        <strong>Nama</strong>
        <span>${mhs.nama}</span>
      </div>
      <div class="detail-item">
        <strong>Asal</strong>
        <span>${mhs.asal}</span>
      </div>
      <div class="detail-item">
        <strong>Program Studi</strong>
        <span>${mhs.prodi}</span>
      </div>
      <div class="detail-item">
        <strong>Nilai</strong>
        <span>${mhs.nilai}</span>
      </div>
    </div>
  `;

  detailBox.hidden = false;
}

function renderTable(keyword = "") {
  const query = keyword.trim().toLowerCase();
  const filteredData = dataMahasiswa.filter((mhs) => {
    if (!query) return true;

    const nama = mhs.nama.toLowerCase();
    const nim = mhs.nim.toLowerCase();
    const asal = mhs.asal.toLowerCase();
    const prodi = mhs.prodi.toLowerCase();

    return (
      nama.includes(query) ||
      nim.includes(query) ||
      asal.includes(query) ||
      prodi.includes(query)
    );
  });

  tableBody.innerHTML = "";

  if (filteredData.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">Data tidak ditemukan.</td>
      </tr>
    `;
    detailBox.hidden = true;
    return;
  }

  filteredData.forEach((mhs, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${mhs.nim}</td>
      <td>
        <button class="student-name-btn" type="button" data-nim="${mhs.nim}">${mhs.nama}</button>
      </td>
      <td>${mhs.asal}</td>
      <td>${mhs.prodi}</td>
      <td>${mhs.nilai}</td>
    `;

    const nameButton = row.querySelector(".student-name-btn");
    nameButton.addEventListener("click", () => showDetailMahasiswa(mhs));

    tableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", (event) => {
  renderTable(event.target.value);
});

searchButton.addEventListener("click", () => {
  renderTable(searchInput.value);
});

renderTable();