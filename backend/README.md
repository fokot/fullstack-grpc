## sbt project compiled with Scala 3

### Usage
Run as
```
sbt run
```

To start envoy proxy, run
```
docker run -v "$(pwd)/envoy.yaml:/etc/envoy/envoy.yaml:ro" --network=host envoyproxy/envoy:v1.34-latest
``` 

## Testing
You can use [grpcurl](https://github.com/fullstorydev/grpcurl) like
```
grpcurl --plaintext localhost:9000 list
grpcurl --plaintext localhost:9000 list MyApi
grpcurl --plaintext  -d '{"name": "John"}'  localhost:9000 MyApi.Hello
```
