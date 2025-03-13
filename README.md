# Project Detail

## Nextjs15

## React Query

## Pocketbase

### Todo Collections API Rules

```json
{
  "listRule": "@request.headers.x_token = "0" && @request.auth.id != '' && userId = @request.auth.id",
  "viewRule": "@request.headers.x_token = "0" && @request.auth.id != '' && userId = @request.auth.id",
  "createRule": "@request.headers.x_token = "0" && @request.auth.id != ''",
  "updateRule": "@request.headers.x_token = "0" && @request.auth.id != '' && userId = @request.auth.id",
  "deleteRule": "@request.headers.x_token = "0" && @request.auth.id != '' && userId = @request.auth.id"
}
```
