const count = document.getElementById("count");
const solved = document.getElementById("solved");
const stat = document.getElementById("status");

function getToday() 
{
    const date = new Date().toISOString();
    const today = date.substring(0, date.indexOf("T"));
    return today;
}

function getYesterday()
{
    const date = new Date();
    date.setDate(date.getDate()-1);
    const yest = date.toISOString().split("T")[0];
    return yest;
}

//checks whether streak is already logged today
chrome.storage.local.get(["streak", "lastSolved"], function(data){
    const streak = data.streak || 0;
    const lastSolved = data.lastSolved;

    count.textContent = streak;

    if(lastSolved === getToday()){
        solved.disabled = true;
        stat.textContent = "Already solved today";
    }
});

//when solved is clicked
solved.addEventListener("click", () => {
    chrome.storage.local.get(["streak", "lastSolved"], (data) => {
        let streak = data.streak || 0;
        const lastSolved = data.lastSolved;

        if(lastSolved === getYesterday())
        {
            streak+=1;
        }
        else
        {
            streak=1;
        }
        const today = getToday();

        chrome.storage.local.set(
            {
                streak: streak,
                lastSolved: today
            },
            () => {
                count.textContent = streak;
                solved.disabled = true;
                stat.textContent = "Streak Updated!";
            }
        );
    });
});