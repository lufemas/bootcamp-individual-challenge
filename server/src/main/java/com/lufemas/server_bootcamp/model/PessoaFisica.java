package com.lufemas.server_bootcamp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "pessoa_fisica")
public class PessoaFisica implements Cliente{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Cpf é obrigatório")
    @NotNull(message = "Cpf incorreto")
    @Size(max = 11)
    @Pattern(regexp = "^[0-9]{11}$", message = "O CPF deve conter 11 dígitos formatados com zeros à esquerda")
    @Column(name = "cpf")
    private String cpf;

    @NotBlank(message = "MCC é obrigatório")
    @NotNull(message = "MCC Incorreto")
    @Size(max = 4)
    @Column(name = "mcc")
    private String mcc;

    @NotBlank
    @NotNull
    @Size(max = 50)
    @Column(name = "nome")
    private String nome;

    @NotBlank
    @NotNull
    @Size(max = 50)
    @Email(regexp = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
            message = "O email deve ser válido")
    @Column(name = "email")
    private String email;

    @CreationTimestamp
    private Date createdAt;

    @CreationTimestamp
    private Date updatedAt;

    // Getter and Setter methods
    @Override
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getMcc() {
        return mcc;
    }

    public void setMcc(String mcc) {
        this.mcc = mcc;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
