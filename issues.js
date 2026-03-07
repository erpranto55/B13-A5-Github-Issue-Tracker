let allIssues = [];

async function fetchIssues() {
  document.getElementById("loading").classList.remove("hidden");
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allIssues = data.data;
  displayIssues(allIssues);
  document.getElementById("issueCount").innerText =
    allIssues.length + " Issues";
  document.getElementById("loading").classList.add("hidden");
}

function displayIssues(issues) {
  const container = document.getElementById("issuesContainer");
  container.innerHTML = "";

  issues.forEach((issue) => {
    let borderColor =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    let statusDot =
      issue.status === "open" ? "text-green-500" : "text-purple-500";

    let priorityColor = "";
    if (issue.priority === "high") {
      priorityColor = "bg-red-100 text-red-500";
    } else if (issue.priority === "medium") {
      priorityColor = "bg-yellow-100 text-yellow-600";
    } else {
      priorityColor = "bg-gray-200 text-gray-500";
    }

    const card = document.createElement("div");
    card.className = `bg-white rounded-lg shadow p-4 border-t-4 ${borderColor} cursor-pointer hover:shadow-lg transition`;
    card.innerHTML = `
<div class="flex justify-between items-center mb-2">
<span class="${statusDot} text-sm">●</span>
<span class="px-3 py-1 text-xs rounded-full ${priorityColor}">
${issue.priority.toUpperCase()}
</span>
</div>

<h3 class="font-semibold text-sm mb-2">
${issue.title}
</h3>

<p class="text-xs text-gray-500 mb-3">
${issue.description.substring(0, 90)}...
</p>

<div class="flex gap-2 mb-3 text-xs">
<span class="px-2 py-1 rounded-full bg-red-100 text-red-500">BUG</span>
<span class="px-2 py-1 rounded-full bg-yellow-100 text-yellow-600">HELP WANTED</span>
</div>

<div class="text-xs text-gray-400">
#1 by ${issue.author}  
<br>
${issue.createdAt}
</div>
`;
    card.onclick = () => openModal(issue);
    container.appendChild(card);
  });
}

function filterIssues(type) {
  if (type === "all") {
    displayIssues(allIssues);
  } else {
    const filtered = allIssues.filter((issue) => issue.status === type);
    displayIssues(filtered);
  }
}

function openModal(issue) {
  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDescription").innerText = issue.description;
  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalCreated").innerText = issue.createdAt;
  document.getElementById("modalAssignee").innerText = issue.author;
  document.getElementById("modalStatus").innerText = issue.status;

  const modalPriority = document.getElementById("modalPriority");
  modalPriority.innerText = issue.priority.toUpperCase();
  modalPriority.className = "px-3 py-1 text-xs rounded-full";
  if (issue.priority === "high") {
    modalPriority.classList.add("bg-red-500", "text-white");
  } else if (issue.priority === "medium") {
    modalPriority.classList.add("bg-yellow-400", "text-black");
  } else {
    modalPriority.classList.add("bg-gray-400", "text-white");
  }

  document.getElementById("issueModal").showModal();
}

async function searchIssues() {
  const text = document.getElementById("searchInput").value;
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`,
  );
  const data = await res.json();
  displayIssues(data.data);
}

fetchIssues();
