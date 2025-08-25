document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Expand and collapse all functionality
  const toggleAllBtn = document.getElementById("toggle-all-btn");
  const collapsibleElements = document.querySelectorAll(".collapse");

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener("click", function () {
      const isExpanding = this.textContent.trim() === "Expand All";
      collapsibleElements.forEach((element) => {
        const collapseInstance =
          bootstrap.Collapse.getOrCreateInstance(element);
        if (isExpanding) {
          collapseInstance.show();
        } else {
          collapseInstance.hide();
        }
      });
      this.textContent = isExpanding ? "Collapse All" : "Expand All";
    });
  }

  // Fungsi format ribuan
  function formatRibuan(angka) {
    return new Intl.NumberFormat("id-ID").format(angka).replace(/\./g, ",");
  }

  // Cari semua tabel
  document.querySelectorAll("table").forEach((table) => {
    // Cari header kolom
    const headers = Array.from(table.querySelectorAll("th")).map((th) =>
      th.textContent.trim()
    );
    const colIndex = headers.indexOf("$"); // cari index kolom $

    if (colIndex !== -1) {
      // Loop setiap baris di tbody
      table.querySelectorAll("tbody tr").forEach((row) => {
        const cell = row.cells[colIndex];
        if (cell) {
          let angka = parseInt(cell.textContent.replace(/[^0-9]/g, ""));
          if (!isNaN(angka)) {
            cell.textContent = formatRibuan(angka);
          }
        }
      });
    }
  });

  // cari header Status
  document.querySelectorAll("table").forEach((table) => {
    const headers = Array.from(table.querySelectorAll("th")).map((th) =>
      th.textContent.trim()
    );
    const statusIndex = headers.indexOf("Status");

    if (statusIndex !== -1) {
      table.querySelectorAll("tr").forEach((row) => {
        const cell = row.cells[statusIndex];
        if (cell) {
          cell.style.textAlign = "left";
        }
      });
    }
  });
});
