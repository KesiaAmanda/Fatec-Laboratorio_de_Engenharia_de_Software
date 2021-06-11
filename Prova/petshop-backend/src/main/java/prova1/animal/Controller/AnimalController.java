package prova1.animal.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import prova1.animal.Entity.Animal;
import prova1.animal.Repository.AnimalRepository;

@RestController
@CrossOrigin(origins = "*")
public class AnimalController {
	@Autowired
	AnimalRepository AnimalRepository;

	@RequestMapping(value="/animal/add", 
			method=RequestMethod.POST)
	public String adicionar(@RequestBody Animal animal) {
		AnimalRepository.save(animal);
		return "Animal Cadastrado com sucesso!";
	}
	
	@RequestMapping(value="/animal/{nome}", 
			method=RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<List<Animal>> animalPorNome(HttpServletResponse response,
			@PathVariable("nome") Optional<String> nome) {
	    response.addHeader("Content-Type", "application/json");
	    
	    List<Animal> retorno = new ArrayList<>();
	    
	    if (nome.isPresent()) {
	    	retorno = AnimalRepository.findByNome(nome.get());
	    }
	    		
		return ResponseEntity.ok(retorno);
	}
	
	@RequestMapping(value="/animal", 
			method=RequestMethod.GET,
			produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Iterable<Animal>> listaAnimal(HttpServletResponse response) {
	    response.addHeader("Content-Type", "application/json");
	    
	    Iterable<Animal> lista = AnimalRepository.findAll();
	    		
		return ResponseEntity.ok(lista);
	}	
}
