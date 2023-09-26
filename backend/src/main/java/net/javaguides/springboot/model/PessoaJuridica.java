package net.javaguides.springboot.model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;

//import javax.validation.Valid;
//import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "pessoa_juridica")
public class PessoaJuridica {
	@Valid

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
	@Size(max = 50)
	@Column(name = "razao_social") // Adjusted column name
	private String razaoSocial;

	@Size(max = 4)
	@Column(name = "mcc")
	private String mcc;

	@NotBlank
	@Size(max = 11)
	@Pattern(regexp = "^[0-9]{11}$", message = "O CPF do contato deve conter 11 dígitos formatados com zeros à esquerda")
	@Column(name = "cpf_contato") // Adjusted column name
	private String cpfContato;

	@NotBlank
	@Size(max = 50)
	@Column(name = "nome_contato") // Adjusted column name
	private String nomeContato;

	@NotBlank
	@Size(max = 50)
	@Email(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
			message = "O email do contato deve ser válido")
	@Column(name = "email_contato") // Adjusted column name
	private String emailContato;

	@CreationTimestamp
	private Date createdAt;

	@CreationTimestamp
	private Date updatedAt;

	// Getter and Setter methods
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
