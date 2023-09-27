package com.lufemas.server_bootcamp.controller;

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
}
