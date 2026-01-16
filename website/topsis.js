function calculateTOPSIS(data, weights, impacts) {
    const numRows = data.length;
    const numCriteria = data[0].length - 1;
    
    const matrix = data.map(row => row.slice(1).map(Number));
    
    const normalizedMatrix = [];
    for (let j = 0; j < numCriteria; j++) {
        let sumSquares = 0;
        for (let i = 0; i < numRows; i++) {
            sumSquares += matrix[i][j] * matrix[i][j];
        }
        const denominator = Math.sqrt(sumSquares);
        
        for (let i = 0; i < numRows; i++) {
            if (!normalizedMatrix[i]) normalizedMatrix[i] = [];
            normalizedMatrix[i][j] = matrix[i][j] / denominator;
        }
    }
    
    const weightedMatrix = [];
    for (let i = 0; i < numRows; i++) {
        weightedMatrix[i] = [];
        for (let j = 0; j < numCriteria; j++) {
            weightedMatrix[i][j] = normalizedMatrix[i][j] * weights[j];
        }
    }
    
    const idealBest = [];
    const idealWorst = [];
    
    for (let j = 0; j < numCriteria; j++) {
        const column = weightedMatrix.map(row => row[j]);
        if (impacts[j] === '+') {
            idealBest[j] = Math.max(...column);
            idealWorst[j] = Math.min(...column);
        } else {
            idealBest[j] = Math.min(...column);
            idealWorst[j] = Math.max(...column);
        }
    }
    
    const distanceBest = [];
    const distanceWorst = [];
    
    for (let i = 0; i < numRows; i++) {
        let sumBest = 0;
        let sumWorst = 0;
        
        for (let j = 0; j < numCriteria; j++) {
            sumBest += Math.pow(weightedMatrix[i][j] - idealBest[j], 2);
            sumWorst += Math.pow(weightedMatrix[i][j] - idealWorst[j], 2);
        }
        
        distanceBest[i] = Math.sqrt(sumBest);
        distanceWorst[i] = Math.sqrt(sumWorst);
    }
    
    const topsisScores = [];
    for (let i = 0; i < numRows; i++) {
        topsisScores[i] = distanceWorst[i] / (distanceBest[i] + distanceWorst[i]);
    }
    
    const rankedIndices = topsisScores
        .map((score, index) => ({ score, index }))
        .sort((a, b) => b.score - a.score)
        .map((item, rank) => ({ ...item, rank: rank + 1 }));
    
    const ranks = new Array(numRows);
    rankedIndices.forEach(item => {
        ranks[item.index] = item.rank;
    });
    
    const results = [];
    for (let i = 0; i < numRows; i++) {
        results.push({
            ...Object.fromEntries(data[i].map((val, idx) => [`col${idx}`, val])),
            topsisScore: topsisScores[i].toFixed(6),
            rank: ranks[i]
        });
    }
    
    return results;
}

function parseCSV(text) {
    const lines = text.trim().split('\n');
    return lines.map(line => {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        return values;
    });
}

function convertToCSV(headers, results) {
    const csvLines = [];
    
    csvLines.push([...headers, 'Topsis Score', 'Rank'].join(','));
    
    results.forEach(row => {
        const values = headers.map((_, idx) => row[`col${idx}`]);
        values.push(row.topsisScore);
        values.push(row.rank);
        csvLines.push(values.join(','));
    });
    
    return csvLines.join('\n');
}

function validateCSVData(data) {
    if (data.length < 2) {
        throw new Error('CSV must have at least 2 rows (header + data)');
    }
    
    if (data[0].length < 3) {
        throw new Error('CSV must have at least 3 columns (1 name + 2 criteria)');
    }
    
    for (let i = 1; i < data.length; i++) {
        for (let j = 1; j < data[i].length; j++) {
            const value = data[i][j];
            if (isNaN(value) || value === '') {
                throw new Error(`Non-numeric value found at row ${i + 1}, column ${j + 1}`);
            }
        }
    }
    
    return true;
}

function createHTMLTable(headers, results) {
    let html = '<table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial;">';
    html += '<tr style="background-color: #000; color: #fff; font-weight: bold;">';
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += '<th>Topsis Score</th><th>Rank</th></tr>';
    
    results.forEach(row => {
        html += '<tr>';
        headers.forEach((_, idx) => {
            html += `<td>${row[`col${idx}`]}</td>`;
        });
        html += `<td>${row.topsisScore}</td>`;
        html += `<td style="font-weight: bold;">${row.rank}</td>`;
        html += '</tr>';
    });
    
    html += '</table>';
    return html;
}
