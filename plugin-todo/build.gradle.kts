plugins {
    java
}

dependencies {
    compileOnly(project(":api"))
    compileOnly("org.pf4j:pf4j:3.10.0")
    compileOnly("org.slf4j:slf4j-api:2.0.13")
}

val buildFrontend by tasks.registering(Exec::class) {
    workingDir = file("frontend")
    commandLine("npm", "run", "build")
    inputs.dir("frontend/src")
    inputs.file("frontend/package.json")
    outputs.dir("src/main/resources/frontend")
}

tasks.named("processResources") {
    dependsOn(buildFrontend)
}

tasks.jar {
    dependsOn(buildFrontend)
    archiveBaseName.set("plugin-todo")
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    from("src/main/resources")
    manifest {
        attributes(
            "Plugin-Id"          to "todo",
            "Plugin-Version"     to "1.0.0",
            "Plugin-Class"       to "com.toolbox.plugin.todo.TodoPlugin",
            "Plugin-Description" to "待办任务管理工具",
            "Plugin-Provider"    to "ToolBox Team"
        )
    }
}
