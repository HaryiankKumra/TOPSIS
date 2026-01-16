emailjs.init('HjQ38dlPPv6GUKRpV');

const form = document.getElementById('topsisForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const success = document.getElementById('success');

let csvData = null;
let csvHeaders = null;

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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }
    
    if (hasError) return;
    
    try {
        submitBtn.disabled = true;
        loading.style.display = 'block';
        
        const results = calculateTOPSIS(csvData, weights, impacts);
        
        const resultCSV = convertToCSV(csvHeaders, results);
        
        const resultTable = createHTMLTable(csvHeaders, results);
        
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
        success.style.display = 'block';
        form.reset();
        csvData = null;
        
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
