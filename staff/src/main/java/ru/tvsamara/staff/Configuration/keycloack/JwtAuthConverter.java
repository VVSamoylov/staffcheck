package ru.tvsamara.staff.Configuration.keycloack;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    public JwtAuthConverter() {
    }
   // @Value("${ISSUER_URI}")
    //private String url;
    @Override
    public Collection<GrantedAuthority> convert(Jwt jwt) {
        List<String> roles = jwt.getClaimAsStringList("roles");
        if (roles == null) {
            System.out.println("Roles is null");
            return Collections.emptyList();
        }

        System.out.println("Roles: " + roles);
        return roles.stream()
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());
    }
}
