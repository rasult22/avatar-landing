<script>
  import { ethers } from "ethers";
  import { onMount } from "svelte";

  let accounts = [];
  let isMetamaskInstalled = false;
  let isMetamaskLoading = false;
  let isMetamaskConnected = false;
  let address;
  let provider;

  onMount(async () => {
    provider = new ethers.BrowserProvider(window.ethereum, 'any')
    if (!window.ethereum) return;
    isMetamaskLoading = true;
    isMetamaskInstalled = true;
    accounts = await provider.listAccounts();
    isMetamaskConnected = accounts.length > 0;
    isMetamaskLoading = false;
  })

  function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        isMetamaskConnected = true;
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error('Metamask not detected')
    }
  }

  const connectWithMetamask = async () => {
    if (!isMetamaskConnected) return connectToMetamask()

    const selectedAddress = window.ethereum.selectedAddress

    const nonce = makeId(12);
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [nonce, selectedAddress]
    })
    console.log(selectedAddress);
    address = selectedAddress;
  }

</script>
{#if !address}
  <button class="login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full" on:click={connectWithMetamask}>
    Login
  </button>
{:else}
  <button class="login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full">
    {address.slice(0, 5)}...
  </button>
{/if}