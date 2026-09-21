n = int(input("įvesk dešimtainį skaičiu: "))
liekanos = []

while n > 0:
    liekanos.append(str(n % 2))
    n //= 2
if not liekanos:
    liekanos["0"]

liekanos.reverse()
print("".join(liekanos))