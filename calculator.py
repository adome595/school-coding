import tkinter as tk

root = tk.Tk()
root.title("Python Calculator")
root.geometry("350x500")
display = tk.Entry(root, width=20, font=("Arial", 18), justify="right", state="disabled")
display.grid(row=0, column=0, columnspan=4, padx=5, pady=5, sticky="nsew")



buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
]

def press(value):
    display.config(state="normal")
    display.insert(tk.END, value)
    display.config(state="disabled")
def press_c():
    display.config(state="normal")
    display.delete(0, tk.END)
    display.config(state="disabled")
def calculate():
    display.config(state="normal")
    expression = display.get()
    result = eval(expression)
    display.delete(0, tk.END)
    display.insert(tk.END, str(result))
    display.config(state="disabled")

row = 1
col = 0
for label in buttons:
    if label == "=":
        cmd = calculate
    else:
        cmd = lambda l=label: press(l)
    
    btn = tk.Button(root, text=label, width=5, height=2, command=cmd)
    btn.grid(row=row, column=col, padx=2, pady=2, sticky="nsew")
    col += 1
    if col > 3:
        col = 0
        row += 1
clear_btn = tk.Button(root, text="C", width=5, height=2, command=press_c)
clear_btn.grid(row=row + 1, column=0, columnspan=4, padx=2, pady=2, sticky="nsew")
for i in range(4):
    root.grid_columnconfigure(i, weight=1)
for i in range(row + 1):
    root.grid_rowconfigure(i, weight=1)
if label == "=":
    calculate()

root.mainloop()