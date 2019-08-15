import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../web3';
import bolao from '../bolao';

class JogadorRow extends Component {
  constructor(props) {
    super(props);
	  console.log("props");
	  console.log(props.apostas[0]);
	  this.state = {
		  nome: props.apostas[0].nome,
		  carteira: props.apostas[0].carteira,
		  apostas: props.apostas[0].apostas
	  };
  };

  render() {

    const { Row, Cell } = Table;

    return (
      <Row>
        <Cell>{this.state.nome}</Cell>
        <Cell>{this.state.carteira}</Cell>
	<Cell></Cell>
        <Cell>{this.state.apostas}</Cell>
      </Row>
    );
  }
}

export default JogadorRow;
