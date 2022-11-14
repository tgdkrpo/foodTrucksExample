## Food trucks home assignment
tested on: Ubuntu 20.04.5 LTS
Please use Node version v18.9.0

First, get google map API key:

https://developers.google.com/maps/documentation/embed/get-api-key#:~:text=Go%20to%20the%20Google%20Maps%20Platform%20%3E%20Credentials%20page.&text=On%20the%20Credentials%20page%2C%20click,Click%20Close.

place api key at .env as:
```
GOOGLE_MAP_API_KEY=API_KEY_VALUE
```

To install dependenices run
`npm install`

To run tests use
`npx playwright test`
