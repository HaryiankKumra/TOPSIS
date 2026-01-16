import sys
import pandas as pd
import numpy as np

def main():
    if len(sys.argv) != 5:
        print("Usage: python topsis.py <InputDataFile> <Weights> <Impacts> <OutputResultFileName>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    weights_str = sys.argv[2]
    impacts_str = sys.argv[3]
    output_file = sys.argv[4]
    
    try:
        data = pd.read_csv(input_file)
    except FileNotFoundError:
        print("File not found")
        sys.exit(1)
    
    if data.shape[1] < 3:
        print("Input file must have at least three columns")
        sys.exit(1)
    
    criteria_data = data.iloc[:, 1:]
    
    for col in criteria_data.columns:
        if not pd.api.types.is_numeric_dtype(criteria_data[col]):
            print("All criteria columns must contain only numeric values")
            sys.exit(1)
    
    weights = [float(w.strip()) for w in weights_str.split(',')]
    impacts = [i.strip() for i in impacts_str.split(',')]
    
    num_criteria = criteria_data.shape[1]
    
    if len(weights) != num_criteria:
        print("Number of weights must equal number of criteria")
        sys.exit(1)
    
    if len(impacts) != num_criteria:
        print("Number of impacts must equal number of criteria")
        sys.exit(1)
    
    for impact in impacts:
        if impact not in ['+', '-']:
            print("Impacts must be either '+' or '-'")
            sys.exit(1)
    
    normalized = criteria_data / np.sqrt((criteria_data ** 2).sum(axis=0))
    
    weighted = normalized * weights
    
    ideal_best = []
    ideal_worst = []
    
    for i, impact in enumerate(impacts):
        if impact == '+':
            ideal_best.append(weighted.iloc[:, i].max())
            ideal_worst.append(weighted.iloc[:, i].min())
        else:
            ideal_best.append(weighted.iloc[:, i].min())
            ideal_worst.append(weighted.iloc[:, i].max())
    
    distance_best = np.sqrt(((weighted - ideal_best) ** 2).sum(axis=1))
    distance_worst = np.sqrt(((weighted - ideal_worst) ** 2).sum(axis=1))
    
    topsis_score = distance_worst / (distance_best + distance_worst)
    
    data['Topsis Score'] = topsis_score
    data['Rank'] = topsis_score.rank(ascending=False).astype(int)
    
    data.to_csv(output_file, index=False)
    print(f"Results saved to {output_file}")

if __name__ == "__main__":
    main()
