// Background service worker for Notes Plus extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveNote",
    title: "Lưu vào Notes Plus",
    contexts: ["selection"],
  });
});

function getRandomColor() {
  const colors = ["#818cf8", "#f87171", "#34d399", "#fbbf24", "#a78bfa", "#60a5fa"];
  return colors[Math.floor(Math.random() * colors.length)];
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveNote") {
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      const newNote = {
        id: Date.now(),
        text: info.selectionText,
        color: getRandomColor(),
        label: "",
        date: new Date().toLocaleString("vi-VN"),
        pinned: false,
      };
      notes.unshift(newNote);
      chrome.storage.local.set({ notes }, () => {
        // Show notification
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon48.png",
          title: "Notes Plus",
          message: "Đã lưu ghi chú thành công!",
        });
      });
    });
  }
});
