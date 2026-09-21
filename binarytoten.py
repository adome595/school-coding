skaici = input("Ivesk dvejetaini skaiciu: ")
skaiciai = list(skaici)
sk = len(skaiciai)
suma = 0
i = 0
while sk > 0:
    sk -= 1                          # power goes down each step
    suma += int(skaiciai[i]) * 2 ** sk
    i += 1

print(suma)