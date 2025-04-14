// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    string[] public candidates;
    mapping(string => uint256) public votes;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory _candidates) {
        admin = msg.sender;
        candidates = _candidates;
    }

    function vote(string memory candidate) public {
        require(!hasVoted[msg.sender], "Already voted");

        bool valid = false;
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                valid = true;
                break;
            }
        }
        require(valid, "Invalid candidate");

        votes[candidate]++;
        hasVoted[msg.sender] = true;
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }

    function getCandidates() public view returns (string[] memory) {
        return candidates;
    }
}
