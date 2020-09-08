package br.gov.rn.parnamirim.tour_of_heroes;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class TestController {

	@RequestMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}