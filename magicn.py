import random

KORTU_VERTES = {
    "Berniukas": 1,
    "Dama": 2,
    "Karalius": 4
}

def arturo_veiksmas(m):
    scena = []
    likutis = m
    
    if likutis >= 4:
        scena.append("Karalius")
        likutis -= 4
    if likutis >= 2:
        scena.append("Dama")
        likutis -= 2
    if likutis >= 1:
        scena.append("Berniukas")
        likutis -= 1
        
    return scena

def benjamino_spejimas(scena):
    suma = 0
    for korta in scena:
        suma += KORTU_VERTES[korta]
    return suma

slaptas_skaicius = random.randint(1, 7)
print(f"Ziurovas slapta pasake Arturui skaiciu: {slaptas_skaicius}")

kortos_ant_scenos = arturo_veiksmas(slaptas_skaicius)
print(f"Arturas ant scenos padeda sias kortas: {kortos_ant_scenos}")

print("... Benjaminas grizta i scena ...")

atspetas_skaicius = benjamino_spejimas(kortos_ant_scenos)
print(f"Benjaminas poziuri i kortas ir sako: 'Skaicius yra {atspetas_skaicius}!'")
