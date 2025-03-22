// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductLifecycle {
    struct Refurbishment {
        uint256 timestamp;
        string details;
        string[] replacedComponents;
        string technicianName;
        string certificateHash;
        uint256 warrantyExtension;
        uint256 refurbishmentCost;
        string newSerialNumber;
    }

    struct Smartphone {
        uint256 id;
        string brand;
        string model;
        string osVersion;
        string imeiNumber;
        string manufactureDate;
        string serialNumber;
        uint256 warrantyPeriod;
        string condition;
        string locationOfRegistration;
        bool isRefurbished;
    }

    mapping(uint256 => Smartphone) public smartphones;
    mapping(uint256 => Refurbishment[]) public refurbishments; // ✅ Separate mapping for refurbishments
    mapping(string => bool) private imeiRegistered;
    uint256 public smartphoneCount;

    event SmartphoneRegistered(uint256 indexed id, string imeiNumber);
    event SmartphoneRefurbished(uint256 indexed id, string technicianName);

    // ✅ Register a new smartphone
    function registerSmartphone(
        string memory _brand,
        string memory _model,
        string memory _osVersion,
        string memory _imeiNumber,
        string memory _manufactureDate,
        string memory _serialNumber,
        uint256 _warrantyPeriod,
        string memory _condition,
        string memory _locationOfRegistration
    ) public {
        require(!imeiRegistered[_imeiNumber], "IMEI already registered");

        smartphoneCount++;
        smartphones[smartphoneCount] = Smartphone(
            smartphoneCount,
            _brand,
            _model,
            _osVersion,
            _imeiNumber,
            _manufactureDate,
            _serialNumber,
            _warrantyPeriod,
            _condition,
            _locationOfRegistration,
            false
        );

        imeiRegistered[_imeiNumber] = true;
        emit SmartphoneRegistered(smartphoneCount, _imeiNumber);
    }

    // ✅ Refurbish a smartphone
    function refurbishSmartphone(
        uint256 _id,
        string memory _details,
        string[] memory _replacedComponents,
        string memory _technicianName,
        string memory _certificateHash,
        uint256 _warrantyExtension,
        uint256 _refurbishmentCost,
        string memory _newSerialNumber
    ) public {
        require(_id > 0 && _id <= smartphoneCount, "Invalid smartphone ID");

        smartphones[_id].isRefurbished = true;
        refurbishments[_id].push(
            Refurbishment(
                block.timestamp,
                _details,
                _replacedComponents,
                _technicianName,
                _certificateHash,
                _warrantyExtension,
                _refurbishmentCost,
                _newSerialNumber
            )
        );

        emit SmartphoneRefurbished(_id, _technicianName);
    }

    // ✅ Get smartphone details
    function getSmartphone(uint256 _id) public view returns (Smartphone memory) {
        require(_id > 0 && _id <= smartphoneCount, "Smartphone not found");
        return smartphones[_id];
    }

    // ✅ Get refurbishments separately
    function getRefurbishments(uint256 _id) public view returns (Refurbishment[] memory) {
        require(_id > 0 && _id <= smartphoneCount, "Smartphone not found");
        return refurbishments[_id];
    }
}
