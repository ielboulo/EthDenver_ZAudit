// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ISeverity {
    enum Severity {
        High,
        Medium,
        Low,
        Informational,
        BestPractice,
        Undetermined
    }
}
