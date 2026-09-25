import argparse
import csv

parser = argparse.ArgumentParser()
parser.add_argument("--month", help="Filter to a specific month")
args = parser.parse_args()
totals = {}

with open("expenses.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        if args.month and not row["date"].startswith(args.month):
            continue
        category = row["category"]
        amount = float(row["amount"])
        if category not in totals:
            totals[category] = 0
        totals[category] += amount
biggest = max(totals, key=totals.get)
print("                 SUM         ""\n" 
        "##########################################")
for category, amount in totals.items():
    print(f"{category:13} ---- ${amount:.2f}")
print(f"Biggest money usage ---- {biggest} ${totals[biggest]:.2f}")