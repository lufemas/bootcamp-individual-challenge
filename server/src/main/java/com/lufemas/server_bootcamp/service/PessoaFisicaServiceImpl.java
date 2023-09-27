package com.lufemas.server_bootcamp.service;

import com.lufemas.server_bootcamp.exception.ResourceAlreadyExistsException;
import com.lufemas.server_bootcamp.exception.ResourceNotFoundException;
import com.lufemas.server_bootcamp.repository.PessoaFisicaRepository;
import com.lufemas.server_bootcamp.model.PessoaFisica;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class PessoaFisicaServiceImpl implements PessoaFisicaService {

    @Autowired
    private PessoaFisicaRepository pessoaFisicaRepository;

    @Autowired
    private Validator validator;

    @Override
    public PessoaFisica createPessoaFisica(PessoaFisica pessoaFisica) {
        // Verifique se já existe um registro com o mesmo CPF
        if (pessoaFisicaRepository.existsByCpf(pessoaFisica.getCpf())) {
            throw new ResourceAlreadyExistsException("Pessoa Física com CPF já cadastrado.");
        }

        // Continue com a criação
        return pessoaFisicaRepository.save(pessoaFisica);
    }

    @Override
    public PessoaFisica updatePessoaFisica(PessoaFisica pessoaFisica) {
        Optional<PessoaFisica> pessoaFisicaDb = this.pessoaFisicaRepository.findById(pessoaFisica.getId());

        if (pessoaFisicaDb.isPresent()) {
            PessoaFisica pessoaFisicaUpdate = pessoaFisicaDb.get();
            pessoaFisicaUpdate.setId(pessoaFisica.getId());
            pessoaFisicaUpdate.setNome(pessoaFisica.getNome());
            pessoaFisicaUpdate.setMcc(pessoaFisica.getMcc());
            pessoaFisicaUpdate.setCpf(pessoaFisica.getCpf());
            pessoaFisicaUpdate.setEmail(pessoaFisica.getEmail());
            return pessoaFisicaRepository.save(pessoaFisicaUpdate);
        } else {
            throw new ResourceNotFoundException("Pessoa Física com ID não encontrado : " + pessoaFisica.getId());
        }
    }

    @Override
    public List<PessoaFisica> getAllPessoaFisica() {
        return this.pessoaFisicaRepository.findAll();
    }

    @Override
    public PessoaFisica getPessoaFisicaById(long pessoaFisicaId) {
        Optional<PessoaFisica> pessoaFisicaDb = this.pessoaFisicaRepository.findById(pessoaFisicaId);

        if (pessoaFisicaDb.isPresent()) {
            return pessoaFisicaDb.get();
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + pessoaFisicaId);
        }
    }

    @Override
    public void deletePessoaFisica(long id) {
        Optional<PessoaFisica> pessoaFisicaDb = this.pessoaFisicaRepository.findById(id);

        if (pessoaFisicaDb.isPresent()) {
            this.pessoaFisicaRepository.delete(pessoaFisicaDb.get());
        } else {
            throw new ResourceNotFoundException("Record not found with id : " + id);
        }
    }
}
