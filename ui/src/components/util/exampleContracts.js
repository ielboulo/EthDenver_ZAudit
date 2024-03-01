// Example contract data within ReportPage.js or a separate data file
export const exampleContracts = [
    {
        id: 1,
        name: 'example.sol',
        code: `pragma solidity ^0.5.0;

contract Vulnerable {
    // This is a vulnerable function
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount);
        msg.sender.call.value(amount)("");
        balances[msg.sender] -= amount;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    mapping(address => uint) public balances;
}`,
        vulnerabilities: [
            { line: 5, description: "This function is vulnerable to reentrancy attacks." },
            { line: 8, description: "Using call.value()() is risky and can lead to reentrancy vulnerabilities." }
        ],
    },
    // Additional contracts...
];
