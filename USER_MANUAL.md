# Quick Start Guide

## Installation

```bash
pip install Topsis-Haryiank-102303088
```

## Basic Usage

```bash
topsis <InputDataFile> <Weights> <Impacts> <OutputResultFileName>
```

## Example

Using the included sample data:

```bash
topsis data.csv "1,1,1,1" "-,+,+,+" result.csv
```

### What this does:
- Reads phone data from `data.csv`
- Applies equal weights (1,1,1,1) to all criteria
- Minimizes Price (-) and maximizes Storage, Camera, Battery (+)
- Saves ranked results to `result.csv`

## Input Format

Your CSV file should look like:

```csv
Model,Price,Storage,Camera,Battery
P1,250,64,12,4000
P2,200,32,8,3500
P3,300,128,16,4500
```

- First column: Option names
- Other columns: Numeric criteria values

## Understanding Results

Output includes two new columns:

- **Topsis Score**: 0 to 1 (higher = better)
- **Rank**: 1 is best, 2 is second best, etc.

## Common Examples

### Example 1: Laptop Selection
```bash
topsis laptops.csv "2,1,1,3" "-,+,+,+" results.csv
```
Weights: Price(2), RAM(1), Storage(1), Battery(3)
Impacts: Lower price better, higher RAM/Storage/Battery better

### Example 2: Investment Analysis
```bash
topsis stocks.csv "1,1,2" "+,-,+" analysis.csv
```
Weights: Return(1), Risk(1), Dividend(2)
Impacts: Higher return better, lower risk better, higher dividend better

## Validation

The tool validates:
- File exists ✓
- At least 3 columns ✓
- Numeric values only ✓
- Matching weights/impacts count ✓
- Impacts are + or - only ✓

## Need Help?

- Check README.md for detailed documentation
- See BUILD_UPLOAD_GUIDE.md for package development
- Report issues on GitHub

## Uninstall

```bash
pip uninstall Topsis-Haryiank-102303088
```
