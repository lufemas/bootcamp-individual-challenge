package com.lufemas.server_bootcamp.repository;

import com.lufemas.server_bootcamp.model.PessoaFisica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaFisicaRepository extends JpaRepository<PessoaFisica, Long> {
    boolean existsByCpf(String cpf);

    boolean existsById(long id);
}
