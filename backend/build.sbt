Global / onChangedBuildSource := ReloadOnSourceChanges

val scala3Version = "3.7.0"

lazy val root = project
  .in(file("."))
  .settings(
    name := "backend",
    version := "0.1.0-SNAPSHOT",
    scalaVersion := scala3Version,
    libraryDependencies ++= Seq(
      "io.grpc" % "grpc-netty" % "1.72.0",
      "com.thesamet.scalapb" %% "scalapb-runtime-grpc" % scalapb.compiler.Version.scalapbVersion,
      "com.thesamet.scalapb" %% "scalapb-json4s" % "0.12.0"
    )
  )

Compile / PB.targets := Seq(
  scalapb.gen(grpc = true, scala3Sources = true) -> (Compile / sourceManaged).value,
  scalapb.zio_grpc.ZioCodeGenerator -> (Compile / sourceManaged).value
)

Compile / PB.protoSources := Seq(
  baseDirectory.value / ".." / "proto"
)


