package ru.tvsamara.staff.Configuration.keycloack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig  {
    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String jwksUri;
    @Value("${server.uri}")
    private String resourceserverUri;
    @Value("${server.port}")
    private String port;
    @Value("${authserver.uri}")
    private String authserverUri;
    @Autowired
    private JwtAuthConverter jwtAuthConverter;


    @Bean
    public JwtDecoder jwtDecoder() {
        return JwtDecoders.fromIssuerLocation(jwksUri);
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(HttpMethod.GET, "/static/**", "/*").permitAll()

                .requestMatchers("/upload/**").hasAnyAuthority("admin", "hr")
                .requestMatchers("/position/saveposition").hasAnyAuthority("admin", "hr")
                .requestMatchers("/position/deleteById").hasAnyAuthority("admin", "hr")
                .requestMatchers("/employee/save").hasAnyAuthority("admin", "hr")
                .requestMatchers("/employee/deleteById").hasAnyAuthority("admin", "hr")
                .requestMatchers("/depart/save").hasAnyAuthority("admin", "hr")
                .requestMatchers("/depart/deleById").hasAnyAuthority("admin", "hr")
                .requestMatchers("/utils/**").hasAnyAuthority("admin", "hr", "manager")
                .requestMatchers("/notworking/**").hasAnyAuthority("admin", "hr")
                .requestMatchers("/planeTV/add").hasAnyAuthority("admin", "ProducerTV")
                .requestMatchers("/planeTV/save").hasAnyAuthority("admin", "ProducerTV")
                .requestMatchers("/planeTV/updateTask").hasAnyAuthority("admin", "ProducerTV")
                .requestMatchers("/planeTV/deleteTask").hasAnyAuthority("admin", "ProducerTV")
                .requestMatchers("/planeTV/deleplan").hasAnyAuthority("admin", "ProducerTV")
                .requestMatchers("/issuance/saveTask").hasAnyAuthority("admin", "releaseTV")
                .requestMatchers("/issuance/deleteTaskById").hasAnyAuthority("admin", "releaseTV")
                .requestMatchers("/transport/deleteTransport").hasAnyAuthority("admin", "garage")
                .requestMatchers("/transport/saveTransport").hasAnyAuthority("admin", "garage")
                .requestMatchers("/transport/saveCar").hasAnyAuthority("admin", "garage")

                .anyRequest().authenticated()


            )
            .sessionManagement(configurer -> configurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .csrf(CsrfConfigurer::disable)
            .cors(cors-> cors.configurationSource(corsConfigurationSource()))
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())));

        return http.build();
    }

    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        var converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwtAuthConverter);
        return converter;
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConf = new CorsConfiguration();
        corsConf.setAllowedOrigins(List.of(resourceserverUri, authserverUri));
        corsConf.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        corsConf.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin",
            "X-Requested-With",
            "Access-Control-Request-Method",
            "Access-Control-Request-Headers"));
        corsConf.setAllowCredentials(true);
        corsConf.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConf);
        return source;
    }
}

