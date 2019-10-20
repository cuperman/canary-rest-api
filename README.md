# Canary REST API

Deploy a REST API with Canary Lambda deployments using CDK

Goals:

* Use CDK to define the infrastructure
* Use SAM deployment preferences to define a Canary deployment for the Lambda functions
* The Lambda updates should roll back on test failures
* The Lambda updates should roll back on CloudWatch alarms

## Example app

As an example, this application will expose a REST API to manage contacts, supporting all CRUD operations as follows:

```
# CREATE a contact
POST /contacts
{ "name": "Jeff", "email": "jeff@mydomain.com" }

# READ a list of contacts
GET /contacts

# READ a specific contact
GET /contacts/{id}

# UPDATE a specific contact
PATCH /contacts/{id}
{ "email": "jeff@newdomain.com" }

# DELETE a specific contact
DELETE /contacts/{id}
```