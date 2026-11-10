// ============================================
// SATDEPTANI - TPTP 1B POLIWANGI
// ============================================

// DATA JADWAL KULIAH
const schedules = [
  {
    day: "Senin",
    time: "07.30–08.20",
    course: "Pemrograman Komputer dan Aplikasi (Teori) - TPTP11004",
    lecturer: "Erlin Susilowati, S.P., M.Biotek.",
    room: "Lab SIMA 1"
  },
  {
    day: "Senin",
    time: "08.20–10.00",
    course: "Pemrograman Komputer dan Aplikasi (Praktikum) - TPTP11004",
    lecturer: "Erlin Susilowati, S.P., M.Biotek.",
    room: "Lab SIMA 1"
  },
  {
    day: "Senin",
    time: "12.30–15.00",
    course: "Bahasa Indonesia - PW11102",
    lecturer: "Eka Nurmala Sari, M.P.",
    room: "G6.08"
  },
  {
    day: "Selasa",
    time: "07.30–09.10",
    course: "Kewarganegaraan",
    lecturer: "Dr. Widhi Harsono",
    room: "B4.05"
  },
  {
    day: "Selasa",
    time: "14.10–15.50",
    course: "Bahasa Inggris (Teori) - TPTP31001",
    lecturer: "Moh Hasbi Ash Shidiqi, S.Tr.P., M.P.",
    room: "G2.06"
  },
  {
    day: "Rabu",
    time: "08.20–10.00",
    course: "Dasar-Dasar Agronomi (Teori) - TPTP11002",
    lecturer: "Mokhtar Effendi, S.P., M.P.",
    room: "G6.07"
  },
  {
    day: "Rabu",
    time: "10.00–11.40",
    course: "Pendidikan Agama Islam",
    lecturer: "Imam Mashuri",
    room: "G1.07A"
  },
  {
    day: "Rabu",
    time: "12.30–14.10",
    course: "Dasar-Dasar Agronomi (Praktikum) - TPTP11002",
    lecturer: "Mokhtar Effendi, S.P., M.P.",
    room: "Lab Produksi dan Lingkungan"
  },
  {
    day: "Kamis",
    time: "07.30–09.10",
    course: "Dasar-Dasar Ilmu Tanah (Teori) - TPTP11003",
    lecturer: "Ari Istanti, S.P., M.P.",
    room: "G4.08"
  },
  {
    day: "Kamis",
    time: "09.10–10.50",
    course: "Dasar-Dasar Ilmu Tanah (Praktikum) - TPTP11003",
    lecturer: "Ari Istanti, S.P., M.P.",
    room: "Lab Produksi dan Lingkungan"
  },
  {
    day: "Kamis",
    time: "13.20–14.10",
    course: "Botani (Teori) - TPTP11001",
    lecturer: "Eka Nurmala Sari, S.P., M.P.",
    room: "G4.08"
  },
  {
    day: "Kamis",
    time: "14.10–15.00",
    course: "Botani (Praktikum) - TPTP11001",
    lecturer: "Eka Nurmala Sari, S.P., M.P.",
    room: "Lab B"
  },
  {
    day: "Jumat",
    time: "08.20–10.00",
    course: "Pancasila",
    lecturer: "Ninik Sri Rahayu",
    room: "G2.01"
  }
];

// DATA DOSEN
const lecturers = [
  {
    name: "Erlin Susilowati, S.P., M.Biotek.",
    field: "Pemrograman Komputer dan Aplikasi"
  },
  {
    name: "Eka Nurmala Sari, S.P., M.P.",
    field: "Bahasa Indonesia dan Botani"
  },
  {
    name: "Dr. Widhi Harsono",
    field: "Kewarganegaraan"
  },
  {
    name: "Moh Hasbi Ash Shidiqi, S.Tr.P., M.P.",
    field: "Bahasa Inggris"
  },
  {
    name: "Mokhtar Effendi, S.P., M.P.",
    field: "Dasar-Dasar Agronomi"
  },
  {
    name: "Imam Mashuri",
    field: "Pendidikan Agama Islam"
  },
  {
    name: "Ari Istanti, S.P., M.P.",
    field: "Dasar-Dasar Ilmu Tanah"
  },
  {
    name: "Ninik Sri Rahayu",
    field: "Pancasila"
  }
];

