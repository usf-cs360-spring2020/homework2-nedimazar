import random
#Open the original data file
file = open("schoolTable.csv", "r")

a = file.read()
file.close()

#Split by lines
a = a.split("\n")

#Lines to keep will go in here
keep = []

#Extract the column names
names = a.pop(0)

#Pick 100 items randomly
for i in range(100):
	num = random.randint(0, (len(a) - 1))
	keep.append(a.pop(num))

#Open file for reduced data
file = open("reducedData.csv", "w")

#Write the column names
file.write(names)

#Write reduced data to file
for line in keep:
	file.write(line)

file.close()















