# Java - Spring Boot Best Practices

**Official Documentation**: [spring.io/projects/spring-boot](https://spring.io/projects/spring-boot) - The Enterprise Standard.

## 1. Golden Rules

1.  **Annotations**: Rely on Spring magic (`@Service`, `@Repository`, `@Transactional`). Don't fight the framework.
2.  **Lombok**: Use Lombok (`@Data`, `@Builder`, `@RequiredArgsConstructor`) to reduce boilerplate.
3.  **Layered Architecture**: Controller -> Service -> Repository. Never call Repository from Controller.

## 2. Folder Structure (Maven/Gradle Standard)

```
src/main/java/com/example/project/
├── config/              # SecurityConfig, AppConfig
├── controller/          # REST Endpoints
│   └── UserController.java
├── service/             # Business Logic
│   └── UserService.java
├── repository/          # JPA Repositories
│   └── UserRepository.java
├── model/               # JPA Entities
│   └── User.java
├── dto/                 # Data Transfer Objects
│   └── UserDTO.java
└── exception/           # Global Exception Handling
```

## 3. Code Patterns

### Validation (Bean Validation)

Use `jakarta.validation` annotations on DTOs.

```java
@Data
public class UserDTO {
    @NotNull
    @Email
    private String email;

    @Size(min = 8)
    private String password;
}

// Controller
@PostMapping
public ResponseEntity<User> create(@Valid @RequestBody UserDTO userDto) {
    // ...
}
```

### Database (Spring Data JPA)

Define Interfaces extending `JpaRepository`.

```java
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.isActive = true")
    List<User> findAllActive();
}
```

## 4. Security (Spring Security)

- **Configuration**: Use `SecurityFilterChain` bean (Modern Spring Security 6+).
- **Passwords**: `BCryptPasswordEncoder` is the standard.

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // For stateless REST APIs
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
        );
    return http.build();
}
```
