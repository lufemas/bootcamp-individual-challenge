package com.lufemas.server_bootcamp.controller;

import com.lufemas.server_bootcamp.exception.FilaDeAtendimentoVaziaException;
import jakarta.validation.Valid;
import com.lufemas.server_bootcamp.model.PessoaFisica;
import com.lufemas.server_bootcamp.service.PessoaFisicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/pessoa-fisica")
@CrossOrigin()
public class PessoaFisicaController {

    @Autowired
    private PessoaFisicaService pessoaFisicaService;

    @GetMapping("/list")
    public ResponseEntity<List<PessoaFisica>> getAllPessoaFisica() {
        return ResponseEntity.ok().body(pessoaFisicaService.getAllPessoaFisica());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaFisica> getPessoaFisicaById(@PathVariable long id) {
        return ResponseEntity.ok().body(pessoaFisicaService.getPessoaFisicaById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPessoaFisica(@Valid @RequestBody PessoaFisica pessoaFisica, BindingResult result) {
        System.out.println("[PessoaFisicaController.java] POST /create");
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body("Validation errors occurred.");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaFisicaService.createPessoaFisica(pessoaFisica));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PessoaFisica> updatePessoaFisica(@PathVariable long id, @RequestBody PessoaFisica pessoaFisica) {
        pessoaFisica.setId(id);
        return ResponseEntity.ok().body(pessoaFisicaService.updatePessoaFisica(pessoaFisica));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePessoaFisica(@PathVariable long id) {
        pessoaFisicaService.deletePessoaFisica(id);
        return ResponseEntity.ok().body("Pessoa Física with ID: " + id + " deleted successfully.");
    }

    @PostMapping("/fila-de-atendimento/adicionar")
    public ResponseEntity<String> adicionarPessoaFisicaAFila(@RequestBody PessoaFisica pessoaFisica) {
        try {
            // Utilizando o método adicionarPessoaFisicaAFila do serviço para adicionar o cliente e colocá-lo na fila
            PessoaFisica pessoaAdicionada = pessoaFisicaService.adicionarPessoaFisicaAFila(pessoaFisica);

            return ResponseEntity.ok("Cliente adicionado à fila de atendimento com sucesso.");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao adicionar cliente à fila de atendimento.");
        }
    }

    @GetMapping("/fila-de-atendimento/proximo")
    public ResponseEntity<PessoaFisica> removerPessoaFisicaDaFila() {
        try {
            // Utilizando o método retirarProximoClienteDaFila do serviço para remover o próximo cliente da fila
            PessoaFisica clienteRemovido = pessoaFisicaService.retirarProximaPessoaFisicaDaFila();

            if (clienteRemovido != null) {
                return ResponseEntity.ok(clienteRemovido); // Respond with the removed client
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
        } catch (FilaDeAtendimentoVaziaException ex) {
            // Exceção de fila vazia
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (RuntimeException ex) {
            // Exceção genérica
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
