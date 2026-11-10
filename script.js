// ==========================================
// SATDEPTANI - TPTP 1B POLIWANGI
// ==========================================

// GANTI DATA JADWAL DI BAGIAN INI
const schedules = [
  { day: "Senin", time: "07.30–09.10", course: "Mata Kuliah Contoh 1", lecturer: "Nama Dosen", room: "Ruang A" },
  { day: "Senin", time: "09.10–10.50", course: "Mata Kuliah Contoh 2", lecturer: "Nama Dosen", room: "Ruang B" },
  { day: "Selasa", time: "07.30–09.10", course: "Mata Kuliah Contoh 3", lecturer: "Nama Dosen", room: "Ruang A" },
  { day: "Rabu", time: "09.10–10.50", course: "Mata Kuliah Contoh 4", lecturer: "Nama Dosen", room: "Laboratorium" },
  { day: "Kamis", time: "07.30–09.10", course: "Mata Kuliah Contoh 5", lecturer: "Nama Dosen", room: "Ruang C" },
  { day: "Jumat", time: "07.30–09.10", course: "Mata Kuliah Contoh 6", lecturer: "Nama Dosen", room: "Ruang A" }
];

const lecturers = [
  {
    name: "Aldy Bahaduri Indraloka, S.Si., M.P.",
    field: "Produksi Tanaman"
  },
  {
    name: "Abdul Holik, S.TP., M.Sc.",
    field: "Teknik Pertanian"
  },
  {
    name: "Ari Istanti, S.P., M.P.",
    field: "Agronomi · Pertanian Organik"
  },
  {
    name: "Moh Hasbi Ash Shidiqi, S.Tr.P., M.P.",
    field: "Agronomi · Teknologi Pertanian"
  },
  {
    name: "Eka Nurmala Sari, S.P., M.P.",
    field: "Agronomi · Perlindungan Tanaman"
  },
  {
    name: "Erlin Susilowati, S.P., M.Biotek.",
    field: "Bioteknologi Tanaman"
  },
  {
    name: "Mohammad Ali Mudhor, S.P., M.P.",
    field: "Agronomi"
  },
  {
    name: "Mokhtar Effendi, S.P., M.P.",
    field: "Agronomi · Hortikultura · Klimatologi"
  },
  {
    name: "Hendra Andiananta Pradana, S.TP., M.Si.",
    field: "Teknik Pertanian · Pertanian Berkelanjutan"
  }
];

// ==========================================
// PENYIMPANAN DATA
// ==========================================

let tasks = JSON.parse(localStorage.getItem("satde tani_tasks") || "[]");
let notes = JSON.parse(localStorage.getItem("satde tani_notes") || "[]");

// Fungsi penyimpanan
function saveTasks() {
  localStorage.setItem("satde tani_tasks", JSON.stringify(tasks));
}

function saveNotes() {
  localStorage.setItem("satde tani_notes", JSON.stringify(notes));
}

// ==========================================
// TANGGAL DAN WAKTU
// ==========================================

const now = new Date();

const dayNames = [
  "Minggu", "Senin", "Selasa",
  "Rabu", "Kamis", "Jumat", "Sabtu"
];

const todayName = dayNames[now.getDay()];

document.getElementById("todayText").textContent =
  now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

document.getElementById("dateLarge").textContent =
  now.getDate();

document.getElementById("monthYear").textContent =
  now.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric"
  });

document.getElementById("year").textContent =
  now.getFullYear();

// ==========================================
// NAVIGASI MENU
// ==========================================

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.toggle("active", page.id === pageId);
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageId
    );
  });

  document.getElementById("sidebar").classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    const pageId = this.dataset.page;

    showPage(pageId);
    history.replaceState(null, "", "#" + pageId);
  });
});

// Link internal di seluruh website
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(event) {
    const pageId = this.getAttribute("href").substring(1);

    if (document.getElementById(pageId)) {
      event.preventDefault();
      showPage(pageId);

      navLinks.forEach(nav => {
        nav.classList.toggle(
          "active",
          nav.dataset.page === pageId
        );
      });

      history.replaceState(null, "", "#" + pageId);
    }
  });
});

// Menu HP
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// Buka halaman berdasarkan URL
const initialPage = location.hash.replace("#", "");

