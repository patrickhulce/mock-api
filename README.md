# mock-api
Quick and dirty mock API.

## Usage

### Route Definition Object
A route definition object outlines what the API response is to be on a given path. Currently supported fields are `path`, `statusCode`, and `body`.
If the body value is a string, it will be parsed as a [lodash template](https://lodash.com/docs#template) using the request object as the source.

### Static Routes via File
Easisest, define route objects in a JSON file.

```json
{
  "/my/static/route": {
    "statusCode": 201,
    "body": { "body": "to", "return": "as-is" }
  },
  "/echo/route": {
    "body": { 
      "id": "<%= body.id %>",
      "mode": "<%= query.my_query_string_value %>",
    }
  }
}
```

### Dynamic Routes via POST
You can also define routes programmatically via the `/configure` route. Clear all currently set routes with `POST /clear`

`curl -X POST http://localhost:3100/configure -H 'Content-Type: application/json' -d '{"path":"/foo", "body": {"hello": "world"}}'`
