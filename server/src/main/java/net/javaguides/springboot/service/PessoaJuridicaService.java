package net.javaguides.springboot.service;

import net.javaguides.springboot.model.PessoaJuridica;

import java.util.List;

public interface PessoaJuridicaService {
	PessoaJuridica createPessoaJuridica(PessoaJuridica pessoaJuridica);

	PessoaJuridica updatePessoaJuridica(PessoaJuridica pessoaJuridica);

	List<PessoaJuridica> getAllPessoaJuridica();

	PessoaJuridica getPessoaJuridicaById(long pessoaJuridicaId);

	void deletePessoaJuridica(long id);
}
