package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.PessoaJuridica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaJuridicaRepository extends JpaRepository<PessoaJuridica, Long> {

}
