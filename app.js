console.log("app.js is connected")

const numMsInDay = 86400000;
const numDaysInYear = 365;

function showInterest(simpleInterest, compoundInterest) {
    if ((!Number.isFinite(simpleInterest)) || (!Number.isFinite(compoundInterest))){
        throw new Error("Error: interest is invalid");
    }

    // get interest values from params and write to 2dp
    document.getElementById('simpleTotal').textContent = "$" + simpleInterest.toFixed(2);
    document.getElementById('compoundTotal').textContent = "$" + compoundInterest.toFixed(2);
    document.getElementById('resultsBox').style.display = 'block';
}


function getDateDifference(startDateString, endDateString) {
    if (!startDateString || !endDateString) {
        throw new Error(`Error: valid date must be input`);
    }
    
    const startTimestamp = new Date(startDateString + "T00:00:00Z").getTime();
    const endTimestamp = new Date(endDateString + "T00:00:00Z").getTime();

    const days = (endTimestamp - startTimestamp) / numMsInDay;

    return days
}

document.getElementById('calcBtn').addEventListener('click', ()=> {
    const principalInput = document.getElementById('principal').value;
    const rateInput = document.getElementById('rate').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const P = parseFloat(principalInput)
    const r = parseFloat(rateInput) / 100

    console.log({"startDay": startDate})
    console.log({"endDay": endDate})

    const tDays = getDateDifference(startDate, endDate) // num days

    // get ratio of days to a year(e.g. for 31 day month like Jan, 31/365 roughly equals 1/12)
    const t = tDays/numDaysInYear

    // for monthly calculation of simple interest rate - will be made more flexible later
    const  simpleInterest = P*r*t

    // for calculation of compound interest
    const A = P * Math.pow(1 + (r/numDaysInYear), tDays)
    const compoundInterest = A - P

    showInterest(simpleInterest, compoundInterest)

    console.log({"simpleInterest": simpleInterest})
    console.log({"compoundInterest": compoundInterest})
    console.log({"compoundInterestAmount": A})
})
