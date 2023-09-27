package com.lufemas.server_bootcamp.service;

import com.lufemas.server_bootcamp.exception.FilaDeAtendimentoVaziaException;
import com.lufemas.server_bootcamp.exception.ResourceAlreadyExistsException;
import com.lufemas.server_bootcamp.exception.ResourceNotFoundException;
import com.lufemas.server_bootcamp.repository.PessoaJuridicaRepository;
import com.lufemas.server_bootcamp.model.PessoaJuridica;
import com.lufemas.server_bootcamp.shared.FilaDeAtendimento;
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
public class PessoaJuridicaServiceImpl implements PessoaJuridicaService {

	private FilaDeAtendimento<PessoaJuridica> filaDeAtendimento = new FilaDeAtendimento<>();

	@Autowired
	private PessoaJuridicaRepository pessoaJuridicaRepository;

	@Autowired
	private Validator validator;

//	@Override
//	public PessoaJuridica createPessoaJuridica(PessoaJuridica pessoaJuridica) {
//		return pessoaJuridicaRepository.save(pessoaJuridica);
//	}

@Override
public PessoaJuridica createPessoaJuridica(PessoaJuridica pessoaJuridica) {
	System.out.println("createPessoaJuridica");
	// Verifique se já existe um registro com o mesmo CNPJ
	if (pessoaJuridicaRepository.existsByCnpj(pessoaJuridica.getCnpj())) {
		throw new ResourceAlreadyExistsException("Pessoa Jurídica com CNPJ já cadastrado.");
	}
	PessoaJuridica pessoaAdicionada = pessoaJuridicaRepository.save(pessoaJuridica);
	// Adicionar a pessoa à fila de atendimento
	filaDeAtendimento.adicionarCliente(pessoaAdicionada);

	filaDeAtendimento.imprimirFila();
	return pessoaAdicionada;
}

//@Override
//public PessoaJuridica createPessoaJuridica(PessoaJuridica pessoaJuridica) {
//	// Validate the entity before saving
//	Set<ConstraintViolation<PessoaJuridica>> violations = validator.validate(pessoaJuridica);
//	System.out.println("Validation");
//	System.out.println(violations);
//	if (!violations.isEmpty()) {
//		// Handle validation errors
//		throw new ConstraintViolationException(violations);
//	}
//
//	return pessoaJuridicaRepository.save(pessoaJuridica);
//}

	@Override
	public PessoaJuridica updatePessoaJuridica(PessoaJuridica pessoaJuridica) {
		System.out.println("updatePessoaJuridica");
		Optional<PessoaJuridica> pessoaJuridicaDb = this.pessoaJuridicaRepository.findById(pessoaJuridica.getId());

		if (pessoaJuridicaDb.isPresent()) {
			PessoaJuridica pessoaJuridicaUpdate = pessoaJuridicaDb.get();

			// Verifique se a pessoa está na fila
			if (filaDeAtendimento.contemCliente(pessoaJuridicaUpdate)) {
				// Se estiver na fila, remova-a antes de atualizar
				filaDeAtendimento.removerCliente(pessoaJuridicaUpdate);
			}

			pessoaJuridicaUpdate.setId(pessoaJuridica.getId());
			pessoaJuridicaUpdate.setRazaoSocial(pessoaJuridica.getRazaoSocial());
			pessoaJuridicaUpdate.setMcc(pessoaJuridica.getMcc());
			pessoaJuridicaUpdate.setCpfContato(pessoaJuridica.getCpfContato());
			pessoaJuridicaUpdate.setEmailContato(pessoaJuridica.getEmailContato());

			// Atualize a Pessoa Jurídica
			PessoaJuridica pessoaAtualizada = pessoaJuridicaRepository.save(pessoaJuridicaUpdate);

			// Adicione a pessoa atualizada à fila de atendimento
			filaDeAtendimento.adicionarCliente(pessoaAtualizada);

			filaDeAtendimento.imprimirFila();
			return pessoaAtualizada;
		} else {
			throw new ResourceNotFoundException("Pessoa Jurídica com ID não encontrado : " + pessoaJuridica.getId());
		}
	}

	@Override
	public List<PessoaJuridica> getAllPessoaJuridica() {
		return this.pessoaJuridicaRepository.findAll();
	}

	@Override
	public PessoaJuridica getPessoaJuridicaById(long pessoaJuridicaId) {
		Optional<PessoaJuridica> pessoaJuridicaDb = this.pessoaJuridicaRepository.findById(pessoaJuridicaId);

		if (pessoaJuridicaDb.isPresent()) {
			return pessoaJuridicaDb.get();
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + pessoaJuridicaId);
		}
	}

	@Override
	public void deletePessoaJuridica(long id) {
		Optional<PessoaJuridica> pessoaJuridicaDb = this.pessoaJuridicaRepository.findById(id);

		if (pessoaJuridicaDb.isPresent()) {
			this.pessoaJuridicaRepository.delete(pessoaJuridicaDb.get());
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + id);
		}
	}

	public PessoaJuridica adicionarPessoaJuridica(PessoaJuridica pessoaJuridica) {
		// Lógica para adicionar a pessoa ao sistema
		PessoaJuridica pessoaAdicionada = pessoaJuridicaRepository.save(pessoaJuridica);

		// Adicionar a pessoa à fila de atendimento
		filaDeAtendimento.adicionarCliente(pessoaAdicionada);

		return pessoaAdicionada;
	}

	public PessoaJuridica retirarProximoClienteDaFila() {
		// Verifique se a fila está vazia
		if (filaDeAtendimento.estaVazia()) {
			throw new FilaDeAtendimentoVaziaException("A fila de atendimento está vazia.");
		}

		// Retire o próximo cliente da fila
		return filaDeAtendimento.retirarProximoCliente();
	}
}
