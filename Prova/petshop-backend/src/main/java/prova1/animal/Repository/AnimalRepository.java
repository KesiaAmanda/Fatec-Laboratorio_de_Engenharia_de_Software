package prova1.animal.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import prova1.animal.Entity.Animal;

public interface AnimalRepository extends CrudRepository<Animal, Long>{
	List<Animal> findByNome(String nome);
}
