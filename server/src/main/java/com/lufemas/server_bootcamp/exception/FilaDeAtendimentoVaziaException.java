package com.lufemas.server_bootcamp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Defina o status HTTP desejado para a exceção
public class FilaDeAtendimentoVaziaException extends RuntimeException {

    public FilaDeAtendimentoVaziaException(String message) {
        super(message);
    }

    public FilaDeAtendimentoVaziaException(String message, Throwable cause) {
        super(message, cause);
    }
}
