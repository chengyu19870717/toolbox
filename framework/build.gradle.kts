plugins {
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    id("groovy")
}

dependencies {
    implementation(project(":api"))

    // Spring Boot
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-actuator")

    // JWT
    implementation("io.jsonwebtoken:jjwt-api:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.12.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.12.5")

    // PF4J 插件框架
    implementation("org.pf4j:pf4j:3.10.0")

    // HikariCP + MySQL
    implementation("com.zaxxer:HikariCP:5.1.0")
    implementation("com.mysql:mysql-connector-j:8.3.0")

    // SQLite（任务持久化）
    implementation("org.xerial:sqlite-jdbc:3.45.3.0")

    // Jackson
    implementation("com.fasterxml.jackson.core:jackson-databind")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310")

    // BCrypt
    implementation("org.springframework.security:spring-security-crypto")

    // --- Test: JUnit 5 + Mockito + Spock (Groovy) + Testcontainers ---
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.spockframework:spock-core:2.3-groovy-4.0")
    testImplementation("org.apache.groovy:groovy:4.0.21")
    testImplementation("org.apache.groovy:groovy-dateutil:4.0.21")
    testImplementation("org.apache.groovy:groovy-json:4.0.21")
    testImplementation("org.apache.groovy:groovy-nio:4.0.21")
    testImplementation("org.spockframework:spock-spring:2.3-groovy-4.0")
    testImplementation("junit:junit:4.13.2")

    testImplementation("org.testcontainers:mysql:1.19.3")
    testImplementation("org.testcontainers:junit-jupiter:1.19.3")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<ProcessResources> {
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

// Configure test source sets to use autotest/backend/
sourceSets {
    test {
        java {
            srcDirs(
                "src/test/java",
                "$rootDir/autotest/backend/integration"
            )
        }
        groovy {
            srcDirs(
                "$rootDir/autotest/backend/unit"
            )
        }
        resources {
            srcDirs(
                "src/test/resources",
                "$rootDir/autotest/backend/resources"
            )
        }
    }
}

// 不生成可执行 jar（由 app 模块负责打包）
tasks.bootJar { enabled = false }
tasks.jar { enabled = true }
