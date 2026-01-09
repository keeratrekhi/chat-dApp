//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {NaivePaymaster} from  "../src/NaivePaymaster.sol";

import {IEntryPoint} from "account-abstraction/core/BasePaymaster.sol";

/**
I am deploying this via frame wallet. The framewallet opens an RPC endpoint on port 1248.

Add the etherscan API key to your environment variables with:

export ETHERSCAN_API_KEY=....

I can then deploy the Paymaster with 
forge script ./script/DeployAndFundPaymaster.s.sol --rpc-url http://localhost:1248 --broadcast --sender <ETHADDRESS> --unlocked --chain-id 5 --verify

It should output this one:

## Setting up 1 EVM.

==========================

Chain 5

Estimated gas price: 3.000000018 gwei

Estimated total gas used for script: 892651

Estimated amount required: 0.002677953016067718 ETH

==========================
##
Sending transactions [0 - 1]....


 */

contract DeployAndFundPaymaster is Script {
    function run() public {
        vm.broadcast();
        NaivePaymaster paymaster = new NaivePaymaster(IEntryPoint(0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789), msg.sender);

        vm.broadcast(msg.sender);
        paymaster.deposit{value: 0.1 ether}();
    }
}