// ============================================
// PENYIMPANAN DATA
// ============================================

function loadData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

let tasks = loadData("satdeptani_tasks");
let notes = loadData("satdeptani_notes");

function saveTasks() {
  localStorage.setItem(
    "satdeptani_tasks",
    JSON.stringify(tasks)
  );
}

function saveNotes() {
  localStorage.setItem(
    "satdeptani_notes",
    JSON.stringify(notes)
  );
}

// ============================================
// TANGGAL DAN WAKTU
// ============================================

const dayNames = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
];

const today = new Date();
const todayName = dayNames[today.getDay()];

document.getElementById("todayText").textContent =
  today.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

document.getElementById("year").textContent =
  today.getFullYear();

// ============================================
// NAVIGASI
// ============================================

const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.toggle(
      "active",
      page.id === pageId
    );
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

  history.replaceState(null, "", "#" + pageId);
}

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showPage(link.dataset.page);
  });
});

// Tombol menuju halaman tertentu
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.go);
  });
});

// Menu HP
document.getElementById("menuToggle")
  .addEventListener("click", () => {
    document.getElementById("sidebar")
      .classList.toggle("open");
  });

// Membuka halaman berdasarkan alamat URL
const initialPage = location.hash.replace("#", "");

if (document.getElementById(initialPage)) {
  showPage(initialPage);
}

// ============================================
// JADWAL KULIAH
// ============================================

const scheduleTable =
  document.getElementById("scheduleTable");

const todaySchedule =
  document.getElementById("todaySchedule");

const dayOrder = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
];

function renderSchedule() {
  scheduleTable.innerHTML = "";

  const sorted = [...schedules].sort((a, b) => {
    const dayDifference =
      dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);

    if (dayDifference !== 0) return dayDifference;

    return a.time.localeCompare(b.time);
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

  document.getElementById("courseTotal").textContent =
    new Set(schedules.map(item => item.course)).size;

  renderTodaySchedule();
}

function renderTodaySchedule() {
  const todayItems = schedules.filter(
    item => item.day === todayName
  );

  todaySchedule.innerHTML = "";

  if (todayItems.length === 0) {
    todaySchedule.innerHTML = `
      <div class="empty-state">
        Tidak ada jadwal kuliah yang tercatat hari ini.
      </div>
    `;
    return;
  }

  todayItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "task-item";

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("strong");
    title.textContent = item.course;

    const detail = document.createElement("small");
    detail.textContent =
      item.time + " · " + item.room;

    const lecturer = document.createElement("small");
    lecturer.textContent = item.lecturer;

    info.append(title, detail, lecturer);
    div.appendChild(info);
    todaySchedule.appendChild(div);
  });
}

