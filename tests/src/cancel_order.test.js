import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, txFromEtherscan, boilerplateJSON, resolutionConfig, loadConfig } from './test.fixture';
import ledgerService from "@ledgerhq/hw-app-eth/lib/services/ledger"

// https://etherscan.io/tx/0xb6c57aaa415c50d9c1a4055be7bcab8ef4d6a269e10bc3eec77086e930c9d5cf
test('[Nano S] nanos_v1_cancelOrder_single_eth', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0xf9050b038503651a7a6083012592947be8076f4ea4a4ad08075c2508e481d6c946d12b80b904a4a8a41c700000000000000000000000007be8076f4ea4a4ad08075c2508e481d6c946d12b000000000000000000000000bd9b009025daae2a26d916b18737302e48549bcb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c0107300000000000000000000000056b391339615fd0e88e0d370f451fa91478bb20f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b1a2bc2ec50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000616b3fc50000000000000000000000000000000000000000000000000000000061747a8781d4068b114fce2341ec00ac9c4f81e3e5ffa5c207180c7b80ad62b0f278638d0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003e00000000000000000000000000000000000000000000000000000000000000480000000000000000000000000000000000000000000000000000000000000001c62585822994e294061bc7a0910918819b8922dbb295e444408a936126985dbc87bec1f3484342b0282c0d611dec558551c554f28eb5dac250ada38e46c0de438000000000000000000000000000000000000000000000000000000000000006423b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000bd9b009025daae2a26d916b18737302e48549bcb00000000000000000000000000000000000000000000000000000000000015b100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006400000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026a0cbdf558eeb13c5ca789c258a0d2855846580f416d8c4960cf989e6bbd885516da056ced45bec8ef74f4df0f253ebb646826c88f5d584c6cfb911beabade418ba55");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_v1_cancelOrder_single_eth', [11, 0]);
  await tx;
}));

// https://etherscan.io/tx/0x318763e6bcad81edafc937d91315b1c0763368f8329876182dfc246189c9ef5e
test('[Nano S] nanos_cancelOrder_single_eth', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f90612014d8459682f00850ec261fded83014025947f268357a8c2552623316e2562d90e642bb538e580b905a4a8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e5000000000000000000000000dd41578ade12845b3f5b4271035e206b9ef1627800000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000baf2127b49fc93cbca6269fade0f7f31df4c88a70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ee00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009b6e64a8ec600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006221ed480000000000000000000000000000000000000000000000000000000062233f1dc72c87310a155cce1f2c1aee38097e478c0b275a9e1a1dfd42af0f73f03d6b530000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000004600000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000001b479f916fc7ca7d90d35171301a3b29a3b89798d7c5bdf62dd3466577bf9bdc2536feb23ae44592bc229d7109e5c20a2f7f8e8ec02ef3d3ca438c8d0aefd174af00000000000000000000000000000000000000000000000000000000000000e4fb16a595000000000000000000000000dd41578ade12845b3f5b4271035e206b9ef16278000000000000000000000000000000000000000000000000000000000000000000000000000000000000000082f5ef9ddc3d231962ba57a9c2ebb307dc8d26c20000000000000000000000000000000000000000000000000000000000000e5a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c001a0cd25ca582921800b48834dcc8e28f1771449b6f3a3ecc20105c5f358fa23c58ba035af6132d7d12d549875f78c8770f7d42879ef66a037e151dca91cc92e066abb");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_cancelOrder_single_eth', [11, 0]);
  await tx;
}));

// https://etherscan.io/tx/0x318763e6bcad81edafc937d91315b1c0763368f8329876182dfc246189c9ef5e but transfer methodID has been modified to raise warning (fb16 -> fb17)
test('[Nano S] nanos_cancelOrder_single_unknownTransferMethod_eth', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f90612014d8459682f00850ec261fded83014025947f268357a8c2552623316e2562d90e642bb538e580b905a4a8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e5000000000000000000000000dd41578ade12845b3f5b4271035e206b9ef1627800000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000baf2127b49fc93cbca6269fade0f7f31df4c88a70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ee00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009b6e64a8ec600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006221ed480000000000000000000000000000000000000000000000000000000062233f1dc72c87310a155cce1f2c1aee38097e478c0b275a9e1a1dfd42af0f73f03d6b530000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000004600000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000001b479f916fc7ca7d90d35171301a3b29a3b89798d7c5bdf62dd3466577bf9bdc2536feb23ae44592bc229d7109e5c20a2f7f8e8ec02ef3d3ca438c8d0aefd174af00000000000000000000000000000000000000000000000000000000000000e4fb17a595000000000000000000000000dd41578ade12845b3f5b4271035e206b9ef16278000000000000000000000000000000000000000000000000000000000000000000000000000000000000000082f5ef9ddc3d231962ba57a9c2ebb307dc8d26c20000000000000000000000000000000000000000000000000000000000000e5a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c001a0cd25ca582921800b48834dcc8e28f1771449b6f3a3ecc20105c5f358fa23c58ba035af6132d7d12d549875f78c8770f7d42879ef66a037e151dca91cc92e066abb");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_cancelOrder_single_unknownTransferMethod_eth', [11, 0]);
  await tx;
}));

