---
category: Persons
path: '/persons'
title: 'Get list of persons'
type: 'GET'

layout: nil
---

This method allows to retrieve list of person.

### Request

* The headers must include a **valid authentication token**.

### Response

Sends back a collection of persons.

```Status: 200 OK```
```[
	{
		firstName     : 'emma',
		lastName      : 'roberts',
		email         : 'roberts69@icloud.com',
		contactNumber : 7774444,
		bloodType     : 'O',
		_id           : '55379906501f1db540f0e119'
	},
	{
		firstName     : 'emma',
		lastName      : 'watson',
		email         : 'emma69@icloud.com',
		contactNumber : 7774444,
		bloodType     : 'O',
		_id           : '553a02944631588cb9e5b881'
	}
]```

For errors responses, see the [response status codes documentation](#response-status-codes).
