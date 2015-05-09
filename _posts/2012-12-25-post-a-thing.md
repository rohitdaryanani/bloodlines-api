---
category: Persons
path: '/persons'
title: 'Post a person'
type: 'POST'

layout: nil
---

This method allows to create a new person.

### Request

* The headers must include a **valid authentication token**.
* **The body can't be empty** .
* `required` unique email address, type `string`.
* `required` password, type `string`.

```Authentication: bearer TOKEN```
```{
	firstName     : 'emma',
	lastName      : 'stone',
	email         : 'roberts69@icloud.com',
	contactNumber : 7774444,
	bloodType     : 'O',
	_id           : '55379906501f1db540f0e119'
}```


### Response

**If succeeds**, returns the created person.

```Status: 201 Created```
```{
	firstName     : 'emma',
	lastName      : 'stone',
	email         : 'roberts69@icloud.com',
	contactNumber : 7774444,
	bloodType     : 'O',
	_id           : '55379906501f1db540f0e119'
}```


For errors responses, see the [response status codes documentation](#response-status-codes).
