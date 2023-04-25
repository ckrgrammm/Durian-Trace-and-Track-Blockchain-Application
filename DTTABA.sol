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

    event ProductShipped(string indexed _batchNumber, address indexed _distributor, uint256 indexed timestamp);

    event PriceUpdated(string indexed batchNumber, uint256 newPrice);

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

    function addProduct(string memory _batchNumber, uint256 _price) public {
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
            price: _price
        });
            productAll.push(_batchNumber);
    }

    //Distributor Buy from Farmer

    function buyFromFarmer(string memory _batchNumber, uint256 _amount)
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

        require(msg.value >= _amount, "Insufficient payment");
        require(_amount > 0, "Amount must be greater than 0");

        product.distributor = msg.sender;

        uint256 change = msg.value - _amount;
        if (change > 0) {
            payable(msg.sender).transfer(change);
        }

        emit TransferOwnership(_batchNumber, product.farmer, msg.sender);

        // Check if the distributor wants to set a new price
        if (_amount > price) {
            product.price = _amount;
        }
    }

    // function buyFromFarmer(string memory _batchNumber)
    //     public
    //     payable
    //     onlyDistributor
    // {
    //     require(
    //         products[_batchNumber].farmer != address(0),
    //         "Product does not exist"
    //     );
    //     require(
    //         products[_batchNumber].distributor == address(0),
    //         "Product already sold"
    //     );
    //     require(
    //         msg.sender != products[_batchNumber].farmer,
    //         "Farmers are not allowed to buy their own product"
    //     );

    //     Product storage product = products[_batchNumber];
    //     uint256 price = product.price;

    //     require(msg.value >= price, "Insufficient payment");
    //     require(price > 0, "Price not set");

    //     product.distributor = msg.sender;

    //     uint256 change = msg.value - price;
    //     if (change > 0) {
    //         payable(msg.sender).transfer(change);
    //     }

    //     emit TransferOwnership(_batchNumber, product.farmer, msg.sender);

    //     // Check if the distributor wants to set a new price
    //     if (msg.value > price) {
    //         product.price = msg.value;
    //     }
    // }

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

    //Buy Product From Distributor
    // function buyFromDistributor(string memory _batchNumber) public payable {
    //     require(
    //         products[_batchNumber].distributor != address(0),
    //         "Product is not available yet"
    //     );
    //     require(
    //         products[_batchNumber].retailer == address(0),
    //         "Product already bought by a retailer"
    //     );
    //     require(
    //         msg.sender != products[_batchNumber].distributor,
    //         "Distributors are not allowed to buy their own product"
    //     );
    //     require(
    //         msg.sender == retailer,
    //         "Only retailers can buy from distributors"
    //     );

    //     products[_batchNumber].retailer = msg.sender;
    //     products[_batchNumber].date = block.timestamp;

    //     payable(products[_batchNumber].distributor).transfer(msg.value);
    // }

    function buyFromDistributor(
        string memory _batchNumber,
        uint256 _expectedPrice
    ) public payable onlyRetailer {
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
        require(msg.value >= _expectedPrice, "Insufficient payment");

        Product storage product = products[_batchNumber];

        require(product.price == _expectedPrice, "Incorrect price");

        product.retailer = msg.sender;
        product.date = block.timestamp;

        uint256 change = msg.value - _expectedPrice;
        if (change > 0) {
            payable(msg.sender).transfer(change);
        }

        emit TransferOwnership(_batchNumber, product.distributor, msg.sender);

        product.price = _expectedPrice;
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

function shipToDistributor(string memory _batchNumber, address _distributor)
    public
{
    require(
        products[_batchNumber].farmer == msg.sender,
        "You don't own this product"
    );
    require(
        products[_batchNumber].distributor == address(0),
        "Product already shipped"
    );

    products[_batchNumber].distributor = _distributor;

    emit ProductShipped(_batchNumber, _distributor, block.timestamp);
}


    function shipToRetailer(string memory _batchNumber, address _retailer)
        public
    {
        require(
            products[_batchNumber].distributor == msg.sender,
            "You don't own this product"
        );
        require(
            products[_batchNumber].retailer == address(0),
            "Product already shipped"
        );

        products[_batchNumber].retailer = _retailer;
    }

  

    // I think this function is replaced by the buyProduct function
    // function sellToConsumer(string memory _batchNumber, address _consumer)
    //     public
    // {
    //     require(
    //         products[_batchNumber].retailer == msg.sender,
    //         "You don't own this product"
    //     );
    //     require(
    //         products[_batchNumber].consumer == address(0),
    //         "Product already sold"
    //     );

    //     products[_batchNumber].consumer = _consumer;
    // }

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