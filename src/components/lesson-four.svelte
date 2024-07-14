<script lang="ts">
	import { ethers } from 'ethers';
  import creds from '../../creds'

  const MY_ACCOUNT_ADDRESS = '0x304C235F111c1c13F9534216C2aD895766A76414'
  const YERASSYL_ADRESS = '0x69C846401B084F8dD703eaDA798368f63f25006b'
  const INFURA_URL = creds.testnet_url + creds.infura_api_key
  const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
  ]
  // address of ERC20 token - stETH
  const CONTRACT_ADDRESS = '0x3F1c547b21f65e10480dE3ad8E19fAAC46C95034'


  $: provider = new ethers.JsonRpcProvider(INFURA_URL)
  $: wallet = new ethers.Wallet(creds.wallet_private_key, provider)
  $: contract = new ethers.Contract(CONTRACT_ADDRESS, ERC20_ABI, provider)


  async function fn () {
    const balance = await contract.balanceOf(MY_ACCOUNT_ADDRESS)
    console.log(`Reading from ${CONTRACT_ADDRESS}`)
    console.log(`Balance of sender: ${balance}`)

    const contractWithWallet = contract.connect(wallet)
    const tx = await contractWithWallet.transfer(YERASSYL_ADRESS, balance)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(MY_ACCOUNT_ADDRESS)
    const balanceOfReciever = await contract.balanceOf(YERASSYL_ADRESS)

    console.log(`Balance of sender: ${balanceOfSender}`)
    console.log(`Balance of reciever: ${balanceOfReciever}`)
  }

</script>

<div class="bg-neutral-100 w-full relative z-[10] text-black text-[24px]">
  Ether Test
  <button
  on:click={fn}
  class="bg-slate-800 text-white p-4 rounded-sm">
  Send transaction
</button>

</div>