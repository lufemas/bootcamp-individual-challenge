package com.lufemas.server_bootcamp.service;

import com.lufemas.server_bootcamp.model.PessoaJuridica;

import java.util.List;

public interface PessoaJuridicaService {
	PessoaJuridica createPessoaJuridica(PessoaJuridica pessoaJuridica);

	PessoaJuridica updatePessoaJuridica(PessoaJuridica pessoaJuridica);

	List<PessoaJuridica> getAllPessoaJuridica();

	PessoaJuridica getPessoaJuridicaById(long pessoaJuridicaId);

	void deletePessoaJuridica(long id);

	PessoaJuridica adicionarPessoaJuridicaAFila(PessoaJuridica pessoaJuridica);

	PessoaJuridica retirarProximaPessoaJuridicaDaFila();
}
