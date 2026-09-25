import argparse
import csv

ine = input("Bigger or smaller .csv file(B/S): ").lower()
file1 = "expenses.csv"
file2 = "expensese.csv"
file = " "
parser = argparse.ArgumentParser()
parser.add_argument("--month", help="Filter to a specific month")
args = parser.parse_args()
totals = {}
if ine == "b":
    file = file1
elif ine == "s":
    file = file2
else:
    print("Incorrect input")
with open(file) as f:
    reader = csv.DictReader(f)
    for row in reader:
        if args.month and not row["date"].startswith(args.month):
            continue
        category = row["category"]
        date = row["date"]
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
inp = input("full report? Y/n").lower()
if inp == "y":
    print("Here is the full report:")
    with open(file) as f:
        reader = csv.DictReader(f)
        for row in reader:
            category = row["category"]
            date = row["date"]
            amount = float(row["amount"])
            print(f"Date: {date}" " \n "
            f"Category: {category}" " \n "
            f"Amount: ${amount}" "\n " 
            "----------------" )
else:
    print("Goodbye!")