package com.lufemas.server_bootcamp.controller;

import com.lufemas.server_bootcamp.exception.FilaDeAtendimentoVaziaException;
import jakarta.validation.Valid;
import com.lufemas.server_bootcamp.model.PessoaJuridica;
import com.lufemas.server_bootcamp.service.PessoaJuridicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
		System.out.println("[PessoaJuridicaController.java] POST /create");
		if (result.hasErrors()) {
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

	@PostMapping("/fila-de-atendimento/adicionar")
	public ResponseEntity<String> adicionarPessoaJuridicaAFila(@RequestBody PessoaJuridica pessoaJuridica) {
		try {
			// Utilizando método adicionarPessoaJuridica do serviço para adicionar o cliente e colocá-lo na fila
			PessoaJuridica pessoaAdicionada = pessoaJuridicaService.adicionarPessoaJuridicaAFila(pessoaJuridica);

			return ResponseEntity.ok("Cliente adicionado à fila de atendimento com sucesso.");
		} catch (RuntimeException  ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar cliente à fila de atendimento.");
		}
	}

	@GetMapping("/fila-de-atendimento/proximo")
	public ResponseEntity<PessoaJuridica> removerPessoaJuridicaDaFila() {
		try {
			// Utilizando o método retirarProximoClienteDaFila do serviço para remover o próximo cliente da fila
			PessoaJuridica clienteRemovido = pessoaJuridicaService.retirarProximaPessoaJuridicaDaFila();

			if (clienteRemovido != null) {
				return ResponseEntity.ok(clienteRemovido);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
			}
		} catch (FilaDeAtendimentoVaziaException ex) {
			// Exceção de fila vazia
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} catch (RuntimeException ex) {
			// Exceção genérica
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
