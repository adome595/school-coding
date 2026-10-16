import random 
m = random.randint(1,7)
c = []
if m == 1:
    c.append("")
elif m == 2:
    c.append("B")
elif m == 3:
    c.append("D")
elif m == 4:
    c.append("K")
elif m == 5:
    c.append("BD")
elif m == 6:
    c.append("DB")
elif m == 7:
    c.append("BDK")
if c == "":
    print("1")
elif c[0] == "B":
    print("2")
elif c[0] == "D":
    print("3")
elif c[0] == "K":
    print("4")
elif c[0] == "BD":
    print("5")
elif c[0] == "DB":
    print("6")
elif c[0] == "BDK":
    print("7")