// ============================================
// FORMAT TANGGAL DAN STATUS DEADLINE
// ============================================

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString + "T00:00:00");

  if (isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getDeadlineStatus(deadline, done) {
  if (done) return "Selesai";

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const due = new Date(deadline + "T00:00:00");
  const difference = Math.ceil(
    (due - now) / (1000 * 60 * 60 * 24)
  );

  if (difference < 0) return "Terlambat";
  if (difference === 0) return "Deadline hari ini";
  if (difference === 1) return "Deadline besok";

  return `${difference} hari lagi`;
}

// ============================================
// MEMBUAT ELEMEN TUGAS
// ============================================

function createTaskElement(task) {
  const item = document.createElement("div");

  item.className =
    "task-item" + (task.done ? " done" : "");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-check";
  checkbox.checked = task.done;
  checkbox.setAttribute("aria-label", "Tandai tugas selesai");

  checkbox.addEventListener("change", () => {
    task.done = checkbox.checked;
    saveTasks();
    renderAllTasks();
    updateDashboard();
    showToast(
      task.done
        ? "Tugas ditandai selesai."
        : "Tugas dikembalikan ke daftar."
    );
  });

  const info = document.createElement("div");
  info.className = "task-info";

  const title = document.createElement("strong");
  title.textContent = task.name;

  const detail = document.createElement("small");
  detail.textContent =
    task.course + " · Deadline: " +
    formatDate(task.deadline);

  const status = document.createElement("small");
  status.textContent =
    getDeadlineStatus(task.deadline, task.done);

  info.append(title, detail, status);

  const priority = document.createElement("span");
  priority.className = "priority " + task.priority;
  priority.textContent = task.priority;

  const remove = document.createElement("button");
  remove.className = "delete-button";
  remove.textContent = "Hapus";

  remove.addEventListener("click", () => {
    if (!confirm("Yakin ingin menghapus tugas ini?")) {
      return;
    }

    tasks = tasks.filter(t => t.id !== task.id);

    saveTasks();
    renderAllTasks();
    updateDashboard();
    showToast("Tugas berhasil dihapus.");
  });

  item.append(checkbox, info, priority, remove);

  return item;
}

// ============================================
// PENGINGAT DI BAWAH JADWAL
// ============================================

const quickTaskForm =
  document.getElementById("quickTaskForm");

quickTaskForm.addEventListener("submit", event => {
  event.preventDefault();

  const task = {
    id: Date.now(),
    name: document.getElementById("quickTaskName").value.trim(),
    course: document.getElementById("quickTaskCourse").value.trim(),
    deadline: document.getElementById("quickTaskDeadline").value,
    priority: document.getElementById("quickTaskPriority").value,
    description: "",
    done: false
  };

  if (!task.name || !task.course || !task.deadline) {
    showToast("Lengkapi data pengingat terlebih dahulu.");
    return;
  }

  tasks.push(task);
  saveTasks();

  quickTaskForm.reset();

  renderAllTasks();
  updateDashboard();

  showToast("Pengingat tugas berhasil ditambahkan!");
});

// ============================================
// MANAJEMEN TUGAS
// ============================================

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskFilter = document.getElementById("taskFilter");

taskForm.addEventListener("submit", event => {
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
    showToast("Mohon lengkapi data tugas.");
    return;
  }

  tasks.push(task);
  saveTasks();

  taskForm.reset();

  renderAllTasks();
  updateDashboard();

  showToast("Tugas baru berhasil disimpan!");
});

taskFilter.addEventListener("change", renderAllTasks);

function renderAllTasks() {
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
  } else {
    filtered
      .sort((a, b) => a.deadline.localeCompare(b.deadline))
      .forEach(task => {
        taskList.appendChild(createTaskElement(task));
      });
  }

  // Tugas yang muncul di bawah jadwal
  const scheduleTaskList =
    document.getElementById("scheduleTaskList");

  scheduleTaskList.innerHTML = "";

  const pending = tasks
    .filter(task => !task.done)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  if (pending.length === 0) {
    scheduleTaskList.innerHTML = `
      <div class="empty-state">
        Belum ada pengingat tugas. Kamu bisa menambahkan tugas di atas.
      </div>
    `;
  } else {
    pending.forEach(task => {
      scheduleTaskList.appendChild(createTaskElement(task));
    });
  }

  document.getElementById("allTasks").textContent =
    tasks.length;

  document.getElementById("unfinishedTasks").textContent =
    tasks.filter(task => !task.done).length;

  document.getElementById("finishedTasks").textContent =
    tasks.filter(task => task.done).length;

  document.getElementById("reminderPending").textContent =
    pending.length;

  document.getElementById("reminderDone").textContent =
    tasks.filter(task => task.done).length;

  document.getElementById("taskBadge").textContent =
    pending.length;
}

// ============================================
// CATATAN KULIAH
// ============================================

