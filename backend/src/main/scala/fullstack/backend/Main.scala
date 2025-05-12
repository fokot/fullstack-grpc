package fullstack.backend

import io.grpc.ServerBuilder
import io.grpc.protobuf.services.ProtoReflectionService
import scalapb.zio_grpc.{ServerLayer, ServiceList}
import zio.Console.printLine
import zio.*

object Main extends ZIOAppDefault {
  val port: Int = 9000

  def run: ZIO[Any, Throwable, Unit] =
    for {
      services <- ZIO.succeed(ServiceList.add(new MyApi()))
      builder = ServerBuilder.forPort(port).addService(ProtoReflectionService.newInstance())
      _ <- printLine(s"Server is running on port $port. Press Ctrl-C to stop.")
      _ <- ServerLayer.fromServiceList(builder, services).launch
    } yield ExitCode.success
}
