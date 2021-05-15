# Setup:
npm install

# Run on local:
npm run watch

## Run in production:
npm start

## About 
We are using httpOnly cookie based authentication using JWTs
We have a total of 4 collections:
User collection
Each user can either be vendor or just user, according to the current setup, the very first user that signs up will be vendor and all other will be just users.

Products collection
Vendor can add products, all users can access them

Orders Collection
Users can place order and place refund requests, upon completion of which amounts are reflected in the wallets of dealing parties

Wallets Collections
A simple collection that maps username to the amount that user holds, upon sign up, a vendor is assigned 5000 units of amount and a user 500.

### Lastly
Before running make sure to change the database url to appropriate url of mongodb cluster in the config.json file.#� �n�o�d�e�-�p�r�o�j�e�c�t�
�
�
