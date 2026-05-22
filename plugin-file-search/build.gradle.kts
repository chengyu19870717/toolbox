plugins {
    java
}

dependencies {
    compileOnly(project(":api"))
    compileOnly("org.pf4j:pf4j:3.10.0")
    compileOnly("org.slf4j:slf4j-api:2.0.13")
    implementation("org.xerial:sqlite-jdbc:3.45.3.0")
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
    archiveBaseName.set("plugin-file-search")
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    from("src/main/resources")
    from(configurations.runtimeClasspath.get()
        .filter { it.name.endsWith(".jar") && !it.path.contains("compileOnly") }) {
        into("lib")
    }
    manifest {
        attributes(
            "Plugin-Id"          to "file-search",
            "Plugin-Version"     to "1.0.0",
            "Plugin-Class"       to "com.toolbox.plugin.filesearch.FileSearchPlugin",
            "Plugin-Description" to "文件检索工具",
            "Plugin-Provider"    to "ToolBox Team"
        )
    }
}
