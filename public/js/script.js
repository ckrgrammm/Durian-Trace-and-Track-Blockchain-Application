window.addEventListener('load', async function () {

    const ABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                }
            ],
            "name": "addProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_expectedPrice",
                    "type": "uint256"
                }
            ],
            "name": "buyFromDistributor",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "buyFromFarmer",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                }
            ],
            "name": "buyProduct",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "batchNumber",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newPrice",
                    "type": "uint256"
                }
            ],
            "name": "PriceUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "_distributor",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "ProductShipped",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_distributor",
                    "type": "address"
                }
            ],
            "name": "setDistributor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_retailer",
                    "type": "address"
                }
            ],
            "name": "setRetailer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_distributor",
                    "type": "address"
                }
            ],
            "name": "shipToDistributor",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_retailer",
                    "type": "address"
                }
            ],
            "name": "shipToRetailer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "string",
                    "name": "batchNumber",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "TransferOwnership",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_newPrice",
                    "type": "uint256"
                }
            ],
            "name": "updatePriceD",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_newPrice",
                    "type": "uint256"
                }
            ],
            "name": "updatePriceR",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "consumer",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "distributor",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "farmer",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                }
            ],
            "name": "getCurrentOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "name": "products",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "farmer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "distributor",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "retailer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "consumer",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "retailer",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const Address = "0x19C21c64C58bB17046Cb87Fa409335d66A1071b2";
    window.web3 = await new Web3(window.ethereum); //how to access to smart contract 
    window.contract = await new window.web3.eth.Contract(ABI, Address); //how you create an instance of that contract by using the abi and address  
});