if (document.getElementById(initialPage)) {
  showPage(initialPage);
}

// ==========================================
// JADWAL KULIAH
// ==========================================

const scheduleTable = document.getElementById("scheduleTable");
const todaySchedule = document.getElementById("todaySchedule");

function renderSchedule() {
  const order = [
    "Senin", "Selasa", "Rabu",
    "Kamis", "Jumat", "Sabtu"
  ];

  scheduleTable.innerHTML = "";

  const sorted = [...schedules].sort((a, b) => {
    return order.indexOf(a.day) - order.indexOf(b.day);
  });

  sorted.forEach(item => {
    const row = document.createElement("tr");

    [
      item.day,
      item.time,
      item.course,
      item.lecturer,
      item.room
    ].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    scheduleTable.appendChild(row);
  });

  const today = schedules.filter(item => item.day === todayName);

  todaySchedule.innerHTML = "";

  if (today.length === 0) {
    todaySchedule.innerHTML = `
      <div class="empty-state">
        Tidak ada jadwal yang dimasukkan untuk hari ini.
      </div>
    `;
  } else {
    today.forEach(item => {
      const div = document.createElement("div");
      div.className = "schedule-item";

      const time = document.createElement("div");
      time.className = "schedule-time";
      time.textContent = item.time;

      const info = document.createElement("div");

      const title = document.createElement("strong");
      title.textContent = item.course;

      const detail = document.createElement("small");
      detail.textContent =
        item.lecturer + " · " + item.room;

      info.append(title, detail);
      div.append(time, info);
      todaySchedule.appendChild(div);
    });
  }

  document.getElementById("courseTotal").textContent =
    new Set(schedules.map(item => item.course)).size;
}

renderSchedule();

// ==========================================
// SISTEM TUGAS
// ==========================================

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskFilter = document.getElementById("taskFilter");

function renderTasks() {
  const filter = taskFilter.value;

  const filtered = tasks.filter(task => {
    if (filter === "pending") return !task.done;
    if (filter === "done") return task.done;
    return true;
  });

  taskList.innerHTML = "";

  if (filtered.length === 0) {
    taskList.innerHTML = `
      <div class="empty-state">
        Belum ada tugas pada kategori ini.
      </div>
    `;
  }

  filtered.forEach(task => {
    const item = document.createElement("div");

    item.className = "task-item" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.done;

    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
      updateDashboard();
    });

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("strong");
    title.textContent = task.name;

    const detail = document.createElement("small");
    detail.textContent =
      task.course + " · Deadline: " +
      formatDate(task.deadline);

    const description = document.createElement("small");
    description.textContent = task.description || "";

    info.append(title, detail, description);

    const priority = document.createElement("span");
    priority.className = "priority " + task.priority;
    priority.textContent = task.priority;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Hapus";

    deleteButton.addEventListener("click", () => {
      if (confirm("Yakin ingin menghapus tugas ini?")) {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
        updateDashboard();
        showToast("Tugas berhasil dihapus.");
      }
    });

    item.append(
      checkbox,
      info,
      priority,
      deleteButton
    );

    taskList.appendChild(item);
  });

  document.getElementById("allTasks").textContent =
    tasks.length;

  document.getElementById("unfinishedTasks").textContent =
    tasks.filter(task => !task.done).length;

  document.getElementById("finishedTasks").textContent =
    tasks.filter(task => task.done).length;

  document.getElementById("pendingTotal").textContent =
    tasks.filter(task => !task.done).length;

  document.getElementById("taskCount").textContent =
    tasks.filter(task => !task.done).length;
}

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const task = {
    id: Date.now(),
    name: document.getElementById("taskName").value.trim(),
    course: document.getElementById("taskCourse").value.trim(),
    deadline: document.getElementById("taskDeadline").value,
    priority: document.getElementById("taskPriority").value,
    description: document.getElementById("taskDescription").value.trim(),
    done: false
  };

  if (!task.name || !task.course || !task.deadline) {
    showToast("Lengkapi data tugas terlebih dahulu.");
    return;
  }

  tasks.push(task);
  saveTasks();

  taskForm.reset();
  renderTasks();
  updateDashboard();

  showToast("Tugas berhasil disimpan!");
});

taskFilter.addEventListener("change", renderTasks);

// ==========================================
// SISTEM CATATAN
// ==========================================

