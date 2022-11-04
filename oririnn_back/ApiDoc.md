## Welcome to the API doc of Oririnn ! 

Here, we will see the differents CRUD and how to use them.

## CRUD Auth
```js
#Register

Request : 
"http://oririnn.com/auth/register"

Method POST :
Body {
* firstname
* lastname
* email
* password
* phone
* age
}

Response :
-> Object with User info
```
 
```js
#Login 
REQUEST : 
"http:/oririnn.com/auth/login"

Method POST : 
Body {
*Email
*Password
}

```

## CRUD Booking : 
```js
    You can get, post, and delete Bookings : 

*METHOD Get : 
Request : "http://oririnn.com/booking/id"

    
*METHOD Post : 
Request : "http://oririnn.com/booking/"
Body {
*userid
*offer_id
*Description
*Dates_start
*Dates_end
}
    
*Method Delete 
Request : "http://oririnn.com/booking/id"

```


## CRUD fav :
```js
*METHOD Post 
Request : "http://oririnn.com/favorites?user_id=10&offer_id=13"


*METHOD Delete : "http://oririnn.com/favorites/?id=11"


```

## CRUD offer :

```js
   

*Offers : METHOD Get : 
Request : "http://oririnn.com/offer"

*Offer : METHOD Get : 
Request : "http://oririnn.com/offer/1?user_id=1"

*Owner : METHOD Get : 
Request : "http://oririnn.com/offer/owner?user_id=1"

*Offer : METHOD Post : 
Body{
*user_id
*title
*Description
*Dates_start
*Dates_end
*image
*capacity
*price
*address
*postcode
*city
*creation_date
}
Request : "http://oririnn.com/offer/"

```

## CRUD search :

```js
METHOD : get

Request : "http://oririnn.com/search/?city=example"

```
## CRUD user :
```js

METHOD : Get
Request : "http://oririnn.com/user/"
Must be admin.

METHOD : Post
Request : "http://oririnn.com/user/"
Body{
*firstname
*lastname
*age
*email
*password
*admin
}

METHOD : Delete
Request : "http://oririnn.com/user/id"

METHOD : Put
Request : "http://oririnn.com/user/13"
Body{
submit in firstname/lastname/age etc what you want to modify    
}
```

## CRUD validate :

```js

METHOD : Get
Request : "http://oririnn.com/validate"

METHOD : Put
Request : "http://oririnn.com/validate/id"

```

## CRUD image :

```js

METHOD : Post
Request : "http://oririnn.com/image/id"

```
    