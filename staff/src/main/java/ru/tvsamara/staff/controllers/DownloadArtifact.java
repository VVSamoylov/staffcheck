package ru.tvsamara.staff.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

/**
 *
 * @author venia
 */
@Controller
public class DownloadArtifact {

    @GetMapping("/")
    public ModelAndView getTestData(@AuthenticationPrincipal Jwt jwt, ModelAndView mv) {
        mv.setViewName("index.html");
        return mv;
    }
}
