const path = require('path');
const fs = require('fs');
const solc = require('solc');

const bolaoPath = path.resolve(__dirname, 'contracts', 'FiapTokenBolao.sol');
const source = fs.readFileSync(bolaoPath, 'UTF-8');

//console.log(solc.compile(source, 1));
//module.exports = solc.compile(source, 1).contracts[':FiapTokenBolao']

//var solc = require('solc')

var input = {
	language: 'Solidity',
	sources: {
		'FiapTokenBolao.sol': {
			content: 'contract C { function f() public { } }'
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': [ '*' ]
			}
		}
	}
}

var output = JSON.parse(solc.compile(JSON.stringify(input)))

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['FiapTokenBolao.sol.sol']) {
	console.log(contractName + ': ' + output.contracts['FiapTokenBolao.sol.sol'][contractName].evm.bytecode.object)
}
