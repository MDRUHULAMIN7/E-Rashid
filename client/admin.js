// admin.js
import { initializeAllProductsPage } from './utils/initializeAllProductsPage.js';

const pageContentWrapper = document.getElementById("page-content-wrapper");

async function loadPageContent(filePath,callback) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const bodyContent = doc.body.innerHTML;

    pageContentWrapper.innerHTML = bodyContent;

    if (typeof callback === "function") {
      callback();
    }

  } catch (error) {
    console.error("Error loading content:", error);
    pageContentWrapper.innerHTML = "<p>Error loading content.</p>";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadPageContent("admin-component/allProducts.html", initializeAllProductsPage);
});



// toogle btn
const toggleBtn = document.getElementById('toggleSidebar');
const closeBtn = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar-wrapper');
const overlay = document.getElementById('overlay');
const mainContent = document.getElementById('main-content');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.remove('-translate-x-full');
  overlay.classList.remove('hidden');
  mainContent.classList.add('blur-sm', 'pointer-events-none');
  toggleBtn.classList.add('hidden'); // 👈 Hide toggle (three dot)
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
  mainContent.classList.remove('blur-sm', 'pointer-events-none');
  toggleBtn.classList.remove('hidden'); // 👈 Show toggle again
});

overlay.addEventListener('click', () => {
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('hidden');
  mainContent.classList.remove('blur-xl', 'pointer-events-none');
  toggleBtn.classList.remove('hidden'); // 👈 Show toggle again
});
