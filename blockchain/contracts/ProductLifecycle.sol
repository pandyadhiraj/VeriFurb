// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductLifecycle {
    struct Refurbishment {
        uint timestamp;
        string details;
        string[] replacedComponents;
        string technicianName;
        string certificateHash;
        uint warrantyExtension;
        uint refurbishmentCost;
        string newSerialNumber;
    }

    struct Product {
        uint id;
        string name;
        string category;
        string manufacturer;
        uint manufactureYear;
        string serialNumber;
        uint warrantyPeriod;
        string condition;
        string locationOfRegistration;
        bool isRefurbished;
        Refurbishment[] refurbishments;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    // ✅ Events now have `indexed` parameters for filtering in React
    event ProductRegistered(uint indexed id, string name, string category, string manufacturer);
    event ProductRefurbished(uint indexed id, string technicianName, string certificateHash, uint timestamp);

    function registerProduct(
        string memory _name, 
        string memory _category, 
        string memory _manufacturer, 
        uint _manufactureYear, 
        string memory _serialNumber, 
        uint _warrantyPeriod, 
        string memory _condition, 
        string memory _locationOfRegistration
    ) public {
        productCount++;

        Product storage newProduct = products[productCount];
        newProduct.id = productCount;
        newProduct.name = _name;
        newProduct.category = _category;
        newProduct.manufacturer = _manufacturer;
        newProduct.manufactureYear = _manufactureYear;
        newProduct.serialNumber = _serialNumber;
        newProduct.warrantyPeriod = _warrantyPeriod;
        newProduct.condition = _condition;
        newProduct.locationOfRegistration = _locationOfRegistration;
        newProduct.isRefurbished = false;

        // ✅ Emit event with `indexed` product ID
        emit ProductRegistered(productCount, _name, _category, _manufacturer);
    }

    function refurbishProduct(
        uint _id, 
        string memory _details, 
        string[] memory _replacedComponents, 
        string memory _technicianName, 
        string memory _certificateHash, 
        uint _warrantyExtension, 
        uint _refurbishmentCost, 
        string memory _newSerialNumber
    ) public {
        require(_id > 0 && _id <= productCount, "Invalid product ID");

        products[_id].isRefurbished = true;
        products[_id].refurbishments.push(Refurbishment(
            block.timestamp, _details, _replacedComponents, 
            _technicianName, _certificateHash, _warrantyExtension, 
            _refurbishmentCost, _newSerialNumber
        ));

        // ✅ Emit event with `indexed` product ID
        emit ProductRefurbished(_id, _technicianName, _certificateHash, block.timestamp);
    }

    function getProduct(uint _id) public view returns (Product memory) {
        require(_id > 0 && _id <= productCount, "Invalid product ID");
        return products[_id];
    }
}
