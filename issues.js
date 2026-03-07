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
<span class="text-green-500 text-sm">●</span>
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
<span class="badge badge-outline badge-error bg-[#FECACA] font-[#FEECEC] rounded-[100px]">BUG</span>
<span class="badge badge-outline badge-warning bg-[#FDE68A] font-[#D97706] rounded-[100px]">HELP WANTED</span>
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
  document.getElementById("modalStatus").innerText = issue.status;
  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalPriority").innerText = issue.priority;
  document.getElementById("modalCreated").innerText = issue.createdAt;
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
