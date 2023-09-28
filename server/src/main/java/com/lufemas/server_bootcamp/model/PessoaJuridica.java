package com.lufemas.server_bootcamp.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "pessoa_juridica")
public class PessoaJuridica implements Cliente{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@NotBlank(message = "Mandatory")
	@NotNull(message = "Mandatory")
	@Size(max = 14)
	@Pattern(regexp = "^[0-9]{14}$", message = "O CNPJ deve conter 14 dígitos formatados com zeros à esquerda")
	@Column(name = "cnpj") // Corrected column name
	private String cnpj;

	@NotBlank
	@NotNull
	@Size(max = 50)
	@Column(name = "razao_social") // Adjusted column name
	private String razaoSocial;

	@NotBlank
	@NotNull
	@Size(max = 4)
	@Column(name = "mcc")
	private String mcc;

	@NotBlank
	@NotNull
	@Size(max = 11)
	@Pattern(regexp = "^[0-9]{11}$", message = "O CPF do contato deve conter 11 dígitos formatados com zeros à esquerda")
	@Column(name = "cpf_contato") // Adjusted column name
	private String cpfContato;

	@NotBlank (message = "Nome do contato deve receber um valor valido")
	@NotNull
	@Size(max = 50)
	@Column(name = "nome_contato") // Adjusted column name
	private String nomeContato;

	@NotBlank
	@NotNull
	@Size(max = 50)
	@Email(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
			message = "O email do contato deve ser válido")
	@Column(name = "email_contato") // Adjusted column name
	private String emailContato;

	@CreationTimestamp
	private Date createdAt;

	@CreationTimestamp
	private Date updatedAt;

	@Override
	public String toString() {
		return "ID: " + getId() + ", CNPJ: " + getCnpj() + ", Razão Social: " + getRazaoSocial();
	}

	@Override
	public boolean equals(Object o) {
		// Verifica se o objeto atual (this) é igual ao objeto sendo comparado (o).
		if (this == o) return true;

		// Verifica se o objeto sendo comparado (o) é nulo ou pertence a uma classe diferente.
		if (o == null || getClass() != o.getClass()) return false;

		// Faz um cast do objeto sendo comparado (o) para o tipo da classe atual (PessoaJuridica).
		PessoaJuridica that = (PessoaJuridica) o;

		// Compara os IDs dos objetos atual (this) e sendo comparado (that).
		// Se os IDs forem iguais, consideramos os objetos como iguais.
		return id == that.id;
	}

	@Override
	public int hashCode() {
		// Calcula o código de hash com base no campo 'id' do objeto.
		return Objects.hash(id);
	}

	// Getter and Setter methods
	@Override
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getRazaoSocial() {
		return razaoSocial;
	}

	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}

	public String getMcc() {
		return mcc;
	}

	public void setMcc(String mcc) {
		this.mcc = mcc;
	}

	public String getCpfContato() {
		return cpfContato;
	}

	public void setCpfContato(String cpfContato) {
		this.cpfContato = cpfContato;
	}

	public String getNomeContato() {
		return nomeContato;
	}

	public void setNomeContato(String nomeContato) {
		this.nomeContato = nomeContato;
	}


	public String getEmailContato() {
		return emailContato;
	}

	public void setEmailContato(String emailContato) {
		this.emailContato = emailContato;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
}
