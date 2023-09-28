package com.lufemas.server_bootcamp.service;

import com.lufemas.server_bootcamp.model.PessoaFisica;
import com.lufemas.server_bootcamp.model.PessoaJuridica;

import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public interface PessoaFisicaService {
    PessoaFisica createPessoaFisica(PessoaFisica pessoaFisica);

    PessoaFisica updatePessoaFisica(PessoaFisica pessoaFisica);

    List<PessoaFisica> getAllPessoaFisica();

    PessoaFisica getPessoaFisicaById(long pessoaFisicaId);

    void deletePessoaFisica(long id);

    PessoaFisica adicionarPessoaFisicaAFila(PessoaFisica pessoaFisica);

    PessoaFisica retirarProximaPessoaFisicaDaFila();
}
