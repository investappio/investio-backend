FROM python:3-slim
WORKDIR /usr/src/app
COPY ./requirements.txt ./requirements.txt
COPY ./*.py ./
RUN pip install -r requirements.txt
