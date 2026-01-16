# Topsis-Haryiank-102303088

**TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)** implementation in Python for multi-criteria decision analysis.

## Description

TOPSIS is a multi-criteria decision analysis method that ranks alternatives based on their similarity to the ideal solution. This package provides a simple command-line tool to perform TOPSIS analysis on CSV data files.

## Installation

Install the package using pip:

```bash
pip install Topsis-Haryiank-102303088
```

## Usage

After installation, you can use the `topsis` command from anywhere in your terminal:

```bash
topsis <InputDataFile> <Weights> <Impacts> <OutputResultFileName>
```

### Parameters

- **InputDataFile**: Path to the input CSV file
- **Weights**: Comma-separated weights for each criterion (e.g., "1,1,1,2")
- **Impacts**: Comma-separated impacts for each criterion ('+' for maximize, '-' for minimize)
- **OutputResultFileName**: Path for the output CSV file

### Example

```bash
topsis data.csv "1,1,1,2" "+,+,-,+" result.csv
```

This command:
- Reads data from `data.csv`
- Applies weights: 1, 1, 1, 2 to the four criteria
- Maximizes criteria 1, 2, 4 and minimizes criterion 3
- Saves results to `result.csv`

## Input File Format

The input CSV file must follow this structure:

- **First column**: Names of alternatives/options
- **Remaining columns**: Numeric values for each criterion
- **Minimum**: 3 columns (1 name column + at least 2 criteria)

### Example Input (`data.csv`)

```csv
Model,Price,Storage,Camera,Battery
P1,250,64,12,4000
P2,200,32,8,3500
P3,300,128,16,4500
P4,275,64,12,4200
P5,225,32,16,3800
```

## Output Format

The output CSV includes all original columns plus:

- **Topsis Score**: Score between 0 and 1 (higher is better)
- **Rank**: Ranking based on TOPSIS score (1 is best)

### Example Output (`result.csv`)

```csv
Model,Price,Storage,Camera,Battery,Topsis Score,Rank
P3,300,128,16,4500,0.691,1
P4,275,64,12,4200,0.535,2
P1,250,64,12,4000,0.534,3
P5,225,32,16,3800,0.401,4
P2,200,32,8,3500,0.308,5
```

## Weights and Impacts

### Weights
Weights represent the relative importance of each criterion:
- Must be numeric values
- Comma-separated
- Number of weights must match number of criteria
- Example: `"1,2,1,3"` means criterion 2 is twice as important as criterion 1

### Impacts
Impacts indicate whether a criterion should be maximized or minimized:
- **'+'**: Higher values are better (e.g., performance, storage, battery)
- **'-'**: Lower values are better (e.g., price, weight, power consumption)
- Comma-separated
- Number of impacts must match number of criteria
- Example: `"+,+,-,+"` 

## How TOPSIS Works

1. **Normalize** the decision matrix using vector normalization
2. **Apply weights** to the normalized matrix
3. **Identify** ideal best and ideal worst solutions for each criterion
4. **Calculate** Euclidean distance of each alternative from ideal best and ideal worst
5. **Compute** TOPSIS score: `Score = Distance_to_worst / (Distance_to_best + Distance_to_worst)`
6. **Rank** alternatives based on TOPSIS scores (higher score = better rank)

## Error Handling

The package validates:
- ✓ Correct number of command-line arguments
- ✓ Input file existence
- ✓ Minimum 3 columns in input file
- ✓ All criteria columns contain numeric values only
- ✓ Number of weights matches number of criteria
- ✓ Number of impacts matches number of criteria
- ✓ Impacts are only '+' or '-'

## Requirements

- Python 3.6+
- pandas >= 1.0.0
- numpy >= 1.18.0

## License

MIT License - see LICENSE file for details

## Author

Haryiank Kumra

## Version

1.0.2

## Links

- PyPI: https://pypi.org/project/Topsis-Haryiank-102303088/
- GitHub: https://github.com/HaryiankKumra/TOPSIS

## Support

For issues and questions, please open an issue on GitHub.
