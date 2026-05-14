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
    archiveBaseName.set("plugin-data-standard")
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
    from("src/main/resources")
    // 把 implementation 依赖打进 lib/ 目录
    from(configurations.runtimeClasspath.get()
        .filter { it.name.endsWith(".jar") && !it.path.contains("compileOnly") }) {
        into("lib")
    }
    manifest {
        attributes(
            "Plugin-Id"          to "data-standard",
            "Plugin-Version"     to "1.0.0",
            "Plugin-Class"       to "com.toolbox.plugin.datastandard.DataStandardPlugin",
            "Plugin-Description" to "数据标准管理工具",
            "Plugin-Provider"    to "ToolBox Team"
        )
    }
}
