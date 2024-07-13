<script lang="ts">
	import { ethers } from 'ethers';
  import { onMount } from 'svelte';
  import creds from '../../creds'

  const MY_ACCOUNT_ADDRESS = '0x304C235F111c1c13F9534216C2aD895766A76414'
  const INFURA_URL = creds.mainnet_url + creds.infura_api_key

  onMount(async () => {
    let provider = new ethers.JsonRpcProvider(INFURA_URL)
    let address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e'
    const balance = await provider.getBalance(address)

    console.log(`ETH Balance of ${address} --> ${ethers.formatEther(balance)} ETH`)
  })

</script>

<div class="bg-neutral-100 w-full relative z-[10] text-black text-[24px]">
  Ether Test
</div>