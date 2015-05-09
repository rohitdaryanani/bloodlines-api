---
category: Persons
path: '/persons/:id'
title: 'Update a person'
type: 'PUT'

layout: nil
---

This method allows to update a person.

### Request

* **`:id`** is the id of the person to update.
* The headers must include a **valid authentication token**.
* **The body can't be empty** .
* `required` unique email address, type `string`.

```Authentication: bearer```
```{
    lastName: 'roberts'
}```

### Response

**If succeeds**, returns the updated person.

```Status: 200 OK```
```{
	firstName     : 'emma',
	lastName      : 'roberts',
	email         : 'roberts69@icloud.com',
	contactNumber : 7774444,
	bloodType     : 'O',
	_id           : '55379906501f1db540f0e119'
}```

For errors responses, see the [response status codes documentation](#response-status-codes).
