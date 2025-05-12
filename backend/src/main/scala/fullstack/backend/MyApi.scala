package fullstack.backend

import io.grpc.StatusException
import my_api.*
import zio.{IO, ZIO}

class MyApi extends my_api.ZioMyApi.MyApi {

  override def hello(request: HelloRequest): IO[StatusException, HelloResponse] = {
    ZIO.succeed(HelloResponse("Hello, " + request.name))
  }
}
