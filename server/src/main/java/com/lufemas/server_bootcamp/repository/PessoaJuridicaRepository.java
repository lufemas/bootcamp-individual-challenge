package com.lufemas.server_bootcamp.repository;

import com.lufemas.server_bootcamp.model.PessoaJuridica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica, Long> {
    boolean existsByCnpj(String cnpj);

    boolean existsById(long id);
}
