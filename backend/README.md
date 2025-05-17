## sbt project compiled with Scala 3

### Usage

This is a normal sbt project. You can compile code with `sbt compile`, run it with `sbt run`, and `sbt console` will start a Scala 3 REPL.

For more information on the sbt-dotty plugin, see the
[scala3-example-project](https://github.com/scala/scala3-example-project/blob/main/README.md).

## Testing
You can use [grpcurl](https://github.com/fullstorydev/grpcurl) like
```
grpcurl --plaintext localhost:9000 list
grpcurl --plaintext localhost:9000 list MyApi
grpcurl --plaintext  -d '{"name": "John"}'  localhost:9000 MyApi.Hello
```
