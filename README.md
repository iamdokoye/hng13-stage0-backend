
# HNG13 Backend Stage 0 – Dynamic Profile API
## Overview

This project is my submission for HNG13 Backend Stage 0. The goal was to build a RESTful API endpoint that returns my profile information along with a dynamic cat fact fetched from a third-party API.

The endpoint is publicly hosted and returns real-time data on every request.

## Features

- GET /me endpoint

- Returns profile information (name, email, stack)

- Fetches a random cat fact dynamically from an external API

- Provides current timestamp in UTC (ISO 8601 format)

- Structured JSON response compliant with task requirements

- Deployed on AWS EC2 using Node.js, Express, and NGINX

## API Endpoint (Public)
[Url](http://13.60.214.92/me)

## 📜 Response Format
``
{
  "status": "success",
  "user": {
    "email": "okoyedann@gmail.com",
    "name": "Daniel Okoye",
    "stack": "Nodejs/Express"
  },
  "timestamp": "2025-10-18T17:24:56.789Z",
  "fact": "Random cat fact fetched from external API"
}
``

## Technologies Used
Component	Technology - Backend	Node.js + Express <br>
Hosting -	AWS EC2 (Ubuntu) <br>
Web Server - NGINX (Reverse Proxy) <br>
Process Mgmt- PM2 <br>
API Source - https://catfact.ninja <br>

## Deployment Summary

The app was hosted on AWS EC2
NGINX was configured as a reverse proxy to forward traffic from port 80 to Node.js

API is publicly accessible on /me as required by the task
