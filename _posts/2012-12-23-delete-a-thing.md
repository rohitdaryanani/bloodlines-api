---
category: Persons
path: '/persons/:id'
title: 'Delete a person'
type: 'DELETE'

layout: nil
---

This method allows the person to be removed.

### Request

* **`:id`** is the id of the person to be delete.
* The headers must include a **valid authentication token**.
* **The body is omitted**.

### Response

**If succeeds**, returns the deleted person.

```Status: 200 Deleted```
```{
    code: 200
}```

For errors responses, see the [response status codes documentation](#response-status-codes).
