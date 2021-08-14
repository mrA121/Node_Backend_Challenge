# README #

## 1. Pre Requisites 
1. [Node JS](https://nodejs.org/en/download/)
2. [Docker](https://docs.docker.com/docker-for-mac/install/)
3. [Docker Compose](https://docs.docker.com/compose/install/)

## 2. Installation
1. Clone the repository using bitbucket url

````shell
git clone git@bitbucket.org:mrA121/node_backend_challenge.git
````

2. cd to main_api and install dependencies

````shell
cd node_backend_challenge/main_api
npm install
````

3. Make sure .env file is present in the folder else create .env file and below and save 

````shell
MONGO_DB_URI=mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true
````

------
4. For Docker Based deployment run below 

````shell
cd node_backend_challenge
docker-compose up
````

------
5. For Node based deployment run below

Node Version `v14.15.5`
```shell
nvm use v14.15.5
```
````shell
cd main_api
npm run start
````

## 3. Tests
To run test below is the command. It runs all the E2E and Unit test cases based on jest

```shell
cd main_api
npm run test
```

## 4. API Contracts
Pagination is added to the api since number of records in response can be many. But if we don't pass anything in query parameters(pagination parameters) API response can have maximum of 10,000 records.

Curl
````
curl --location --request POST 'http://157.230.176.60/api/V1/postApiDemo?page=1&perPage=5' \
--header 'Content-Type: application/json' \
--data-raw '{
    "startDate": "2016-01-26",
    "endDate": "2018-02-02",
    "minCount": 2700,
    "maxCount": 3000
}'
````
Request Payload

Request Payload contains fields like startDate, endDate, minCount, maxCount. If the values are not passed or passed as null while request validation it automatically sets to default value.

Default Request Payload
````json
{
  "startDate": "1970-01-01T00:00:00.000Z",
  "endDate": "4707-11-29T00:00:00.000Z",
  "minCount": 0,
  "maxCount": 9007199254740991
}
````

Response
#### Status - 200
````json
{
    "code": 0,
    "msg": "Success",
    "records": [
        {
            "metadata": [
                {
                    "totalRecords": 63,
                    "pageNumber": 1,
                    "perPage": 5
                }
            ],
            "data": [
                {
                    "_id": "5ee21588e07f053f990cec7d",
                    "totalCount": 2892,
                    "key": "ibfRLaFT",
                    "createdAt": "2016-12-25T16:43:27.909Z"
                },
                {
                    "_id": "5ee21587e07f053f990cebb5",
                    "totalCount": 2772,
                    "key": "pxClAvll",
                    "createdAt": "2016-12-19T10:00:40.050Z"
                },
                {
                    "_id": "5ee21588e07f053f990cee1d",
                    "totalCount": 2906,
                    "key": "XCiSazeS",
                    "createdAt": "2016-12-13T18:58:33.864Z"
                },
                {
                    "_id": "5ee21587e07f053f990ceb20",
                    "totalCount": 2803,
                    "key": "kzSqsBrJ",
                    "createdAt": "2016-12-02T15:07:30.465Z"
                },
                {
                    "_id": "5ee21588e07f053f990ced69",
                    "totalCount": 2713,
                    "key": "KYKAKxDr",
                    "createdAt": "2016-11-27T00:30:34.725Z"
                }
            ]
        }
    ]
}

````

#### Status - 400

````json
{
    "code": 400,
    "msg": "Invalid request data. Please review request and try again."
}
````
## 5. Sequence Diagram
![Screenshot](Post API Demo.png)
