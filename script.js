document.addEventListener("DOMContentLoaded", () => {
  const mortgageAmountInput = document.getElementById("mortgage-amount");
  const mortgageTermInput = document.getElementById("mortgage-term");
  const interestRateInput = document.getElementById("interest-rate");
  const resultsContainer = document.getElementById("results-area");
  const interestOnlyInput = document.getElementById("interest-only");
  const repaymentInput = document.getElementById("repayment");
  const mortgageForm = document.getElementById("mortgage-form");
  const clearAll = document.getElementById("clear-button");

  const repaymentContainer = document.getElementById("repayment-div");
  const interestContainer = document.getElementById("interest-only-div");

  mortgageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const validEntryRegex = () => {
      const mortgageAmountInput =
        document.getElementById("mortgage-amount").value;
      const mortgageTermInput = document.getElementById("mortgage-term").value;
      const interestRateInput = document.getElementById("interest-rate").value;

      const mortgageAmountRegex = /^\d{1,3}(,\d{3})*(\.\d{1,2})?$/; // Matches numbers with commas and optional decimal
      const interestRateRegex = /^\d+(\.\d{1,2})?$/; // Matches a number with up to 2 decimal places
      const mortgageTermRegex = /^\d+$/;

      if (!mortgageAmountRegex.test(mortgageAmountInput)) {
        alert("Enter a valid morgage amount ");
        return false;
      }
      if (!interestRateRegex.test(interestRateInput)) {
        alert(" Enter a valid interest rate ");
        return false;
      }
      if (!mortgageTermRegex.test(mortgageTermInput)) {
        alert(" Enter a valid morgage term");
        return false;
      }

      return true;
    };

    const monthlyRepaymentsInterestOnly = () => {
      if (!validEntryRegex()) {
        return;
      }

      let mortgageAmount = parseFloat(
        mortgageAmountInput.value.replace(/,/g, "")
      );
      let interestRate = parseFloat(interestRateInput.value);

      let monthlyRInterest = (
        (interestRate / 100 / 12) *
        mortgageAmount
      ).toFixed(2);
      return parseFloat(monthlyRInterest).toLocaleString();
    };

    const monthlyRepaymentsRepayment = () => {
      if (!validEntryRegex()) {
        return;
      }

      let mortgageAmountl = parseFloat(
        mortgageAmountInput.value.replace(/,/g, "")
      );
      let interestRatel = parseFloat(interestRateInput.value) / 100;
      let mortgageTerml = parseFloat(mortgageTermInput.value) * 12;

      let monthlyInterestRate = interestRatel / 12;

      let monthlyRepayment =
        (mortgageAmountl *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, mortgageTerml)) /
        (Math.pow(1 + monthlyInterestRate, mortgageTerml) - 1);

      return parseFloat(monthlyRepayment.toFixed(2)).toLocaleString(); // Round to 2 decimal places
    };

    const totalRepaymentEnd = () => {
      if (!validEntryRegex()) {
        return;
      }

      let mortgageAmountx = parseFloat(
        mortgageAmountInput.value.replace(/,/g, "")
      );
      let interestRatex = parseFloat(interestRateInput.value) / 100;
      let mortgageTermx = parseFloat(mortgageTermInput.value) * 12;

      let monthlyInterestRatex = interestRatex / 12;

      let monthlyRepayment =
        (mortgageAmountx *
          monthlyInterestRatex *
          Math.pow(1 + monthlyInterestRatex, mortgageTermx)) /
        (Math.pow(1 + monthlyInterestRatex, mortgageTermx) - 1);

      let totalRepayment = monthlyRepayment * mortgageTermx;

      return parseFloat(totalRepayment.toFixed(2)).toLocaleString();
    };

    const displayResults = () => {
      if (repaymentInput.checked) {
        repaymentContainer.style.backgroundColor = "#d4efdf";
        interestContainer.style.backgroundColor = "white";
        resultsContainer.innerHTML = `

        

        <div class="all-results">
            <h2>Your results</h2>
            <p>Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate repayments" again

            </p>

    
            <div class="payment-result-container">
                <p id="payment-title">Your monthly repayments</p>
                <span class="num1" id="monthly-repayment-number">${monthlyRepaymentsRepayment()}</span>
                <hr>
                <p id="total-repayment-title">Total repayment</p>
                <span class="num2"  id="total-repayment-number">${totalRepaymentEnd()}</span>
            </div>

        </div>
            
            `;
      }
      if (interestOnlyInput.checked) {
        interestContainer.style.backgroundColor = "#d4efdf";
        repaymentContainer.style.backgroundColor = "white";
        resultsContainer.innerHTML = `
        <div class="all-results">
            <h2>Your results</h2>
            <p>Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click "calculate repayments" again

            </p>
            <div class="payment-result-container" >
            <p id="monthly-interest-only">Your monthly repayments Interest Only</p>
            <span class="num1" id="interest-only-number">${monthlyRepaymentsInterestOnly()}</span>
            </div>
        </div>
            `;
      }
    };

    displayResults();

    clearAll.addEventListener("click", () => {
      mortgageForm.reset();
      repaymentContainer.style.backgroundColor = "white";
      interestContainer.style.backgroundColor = "white";
    });
  });
});
