/* =========================================================
   ui.js — komponen UI yang dipakai di semua halaman
   ========================================================= */

// Render bagian kanan navbar (Masuk/Daftar vs Nama anggota + Keluar)
function renderNavAkun() {
  const el = document.getElementById("navAkun");
  if (!el) return;
  const session = getSession();

  if (session) {
    el.innerHTML = `
      <a href="akun.html">👤 ${session.nama.split(" ")[0]}</a>
      <a href="#" id="btnLogout">Keluar</a>
    `;
    document.getElementById("btnLogout").addEventListener("click", (e) => {
      e.preventDefault();
      logout();
      window.location.href = "index.html";
    });
  } else {
    el.innerHTML = `
      <a href="login.html">Masuk</a>
      <a href="daftar.html">Daftar</a>
    `;
  }
}

// Tandai menu aktif berdasarkan nama file saat ini
function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
}

// Toggle menu hamburger di layar kecil
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => links.classList.toggle("open"));
}

// Tampilkan pesan alert di dalam elemen tertentu
function showAlert(elementId, message, type = "success") {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `alert alert-${type} show`;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
}
function hideAlert(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.remove("show");
}

function formatTanggal(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function initLayout() {
  renderNavAkun();
  highlightActiveNav();
  initNavToggle();
}

document.addEventListener("DOMContentLoaded", initLayout);
