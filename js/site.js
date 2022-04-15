//get the loans from page
function getValues() {

    let loanData = {
        amount: 0.00,
        term: 0,
        rate: 0
    };

    loanData.amount = parseFloat(document.getElementById("loanAmount").value);
    loanData.term = parseInt(document.getElementById("loanTerms").value);
    loanData.rate = parseFloat(document.getElementById("loanRate").value);
    console.log(loanData.amount);


    let calculatedLoan = calculateLoanTotal(loanData);

    displayLoanData(calculatedLoan);
    //call buildSchedule
    //buildSchedule();

    //displayData();
}

//Logic Layer
function calculateLoanTotal(loanData) {

    loanData.remainingBalance = loanData.amount;

    loanData.totaInterest = 0

    for (let index = loanData.term; index >= 1; index--) {


        loanData.totalMonthlyPayment = (loanData.remainingBalance * (loanData.rate / 1200)) / (1 - (1 + loanData.rate / 1200) ** -index);

        loanData.interestPayment = loanData.remainingBalance * loanData.rate / 1200;

        loanData.principalPayment = loanData.totalMonthlyPayment - loanData.interestPayment;

        loanData.remainingBalance -= loanData.totalMonthlyPayment;

        loanData.totaInterest += loanData.interestPayment;

        let loanTable = document.getElementById("paymentData-table");

        let paymentDataRow = loanTable.insertRow(loanData.term - index + 1);


        let columnMonths = paymentDataRow.insertCell(0);
        columnMonths.innerHTML = loanData.term - index + 1;

        let columnPayment = paymentDataRow.insertCell(1);
        columnPayment.innerHTML = loanData.totalMonthlyPayment;

        let columnPrincipal = paymentDataRow.insertCell(2);
        columnPrincipal.innerHTML = loanData.principalPayment;

        let columnInterest = paymentDataRow.insertCell(3);
        columnInterest.innerHTML = loanData.interestPayment;

        let columnTotalInterest = paymentDataRow.insertCell(4);
        columnTotalInterest.innerHTML = loanData.totaInterest;

        let columnBalance = paymentDataRow.insertCell(5);
        columnBalance.innerHTML = loanData.remainingBalance;

        // loanTableRow.childNodes[0].innerHTML = loanData.term - index + 1;
        // loanTableRow.childNodes[1].innerHTML = loanData.totalMonthlyPayment;
        // loanTableRow.childNodes[2].innerHTML = loanData.principalPayment;
        // loanTableRow.childNodes[3].innerHTML = loanData.interestPayment;
        // loanTableRow.childNodes[4].innerHTML = loanData.totaInterest;
        // loanTableRow.childNodes[5].innerHTML = loanData.remainingBalance;

    }

    // console.log(loanData.totalMonthlyPayment);
    console.log(loanData);
    return loanData;
}

function displayLoanData(loanData) {
    document.getElementById("totalPrincipal").innerHTML = loanData.amount;
    document.getElementById("totalInterest").innerHTML = loanData.amount;
    document.getElementById("totalCost").innerHTML = loanData.amount;
    document.getElementById("totalMonthlyPayment").innerHTML = loanData.totalMonthlyPayment;
}
// //builds ammortization schedule
// function buildSchedule(amount, rate, term, payment) {
//     //return array of payment objects
// }

// //display table of payments
// //and summary info at the top of the page
// function displayData() {

// }