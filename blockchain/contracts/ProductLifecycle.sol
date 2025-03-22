// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductLifecycle {
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

    struct SmartphoneStatus {
        string batteryHealth;
        string screenCondition;
        string storageCapacity;
        string ramSize;
        string networkStatus;
        string activationStatus;
        bool blacklistStatus;
        string physicalCondition;
    }

    struct Refurbishment {
        uint256 timestamp;
        string details;
        string technicianName;
        string certificateHash;
        uint256 warrantyExtension;
        uint256 refurbishmentCost;
        string newSerialNumber;
        string softwareUpdateVersion;
        bool batteryReplaced;
        bool screenReplaced;
        bool motherboardReplaced;
        string refurbishmentGrade;
        string physicalCondition;
        string[] replacedComponents;
    }

    mapping(uint256 => Smartphone) public smartphones;
    mapping(uint256 => SmartphoneStatus) public smartphoneStatus;
    mapping(uint256 => Refurbishment[]) private refurbishments;
    mapping(string => bool) private imeiRegistered;
    uint256 public smartphoneCount;

    event SmartphoneRegistered(uint256 indexed id, string imeiNumber);
    event SmartphoneStatusUpdated(uint256 indexed id);
    event SmartphoneRefurbished(uint256 indexed id, string technicianName);
    event SmartphoneMarkedAsRefurbished(uint256 indexed id);

    // ✅ Register smartphone core details
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
        smartphones[smartphoneCount] = Smartphone({
            id: smartphoneCount,
            brand: _brand,
            model: _model,
            osVersion: _osVersion,
            imeiNumber: _imeiNumber,
            manufactureDate: _manufactureDate,
            serialNumber: _serialNumber,
            warrantyPeriod: _warrantyPeriod,
            condition: _condition,
            locationOfRegistration: _locationOfRegistration,
            isRefurbished: false
        });

        imeiRegistered[_imeiNumber] = true;
        emit SmartphoneRegistered(smartphoneCount, _imeiNumber);
    }

    // ✅ Set smartphone status fields separately
    function setSmartphoneStatus(
        uint256 _id,
        SmartphoneStatus memory _status
    ) public {
        require(_id > 0 && _id <= smartphoneCount, "Invalid smartphone ID");

        smartphoneStatus[_id] = _status;

        emit SmartphoneStatusUpdated(_id);
    }

    // ✅ Store a refurbishment record and mark as refurbished
    function refurbishSmartphone(
        uint256 _id,
        Refurbishment memory _refurbishment
    ) public {
        require(_id > 0 && _id <= smartphoneCount, "Invalid smartphone ID");

        refurbishments[_id].push(_refurbishment);

        // 🔥 Auto-mark as refurbished
        Smartphone storage phone = smartphones[_id];
        phone.isRefurbished = true;

        emit SmartphoneRefurbished(_id, _refurbishment.technicianName);
        emit SmartphoneMarkedAsRefurbished(_id);
    }

    // ✅ Mark a smartphone as refurbished (manual)
    function markAsRefurbished(uint256 _id) public {
        require(_id > 0 && _id <= smartphoneCount, "Invalid smartphone ID");

        Smartphone storage phone = smartphones[_id];
        phone.isRefurbished = true;

        emit SmartphoneMarkedAsRefurbished(_id);
    }

    // ✅ Get smartphone details
    function getSmartphone(uint256 _id) public view returns (Smartphone memory, SmartphoneStatus memory) {
        require(_id > 0 && _id <= smartphoneCount, "Smartphone not found");
        return (smartphones[_id], smartphoneStatus[_id]);
    }

    // ✅ Get refurbishments separately
    function getRefurbishments(uint256 _id) public view returns (Refurbishment[] memory) {
        require(_id > 0 && _id <= smartphoneCount, "Smartphone not found");
        return refurbishments[_id];
    }
}