const noteForm = document.getElementById("noteForm");
const noteList = document.getElementById("noteList");
const noteSearch = document.getElementById("noteSearch");

noteForm.addEventListener("submit", event => {
  event.preventDefault();

  const note = {
    id: Date.now(),
    title: document.getElementById("noteTitle").value.trim(),
    category: document.getElementById("noteCategory").value.trim(),
    content: document.getElementById("noteContent").value.trim(),
    date: new Date().toISOString()
  };

  if (!note.title || !note.content) {
    showToast("Judul dan isi catatan harus diisi.");
    return;
  }

  notes.unshift(note);
  saveNotes();

  noteForm.reset();

  renderNotes();
  updateDashboard();

  showToast("Catatan berhasil disimpan!");
});

noteSearch.addEventListener("input", renderNotes);

function renderNotes() {
  const keyword = noteSearch.value.toLowerCase().trim();

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
        Tidak ada catatan yang ditemukan.
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
    date.textContent = formatNoteDate(note.date);

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.textContent = "Hapus";

    remove.addEventListener("click", () => {
      if (!confirm("Hapus catatan ini?")) return;

      notes = notes.filter(n => n.id !== note.id);

      saveNotes();
      renderNotes();
      updateDashboard();

      showToast("Catatan dihapus.");
    });

    meta.append(date, remove);
    card.append(category, title, content, meta);

    noteList.appendChild(card);
  });
}

function formatNoteDate(value) {
  const date = new Date(value);

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

// ============================================
// DOSEN DAN GOOGLE SCHOLAR
// ============================================

const lecturerGrid =
  document.getElementById("lecturerGrid");

function renderLecturers() {
  lecturerGrid.innerHTML = "";

  lecturers.forEach(lecturer => {
    const card = document.createElement("article");
    card.className = "lecturer-card";

    const avatar = document.createElement("div");
    avatar.className = "lecturer-avatar";

    avatar.textContent = lecturer.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(word => word[0])
      .join("");

    const name = document.createElement("h3");
    name.textContent = lecturer.name;

    const field = document.createElement("p");
    field.textContent = lecturer.field;

    const link = document.createElement("a");
    link.className = "scholar-link";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Cari di Google Scholar ↗";

    link.href =
      "https://scholar.google.com/scholar?q=" +
      encodeURIComponent(lecturer.name);

    card.append(avatar, name, field, link);

    lecturerGrid.appendChild(card);
  });
}

// ============================================
// MODE GELAP
// ============================================

const themeToggle =
  document.getElementById("themeToggle");

function applyTheme() {
  const dark =
    localStorage.getItem("satdeptani_theme") === "dark";

  document.body.classList.toggle("dark", dark);

  themeToggle.textContent = dark
    ? "☀ Ganti Tampilan"
    : "☾ Ganti Tampilan";
}

themeToggle.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");

  localStorage.setItem(
    "satdeptani_theme",
    dark ? "dark" : "light"
  );

  applyTheme();
});

// ============================================
// DASHBOARD
// ============================================

function updateDashboard() {
  document.getElementById("pendingTotal").textContent =
    tasks.filter(task => !task.done).length;

  document.getElementById("noteTotal").textContent =
    notes.length;

  const dashboardTasks =
    document.getElementById("dashboardTasks");

  dashboardTasks.innerHTML = "";

  const upcoming = tasks
    .filter(task => !task.done)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 4);

  if (upcoming.length === 0) {
    dashboardTasks.innerHTML = `
      <div class="empty-state">
        Tidak ada tugas yang menunggu. Tetap semangat!
      </div>
    `;
  } else {
    upcoming.forEach(task => {
      dashboardTasks.appendChild(createTaskElement(task));
    });
  }
}

// ============================================
// NOTIFIKASI DALAM WEBSITE
// ============================================

let toastTimer;

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ============================================
// JALANKAN SEMUA FITUR
// ============================================

renderSchedule();
renderAllTasks();
renderNotes();
renderLecturers();
updateDashboard();
applyTheme();
