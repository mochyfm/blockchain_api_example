// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract SecureMessaging {
    struct Message {
        address sender;
        address receiver; // Añadido el destinatario al mensaje
        string content;
    }

    mapping(address => mapping(address => Message[])) private conversations;
    mapping(address => address[]) private interactedAddresses;
    // Un nuevo mapping para rastrear si una dirección ya interactuó con otra
    mapping(address => mapping(address => bool)) private hasInteracted;

    function sendMessage(address _recipient, string memory _encryptedContent) external {
        conversations[msg.sender][_recipient].push(Message(msg.sender, _recipient, _encryptedContent)); // Añadido _recipient en la creación de Message
        
        // Verificar y registrar el remitente si aún no ha interactuado con el destinatario
        if (!hasInteracted[msg.sender][_recipient]) {
            interactedAddresses[msg.sender].push(_recipient);
            hasInteracted[msg.sender][_recipient] = true;
        }
        
        // Verificar y registrar el destinatario si aún no ha interactuado con el remitente
        if (!hasInteracted[_recipient][msg.sender]) {
            interactedAddresses[_recipient].push(msg.sender);
            hasInteracted[_recipient][msg.sender] = true;
        }
    }

    function getAllConversations() external view returns (Message[] memory) {
        uint totalMessages = 0;

        // Primero, contar todos los mensajes para dimensionar el array de salida
        for(uint i = 0; i < interactedAddresses[msg.sender].length; i++) {
            totalMessages += conversations[msg.sender][interactedAddresses[msg.sender][i]].length;
            totalMessages += conversations[interactedAddresses[msg.sender][i]][msg.sender].length;
        }

        Message[] memory allMessages = new Message[](totalMessages);
        uint currentIndex = 0;

        // Luego, rellenar el array de salida con los mensajes
        for(uint i = 0; i < interactedAddresses[msg.sender].length; i++) {
            address otherParty = interactedAddresses[msg.sender][i];
            for(uint j = 0; j < conversations[msg.sender][otherParty].length; j++) {
                allMessages[currentIndex++] = conversations[msg.sender][otherParty][j];
            }
            for(uint j = 0; j < conversations[otherParty][msg.sender].length; j++) {
                allMessages[currentIndex++] = conversations[otherParty][msg.sender][j];
            }
        }

        return allMessages;
    }
}
