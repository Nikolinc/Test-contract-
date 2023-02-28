// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//Merkle tree
contract Tree {
  
    bytes32[] public hashes;
    string[4] transactions = [
        "TX1: Sherlook -> John"
        "TX1: John -> Sherlook"
        "TX1: Marry -> Sherlook"
        "TX1: John -> Marry"
    ];

    constructor() {
        for (uint256 i = 0; i < transactions.length; i++) {
            hashes.push(makeHash(transactions[i]));
        }

        uint256 count = transactions.length;
        uint256 offcet = 0;

        while (count > 0) {
            for (uint256 i = 0; i < count - 1; i += 2) {
                hashes.push(
                    keccak256(
                        abi.encodePacked(
                            hashes[offcet + i],
                            hashes[offcet + i + 1]
                        )
                    )
                );
            }
            offcet += count;
            count = count / 2;
        }
    }

    function verify(
        string memory transactions,
        uint256 index,
        bytes32 root,
        bytes32[] memory proof
    ) public pure returns (bool) {
        bytes32 hash = makeHash(transactions);
        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 element = proof[i];
            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, element));
            } else {
                hash = keccak256(abi.encodePacked(element, hash));
            }
            index = index / 2;
        }
        return hash == root;
    }

    function encode(string memory input) public pure returns (bytes memory) {
        return abi.encodePacked(input);
    }

    function makeHash(string memory input) public pure returns (bytes32) {
        return keccak256(encode(input));
    }
}
