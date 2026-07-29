plugins {
    java
}

dependencies {
    compileOnly(project(":api"))
    compileOnly("org.pf4j:pf4j:3.10.0")
    compileOnly("org.slf4j:slf4j-api:2.0.13")
    // SQLite 存储插件自有数据，打进 jar 的 lib/ 目录
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
    archiveBaseName.set("plugin-data-model")
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    from("src/main/resources")
    from(configurations.runtimeClasspath.get()
        .filter { it.name.endsWith(".jar") && !it.path.contains("compileOnly") }) {
        into("lib")
    }
    manifest {
        attributes(
            "Plugin-Id"          to "data-model",
            "Plugin-Version"     to project.version,
            "Plugin-Class"       to "com.toolbox.plugin.datamodel.DataModelPlugin",
            "Plugin-Description" to "表结构与字段关联关系管理工具",
            "Plugin-Provider"    to "ToolBox Team"
        )
    }
}
