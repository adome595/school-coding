skaici = input("Įvesk dvejetainį skaičių: ")
skaiciai = list(skaici)
sk = len(skaiciai)
suma = 0
i = 0
while sk > 0:
    sk -= 1
    suma += int(skaiciai[i]) * 2 ** sk
    i += 1

print(suma)