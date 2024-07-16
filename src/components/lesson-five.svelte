<script lang="ts">
	import { ethers } from 'ethers';
  import creds from '../../creds'

  const INFURA_URL = creds.mainnet_url + creds.infura_api_key
  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view  returns (uint256)",
    "function balanceOf(address) view returns (uint)",

    "event Transfer(address indexed from, address indexed to, uint amount)",
  ]
  const CONTRACT_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // Dai Contract

  $: provider = new ethers.JsonRpcProvider(INFURA_URL)
  $: contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, provider)

  const fn = async () => {
    const block = await provider.getBlockNumber() 
    console.log(`Block Number: ${block}`)
    // const transferEvents = await contract.queryFilter('Transfer', block - 10, block)

    const blockInfo = await provider.getBlock(block)
    console.log(blockInfo)
    
    const blockWithTransaction = await provider.getBlock(block, true)
    console.log(`Logging first transaction in block:`)
    console.log(blockWithTransaction.prefetchedTransactions[0]);
    
  }

</script>

<div class="bg-neutral-100 w-full relative z-[10] text-black text-[24px]">
  Ether Test
  <button
  on:click={fn}
  class="bg-slate-800 text-white p-4 rounded-sm">
  check transfer events
</button>

</div>