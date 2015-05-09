---
category: Persons
path: '/persons/:id'
title: 'Get a spefic person'
type: 'GET'

layout: nil
---

This method allows to retrieve a specific person.

### Request

* id is the specific identifier of the person to return.
* The headers must include a **valid authentication token**.

### Response

Sends back a collection of persons.

```Status: 200 OK```
```{
	firstName     : 'emma',
	lastName      : 'stone',
	email         : 'roberts69@icloud.com',
	contactNumber : 7774444,
	bloodType     : 'O',
	_id           : '55379906501f1db540f0e119'
}```


For errors responses, see the [response status codes documentation](#response-status-codes).
