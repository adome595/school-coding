n = int(input("Enter the number of matches: "))
def checkt():
    if n % 3 == 0:
        nm = int(n / 3)
        print(f"You can make {nm} triangles.")
    elif n / 3 <= 2:
        print("You can't make any triangles.")
    elif n / 3 > 2:
        print("You can make 1 triangle with your matches.")

def checks():
    if n % 4 == 0:
        nmn = int(n / 4)
        print(f"You can make {nmn} squares.")
    else:
        print("you can't make any squares.")

def checkr():
    if n % 6 == 0:
        nmnm = int(n / 6)
        print(f"You can make {nmnm} rectangles.")
    else:
        print("you can't make any rectangles.")
checkt()
checks()
checkr()