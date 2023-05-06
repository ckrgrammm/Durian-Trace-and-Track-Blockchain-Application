window.addEventListener('load', async function () {

    const ABI =[
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
                    "internalType": "string",
                    "name": "newCategory",
                    "type": "string"
                }
            ],
            "name": "CategoryUpdated",
            "type": "event"
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
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "comment",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "CommentSubmitted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                }
            ],
            "name": "PaymentToAddress",
            "type": "event"
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
                    "internalType": "string",
                    "name": "newTree",
                    "type": "string"
                }
            ],
            "name": "TreeUpdated",
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
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_category",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_tree",
                    "type": "string"
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
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                }
            ],
            "name": "confirmReceivedFromDistributor",
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
                }
            ],
            "name": "confirmReceivedFromRetailer",
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
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_newCategory",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_newTree",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_newPrice",
                    "type": "uint256"
                }
            ],
            "name": "editProduct",
            "outputs": [],
            "stateMutability": "nonpayable",
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
            "inputs": [],
            "name": "getAllProduct",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
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
                    "name": "_batchNumber",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_comment",
                    "type": "string"
                }
            ],
            "name": "leaveComment",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "productAll",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
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
                },
                {
                    "internalType": "string",
                    "name": "category",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "distributorReceivedDate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "retailerReceivedDate",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "comment",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "tree",
                    "type": "string"
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
        }
    ];

    const Address = "0x4aDF04BF15615E959D33DA64a44A396A3F2FE5b5";
    window.web3 = await new Web3(window.ethereum); //how to access to smart contract 
    window.contract = await new window.web3.eth.Contract(ABI, Address); //how you create an instance of that contract by using the abi and address  
});