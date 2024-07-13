<script lang="ts">
	import { ethers } from 'ethers';
  import creds from '../../creds'

  const MY_ACCOUNT_ADDRESS = '0x304C235F111c1c13F9534216C2aD895766A76414'
  const CONTRACT_ADRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  const INFURA_URL = creds.mainnet_url + creds.infura_api_key
  const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view  returns (uint256)",
    "function balanceOf(address) view returns (uint)"
  ]

  $: provider = new ethers.JsonRpcProvider(INFURA_URL)
  $: contract = new ethers.Contract(CONTRACT_ADRESS, ERC20_ABI, provider)

  $: {
    const fn = async () => {
      const name = await contract.name()
      const symbol = await contract.symbol()
      const totalSupply = await contract.totalSupply()
      const balance = await contract.balanceOf(MY_ACCOUNT_ADDRESS)
      console.log("name: ", name);
      console.log("symbol: ", symbol);
      console.log("totalSupply: ", totalSupply);
      console.log(`balance of ${MY_ACCOUNT_ADDRESS}: `, ethers.formatEther(balance));
    }
    fn()
  }
</script>

<div class="bg-neutral-100 w-full relative z-[10] text-black text-[24px]">
  Ether Test
</div>