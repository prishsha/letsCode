const count = document.getElementById("count");
const solved = document.getElementById("solved");
const stat = document.getElementById("status");

function getToday() 
{
    const date = new Date().toISOString();
    const today = date.substring(0, date.indexOf("T"));
    return today;
}

chrome.storage.local.get(["streak", "lastSolved"], function(data){
    const streak = data.streak || 0;
    const lastSolved = data.lastSolved;

    count.textContent = streak;

    if(lastSolved === getToday()){
        solved.disabled = true;
        stat.textContent = "Already solved today";
    }
});