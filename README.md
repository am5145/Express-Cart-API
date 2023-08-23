### Start API

```
npm start
```

# Routes - 
eg. API - http://localhost:3000/api/v1/products

//product and categories are define to handle products in billing system i.e how and what user can view products on billing machine to add in their cart, how  admin can  handle products etc.

### Products - to get, add, update, delete, 

```
GET      /api/v1/products -   Fetch all products information with their prices and other information.
GET      /api/v1/products/:id
POST     /api/v1/products
PUT      /api/v1/products/:id
DELETE   /api/v1/products/:id
GET products count: /api/v1/products/get/count
```

### Orders

```
GET      /api/v1/orders     - to see all the orders/ will see total bill also
GET      /api/v1/orders/:id
POST     /api/v1/orders
PUT      /api/v1/orders/:id -  can update status to confirm order from pending.
DELETE   /api/v1/orders/:id
GET orders count: /api/v1/orders/get/count
GET UserOrder: /api/v1/orders/get/userorders/:userid
```

### Users

```
GET      /api/v1/users
GET      /api/v1/users/:id
POST     /api/v1/users
PUT      /api/v1/users/:id
DELETE   /api/v1/users/:id
GET users count: /api/v1/users/get/count
```

#### Register new user/create an account

```
POST     /api/v1/users/register
```

#### Login user

To login the user and get the auth token you can use:

```
POST     /api/v1/users/login
```

### Carts -

```
GET      /api/v1/carts  -  can see cart item with individual tax, price with tax and total price(tax is applied to each product)
GET      /api/v1/carts/:id
POST     /api/v1/carts       - add a orderItem
PUT      /api/v1/carts/:id  -  add/remove product from cart
DELETE   /api/v1/carts/:id   - clear cart 

```
Same type of routes for categories

Used express-jwt  for authentication - will give jwt token, according to that we can perform action.(Admin,User)


### Sample data for order post -
```
{
    "orderItems" : [
    {
            "quantity": 3,
            "product" : "5fcfc406ae79b0a6a90d2585"
        },
        {
            "quantity": 2,
            "product" : "5fd293c7d3abe7295b1403c4"
        }
    ],
    "shippingAddress1" : "Flowers Street , 45",
    "shippingAddress2" : "1-B",
    "city": "Prague",
    "zip": "00000",
    "country": "Czech Republic",
    "phone": "+420702241333",
    "user": "5fd51bc7e39ba856244a3b44"
}
```
//please change product id and user id according to your data

### Sample data for post users -
```
{
        "name": "Keshav",
        "email": "keshav@gmail.com",
        "password":"2345778"
        "phone": "99999999",
        "isAdmin": true,
        "street": "",
        "apartment": "",
        "zip": "15008",
        "city": "Jaipur",
        "country": "INDIA",

    }
  ```
### Sample data for login user - 
```
    {
    "email": "keshav@gmail.com",
    "password": "123456"
}
```
//will give bearrer token for further use of api


### Sample data for post product -
```
{
        "name": "hii new",
        "description": "mobile",
        "richDescription": "mobile",
        "image": "image-url",
        "images": [],
        "brand": "apple",
        "price": 50000,
        "category": "64e1d6f6890dd616ce6a7083"
        "countInStock": 20,
        "rating": 0,
        "numReviews": 0,
        "isFeatured": false,
    
    }
```
// change category id


### Sample data for post  categories - 
```
{
        "name": "computer",
        "icon": "some_url",
        "color": "Red",
}
```

### Sample to post cart/orderItem - 
```
        {
            "quantity": 3,
            "product" : "5fcfc406ae79b0a6a90d2585"
        }
```

Env. variable used - 
API_URL - so that dont have to use same thing again and again.
secret - any key, use to make authorization token (jwt)
CONNECTION_STRING - to connect with mongodb 
Please take your own link to connect with database and you own secret for jwt token.
I know I shouldn't have to add env file for security and privacy purpose and should add it in gitignore , but i added it so that there will not be any confusion regarding working of project
