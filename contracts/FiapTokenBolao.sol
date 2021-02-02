pragma solidity ^0.5.0;

import "./FiapToken.sol";
import "./WhitelistAdminRole.sol";


contract FiapTokenBolao is WhitelistAdminRole {
    address private fiapTokenAddress;

    struct Jogador {
        string nome;
        address carteira;
        uint256 apostas;
        bool isValue;
    }

    event ApostaEvent(
        address indexed carteira,
        string nome,
        uint256 apostas,
        uint256 apostasTotal,
        uint256 premio
    );

    event FimDeJogoEvent(
        address indexed carteira,
        string ganhador,
        uint256 premio
    );

    mapping(address => Jogador) public jogadoresInfo;
    address private gerente;
    address[] public jogadores;
    address[] public apostas;
    uint256 public premio;
    uint256 public numApostas;
    uint256 public valorAposta;

    function entrar(string memory pNome) public {
        if (FiapToken(fiapTokenAddress).balanceOf(msg.sender) >= valorAposta) {
            if (jogadoresInfo[msg.sender].isValue == false) {
                jogadoresInfo[msg.sender] = Jogador({ nome: pNome, carteira: msg.sender, apostas: 1, isValue: true});
                jogadores.push(msg.sender);
            } else {
                jogadoresInfo[msg.sender].apostas = jogadoresInfo[msg.sender].apostas + 1;
            }
            FiapToken(fiapTokenAddress).burnFrom(msg.sender, msg.sender, valorAposta);
            apostas.push(msg.sender);
            numApostas++;
            premio = premio + valorAposta;
            emit ApostaEvent(msg.sender, jogadoresInfo[msg.sender].nome, jogadoresInfo[msg.sender].apostas, numApostas, premio);
        }
    }

    function escolherGanhador() public restricted {
        uint index = randomico() % apostas.length;
        FiapToken(fiapTokenAddress).mint(apostas[index], premio);
        if (jogadoresInfo[apostas[index]].isValue == true) {
            emit FimDeJogoEvent(apostas[index], jogadoresInfo[apostas[index]].nome, premio);
        }
        limpar();
    }

    modifier restricted() {
        require(msg.sender == gerente);
        _;
    }

    function getJogadores() public view returns (address[] memory) {
        return jogadores;
    }

    function getApostas() public view returns (address[] memory) {
        return apostas;
    }

    function getJogadorPorId(address id) public view returns(string memory, address, uint256) {
        return (jogadoresInfo[id].nome, jogadoresInfo[id].carteira, jogadoresInfo[id].apostas);
    }

    function getGerente() public view returns (address) {
        return gerente;
    }

    function getSaldo() public view returns (uint256) {
        return premio;
    }

    function getValorAposta() public view returns (uint256) {
        return valorAposta;
    }

    function setValorAposta(uint256 _valorAposta) public {
        valorAposta = _valorAposta;
    }

    function dobrar() public restricted {
        premio = premio*2;
    }

    function limpar() private {
        for (uint i=0;  i < jogadores.length;i++) {
            jogadoresInfo[jogadores[i]].isValue = false;
        }
        jogadores = new address[](0);
        apostas = new address[](0);
        numApostas = 0;
        premio = 0;
    }

    function randomico() private view returns (uint) {
        uint(keccak256(abi.encodePacked(block.difficulty, now, jogadores)));
    }

    constructor(address _fiapTokenAddress) public {
    gerente = msg.sender;
    numApostas = 0;
    premio = 0;
    fiapTokenAddress = _fiapTokenAddress;
    valorAposta = 10;
    }
}
