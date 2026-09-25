import string
file = "example.txt"
inte = int(input("Top X (Change x with number): "))
with open(file) as f:
    text = f.read()
words = text.split()
cleaned_words = []
for word in words:
    cleaned = word.lower().strip(string.punctuation)
    cleaned_words.append(cleaned)

print(cleaned_words)
counts = {}
for word in cleaned_words:
    if word not in counts:
        counts[word] = 0
    counts[word] += 1
sorted_words = sorted(counts.items(), key=lambda x: x[1], reverse=True)
top5 = sorted_words[:inte]
for word, count in top5:
    print(f"{word:10}: {count}")