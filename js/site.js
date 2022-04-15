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


    const calculatedLoan = calculateLoanTotal(loanData);

    displayLoanData(calculatedLoan, loanData);
    //call buildSchedule
    //buildSchedule();

    //displayData();
}

//Logic Layer
function calculateLoanTotal(loanData) {

    let totalMonthlyPayment = 0;
    let interestPayment = 0;
    let principalPayment = 0;
    let remainingBalance = loanData.amount;
    let totalInterest = 0;

    const loanDataArray = [];

    for (let index = 0; index < loanData.term; index++) {

        totalMonthlyPayment = (loanData.amount * (loanData.rate / 1200)) / [(1 - (1 + loanData.rate / 1200) ** (-loanData.term))];

        interestPayment = remainingBalance * loanData.rate / 1200;

        principalPayment = totalMonthlyPayment - interestPayment;

        remainingBalance -= principalPayment;

        totalInterest += interestPayment;

        loanDataArray.push({
            'totalMonthlyPayment': totalMonthlyPayment.toFixed(2),
            'interestPayment': interestPayment.toFixed(2),
            'principalPayment': principalPayment.toFixed(2),
            'totalInterest': totalInterest.toFixed(2),
            'remainingBalance': remainingBalance.toFixed(2),
        });
    }

    return loanDataArray;
}

function displayLoanData(loanDataArray, loanData) {

    let totalCost = loanData.amount + parseFloat(loanDataArray[loanData.term - 1].totalInterest);

    document.getElementById("totalPrincipal").innerHTML = '$' + loanData.amount;
    document.getElementById("totalInterest").innerHTML = '$' + loanDataArray[loanData.term - 1].totalInterest;
    document.getElementById("totalCost").innerHTML = '$' + totalCost;
    document.getElementById("totalMonthlyPayment").innerHTML = '$' + loanDataArray[0].totalMonthlyPayment;

    let loanTable = document.getElementById("paymentBody");

    loanDataArray.forEach((element, index) => {

        let paymentDataRow = loanTable.insertRow(index);

        let columnMonths = paymentDataRow.insertCell(0);
        columnMonths.innerHTML = index + 1;

        let columnPayment = paymentDataRow.insertCell(1);
        columnPayment.innerHTML = element.totalMonthlyPayment;

        let columnPrincipal = paymentDataRow.insertCell(2);
        columnPrincipal.innerHTML = element.principalPayment;

        let columnInterest = paymentDataRow.insertCell(3);
        columnInterest.innerHTML = element.interestPayment;

        let columnTotalInterest = paymentDataRow.insertCell(4);
        columnTotalInterest.innerHTML = element.totalInterest;

        let columnBalance = paymentDataRow.insertCell(5);
        columnBalance.innerHTML = element.remainingBalance;

        // console.log(element);
    });
}
// //builds ammortization schedule
// function buildSchedule(amount, rate, term, payment) {
//     //return array of payment objects
// }

// //display table of payments
// //and summary info at the top of the page
// function displayData() {

// }