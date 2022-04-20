# Invest.io

API definition for the Invest.io app

## Table of Contents

* [Servers](#servers)
* [Paths](#paths)
  - [`POST` /auth/register](#op-post-auth-register) 
  - [`POST` /auth/login](#op-post-auth-login) 
  - [`GET` /user/profile](#op-get-user-profile) 
  - [`GET` /user/{user}/](#op-get-user-user) 
  - [`GET` /user/search](#op-get-user-search) 
  - [`POST` /user/{user}/follow](#op-post-user-user-follow) 
  - [`GET` /user/{user}/following](#op-get-user-user-following) 
  - [`GET` /user/{user}/portfolio](#op-get-user-user-portfolio) 
  - [`GET` /user/portfolio](#op-get-user-portfolio) 
  - [`GET` /user/portfolio/historical/{range}](#op-get-user-portfolio-historical-range) 
  - [`GET` /user/leaderboard](#op-get-user-leaderboard) 
  - [`GET` /stocks/gainers](#op-get-stocks-gainers) 
  - [`GET` /stocks/search](#op-get-stocks-search) 
  - [`GET` /stocks/{symbol}/quote](#op-get-stocks-symbol-quote) 
  - [`GET` /stocks/{symbol}/price/historical/{range}](#op-get-stocks-symbol-price-historical-range) 
  - [`POST` /stocks/{symbol}/buy](#op-post-stocks-symbol-buy) 
  - [`POST` /stocks/{symbol}/sell](#op-post-stocks-symbol-sell) 
* [Schemas](#schemas)
  - [User](#schema-user)
  - [Portfolio](#schema-portfolio)
  - [Portfolio History](#schema-portfolio-history)
  - [Asset](#schema-asset)
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

> Create a new user and authenticate them

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

> Authenticate a user by email or username

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
        <td>body</td>
        <td>
          oneOf
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
        <tr>
          <td>body.0 <strong>(required)</strong></td>
          <td>
            object
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.0.username <strong>(required)</strong></td>
          <td>
            string
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.0.password <strong>(required)</strong></td>
          <td>
            string
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.1 <strong>(required)</strong></td>
          <td>
            object
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.1.email <strong>(required)</strong></td>
          <td>
            string
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.1.password <strong>(required)</strong></td>
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

### `GET` /user/profile
<a id="op-get-user-profile" />

> Get the current user's profile









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
        <td>profile</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.phone</td>
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
  "profile": {
    "name": "string",
    "email": "user@example.com",
    "dob": "2019-08-24T14:15:22Z",
    "username": "string",
    "phone": "string"
  }
}
```

</div>

### `GET` /user/{user}/
<a id="op-get-user-user" />

> Get a user's profile



#### Path parameters

##### &#9655; user

Username of a user


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
        <td>user  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Username of a user</td>
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
        <td>profile</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>profile.phone</td>
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
  "profile": {
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

> General search for a user

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

### `POST` /user/{user}/follow
<a id="op-post-user-user-follow" />

> Follow another user

Follow another user by their User Object ID


#### Path parameters

##### &#9655; user

Username of the user being followed


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
        <td>user  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Username of the user being followed</td>
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
  </tbody>
</table>


##### Example _(generated)_

```json
{
  "success": true
}
```

</div>

### `GET` /user/{user}/following
<a id="op-get-user-user-following" />

> Get a user's following status for another user

Check if the current user follows another user


#### Path parameters

##### &#9655; user

Username of the user to fetch follow status for


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
        <td>user  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Username of the user to fetch follow status for</td>
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
        <td>following</td>
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
  "following": true
}
```

</div>

### `GET` /user/{user}/portfolio
<a id="op-get-user-user-portfolio" />

> Get a user's portfolio by username

Get a user's portfolio by username


#### Path parameters

##### &#9655; user

Username of the user to fetch the portfolio from


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
        <td>user  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Username of the user to fetch the portfolio from</td>
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
          object
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.cash <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.value</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user</td>
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
    "assets": {
      "property1": 0,
      "property2": 0
    },
    "cash": 0,
    "value": 0,
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

### `GET` /user/portfolio
<a id="op-get-user-portfolio" />

> Get the current user's portfolio

Get the portfolio of the current user








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
          object
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.cash <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.value</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user</td>
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
    "assets": {
      "property1": 0,
      "property2": 0
    },
    "cash": 0,
    "value": 0,
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

### `GET` /user/portfolio/historical/{range}
<a id="op-get-user-portfolio-historical-range" />

> Get the current user's portfolio history by range

Get the portfolio history of the current user


#### Path parameters

##### &#9655; range

Interval to get prices from


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
        <td>range  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Interval to get prices from</td>
        <td><code>2w</code>, <code>3m</code>, <code>1y</code></td>
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
        <td>history</td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.timestamp</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.cash</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user's portfolio</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.assets <strong>(required)</strong></td>
        <td>
          object
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.cash <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.value</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.user</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.portfolio.user.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.user</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>history.user.phone</td>
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
  "history": [
    {
      "timestamp": "2019-08-24T14:15:22Z",
      "cash": 0,
      "portfolio": {
        "assets": {
          "property1": 0,
          "property2": 0
        },
        "cash": 0,
        "value": 0,
        "user": {
          "name": "string",
          "email": "user@example.com",
          "dob": "2019-08-24T14:15:22Z",
          "username": "string",
          "phone": "string"
        }
      },
      "user": {
        "name": "string",
        "email": "user@example.com",
        "dob": "2019-08-24T14:15:22Z",
        "username": "string",
        "phone": "string"
      }
    }
  ]
}
```

</div>

### `GET` /user/leaderboard
<a id="op-get-user-leaderboard" />

> Get the global leaderboard of portfolios

Get the portfolio of the current user




#### Query parameters

##### &#9655; count

Number of portfolios to return


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
          integer
        </td>
        <td>query</td>
        <td>Number of portfolios to return</td>
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
        <td>leaderboard</td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.timestamp</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.cash</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user's portfolio</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.assets <strong>(required)</strong></td>
        <td>
          object
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.cash <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.value</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.user</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.portfolio.user.phone</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.user</td>
        <td>
          object
        </td>
        <td>Schema respresenting a user account</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.user.name <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.user.email <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.user.dob <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.user.username <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>Set to true if the user's email has been verified.</td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>leaderboard.user.phone</td>
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
  "leaderboard": [
    {
      "timestamp": "2019-08-24T14:15:22Z",
      "cash": 0,
      "portfolio": {
        "assets": {
          "property1": 0,
          "property2": 0
        },
        "cash": 0,
        "value": 0,
        "user": {
          "name": "string",
          "email": "user@example.com",
          "dob": "2019-08-24T14:15:22Z",
          "username": "string",
          "phone": "string"
        }
      },
      "user": {
        "name": "string",
        "email": "user@example.com",
        "dob": "2019-08-24T14:15:22Z",
        "username": "string",
        "phone": "string"
      }
    }
  ]
}
```

</div>

### `GET` /stocks/gainers
<a id="op-get-stocks-gainers" />

> Get the top gaining stocks from previous day

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
          integer
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
        <td>stocks.timestamp <strong>(required)</strong></td>
        <td>
          string
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
        <td>stocks.close <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.volume <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.average <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.change <strong>(required)</strong></td>
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
      "symbol": "string",
      "timestamp": "2019-08-24T14:15:22Z",
      "open": 0,
      "high": 0,
      "low": 0,
      "close": 0,
      "volume": 0,
      "average": 0,
      "change": 0
    }
  ]
}
```

</div>

### `GET` /stocks/search
<a id="op-get-stocks-search" />

> General search for stocks

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
        <td>stocks.class <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.exchange <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>stocks.active <strong>(required)</strong></td>
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
  "success": true,
  "stocks": [
    {
      "symbol": "string",
      "name": "string",
      "class": "string",
      "exchange": "string",
      "active": true
    }
  ]
}
```

</div>

### `GET` /stocks/{symbol}/quote
<a id="op-get-stocks-symbol-quote" />

> Get a stock's recent pricing

Get a stock's latest quote


#### Path parameters

##### &#9655; symbol

Symbol of the stock to get the quote of


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
        <td>symbol  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Symbol of the stock to get the quote of</td>
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
        <td>quote</td>
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
  "quote": 0
}
```

</div>

### `GET` /stocks/{symbol}/price/historical/{range}
<a id="op-get-stocks-symbol-price-historical-range" />

> Get a stock's historical price data

Get a stock's historical prices


#### Path parameters

##### &#9655; symbol

Symbol of the stock to get the price history of


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
        <td>symbol  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Symbol of the stock to get the price history of</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>


##### &#9655; range

Interval to get prices from


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
        <td>range  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Interval to get prices from</td>
        <td><code>2w</code>, <code>3m</code>, <code>1y</code></td>
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
        <td>prices</td>
        <td>
          array(object)
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.timestamp <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.open <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.high <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.low <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.close <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.volume <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.average <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>prices.change <strong>(required)</strong></td>
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
  "prices": [
    {
      "symbol": "string",
      "timestamp": "2019-08-24T14:15:22Z",
      "open": 0,
      "high": 0,
      "low": 0,
      "close": 0,
      "volume": 0,
      "average": 0,
      "change": 0
    }
  ]
}
```

</div>

### `POST` /stocks/{symbol}/buy
<a id="op-post-stocks-symbol-buy" />

> Buy a stock for a user

Purchase a stock for the logged in user


#### Path parameters

##### &#9655; symbol

Symbol of the stock to purchase


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
        <td>symbol  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Symbol of the stock to purchase</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






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
        <td>body</td>
        <td>
          oneOf
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
        <tr>
          <td>body.0</td>
          <td>
            object
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.0.qty</td>
          <td>
            number
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.1</td>
          <td>
            object
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.1.notional</td>
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
  "qty": 0
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

### `POST` /stocks/{symbol}/sell
<a id="op-post-stocks-symbol-sell" />

> Sell a user's stock

Sell a stock for the logged in user


#### Path parameters

##### &#9655; symbol

Symbol of the stock to sell


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
        <td>symbol  <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td>path</td>
        <td>Symbol of the stock to sell</td>
        <td><em>Any</em></td>
      </tr>
  </tbody>
</table>






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
        <td>body</td>
        <td>
          oneOf
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
        <tr>
          <td>body.0</td>
          <td>
            object
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.0.qty</td>
          <td>
            number
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.1</td>
          <td>
            object
          </td>
          <td></td>
          <td><em>Any</em></td>
        </tr>
        <tr>
          <td>body.1.notional</td>
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
  "qty": 0
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
          object
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>cash <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>value</td>
        <td>
          number
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
  "assets": {
    "property1": 0,
    "property2": 0
  },
  "cash": 0,
  "value": 0,
  "user": {
    "name": "string",
    "email": "user@example.com",
    "dob": "2019-08-24T14:15:22Z",
    "username": "string",
    "phone": "string"
  }
}
```
<a id="schema-portfolio-history" />

#### Portfolio History

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
        <td>timestamp</td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>cash</td>
        <td>
          number
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
          object
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.cash <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.value</td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>portfolio.user</td>
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
  "timestamp": "2019-08-24T14:15:22Z",
  "cash": 0,
  "portfolio": {
    "assets": {
      "property1": 0,
      "property2": 0
    },
    "cash": 0,
    "value": 0,
    "user": {
      "name": "string",
      "email": "user@example.com",
      "dob": "2019-08-24T14:15:22Z",
      "username": "string",
      "phone": "string"
    }
  },
  "user": {
    "name": "string",
    "email": "user@example.com",
    "dob": "2019-08-24T14:15:22Z",
    "username": "string",
    "phone": "string"
  }
}
```
<a id="schema-asset" />

#### Asset

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
        <td>class <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>exchange <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>active <strong>(required)</strong></td>
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
  "symbol": "string",
  "name": "string",
  "class": "string",
  "exchange": "string",
  "active": true
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
        <td>symbol <strong>(required)</strong></td>
        <td>
          string
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>timestamp <strong>(required)</strong></td>
        <td>
          string
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
        <td>close <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>volume <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>average <strong>(required)</strong></td>
        <td>
          number
        </td>
        <td></td>
        <td><em>Any</em></td>
      </tr>
      <tr>
        <td>change <strong>(required)</strong></td>
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
  "symbol": "string",
  "timestamp": "2019-08-24T14:15:22Z",
  "open": 0,
  "high": 0,
  "low": 0,
  "close": 0,
  "volume": 0,
  "average": 0,
  "change": 0
}
```
