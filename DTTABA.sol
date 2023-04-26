//SPDX-License-Identifier:MIT

pragma solidity ^0.8.0;

//import "./AccessControl.sol";
//in contract DTTBA, add is AccessControl to use inherit the access control sol
contract DTTBA {
    address public farmer;
    address public distributor;
    address public retailer;
    address public consumer;
    // address public distributorAddress;

    struct Product {
        address farmer;
        address distributor;
        address retailer;
        address consumer;
        string batchNumber;
        uint256 date;
        uint256 price;
        string category;
        uint256 distributorReceivedDate;
        uint256 retailerReceivedDate;
        string comment;
        string tree;
    }

    // Farmer add product.
    // Distributor buy product from farmer
    // Retailer buy product from distributor
    // Consumer buy product from retailer.

    constructor() {
        farmer = msg.sender;
        distributor = msg.sender;
        retailer = msg.sender;
        consumer = msg.sender;
    }

    // uint256 private productIndex = 0;
    // mapping(string => Product) private products;
    mapping(string => Product) public products;
    string[] public productAll;

    function getAllProduct(
     ) view public returns (string[] memory) {
        return productAll;
    }

    event TransferOwnership(
        string indexed batchNumber,
        address indexed previousOwner,
        address indexed newOwner
    );

    event ProductShipped(
        string indexed _batchNumber,
        address indexed _distributor,
        uint256 indexed timestamp
    );

    event PriceUpdated(string indexed batchNumber, uint256 newPrice);
    event CommentSubmitted(
        string indexed batchNumber,
        address indexed user,
        string comment,
        uint256 timestamp
    );

    modifier onlyFarmer() {
        require(msg.sender == farmer, "Only Farmer can perform this action");
        _;
    }

    modifier onlyDistributor() {
        require(
            msg.sender == distributor,
            "Only Distributor can perform this action"
        );
        _;
    }

    modifier onlyRetailer() {
        require(
            msg.sender == retailer,
            "Only Retaiiler can perform this action"
        );
        _;
    }

    function addProduct(
        string memory _batchNumber,
        uint256 _price,
        string memory _category,
        string memory _tree

    ) public {
        require(
            products[_batchNumber].farmer == address(0),
            "Product already exists"
        );

        address sender = msg.sender;

        if (farmer == address(0)) {
            farmer = sender;
        }

        require(sender == farmer, "Only farmer can add product");

        products[_batchNumber] = Product({
            farmer: sender,
            distributor: address(0),
            retailer: address(0),
            consumer: address(0),
            batchNumber: _batchNumber,
            date: block.timestamp,
            price: _price,
            category: _category,
            tree: _tree,
            distributorReceivedDate: 0,
            retailerReceivedDate: 0,
            comment: ""
            
        });
            productAll.push(_batchNumber);
    }

    //Distributor Buy from Farmer

    function buyFromFarmer(string memory _batchNumber)
        public
        payable
        onlyDistributor
    {
        require(
            products[_batchNumber].farmer != address(0),
            "Product does not exist"
        );
        require(
            products[_batchNumber].distributor == address(0),
            "Product already sold"
        );
        require(
            msg.sender != products[_batchNumber].farmer,
            "Farmers are not allowed to buy their own product"
        );

        Product storage product = products[_batchNumber];
        uint256 price = product.price;

        require(
            msg.value >= price,
            "Insufficient payment for full price of product"
        );

        product.distributor = msg.sender;

        uint256 change = msg.value - price;
        if (change > 0) {
            payable(msg.sender).transfer(change);
        }

        emit TransferOwnership(_batchNumber, product.farmer, msg.sender);
    }

    function updatePriceD(string memory _batchNumber, uint256 _newPrice)
        public
        onlyDistributor
    {
        require(
            products[_batchNumber].distributor == msg.sender,
            "You do not have ownership of this product"
        );
        require(_newPrice > 0, "Price must be greater than 0");

        products[_batchNumber].price = _newPrice;

        emit PriceUpdated(_batchNumber, _newPrice);
    }

       function buyFromDistributor(string memory _batchNumber)
        public
        payable
        onlyRetailer
    {
        require(
            products[_batchNumber].distributor != address(0),
            "Product is not available yet"
        );
        require(
            products[_batchNumber].retailer == address(0),
            "Product already bought by a retailer"
        );
        require(
            msg.sender != products[_batchNumber].distributor,
            "Distributors are not allowed to buy their own product"
        );
        require(msg.value >= products[_batchNumber].price, "Insufficient payment");

        Product storage product = products[_batchNumber];

        product.retailer = msg.sender;
        product.date = block.timestamp;

        uint256 change = msg.value - product.price;
        if (change > 0) {
            payable(msg.sender).transfer(change);
        }

        emit TransferOwnership(_batchNumber, product.distributor, msg.sender);

        product.price = product.price; // This line is not necessary and can be removed
    }

    function updatePriceR(string memory _batchNumber, uint256 _newPrice)
        public
        onlyRetailer
    {
        require(
            products[_batchNumber].retailer == msg.sender,
            "You don't own this product"
        );
        require(_newPrice > 0, "Price must be greater than 0");

        Product storage product = products[_batchNumber];

        product.price = _newPrice;

        emit PriceUpdated(_batchNumber, _newPrice);
    }

    function buyProduct(string memory _batchNumber) public payable {
        require(
            products[_batchNumber].retailer != address(0),
            "Product does not exist"
        );
        require(
            products[_batchNumber].distributor != address(0),
            "Product not available"
        );
        require(
            products[_batchNumber].consumer == address(0),
            "Product already sold"
        );
        require(
            msg.sender != products[_batchNumber].retailer,
            "Retailers are not allowed to buy their own product"
        );

        uint256 price = products[_batchNumber].price;
        require(msg.value >= price, "Insufficient payment");

        Product storage product = products[_batchNumber];

        product.consumer = msg.sender;

        uint256 change = msg.value - price;
        if (change > 0) {
            payable(msg.sender).transfer(change);
        }

        emit TransferOwnership(_batchNumber, product.retailer, msg.sender);
    }

    function leaveComment(string memory _batchNumber, string memory _comment)
        public
    {
        require(
            products[_batchNumber].consumer == msg.sender,
            "Only the consumer who purchased this product can leave a comment"
        );
        require(
            bytes(products[_batchNumber].comment).length == 0,
            "Comment already submitted for this product"
        );

        products[_batchNumber].comment = _comment;

        emit CommentSubmitted(
            _batchNumber,
            msg.sender,
            _comment,
            block.timestamp
        );
    }

    function confirmReceivedFromDistributor(string memory _batchNumber)
        public
        onlyDistributor
    {
        require(
            products[_batchNumber].distributor == msg.sender,
            "Only the distributor who purchased this product can confirm receipt"
        );
        require(
            products[_batchNumber].distributorReceivedDate == 0,
            "Product receipt already confirmed by the distributor"
        );

        products[_batchNumber].distributorReceivedDate = block.timestamp;
    }

    function confirmReceivedFromRetailer(string memory _batchNumber)
        public
        onlyRetailer
    {
        require(
            products[_batchNumber].retailer == msg.sender,
            "Only the retailer who purchased this product can confirm receipt"
        );
        require(
            products[_batchNumber].retailerReceivedDate == 0,
            "Product receipt already confirmed by the retailer"
        );

        products[_batchNumber].retailerReceivedDate = block.timestamp;
    }

    //Trace Current Owner
    function getCurrentOwner(string memory _batchNumber)
        public
        view
        returns (address)
    {
        require(
            products[_batchNumber].farmer != address(0),
            "Product does not exist"
        );

        if (products[_batchNumber].consumer != address(0)) {
            return products[_batchNumber].consumer;
        } else if (products[_batchNumber].retailer != address(0)) {
            return products[_batchNumber].retailer;
        } else if (products[_batchNumber].distributor != address(0)) {
            return products[_batchNumber].distributor;
        } else {
            return products[_batchNumber].farmer;
        }
    }

    function setDistributor(address _distributor) public onlyFarmer {
        require(_distributor != address(0), "Invalid Distributor address");
        distributor = _distributor;
    }

    function setRetailer(address _retailer) public onlyFarmer {
        require(_retailer != address(0), "Invalid Retailer address");
        retailer = _retailer;
    }
}

// add the shipping function required the timestap functions of the product , and the consumer can add the comment
// put a received function

//92148 is the owner address then depploy
//now need to set distributor and retialer first copy address
// now we got distributor and retailer
//now owner address register
//owner is equal to farmer
//now use distributor to buy 1durian switch address
//then u can see the current address is change to the distributor d
//40225 is the distributor
//then after the distributor can update the product price
//if you now see, the product price is change to 30.
//now use retailer address to buy
//get again the current owner wil change to the retailer
//same goes to the consumer