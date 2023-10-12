// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.4.11;

contract Transactions {
    uint256 transactionCount;

    event Transfer(
        address from,
        address reciever,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransferStruct[] transactions;

    function addtoChain(
        address receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );
    }

    function getallTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCounter() public view returns (uint256) {
        return transactionCount;
    }
}
