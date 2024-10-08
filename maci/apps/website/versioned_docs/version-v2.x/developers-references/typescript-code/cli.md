---
title: MACI Command-line interface (CLI)
description: Introduction to the MACI CLI interface that allows for effective deployment and testing
sidebar_label: Command-line interface
sidebar_position: 3
---

# Command-line interface

MACI provides a command-line interface that allows for effective deployment and testing. Applications that build on top of MACI, such as [clr.fund](https://clr.fund/), implement their own web UIs.

Note that all the example commands default to a local Ethereum testnet at `http://localhost:8545`, and use the Ethereum private key `0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3`. Do not send any real funds to the address generated by this key.

For testing purposes, you can run:

```bash
# in maci/contracts
pnpm run hardhat
```

> Note that you will need a hardhat.config file in your current directory to be able to run the cli.

:::info
If you are looking to use MACI's cli to deploy the smart contracts, we recommend you instead use the smart contract tasks for a better experience. Please refer to the [deployment section](/docs/quick-start/deployment) for more information.
:::

## Subcommands

For a full list of MACI CLI's commands, please run the following:

```bash
maci-cli --help
```

For detailed information about each command please run:

```bash
maci-cli <command> --help
```

| Command              | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `create`             | Deploy the contracts                                               |
| `deployVkRegistry`   | Deploy a new VkRegistry contract                                   |
| `setVerifyingKeys`   | Set the verifying keys                                             |
| `deployPoll`         | Deploy a new poll                                                  |
| `checkVerifyingKeys` | Check that the verifying keys in the contract match the local ones |
| `genMaciPubKey`      | Generate a new MACI public key                                     |
| `genMaciKeyPair`     | Generate a new MACI key pair                                       |
| `show`               | Show the deployed contract addresses                               |
| `publish`            | Publish a new message to a MACI Poll contract                      |
| `mergeMessages`      | Merge the message accumulator queue                                |
| `mergeSignups`       | Merge the signups accumulator queue                                |
| `timeTravel`         | Fast-forward the time (only works for local hardhat testing)       |
| `extractVkToFile`    | Extract verification keys (vKey) from zKey files                   |
| `signup`             | Sign up to a MACI contract                                         |
| `isRegisteredUser`   | Checks if user is registered with public key                       |
| `fundWallet`         | Fund a wallet with Ether                                           |
| `verify`             | Verify the results of a poll on-chain                              |
| `genProofs`          | Generate the proofs for a poll                                     |
| `proveOnChain`       | Prove the results of a poll on chain                               |

## Public and private key format

MACI uses private keys in the BabyJub field for operations which occur within
zk-SNARKs, such as decrypting messages or signing commands. As MACI is deployed
on Ethereum, we seek to avoid confusing BabyJub private keys with Ethereum
private keys. To that end, users should pass serialized formats of public and
private keys to this CLI. We use `maci-domainobj`'s `PrivKey.serialize` and
`PubKey.serialize` functions to do so.

Examples of serialized public and private keys:

```
Public key: macipk.946c756cb8588f7169d37e23a98b92051359d64321cf7372a75757b5e9d5590d
Private key: macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c
```

### Generate MACI keys

You can generate MACI keys using the following cli utility.

```bash
node build/ts/index.js genMaciKeyPair
```

Example output:

```bash
[✓] Public key: macipk.946c756cb8588f7169d37e23a98b92051359d64321cf7372a75757b5e9d5590d
[✓] Private key: macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c
```

If you already have a MACI private key in serialized form, you can generate its corresponding public key using the following command:

```bash
node build/ts/index.js genMaciPubKey -sk macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c
```

Example output:

```
[✓] Public key: macipk.946c756cb8588f7169d37e23a98b92051359d64321cf7372a75757b5e9d5590d
```

### Coordinator: Deploy VkRegistry

This command deploys an instance of a VkRegistry contract. Multiple MACI
contracts can refer to the same VkRegistry as long as they are all owned (via
`Ownable.sol`) by the same account.

Example usage:

```bash
node build/ts/index.js deployVkRegistry
```

Example output:

```
[✓] VkRegistry deployed at: 0x6b5A4751307F6751E265c194244552A9995B6B3D
```

### Coordinator: Set verifying keys

Note that the filename of the `.zkey` files must follow this format:

```
ProcessMessages_<STATE_TREE_DEPTH>-<MSG_TREE_DEPTH>-<MSG_SUBTREE_DEPTH>-<VOTE_OPTION_TREE_DEPTH>_test.<CONTRIBUTION_NUM>.zkey
TallyVotes_<STATE_TREE_DEPTH>-<INT_STATE_TREE_DEPTH>-<VOTE_OPTION_TREE_DEPTH>>_test.<CONTRIBUTION_NUM>>.zkey
```

Example usage:

```bash
node build/ts/index.js setVerifyingKeys \
    -s 10 -i 1 -m 2 -v 2 -b 1 \
    -p ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    -t ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey \
```

Example output:

```
[i] Setting verifying keys...
[i] Transaction hash: 0x6b5b2959ba5161497d5499a0f9d9c69f773cd5f9b82f80a79253797b066863e3
[✓] Verifying keys set successfully
```

### Coordinator: Create MACI instance

Example usage:

```bash
node build/ts/index.js create -s 10
```

Example output:

```
[✓] MACI deployed at:  0xB08CEd0f34940a3E576Cf023b287f9Db2f306a1f
```

### Coordinator: Deploy poll

Example usage:

```bash
node ./build/ts/index.js deployPoll \
    -pk macipk.946c756cb8588f7169d37e23a98b92051359d64321cf7372a75757b5e9d5590d \
    -t 300 -i 1 -m 2 -b 1 -v 2
```

Example output:

```
[i] Poll ID: 0
[i] Poll contract: 0xB6389Da0285c7B1FC0ba352F5A1D5fb1A492a786
[i] Message processor contract: 0xE0bF6021e023a197DBb3fABE64efA880E13D3f4b
[i] Tally contract: 0x3f21BC64076e7c9ed8695d053DCCBE6D8d5E6f43
[i] Subsidy contract: 0xb848ef765E289762e9BE66a38006DDc4D23AeF24
```

### User: sign up

Example usage:

```bash
node ./build/ts/index.js signup \
    -p macipk.182a49caec452e9966f5fef65363c3c795bf8cda482cae8289a4684c0f5bcb7b
```

Example output:

```
[i] Transaction hash: 0x4c7c9f65187fcf6e243804b75555bda48cbae4c317bb312f1b9f95ac4b7697b1
[✓] State index: 1
```

### User: publish message

Example usage:

```bash
node build/ts/index.js publish \
    -p macipk.182a49caec452e9966f5fef65363c3c795bf8cda482cae8289a4684c0f5bcb7b \
    -sk macisk.569cf25e35654046ecd9f176d9e6e47115d767fabfe0e97a206dd62e7a3a8546 \
    -i 1 -v 0 -w 9 -n 1 -o 0
```

Example output:

```
[i] Transaction hash: 0xa2ab91c821bf7fa73fedcf19a5371a0f0866ae0747d22f82f1685afca0e5db49
[i] Ephemeral private key: macisk.2631d585e46f059e4909ab35172451542ed7723a1ace120fcf49d68e27f935b0
```

### Coordinator: Time travel (Testing only)

Example usage:

```bash
node build/ts/index.js timeTravel -s 300
```

Example output:

```
[✓] Fast-forwarded 300 seconds
```

### Coordinator: merge state tree

Example usage:

```bash
node build/ts/index.js mergeSignups -o 0
```

Example output:

```
[i] Merging state subroots 1 / 1
[i] Transaction hash: 0xd7e7312f70831ec05bb23f23f506ef37d6ce0c2056c1b72f7bb989653d1c8a42
[✓] Executed mergeMaciStateAqSubRoots(); gas used: 720061
[✓] All state subtrees have been merged.
[i] Merging subroots to a main state root...
[i] Transaction hash: 0xb5e98d328b066d91e1b7aa35775fe624be446b540a00bcb4b27a02477636b569
[✓] Executed mergeStateAq(); gas used: 1004720
```

### Coordinator: merge message tree

Example usage:

```bash
node build/ts/index.js mergeMessages -o 0
```

Example output:

```
[i] Merging message subroots 1 / 1
[✓] Executed mergeMessageAqSubRoots(); gas used: 602448
[i] Transaction hash: 0xdf9d11c6b35fcccff82dafa3aa15f760e3f7694a72b07007fbdb359d44df0bea
[✓] All message subtrees have been merged.
[i] Merging subroots to a main message root...
[✓] Executed mergeMessageAq(); gas used: 173346
[i] Transaction hash: 0x1f18ec08fd14db90a0d1d02d1ed27c0bfd3bc138701e812c4c3382572fc4d151
[✓] The message tree has been merged.
```

### Coordinator: generate Maci state offchain

Example usage to generate the state locally from the smart contracts events:

```bash
node build/ts/index.js genLocalState \
    --poll-id 0 \
    --output localState.json \
    --privkey macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c \
    --blocks-per-batch 50
```

Example output:

```
[i] Fetching logs from 0 till 228 and generating the offline maci state
[✓] The state has been written to localState.json
```

### Coordinator: generate proofs

Example usage:

**C++ witness parameters**

```bash
node build/ts/index.js genProofs -x 0x89962fa216d39fCcaaC11e1e462340d80ab6Cf4D \
    -sk macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c \
    -o 0 \
    -t tally.json \
    -f proofs \
    -r ~/rapidsnark/build/prover \
    -wp ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test \
    -wt ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test \
    -zp ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    -zt ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey \
```

**WASM Parameters**

```bash
node build/ts/index.js genProofs \
    -sk macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c \
    -o 0 \
    -t tally.json \
    -f proofs \
    -zp ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    -zt ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey \
    -tw ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm \
    -pw ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm \
    -w true \
```

**Non Quadratic Voting**

```bash
node build/ts/index.js genProofs \
    -sk macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c \
    -o 0 \
    -t tally.json \
    -f proofs \
    -zp ./zkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test.0.zkey \
    -zt ./zkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test.0.zkey \
    -tw ./zkeys/TallyVotesNonQv_10-1-2_test/TallyVotesNonQv_10-1-2_test_js/TallyVotesNonQv_10-1-2_test.wasm \
    -pw ./zkeys/ProcessMessagesNonQv_10-2-1-2_test/ProcessMessagesNonQv_10-2-1-2_test_js/ProcessMessagesNonQv_10-2-1-2_test.wasm \
    -w true \
    -uq false
```

Example output:

```
[i] starting to fetch logs from block 0
[i] Generating proofs of message processing...
[i] Progress: 1 / 1
[i] gen processMessage proof took 17.322 seconds

[i] Generating proofs of vote tallying...
[i] Progress: 1 / 1
[✓] The tally commitment is correct
[i] gen tally proof took 4.951 seconds
```

### Coordinator: generate proofs using a local state file

Example usage to generate the proofs locally from the local state file created with genLocalState:

**C++ witness parameters**

```bash
node build/ts/index.js genProofs \
    --privkey macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c \
    --poll-id 0 \
    --rapidsnark ~/rapidsnark/build/prover \
    --process-witnessgen ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_cpp/ProcessMessages_10-2-1-2_test \
    --tally-witnessgen ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_cpp/TallyVotes_10-1-2_test \
    --process-zkey /zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    --tally-zkey ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey \
    --tally-file tally.json \
    --output proofs/ \
    --state-file localState.json
```

**WASM Params**

```bash
node build/ts/index.js genProofs \
    --privkey macisk.08a06aef74c7f6a6f73704e30677418731bc738500f4e6c63dbfe41af8d6719c \
    --poll-id 0 \
    --process-zkey ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    --tally-zkey ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey \
    --tally-file tally.json \
    --output proofs/ \
    --state-file localState.json \
    -tw ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm \
    -pw ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm \
    -w true
```

Example output:

```
[i] Generating proofs of message processing...
[i] Progress: 1 / 1
[i] gen processMessage proof took 17.053 seconds

[i] Generating proofs of vote tallying...
[i] Progress: 1 / 1
[✓] The tally commitment is correct
[i] gen tally proof took 4.746 seconds
```

### Coordinator: prove on chain

Example usage:

```bash
node build/ts/index.js proveOnChain \
    -o 0 \
    -f proofs/
```

Example output:

```
[i] Submitting proofs of message processing...
[i] Transaction hash: 0xa8acf67d6520ceaf5eef8acbf4cda7f5c2657122e2a72a092b9f4503282d70b9
[i] Progress: 1 / 1
[✓] All message processing proofs have been submitted.
[i] Submitting proofs of vote tallying...
[i] Progress: 1 / 1
[i] Transaction hash: 0x691687ab6fb504919859901f297cdb7d8c4d736756d2d4edf345d721bb82365b
[✓] All vote tallying proofs have been submitted.
```

### Anyone: verify tally

Example usage:

```bash
node build/ts/index.js verify \
    -o 0 \
    -t tally.json
```

Example output:

```
[i] on-chain tally commitment: 83601b7979c13506317b58e859950e9e92e1e6d326810d89332cc13909833ec
[✓] The on-chain tally commitment matches.
[i] The on-chain tally matches the off-chain tally.
```

## Demonstration

### Scenario:

1. Alice votes for Party A
2. Alice changes her key
3. Eve tries to bribe Alice to change her vote to Party B
4. Alice submits an invalid vote for Party B
5. The coordinator processes the votes, computes, and verifies the final tally
6. The expected result is: Party A has some votes and Party B has 0 votes.

Implication: Alice's invalid vote was not counted, and Eve had no way to tell.

### Examples of serialized public and private keys:

```
Coordinator:
Public key: macipk.281830024fb6d21a4c73a89a7139aff61fbbddad731ef2dc2db9516171fd390e
Private key: macisk.bf92af7614b07e2ba19dce65bb7fef2b93d83b84da2cf2e3af690104fbc52511

Alice:
Public key: macipk.1cac8e4e5b54d7dcce4aa06e71d8b9f324458756e7a9368383d005592719512a
Private key: macisk.63e796e4e5d18a5fcf4ccef1e74e83b807a165d6727bb89201782240458f7420
```

### Coordinator: Deploy VkRegistry

```bash
node build/ts/index.js deployVkRegistry
```

Output:

```bash
[✓] VkRegistry deployed at: 0x7607Cfe2fA0d62F725537e55d83C693Cc3C76EF2
```

### Coordinator: Set verifying keys

```bash
node build/ts/index.js setVerifyingKeys \
    --state-tree-depth 10 \
    --int-state-tree-depth 1 \
    --msg-tree-depth 2 \
    --vote-option-tree-depth 2 \
    --msg-batch-depth 1 \
    --process-messages-zkey ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    --tally-votes-zkey ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey
```

Output:

```bash
[i] Setting verifying keys...
[i] Transaction hash: 0xbd5d06935537fb59903c27b9bdb19a41d422f75e1dfd6eb61f028bf3a7b82c76
[✓] Verifying keys set successfully
```

### Coordinator: Create MACI instance

```bash
node build/ts/index.js create -s 10
```

Output:

```bash
[✓] MACI deployed at:  0xC131D3eeD9D6D410A7bfc200d81b9795f1bb5ed6
```

### Coordinator: Deploy poll

```bash
node ./build/ts/index.js deployPoll \
    -pk macipk.281830024fb6d21a4c73a89a7139aff61fbbddad731ef2dc2db9516171fd390e \
    -t 1000 -i 1 -m 2 -b 1 -v 2
```

Output:

```bash
[i] Poll ID: 0
[i] Poll contract: 0x2c3Adf2852788662148038511aD80962aaf631D7
[i] Message processor contract: 0xd3C3C6530fE4073292D6EAfdEAdEeAbf1A3DC19B
[i] Tally contract: 0x06c1939F6cBb68D42333F140CAE815cc36D341b0
[i] Subsidy contract: 0xCB74254716c96B07c812c73A5945e68aa1de4569
```

### Alice: sign up

```bash
node ./build/ts/index.js signup \
    --pubkey macipk.1cac8e4e5b54d7dcce4aa06e71d8b9f324458756e7a9368383d005592719512a
```

Output:

```bash
[i] Transaction hash: 0x7ab4c2d23686049432d19bb64c8ee4e8776fff134d971dcf27e1f513b4fdb97f
[✓] State index: 1
```

### Alice: votes for Party A (option index 0)

```bash
node build/ts/index.js publish \
    --pubkey macipk.1cac8e4e5b54d7dcce4aa06e71d8b9f324458756e7a9368383d005592719512a \
    --privkey macisk.63e796e4e5d18a5fcf4ccef1e74e83b807a165d6727bb89201782240458f7420 \
    --state-index 1 \
    --vote-option-index 0 \
    --new-vote-weight 9 \
    --nonce 1 \
    --poll-id 0
```

Output:

```bash
[i] Transaction hash: 0x60936cfb0b25c8618d3cb8d0f5497106d5f6e3776f3212932975442d874eddbd
[i] Ephemeral private key: macisk.103b8c4c98700d06f47522892032fce54bd03cd197cee495ede3802730409910
```

### Alice: submits an invalid vote for Party B (option index 1) with different public key

```bash
node build/ts/index.js publish \
    --pubkey macipk.1cac8e4e5b54d7dcce4aa06e71d8b9f324458756e7a9368383d005592719512a \
    --privkey macisk.63e796e4e5d18a5fcf4ccef1e74e83b807a165d6727bb89201782240458f7420 \
    --state-index 1 \
    --vote-option-index 1 \
    --new-vote-weight 9 \
    --nonce 2 \
    --poll-id 0
```

Output:

```bash
[i] Transaction hash: 0x73f74b13d276cd311ce5421a145debc71e97e48abc8be2f9a0a548b26f7920f9
[i] Ephemeral private key: macisk.1e490d67477b4c5f08806973fca2bea81e723c60deba6bdeacab56f7a4bd867b
```

### Coordinator: Time Travel

```bash
node build/ts/index.js timeTravel -s 1000
```

Output:

```
[✓] Fast-forwarded 1000 seconds
```

### Coordinator: merge state tree

```bash
node build/ts/index.js mergeSignups --poll-id 0
```

Output:

```bash
[i] Merging state subroots 1 / 1
[i] Transaction hash: 0xd01932e8dfad251f9b0d288290ac17f12bc449ea859a6921f63edf6b4b06f4c9
[✓] Executed mergeMaciStateAqSubRoots(); gas used: 720061
[✓] All state subtrees have been merged.
[i] Merging subroots to a main state root...
[i] Transaction hash: 0x25f60a9b5a24d11b87c41d8a4f681e3fd895b3bdf78ea86755b9800005662ce6
[✓] Executed mergeStateAq(); gas used: 1004720
```

### Coordinator: merge message tree

```bash
node build/ts/index.js mergeMessages --poll-id 0
```

Output:

```bash
[i] Merging message subroots 1 / 1
[✓] Executed mergeMessageAqSubRoots(); gas used: 600520
[i] Transaction hash: 0xac0e8a01277db1b6282f8fb3763a8a4aeeebb3e12a41dd0dee9fc2804a4c9e81
[✓] All message subtrees have been merged.
[i] Merging subroots to a main message root...
[✓] Executed mergeMessageAq(); gas used: 173346
[i] Transaction hash: 0x472f0fd515c7cd2a02c430189e4ee92a6843bd6b19807484ce454cb7dab0e931
[✓] The message tree has been merged.
```

### Coordinator: generate proofs

```bash
node build/ts/index.js genProofs \
    --privkey macisk.bf92af7614b07e2ba19dce65bb7fef2b93d83b84da2cf2e3af690104fbc52511 \
    --poll-id 0 \
    --process-zkey ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test.0.zkey \
    --tally-zkey ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test.0.zkey \
    --tally-file tally.json \
    --output proofs/ \
    -tw ./zkeys/TallyVotes_10-1-2_test/TallyVotes_10-1-2_test_js/TallyVotes_10-1-2_test.wasm \
    -pw ./zkeys/ProcessMessages_10-2-1-2_test/ProcessMessages_10-2-1-2_test_js/ProcessMessages_10-2-1-2_test.wasm \
    -w true
```

Output:

```bash
[i] Generating proofs of message processing...
[i] Progress: 1 / 1
[i] gen processMessage proof took 16.644 seconds

[i] Generating proofs of vote tallying...
[i] Progress: 1 / 1
[✓] The tally commitment is correct
[i] gen tally proof took 4.809 seconds
```

### Coordinator: prove on chain

```bash
node build/ts/index.js proveOnChain \
    --poll-id 0 \
    --proof-dir proofs/
```

Output:

```bash
[i] Submitting proofs of message processing...
[i] Transaction hash: 0x9c3280af80de2436f9a886e4cd94218e01fe35ea3d3e671aad97b5aa5d6108ed
[i] Progress: 1 / 1
[✓] All message processing proofs have been submitted.
[i] Submitting proofs of vote tallying...
[i] Progress: 1 / 1
[i] Transaction hash: 0x3e82ae3ad04215d4f357455ab5a610eba082796d2abc698aad91b046d16b9350
[✓] All vote tallying proofs have been submitted.
```

### Anyone: verify

```bash
node build/ts/index.js verify \
    --poll-id 0 \
    --tally-file tally.json
```

Output:

```bash
[i] on-chain tally commitment: 1ed004ac21a5397a512cbe749e7110934a434837f4818265043fd2e2e9cbec91
[✓] The on-chain tally commitment matches.
```