// https://etherscan.io/tx/0xd7386e1abfd622f9f182cfa373f2ef3f9073ef17af6fb020dc8f9fcfffe23d5b
test('[Nano S] nanos_cancelOrder_single_weth', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f906130181978459682f00850dd9f2124e83014115947f268357a8c2552623316e2562d90e642bb538e580b905a4a8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e50000000000000000000000002e5c8c9c3aa2bbb5bfbb915fca1cf74d4579f3cc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000baf2127b49fc93cbca6269fade0f7f31df4c88a70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005898862d161800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062217552000000000000000000000000000000000000000000000000000000006222c7288f793646b14db9cd33fbee780a7c483401655fe7bedbcfcb8482f0374bf23ce40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000004600000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000001bdbf61dd49d97c70c3f938a84aaf0bd60d35d4d3d665f15de61726f1eac09a34e3ac8b3d6ed7945c4e27818197330375fdbbb21e225712ad5c822df4c7c2582c600000000000000000000000000000000000000000000000000000000000000e4fb16a59500000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e5c8c9c3aa2bbb5bfbb915fca1cf74d4579f3cc000000000000000000000000c7df86762ba83f2a6197e1ff9bb40ae0f696b9e60000000000000000000000000000000000000000000000000000000000000728000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e400000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a05b8b73e972cab3c4258f7a2e35daa00ff4554aa283271c278589215d2606354ba0347b19e9c1893a59c0cacc6fbed17a196da9a4bbff02883d8f6de07b6061a48f");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_cancelOrder_single_weth', [11, 0]);
  await tx;
}));

// https://etherscan.io/tx/0xd7386e1abfd622f9f182cfa373f2ef3f9073ef17af6fb020dc8f9fcfffe23d5b // but WETH address is modified to raise unknown token warning. (c02aaa -> c02aab)
test('[Nano S] nanos_cancelOrder_single_unknown_token', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f906130181978459682f00850dd9f2124e83014115947f268357a8c2552623316e2562d90e642bb538e580b905a4a8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e50000000000000000000000002e5c8c9c3aa2bbb5bfbb915fca1cf74d4579f3cc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000baf2127b49fc93cbca6269fade0f7f31df4c88a70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aab39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005898862d161800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062217552000000000000000000000000000000000000000000000000000000006222c7288f793646b14db9cd33fbee780a7c483401655fe7bedbcfcb8482f0374bf23ce40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000004600000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000001bdbf61dd49d97c70c3f938a84aaf0bd60d35d4d3d665f15de61726f1eac09a34e3ac8b3d6ed7945c4e27818197330375fdbbb21e225712ad5c822df4c7c2582c600000000000000000000000000000000000000000000000000000000000000e4fb16a59500000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e5c8c9c3aa2bbb5bfbb915fca1cf74d4579f3cc000000000000000000000000c7df86762ba83f2a6197e1ff9bb40ae0f696b9e60000000000000000000000000000000000000000000000000000000000000728000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e400000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a05b8b73e972cab3c4258f7a2e35daa00ff4554aa283271c278589215d2606354ba0347b19e9c1893a59c0cacc6fbed17a196da9a4bbff02883d8f6de07b6061a48f");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_cancelOrder_single_unknown_token', [12, 0]);
  await tx;
}));

