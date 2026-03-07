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


fetchIssues();
