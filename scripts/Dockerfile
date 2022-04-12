FROM python:3-alpine
WORKDIR /usr/src/app
COPY ./requirements.txt ./requirements.txt
COPY ./*.py ./
RUN pip install -r requirements.txt
