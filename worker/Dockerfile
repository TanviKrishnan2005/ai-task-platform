# Build stage
FROM python:3.11-alpine AS builder

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

#  Production Stage 
FROM python:3.11-alpine


WORKDIR /app

COPY --from=builder /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=builder /usr/local/bin /usr/local/bin
COPY --from=builder /app .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

CMD ["python", "worker.py"]