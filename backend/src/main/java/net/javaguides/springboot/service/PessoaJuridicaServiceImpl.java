package net.javaguides.springboot.service;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.PessoaJuridica;
import net.javaguides.springboot.repository.PessoaJuridicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PessoaJuridicaServiceImpl implements PessoaJuridicaService {

	@Autowired
	private PessoaJuridicaRepository pessoaJuridicaRepository;

	@Override
	public PessoaJuridica createPessoaJuridica(PessoaJuridica pessoaJuridica) {
		return pessoaJuridicaRepository.save(pessoaJuridica);
	}

	@Override
	public PessoaJuridica updatePessoaJuridica(PessoaJuridica pessoaJuridica) {
		Optional<PessoaJuridica> pessoaJuridicaDb = this.pessoaJuridicaRepository.findById(pessoaJuridica.getId());

		if (pessoaJuridicaDb.isPresent()) {
			PessoaJuridica pessoaJuridicaUpdate = pessoaJuridicaDb.get();
			pessoaJuridicaUpdate.setId(pessoaJuridica.getId());
			pessoaJuridicaUpdate.setRazaoSocial(pessoaJuridica.getRazaoSocial());
			pessoaJuridicaUpdate.setMcc(pessoaJuridica.getMcc());
			pessoaJuridicaUpdate.setCpfContato(pessoaJuridica.getCpfContato());
			pessoaJuridicaUpdate.setEmailContato(pessoaJuridica.getEmailContato());
			return pessoaJuridicaRepository.save(pessoaJuridicaUpdate);
		} else {
			throw new ResourceNotFoundException("Record not found with id : " + pessoaJuridica.getId());
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
}
