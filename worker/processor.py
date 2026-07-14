import sys

operation = sys.argv[1]
text = sys.argv[2]

if operation == "uppercase":
    print(text.upper())

elif operation == "lowercase":
    print(text.lower())

elif operation == "reverse":
    print(text[::-1])

elif operation == "wordcount":
    print(len(text.split()))

else:
    print("Invalid Operation")
    