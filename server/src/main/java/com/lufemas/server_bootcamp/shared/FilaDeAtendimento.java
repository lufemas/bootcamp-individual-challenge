package com.lufemas.server_bootcamp.shared;

import com.lufemas.server_bootcamp.model.Cliente;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class FilaDeAtendimento<T extends Cliente> {
    private Queue<T> fila = new LinkedList<>();

    // Método para adicionar um cliente à fila
    public void adicionarCliente(T cliente) {
        fila.offer(cliente);
    }

    // Método para retirar o próximo cliente da fila
    public T retirarProximoCliente() {
        return fila.poll();
    }

    // Método para verificar se a fila está vazia
    public boolean estaVazia() {
        return fila.isEmpty();
    }

    public boolean contemCliente(T cliente) {
        for (T item : fila) {
            if (item.getId() == cliente.getId()) {
                System.out.println("Cliente encontrado na fila com ID: " + cliente.getId());
                return true;
            }
        }
        System.out.println("Cliente não encontrado na fila com ID: " + cliente.getId());
        return false;
    }

    public void removerCliente(T cliente) {
        if (fila.contains(cliente)) {
            System.out.println("Removendo da fila: " + cliente.toString());
            fila.remove(cliente);
        } else {
            System.out.println("Cliente não encontrado na fila.");
        }
    }

    public List<T> getFila() {
        return new ArrayList<>(fila);
    }

    public void imprimirFila() {
        System.out.println("Itens na fila de atendimento:");
        int posicao = 1;
        for (T cliente : fila) {
            System.out.println("Posição " + posicao + ": " + cliente.toString());
            posicao++;
        }
    }
}