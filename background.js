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
    reminderTimes.forEach((time) => {
        const alarmTime = getNextTime(time.hour);

        chrome.alarms.create("leetcodeReminder_", + time.name, {
            when: alarmTime,
            periodInMinutes: 24*60
        });
    });
});

//get next time for alarm
function getNextTime(hour) {
  const now = new Date();
  const target = new Date();

  target.setHours(hour, 0, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  return target.getTime();
}


// //returns time of alarm
// function getTime() {
//     const now = new Date();
//     const rem = new Date();

//     rem.setHours(10, 21, 0, 0); //8pm

//     //if its past 8pm, move alarm timer to next day
//     if(now>rem)
//     {
//         rem.setDate(rem.getDate() + 1);
//     }

//     return rem.getTime();
// }

//runs the code when alarm rings
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log("Alarm fired");
    if(alarm.name.startsWith("leetcodeReminder_"))
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