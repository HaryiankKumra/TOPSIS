emailjs.init('HjQ38dlPPv6GUKRpV');

const form = document.getElementById('topsisForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const success = document.getElementById('success');
const resultsSection = document.getElementById('resultsSection');
const resultsContainer = document.getElementById('resultsContainer');
const downloadResultBtn = document.getElementById('downloadResultBtn');

let csvData = null;
let csvHeaders = null;
let lastResults = null;
let lastResultCSV = null;

const sendEmailCheckbox = document.getElementById('sendEmail');
const emailSection = document.getElementById('emailSection');

sendEmailCheckbox.addEventListener('change', function() {
    if (this.checked) {
        emailSection.classList.add('active');
    } else {
        emailSection.classList.remove('active');
    }
});

document.getElementById('csvFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const fileError = document.getElementById('fileError');
    fileError.style.display = 'none';
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const text = event.target.result;
                const parsed = parseCSV(text);
                
                csvHeaders = parsed[0];
                csvData = parsed.slice(1);
                
                validateCSVData(parsed);
                
                fileError.style.display = 'none';
            } catch (error) {
                fileError.textContent = error.message;
                fileError.style.display = 'block';
                csvData = null;
            }
        };
        reader.readAsText(file);
    }
});

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const weightsInput = document.getElementById('weights').value.trim();
    const impactsInput = document.getElementById('impacts').value.trim();
    const emailInput = document.getElementById('email').value.trim();
    const shouldSendEmail = sendEmailCheckbox.checked;
    
    let hasError = false;
    
    document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
    success.style.display = 'none';
    
    if (!csvData) {
        document.getElementById('fileError').textContent = 'Please upload a valid CSV file';
        document.getElementById('fileError').style.display = 'block';
        hasError = true;
    }
    
    if (!weightsInput.includes(',')) {
        document.getElementById('weightsError').textContent = 'Weights must be separated by commas';
        document.getElementById('weightsError').style.display = 'block';
        hasError = true;
    }
    
    const weights = weightsInput.split(',').map(w => parseFloat(w.trim()));
    if (weights.some(isNaN)) {
        document.getElementById('weightsError').textContent = 'All weights must be numeric values';
        document.getElementById('weightsError').style.display = 'block';
        hasError = true;
    }
    
    if (!impactsInput.includes(',')) {
        document.getElementById('impactsError').textContent = 'Impacts must be separated by commas';
        document.getElementById('impactsError').style.display = 'block';
        hasError = true;
    }
    
    const impacts = impactsInput.split(',').map(i => i.trim());
    if (impacts.some(imp => imp !== '+' && imp !== '-')) {
        document.getElementById('impactsError').textContent = 'Impacts must be either + or -';
        document.getElementById('impactsError').style.display = 'block';
        hasError = true;
    }
    
    if (csvData && weights.length !== (csvData[0].length - 1)) {
        document.getElementById('weightsError').textContent = `Number of weights (${weights.length}) must equal number of criteria (${csvData[0].length - 1})`;
        document.getElementById('weightsError').style.display = 'block';
        hasError = true;
    }
    
    if (csvData && impacts.length !== (csvData[0].length - 1)) {
        document.getElementById('impactsError').textContent = `Number of impacts (${impacts.length}) must equal number of criteria (${csvData[0].length - 1})`;
        document.getElementById('impactsError').style.display = 'block';
        hasError = true;
    }
    
    if (shouldSendEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            document.getElementById('emailError').style.display = 'block';
            hasError = true;
        }
    }
    
    if (hasError) return;
    
    try {
        submitBtn.disabled = true;
        loading.style.display = 'block';
        resultsSection.style.display = 'none';
        
        const results = calculateTOPSIS(csvData, weights, impacts);
        
        const resultCSV = convertToCSV(csvHeaders, results);
        
        lastResults = results;
        lastResultCSV = resultCSV;
        
        displayResults(csvHeaders, results);
        
        const resultTable = createHTMLTable(csvHeaders, results);
        
        if (shouldSendEmail) {
            const templateParams = {
                to_email: emailInput,
                to_name: emailInput.split('@')[0],
                weights: weightsInput,
                impacts: impactsInput,
                result_csv: resultCSV,
                result_table: resultTable
            };
            
            await emailjs.send('service_5l8y2an', 'template_4ka9r5r', templateParams);
            
            loading.style.display = 'none';
            success.textContent = '✓ RESULTS CALCULATED & SENT TO YOUR EMAIL!';
            success.style.display = 'block';
        } else {
            loading.style.display = 'none';
            success.textContent = '✓ RESULTS CALCULATED SUCCESSFULLY!';
            success.style.display = 'block';
        }
        
        resultsSection.style.display = 'block';
        
        setTimeout(() => {
            success.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        loading.style.display = 'none';
        alert('Error: ' + error.message);
    } finally {
        submitBtn.disabled = false;
    }
});

function displayResults(headers, results) {
    let html = '<table class="results-table">';
    html += '<thead><tr>';
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += '<th>Topsis Score</th><th>Rank</th></tr></thead>';
    html += '<tbody>';
    
    results.forEach(row => {
        const rankClass = row.rank <= 3 ? `rank-${row.rank}` : '';
        html += `<tr class="${rankClass}">`;
        headers.forEach((_, idx) => {
            html += `<td>${row[`col${idx}`]}</td>`;
        });
        html += `<td>${row.topsisScore}</td>`;
        html += `<td style="font-weight: 900;">${row.rank}</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    resultsContainer.innerHTML = html;
}

downloadResultBtn.addEventListener('click', function() {
    if (!lastResultCSV) return;
    
    const blob = new Blob([lastResultCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'topsis_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
});

