FROM python:3

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN pip install -e .

CMD ["pserve", "development.ini"]
