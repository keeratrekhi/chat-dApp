// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

/* solhint-disable reason-string */
/* solhint-disable no-inline-assembly */

import "account-abstraction/core/BasePaymaster.sol";

/**
 * A paymaster that pays for literally everything. NOT READY TO BE USED IN PRODUCTION
 */
contract NaivePaymaster is BasePaymaster {
    using UserOperationLib for UserOperation;

    event PaymasterPaid(uint requiredPreFund);

    constructor(IEntryPoint _entryPoint, address initialOwner) BasePaymaster(_entryPoint) Ownable(initialOwner) {}

    /**
     * simply pays. so we can use the chat app.
     */
    function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 /*userOpHash*/,
        uint256 requiredPreFund
    ) internal override returns (bytes memory context, uint256 validationData) {
        (requiredPreFund);
        (userOp);

        emit PaymasterPaid(requiredPreFund);
        //no need for other on-chain validation: entire UserOp should have been checked
        // by the external service prior to signing it.
        return (
            "",
            _packValidationData(
                false,
                uint48(block.timestamp + 3000),
                uint48(block.timestamp - 300)
            )
        );
    }
}
