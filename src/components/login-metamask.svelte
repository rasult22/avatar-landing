<script>
  import { ethers } from "ethers";
  import { onMount } from "svelte";

  let accounts = [];
  let isMMInstalled = false;
  let isMMLoading = false;
  let isMMConnected = false;
  let address = '';

  $: provider = new ethers.BrowserProvider(window.ethereum, "any");

  onMount(async () => {
    if (!window.ethereum) return;
    isMMLoading = true;
    isMMInstalled = true;
    accounts = await provider.listAccounts();
    if (window.ethereum.selectedAddress) {
      address = window.ethereum.selectedAddress
    }
    isMMConnected = accounts.length > 0;
    isMMLoading = false;
  });

  function makeId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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
        accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        isMMConnected = true;
        if (window.ethereum.selectedAddress) {
          address = window.ethereum.selectedAddress
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Metamask not detected");
    }
  }

  const authorize = async () => {
    if (!isMMConnected) return connectToMetamask();

    const selectedAddress = window.ethereum.selectedAddress;

    const nonce = makeId(12);
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [nonce, selectedAddress],
    });
    address = selectedAddress;
  };
</script>

{#if !address}
  <button
    class="login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full"
    on:click={authorize}
  >
    Login
  </button>
{:else}
  <p class="login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full">
    {address.slice(0, address.length/5)}...{address.slice(address.length/1.3, address.length)}
  </p>
{/if}
