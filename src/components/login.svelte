<script>
  import { ethers } from "ethers";
  import { onMount } from "svelte";

  let accounts = [];
  let isMetamaskInstalled = false;
  let isMetamaskLoading = false;
  let isMetamaskConnected = false;
  let address;
  $: provider = new ethers.BrowserProvider(window.ethereum, 'any')

  onMount(async () => {
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
  <button class="bg-purple-800 text-white p-4 rounded-md" on:click={connectWithMetamask}>
    Login
  </button>
{:else}
  <p class="bg-blue-500 text-white p-4 rounded-md">
    {address.slice(0, 5)}...
  </p>
{/if}