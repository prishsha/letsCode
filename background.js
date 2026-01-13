//reminder times
const reminderTimes =[
    {
        name: "8am", 
        hour: 8
    },
    {
        name: "12pm", 
        hour: 12
    },
    {
        name: "4pm", 
        hour: 16
    },
    {
        name: "8pm", 
        hour: 20
    },
    {
        name: "10pm", 
        hour: 22
    },
    {
        name: "12am", 
        hour: 0
    },
]

//create chrome alarm
chrome.runtime.onInstalled.addListener(()=> {
    chrome.alarms.create("leetcodeReminder", {
        when: getTime(),
        periodInMinutes: 24*60
    });
});

//returns time of alarm
function getTime() {
    const now = new Date();
    const rem = new Date();

    rem.setHours(10, 21, 0, 0); //8pm

    //if its past 8pm, move alarm timer to next day
    if(now>rem)
    {
        rem.setDate(rem.getDate() + 1);
    }

    return rem.getTime();
}

//runs the code when alarm rings
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm fired");
    if(alarm.name === "leetcodeReminder")
    {
        checkAndNotify();
    }
});

function getToday() 
{
    const date = new Date().toISOString();
    const today = date.substring(0, date.indexOf("T"));
    return today;
}

//send notification only if not solved
function checkAndNotify() 
{
    chrome.storage.local.get(["lastSolved"], (data) => {
        const lastSolved = data.lastSolved;
        const today = getToday();

        if(lastSolved !== today)
        {
            sendNotification();
        }
    });
}

function sendNotification()
{
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon1.png",
        title: "Leetcode Reminder",
        message: "Don't lose your streak! Solve daily!"
    });
}