# DefaultApi

All URIs are relative to *http://localhost:3000*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getStocksGainers**](DefaultApi.md#getStocksGainers) | **GET** /stocks/gainers |  |
| [**getStocksPrice**](DefaultApi.md#getStocksPrice) | **GET** /stocks/price |  |
| [**getStocksSearch**](DefaultApi.md#getStocksSearch) | **GET** /stocks/search |  |
| [**getUserPortfolio**](DefaultApi.md#getUserPortfolio) | **GET** /user/portfolio |  |
| [**getUserSearch**](DefaultApi.md#getUserSearch) | **GET** /user/search |  |
| [**postAuthLogin**](DefaultApi.md#postAuthLogin) | **POST** /auth/login |  |
| [**postAuthRegister**](DefaultApi.md#postAuthRegister) | **POST** /auth/register |  |
| [**postUserFollow**](DefaultApi.md#postUserFollow) | **POST** /user/follow |  |


<a name="getStocksGainers"></a>
# **getStocksGainers**
> inline_response_200_5 getStocksGainers(count)



    Fetch the top gaining stocks

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **count** | **BigDecimal**| Name or symbol of searched stock | [optional] [default to null] |

### Return type

[**inline_response_200_5**](../Models/inline_response_200_5.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getStocksPrice"></a>
# **getStocksPrice**
> inline_response_200_6 getStocksPrice(query)



    Search for a stock&#39;s historical prices by symbol

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **query** | **String**| Symbol of searched stock | [optional] [default to null] |

### Return type

[**inline_response_200_6**](../Models/inline_response_200_6.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getStocksSearch"></a>
# **getStocksSearch**
> inline_response_200_5 getStocksSearch(query)



    Search for stocks by name or symbol

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **query** | **String**| Name or symbol of searched stock | [optional] [default to null] |

### Return type

[**inline_response_200_5**](../Models/inline_response_200_5.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getUserPortfolio"></a>
# **getUserPortfolio**
> inline_response_200_4 getUserPortfolio()



    Follow another user by their User Object ID

### Parameters
This endpoint does not need any parameter.

### Return type

[**inline_response_200_4**](../Models/inline_response_200_4.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="getUserSearch"></a>
# **getUserSearch**
> inline_response_200_2 getUserSearch(query)



    Search for users by username

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **query** | **String**| Username of user being searched | [default to null] |

### Return type

[**inline_response_200_2**](../Models/inline_response_200_2.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="postAuthLogin"></a>
# **postAuthLogin**
> inline_response_200_1 postAuthLogin(inline\_object\_1)



    Login and authneticate a user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **inline\_object\_1** | [**inline_object_1**](../Models/inline_object_1.md)|  | [optional] |

### Return type

[**inline_response_200_1**](../Models/inline_response_200_1.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="postAuthRegister"></a>
# **postAuthRegister**
> inline_response_200 postAuthRegister(inline\_object)



    Create and authenticate a new user

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **inline\_object** | [**inline_object**](../Models/inline_object.md)|  | [optional] |

### Return type

[**inline_response_200**](../Models/inline_response_200.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="postUserFollow"></a>
# **postUserFollow**
> inline_response_200_3 postUserFollow(inline\_object\_2)



    Follow another user by their User Object ID

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **inline\_object\_2** | [**inline_object_2**](../Models/inline_object_2.md)|  | [optional] |

### Return type

[**inline_response_200_3**](../Models/inline_response_200_3.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

