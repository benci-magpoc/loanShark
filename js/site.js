//get the loans from page
function getValues() {
    //clear out the table display
    document.getElementById("paymentBody").innerHTML = "";

    let loanData = {
        amount: 0.00,
        term: 0,
        rate: 0
    };

    if (isNaN(loanData.amount)) {
        alert("Enter a valid amount. Must be a number!");
        document.getElementById("loanAmount").focus();
    } else if (isNaN(loanData.term)) {
        alert("Enter a valid term. Must be a number!");
        document.getElementById("loanTerms").focus();
    }
    if (isNaN(loanData.amount)) {
        alert("Enter a valid rate. Must be a number!");
        document.getElementById("loanRate").focus();
    } else {

        loanData.amount = parseFloat(document.getElementById("loanAmount").value);
        loanData.term = parseInt(document.getElementById("loanTerms").value);
        loanData.rate = parseFloat(document.getElementById("loanRate").value);

        //calls calculatedLoanTotal to calculate the schedule
        const calculatedLoan = calculateLoanTotal(loanData);
        //calls displayLoanData passing calculatedLoan values
        displayLoanData(calculatedLoan, loanData);
    }
}

//This function receives the parameter object of loanData which 
//to be calculated and passed as an array of object that has a 
//length equivalent to the terms of the loan so it can be looped through for output.
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

//displays ammortization schedule on the page through a table 
function displayLoanData(loanDataArray, loanData) {

    let totalCost = loanData.amount + parseFloat(loanDataArray[loanData.term - 1].totalInterest);

    document.getElementById("totalPrincipal").innerHTML = '$' + loanData.amount;
    document.getElementById("totalInterest").innerHTML = '$' + loanDataArray[loanData.term - 1].totalInterest;
    document.getElementById("totalCost").innerHTML = '$' + totalCost;
    document.getElementById("totalMonthlyPayment").innerHTML = '$' + loanDataArray[0].totalMonthlyPayment;

    //loanTable is assigned the body of the table so the rows can be displayed
    let loanTable = document.getElementById("paymentBody");

    //loops through the array to assign values to rows of the table
    loanDataArray.forEach((element, index) => {

        //insertRow method is called to prepare the row to be inserted with data
        let paymentDataRow = loanTable.insertRow(index);

        //insertCell method is used to display values to the column of the index
        paymentDataRow.insertCell(0).innerHTML = index + 1;;
        paymentDataRow.insertCell(1).innerHTML = element.totalMonthlyPayment;
        paymentDataRow.insertCell(2).innerHTML = element.principalPayment;
        paymentDataRow.insertCell(3).innerHTML = element.interestPayment;
        paymentDataRow.insertCell(4).innerHTML = element.totalInterest;
        paymentDataRow.insertCell(5).innerHTML = element.remainingBalance;
    });
}