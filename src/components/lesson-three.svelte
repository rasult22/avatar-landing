<script lang="ts">
	import { ethers } from 'ethers';
  import creds from '../../creds'

  const MY_ACCOUNT_ADDRESS = '0x304C235F111c1c13F9534216C2aD895766A76414'
  const RECIPIENT_ACCOUNT = '0xd1bd27c9bE2943e8ec0ce43d6F8B8f9Ce434EEb7'

  const INFURA_URL = creds.testnet_url + creds.infura_api_key

  $: provider = new ethers.JsonRpcProvider(INFURA_URL)
  $: wallet = new ethers.Wallet(creds.wallet_private_key, provider)


</script>

<div class="bg-neutral-100 w-full relative z-[10] text-black text-[24px]">
  Ether Test

  <button on:click={async () => {
    // show my account balance before transfer
    const myBalanceBefore = await provider.getBalance(MY_ACCOUNT_ADDRESS)
    console.log(`my account balance before: ${myBalanceBefore}`)
    // show recipient account balance before transfer
    const recipientBalanceBefore = await provider.getBalance(RECIPIENT_ACCOUNT)
    console.log(`recipient balance before: ${recipientBalanceBefore}`)

    // send ether
    const t = await wallet.sendTransaction({
      to: RECIPIENT_ACCOUNT,
      value: ethers.parseEther("0.000025")
    })
    console.log(t)

    // wait for transaction to be mined
    await t.wait()
    console.log(t)

    // show my account balance after transfer
    const myBalanceAfter = await provider.getBalance(MY_ACCOUNT_ADDRESS)
    console.log(`my account balance after: ${myBalanceAfter}`)
    // show recipient account balance after transfer
    const recipientBalanceAfter = await provider.getBalance(RECIPIENT_ACCOUNT)
    console.log(`recipient balance after: ${recipientBalanceAfter}`)
  }} class="bg-slate-800 text-white">
    Send transaction
  </button>
</div>