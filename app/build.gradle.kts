plugins {
    id("org.springframework.boot")
    id("io.spring.dependency-management")
}

dependencies {
    implementation(project(":framework"))
    implementation(project(":api"))
    implementation("org.springframework.boot:spring-boot-starter")
    runtimeOnly(project(":plugin-flow-parser"))
    runtimeOnly(project(":plugin-todo"))
}

// Spring Boot 可执行 jar
tasks.bootJar {
    enabled = true
    archiveFileName.set("toolbox-app.jar")
    destinationDirectory.set(file("$rootDir/dist/lib"))
}

tasks.jar { enabled = false }

tasks.register<Exec>("buildFrontend") {
    workingDir = file("$rootDir/frontend")
    commandLine("npm", "run", "build")
}

tasks.register("packageWindows") {
    group = "distribution"
    description = "打包 Windows 绿色版 zip"

    dependsOn(":app:buildFrontend", ":app:bootJar")
    // 插件 jar
    rootProject.subprojects.filter { it.name.startsWith("plugin-") }.forEach { dependsOn(it.tasks.named("jar")) }

    doLast {
        val distDir = file("$rootDir/dist/ToolBox")
        distDir.deleteRecursively()
        distDir.mkdirs()

        // 目录结构
        listOf("bin", "lib", "plugins", "config", "plugins-data", "data", "logs", "temp").forEach {
            file("$distDir/$it").mkdirs()
        }

        // 复制 fat jar
        copy {
            from("$rootDir/dist/lib/toolbox-app.jar")
            into("$distDir/lib")
        }

        // 复制插件 jar
        rootProject.subprojects.filter { it.name.startsWith("plugin-") }.forEach { sub ->
            copy {
                from(sub.tasks.named("jar").get().outputs.files)
                into("$distDir/plugins")
            }
        }

        // 默认配置
        copy {
            from("$rootDir/framework/src/main/resources/application.yml")
            into("$distDir/config")
        }

        // 启动脚本
        file("$distDir/bin/start.bat").writeText("""
@echo off
set BASE=%~dp0..
"%BASE%\jre\bin\java.exe" @"%BASE%\bin\toolbox.vmoptions" -jar "%BASE%\lib\toolbox-app.jar" --spring.config.location=file:"%BASE%\config\application.yml"
""".trimIndent())

        file("$distDir/bin/toolbox.vmoptions").writeText("""
-Xms256m
-Xmx2g
-Dfile.encoding=UTF-8
-Dsun.jnu.encoding=UTF-8
-Duser.timezone=Asia/Shanghai
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=logs/heap-dump.hprof
""".trimIndent())

        // VERSION 文件
        file("$distDir/VERSION").writeText(project.version.toString())

        // 打 zip
        ant.withGroovyBuilder {
            "zip"("destfile" to "$rootDir/dist/ToolBox-${project.version}-windows.zip",
                  "basedir" to "$rootDir/dist",
                  "includes" to "ToolBox/**")
        }

        println("打包完成: dist/ToolBox-${project.version}-windows.zip")
    }
}
