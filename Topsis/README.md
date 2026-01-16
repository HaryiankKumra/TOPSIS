# TOPSIS Implementation

This program implements the TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) method for multi-criteria decision analysis.

## How to Run

```bash
python topsis.py <InputDataFile> <Weights> <Impacts> <OutputResultFileName>
```

## Example

```bash
python topsis.py data.csv "1,1,1,2" "+,+,-,+" result.csv
```

## Input File Format

The input file must be a CSV file with the following structure:

- **First column**: Contains the names of the options/alternatives
- **Remaining columns**: Contain numeric values representing different criteria
- **Minimum columns required**: 3 (1 for option names + at least 2 criteria)

Example:

```csv
Model,Price,Storage,Camera,Looks
M1,250,16,12,5
M2,200,16,8,3
M3,300,32,16,4
M4,275,32,8,4
M5,225,16,16,2
```

## Weights

Weights represent the importance of each criterion. They should be:

- Comma-separated numeric values
- Equal in count to the number of criteria columns
- Example: `"1,1,1,2"` means the fourth criterion is twice as important as the others

## Impacts

Impacts indicate whether a criterion should be maximized or minimized:

- **+** (plus): Higher values are better (e.g., storage, camera quality)
- **-** (minus): Lower values are better (e.g., price)
- Comma-separated values
- Equal in count to the number of criteria columns
- Example: `"+,+,-,+"` means maximize criteria 1, 2, and 4, but minimize criterion 3

## Output

The program generates a CSV file with:

- All original columns from the input file
- **Topsis Score**: A value between 0 and 1 (higher is better)
- **Rank**: Ranking based on TOPSIS score (1 is the best)

Example output:

```csv
Model,Price,Storage,Camera,Looks,Topsis Score,Rank
M1,250,16,12,5,0.534,3
M2,200,16,8,3,0.308,5
M3,300,32,16,4,0.691,1
M4,275,32,8,4,0.535,2
M5,225,16,16,2,0.401,4
```

## Error Handling

The program validates:

- Correct number of command-line arguments
- Input file exists
- Minimum of 3 columns in input file
- All criteria columns contain only numeric values
- Number of weights matches number of criteria
- Number of impacts matches number of criteria
- Impacts are only '+' or '-'

## Requirements

- Python 3.x
- pandas
- numpy

Install dependencies:

```bash
pip install pandas numpy
```