// https://etherscan.io/tx/0x5c2e59202790599628ff7f971a098cc8a22dbbd7d4b5b72d9940ab373371ca93 but transfer method is modified (68f0 -> 68f1)
test('[Nano S] nanos_cancelOrder_bundle_unknownTransferMethod_eth', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f909930181d38459682f00850945fff52c83015d38947f268357a8c2552623316e2562d90e642bb538e580b90924a8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e5000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000c99f70bfd82fb7c8f8191fdfbfb735606b15e5c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000015e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004563918244f40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000622353c700000000000000000000000000000000000000000000000000000000622c8e911d714dd249c0ee4e4ac343a184b721f7970f6c1727e553eea8da26dd1fd794060000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000006200000000000000000000000000000000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000001b7ec852c22a87f1db5559e96715a132545732d9bcd0b16798b5cad809ce2f4bcd2d2050a92eae3603d1817d7230f53056304d94e509f099353ac002abb2a0df7f00000000000000000000000000000000000000000000000000000000000002a468f1bcaa000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000008b4616926705fb61e9c4eeac07cd946a5d4b07600000000000000000000000008b4616926705fb61e9c4eeac07cd946a5d4b076000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c823b872dd000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c9e23b872dd000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f6e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a0e4f2302968c776c2811502e9d865b87536a5018bc8aa5fe876eb2159db314a7aa04ed2812e0551d36858e1632e82b12c7bf6387d8d303a9460a3f8ac1e8cc6e04f");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_cancelOrder_bundle_unknownTransferMethod_eth', [10, 0]);
  await tx;
}));

// https://etherscan.io/tx/0x5c2e59202790599628ff7f971a098cc8a22dbbd7d4b5b72d9940ab373371ca93
test('[Nano S] nanos_cancelOrder_bundle_eth', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f909930181d38459682f00850945fff52c83015d38947f268357a8c2552623316e2562d90e642bb538e580b90924a8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e5000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000c99f70bfd82fb7c8f8191fdfbfb735606b15e5c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000015e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004563918244f40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000622353c700000000000000000000000000000000000000000000000000000000622c8e911d714dd249c0ee4e4ac343a184b721f7970f6c1727e553eea8da26dd1fd794060000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000006200000000000000000000000000000000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000001b7ec852c22a87f1db5559e96715a132545732d9bcd0b16798b5cad809ce2f4bcd2d2050a92eae3603d1817d7230f53056304d94e509f099353ac002abb2a0df7f00000000000000000000000000000000000000000000000000000000000002a468f0bcaa000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000008b4616926705fb61e9c4eeac07cd946a5d4b07600000000000000000000000008b4616926705fb61e9c4eeac07cd946a5d4b076000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c823b872dd000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c9e23b872dd000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f6e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a0e4f2302968c776c2811502e9d865b87536a5018bc8aa5fe876eb2159db314a7aa04ed2812e0551d36858e1632e82b12c7bf6387d8d303a9460a3f8ac1e8cc6e04f");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_cancelOrder_bundle_eth', [10, 0]);
  await tx;
}));

// https://etherscan.io/tx/0x5c2e59202790599628ff7f971a098cc8a22dbbd7d4b5b72d9940ab373371ca93 // but nft address is modified on 2nd item to raise multiple collections warning (8b46 -> 8b47)
test('[Nano S] nanos_cancelOrder_bundle_eth_multipleCollections', zemu("nanos", async (sim, eth) => {
  const serializedTx = txFromEtherscan("0x02f909930181d38459682f00850945fff52c83015d38947f268357a8c2552623316e2562d90e642bb538e580b90924a8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e5000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000c99f70bfd82fb7c8f8191fdfbfb735606b15e5c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000015e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004563918244f40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000622353c700000000000000000000000000000000000000000000000000000000622c8e911d714dd249c0ee4e4ac343a184b721f7970f6c1727e553eea8da26dd1fd794060000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000006200000000000000000000000000000000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000001b7ec852c22a87f1db5559e96715a132545732d9bcd0b16798b5cad809ce2f4bcd2d2050a92eae3603d1817d7230f53056304d94e509f099353ac002abb2a0df7f00000000000000000000000000000000000000000000000000000000000002a468f0bcaa000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000008b4616926705fb61e9c4eeac07cd946a5d4b07600000000000000000000000008b4716926705fb61e9c4eeac07cd946a5d4b076000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c823b872dd000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c9e23b872dd000000000000000000000000af75696b63745470e74b752c38f8413095d076a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f6e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a0e4f2302968c776c2811502e9d865b87536a5018bc8aa5fe876eb2159db314a7aa04ed2812e0551d36858e1632e82b12c7bf6387d8d303a9460a3f8ac1e8cc6e04f");
  const resolution = await ledgerService.resolveTransaction(
    serializedTx,
    loadConfig,
    resolutionConfig
  );
  const tx = eth.signTransaction(
    "44'/60'/0'/0",
    serializedTx,
    resolution
  );
  await waitForAppScreen(sim);
  await sim.navigateAndCompareSnapshots('.', 'nanos_cancelOrder_bundle_eth_multipleCollections', [8, 0]);
  await tx;
}));