const noteForm = document.getElementById("noteForm");
const noteList = document.getElementById("noteList");
const noteSearch = document.getElementById("noteSearch");

noteForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const note = {
    id: Date.now(),
    title: document.getElementById("noteTitle").value.trim(),
    category: document.getElementById("noteCategory").value.trim(),
    content: document.getElementById("noteContent").value.trim(),
    date: new Date().toISOString()
  };

  if (!note.title || !note.content) {
    showToast("Judul dan isi catatan wajib diisi.");
    return;
  }

  notes.unshift(note);
  saveNotes();

  noteForm.reset();
  renderNotes();
  updateDashboard();

  showToast("Catatan berhasil disimpan!");
});

function renderNotes() {
  const keyword = noteSearch.value.toLowerCase();

  const filtered = notes.filter(note => {
    return (
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword) ||
      note.category.toLowerCase().includes(keyword)
    );
  });

  noteList.innerHTML = "";

  if (filtered.length === 0) {
    noteList.innerHTML = `
      <div class="empty-state">
        Belum ada catatan yang ditemukan.
      </div>
    `;
  }

  filtered.forEach(note => {
    const card = document.createElement("article");
    card.className = "note-card";

    const category = document.createElement("span");
    category.className = "note-category";
    category.textContent = note.category || "Catatan umum";

    const title = document.createElement("h4");
    title.textContent = note.title;

    const content = document.createElement("p");
    content.textContent = note.content;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const date = document.createElement("small");
    date.textContent = formatDate(note.date.slice(0, 10));

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.textContent = "Hapus";

    remove.addEventListener("click", () => {
      if (confirm("Hapus catatan ini?")) {
        notes = notes.filter(n => n.id !== note.id);
        saveNotes();
        renderNotes();
        updateDashboard();
        showToast("Catatan berhasil dihapus.");
      }
    });

    meta.append(date, remove);
    card.append(category, title, content, meta);
    noteList.appendChild(card);
  });

  document.getElementById("noteTotal").textContent =
    notes.length;
}

noteSearch.addEventListener("input", renderNotes);

// ==========================================
// DIREKTORI DOSEN
// ==========================================

const lecturerGrid = document.getElementById("lecturerGrid");

function renderLecturers() {
  lecturerGrid.innerHTML = "";

  lecturers.forEach(lecturer => {
    const card = document.createElement("article");
    card.className = "lecturer-card";

    const avatar = document.createElement("div");
    avatar.className = "lecturer-avatar";

    const initials = lecturer.name
      .split(" ")
      .slice(0, 2)
      .map(word => word[0])
      .join("");

    avatar.textContent = initials;

    const name = document.createElement("h3");
    name.textContent = lecturer.name;

    const field = document.createElement("p");
    field.textContent = lecturer.field;

    const scholar = document.createElement("a");
    scholar.className = "scholar-link";
    scholar.target = "_blank";
    scholar.rel = "noopener";
    scholar.textContent = "Cari di Google Scholar ↗";

    scholar.href =
      "https://scholar.google.com/scholar?q=" +
      encodeURIComponent(lecturer.name);

    card.append(avatar, name, field, scholar);
    lecturerGrid.appendChild(card);
  });

  document.getElementById("lecturerTotal").textContent =
    lecturers.length;
}

renderLecturers();

// ==========================================
// MODE GELAP
// ==========================================

const themeToggle = document.getElementById("themeToggle");

if (localStorage.getItem("satde tani_theme") === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀ Ganti Tampilan";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const dark = document.body.classList.contains("dark");

  localStorage.setItem(
    "satde tani_theme",
    dark ? "dark" : "light"
  );

  themeToggle.textContent = dark
    ? "☀ Ganti Tampilan"
    : "☾ Ganti Tampilan";
});

// ==========================================
// FUNGSI PENDUKUNG
// ==========================================

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString + "T00:00:00");

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function updateDashboard() {
  document.getElementById("pendingTotal").textContent =
    tasks.filter(task => !task.done).length;

  document.getElementById("noteTotal").textContent =
    notes.length;

  document.getElementById("taskCount").textContent =
    tasks.filter(task => !task.done).length;
}

// ==========================================
// JALANKAN SEMUA FITUR
// ==========================================

renderTasks();
renderNotes();
updateDashboard();
