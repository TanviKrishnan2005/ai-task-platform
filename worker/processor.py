def process_text(text, operation):

    if operation == "uppercase":
        return text.upper()

    elif operation == "lowercase":
        return text.lower()

    elif operation == "reverse":
        return text[::-1]

    elif operation == "wordcount":
        return str(len(text.split()))

    else:
        return "Invalid Operation"


if __name__ == "__main__":
    import sys

    if len(sys.argv) < 3:
        print("Usage: python processor.py <operation> <text>")
        exit(1)

    operation = sys.argv[1]
    text = sys.argv[2]

    print(process_text(text, operation))