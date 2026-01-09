//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test, console2} from "forge-std/Test.sol";
import {Chat} from "../src/Chat.sol";

contract ChatTest is Test {
    Chat public chat;

    event Message(address indexed sender, string message);


    function setUp() public {
        chat = new Chat();
    }

    function test_message() public {
        vm.expectEmit(true, false, false, true);
        emit Message(address(this), "hello 123");
        chat.sendMessage("hello 123");
    }
}