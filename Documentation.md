# Invest.io

API definition for the Invest.io app

## Table of Contents

* [Servers](#servers)
* [Paths](#paths)
  - [`POST` /auth/register](#op-post-auth-register) 
  - [`POST` /auth/login](#op-post-auth-login) 
  - [`GET` /user/search](#op-get-user-search) 
  - [`POST` /user/follow](#op-post-user-follow) 
  - [`GET` /user/portfolio](#op-get-user-portfolio) 
  - [`GET` /stocks/gainers](#op-get-stocks-gainers) 
  - [`GET` /stocks/search](#op-get-stocks-search) 
  - [`GET` /stocks/price](#op-get-stocks-price) 
* [Schemas](#schemas)
  - [User](#schema-user)
  - [Portfolio](#schema-portfolio)
  - [Stock](#schema-stock)
  - [Price](#schema-price)


<a id="servers" />
## Servers

<table>
  <thead>
    <tr>
      <th>URL</th>
      <th>Description</th>
    <tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="http://localhost:3000" target="_blank">http://localhost:3000</a></td>
      <td></td>
    </tr>
  </tbody>
</table>

<a name="security"></a>
## Security

<table class="table">
  <thead class="table__head">
    <tr class="table__head__row">
      <th class="table__head__cell">Type</th>
      <th class="table__head__cell">In</th>
      <th class="table__head__cell">Name</th>
      <th class="table__head__cell">Scheme</th>
      <th class="table__head__cell">Format</th>
      <th class="table__head__cell">Description</th>
    </tr>
  </thead>
  <tbody class="table__body">
    <tr class="table__body__row">
      <td class="table__body__cell">http</td>
      <td class="table__body__cell"></td>
      <td class="table__body__cell"></td>
      <td class="table__body__cell">bearer</td>
      <td class="table__body__cell">JWT</td>
      <td class="table__body__cell"></td>
    </tr>

  </tbody>
</table>

## Paths


### `POST` /auth/register
<a id="op-post-auth-register" />

Create and authenticate a new user






#### Request body
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "username": "string",
  "phone": "string",
  "email": "string",
  "password": "string",
  "dob": "2019-08-24T14:15:22Z",
  "name": "string"
}
```




#### Responses


##### ▶ 200 - OK

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success <strong>(required)</strong></td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true,
  "user": {
    "name": "string",
    "email": "user@example.com",
    "dob": "2019-08-24T14:15:22Z",
    "username": "string",
    "phone": "string"
  }
}
```

</div>

### `POST` /auth/login
<a id="op-post-auth-login" />

Login and authneticate a user






#### Request body
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>username|email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>password <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "username|email": "string",
  "password": "string"
}
```




#### Responses


##### ▶ 200 - User authenticated

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success <strong>(required)</strong></td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true,
  "user": {
    "name": "string",
    "email": "user@example.com",
    "dob": "2019-08-24T14:15:22Z",
    "username": "string",
    "phone": "string"
  }
}
```

</div>

### `GET` /user/search
<a id="op-get-user-search" />

Search for users by username




#### Query parameters

##### &#9655; query

Username of user being searched


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>In</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>query  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>query</td>
        <td>Username of user being searched</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - OK

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success</td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>users</td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>users.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>users.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>users.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>users.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>users.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true,
  "users": [
    {
      "name": "string",
      "email": "user@example.com",
      "dob": "2019-08-24T14:15:22Z",
      "username": "string",
      "phone": "string"
    }
  ]
}
```

</div>

### `POST` /user/follow
<a id="op-post-user-follow" />

Follow another user by their User Object ID






#### Request body
###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>uid <strong>(required)</strong></td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>uid.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>uid.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>uid.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>uid.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>uid.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "uid": {
    "name": "string",
    "email": "user@example.com",
    "dob": "2019-08-24T14:15:22Z",
    "username": "string",
    "phone": "string"
  }
}
```




#### Responses


##### ▶ 200 - OK

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success</td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true
}
```

</div>

### `GET` /user/portfolio
<a id="op-get-user-portfolio" />

Follow another user by their User Object ID








#### Responses


##### ▶ 200 - OK

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success</td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user's portfolio</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.assets <strong>(required)</strong></td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.assets.quantity</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.assets.stock</td>
        <td>
          object
        </td>
        <td>Schema respresenting a stock</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.assets.stock.symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.assets.stock.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.assets.stock.type <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.balance <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user <strong>(required)</strong></td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true,
  "portfolio": {
    "assets": [
      {
        "quantity": 0,
        "stock": {
          "symbol": "string",
          "name": "string",
          "type": "string"
        }
      }
    ],
    "balance": 0,
    "user": {
      "name": "string",
      "email": "user@example.com",
      "dob": "2019-08-24T14:15:22Z",
      "username": "string",
      "phone": "string"
    }
  }
}
```

</div>

### `GET` /stocks/gainers
<a id="op-get-stocks-gainers" />

Fetch the top gaining stocks




#### Query parameters

##### &#9655; count

Number of stocks to return


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>In</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>count </td>
        <td>
          number
        </td>
        <td>query</td>
        <td>Number of stocks to return</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - OK

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success</td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks</td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.type <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true,
  "stocks": [
    {
      "symbol": "string",
      "name": "string",
      "type": "string"
    }
  ]
}
```

</div>

### `GET` /stocks/search
<a id="op-get-stocks-search" />

Search for stocks by name or symbol




#### Query parameters

##### &#9655; query

Name or symbol of searched stock


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>In</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>query </td>
        <td>
          string
        </td>
        <td>query</td>
        <td>Name or symbol of searched stock</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - OK

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success</td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks</td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.type <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true,
  "stocks": [
    {
      "symbol": "string",
      "name": "string",
      "type": "string"
    }
  ]
}
```

</div>

### `GET` /stocks/price
<a id="op-get-stocks-price" />

Search for a stock's historical prices by symbol




#### Query parameters

##### &#9655; query

Symbol of searched stock


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>In</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>query </td>
        <td>
          string
        </td>
        <td>query</td>
        <td>Symbol of searched stock</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






#### Responses


##### ▶ 200 - OK

###### Headers
_No headers specified_

###### application/json



<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>success</td>
        <td>
          boolean
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks</td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.close <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.high <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.low <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.open <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.volume</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.date <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.updated</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.changePercent</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true,
  "stocks": [
    {
      "close": 0,
      "high": 0,
      "low": 0,
      "open": 0,
      "symbol": "string",
      "volume": 0,
      "date": "2019-08-24T14:15:22Z",
      "updated": "2019-08-24T14:15:22Z",
      "changePercent": 0
    }
  ]
}
```

</div>

## Schemas

<a id="schema-user" />

#### User

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>

##### Example _(generated)_

```json
{
  "name": "string",
  "email": "user@example.com",
  "dob": "2019-08-24T14:15:22Z",
  "username": "string",
  "phone": "string"
}
```
<a id="schema-portfolio" />

#### Portfolio

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>assets <strong>(required)</strong></td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>assets.quantity</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>assets.stock</td>
        <td>
          object
        </td>
        <td>Schema respresenting a stock</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>assets.stock.symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>assets.stock.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>assets.stock.type <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>balance <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user <strong>(required)</strong></td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>user.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>

##### Example _(generated)_

```json
{
  "assets": [
    {
      "quantity": 0,
      "stock": {
        "symbol": "string",
        "name": "string",
        "type": "string"
      }
    }
  ],
  "balance": 0,
  "user": {
    "name": "string",
    "email": "user@example.com",
    "dob": "2019-08-24T14:15:22Z",
    "username": "string",
    "phone": "string"
  }
}
```
<a id="schema-stock" />

#### Stock

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>type <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>

##### Example _(generated)_

```json
{
  "symbol": "string",
  "name": "string",
  "type": "string"
}
```
<a id="schema-price" />

#### Price

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Description</th>
      <th>Accepted values</th>
    </tr>
  </thead>
  <tbody>
      <tr>
        <td>close <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>high <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>low <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>open <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>volume</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>date <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>updated</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>changePercent</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>

##### Example _(generated)_

```json
{
  "close": 0,
  "high": 0,
  "low": 0,
  "open": 0,
  "symbol": "string",
  "volume": 0,
  "date": "2019-08-24T14:15:22Z",
  "updated": "2019-08-24T14:15:22Z",
  "changePercent": 0
}
```
