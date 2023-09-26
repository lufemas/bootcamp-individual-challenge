package net.javaguides.springboot.controller;

import jakarta.validation.Valid;
import net.javaguides.springboot.model.PessoaJuridica;
import net.javaguides.springboot.service.PessoaJuridicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@RequestMapping("/pessoa-juridica")
public class PessoaJuridicaController {

	@Autowired
	private PessoaJuridicaService pessoaJuridicaService;

	@GetMapping("/list")
	public ResponseEntity<List<PessoaJuridica>> getAllPessoaJuridica() {
		return ResponseEntity.ok().body(pessoaJuridicaService.getAllPessoaJuridica());
	}

	@GetMapping("/{id}")
	public ResponseEntity<PessoaJuridica> getPessoaJuridicaById(@PathVariable long id) {
		return ResponseEntity.ok().body(pessoaJuridicaService.getPessoaJuridicaById(id));
	}

	@PostMapping("/create")
	public ResponseEntity<?> createPessoaJuridica(@Valid @RequestBody PessoaJuridica pessoaJuridica, BindingResult result) {
		if (result.hasErrors()) {
			// Handle validation errors and return appropriate response
			return ResponseEntity.badRequest().body("Validation errors occurred.");
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaJuridicaService.createPessoaJuridica(pessoaJuridica));
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<PessoaJuridica> updatePessoaJuridica(@PathVariable long id, @RequestBody PessoaJuridica pessoaJuridica) {
		pessoaJuridica.setId(id);
		return ResponseEntity.ok().body(pessoaJuridicaService.updatePessoaJuridica(pessoaJuridica));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deletePessoaJuridica(@PathVariable long id) {
		pessoaJuridicaService.deletePessoaJuridica(id);
		return ResponseEntity.ok().body("Pessoa Juridica with ID: " + id + " deleted successfully.");
	}
}
