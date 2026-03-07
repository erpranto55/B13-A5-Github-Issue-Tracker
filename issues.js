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
    const card = document.createElement("div");
    card.className = `bg-white rounded-lg shadow p-4 border-t-4 ${borderColor} cursor-pointer hover:shadow-lg transition`;
    card.innerHTML = `

<div class="flex justify-between items-center mb-2">
<span class="text-green-500 text-sm">●</span>
<span class="badge badge-error badge-sm">${issue.priority}</span>
</div>

<h3 class="font-semibold text-sm mb-2">
${issue.title}
</h3>

<p class="text-xs text-gray-500 mb-3">
${issue.description.substring(0, 90)}...
</p>

<div class="flex gap-2 mb-3 text-xs">
<span class="badge badge-outline badge-error">BUG</span>
<span class="badge badge-outline badge-warning">HELP WANTED</span>
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



fetchIssues();
