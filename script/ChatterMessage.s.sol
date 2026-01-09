//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {Chat} from  "../src/Chat.sol";

contract ChatScript is Script {
    function run() public {
        Chat chat = Chat(0x5FbDB2315678afecb367f032d93F642f64180aa3);
        vm.startBroadcast();
        chat.sendMessage("hello hello");
    }
}