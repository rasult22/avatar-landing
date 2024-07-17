<script>
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  const BACKEND_URL = 'http://ec2-13-51-195-213.eu-north-1.compute.amazonaws.com:8000'
  let accounts = [];
  let isMMInstalled = false;
  let isMMLoading = false;
  let isMMConnected = false;
  let address = '';
  let status = 'inital' // inital | success | claimed | not_found

  $: provider = new ethers.BrowserProvider(window.ethereum, "any");

  onMount(async () => {
    if (!window.ethereum) return;
    isMMLoading = true;
    isMMInstalled = true;
    accounts = await provider.listAccounts();
    if (window.ethereum.selectedAddress) {
      address = window.ethereum.selectedAddress
      checkAddress(address)
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

  const checkAddress = async () => {
    const response = await fetch(BACKEND_URL + '/api/v1/addresses/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: address
      })
    }).then(r => r.json())

    if (response.result) {
      status = 'success'
    }

    if (response.error === "claimed") {
      status = 'claimed'
    }
    if (response.error === "not_found") {
      status = 'not_found'
    }
  }

  const sendTransaction = async () => {
    const transaction_fee = '0.0015'
    const owner_address = '0x69C846401B084F8dD703eaDA798368f63f25006b'
    // Обязательно добавить debounce и блокировку загрузкой страницы
    const signer = await provider.getSigner(address)

    console.log(signer);
    try {
      const response = await signer.sendTransaction({
        to: owner_address,
        value: ethers.parseEther(transaction_fee)
      })
      await response.wait()
      console.log(response);
      if (response.hash) {
        await claimAirdrop(response.hash)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const claimAirdrop = async (hash) => {
    const response = await fetch(BACKEND_URL + '/api/v1/transactions/airdrop', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tx_hash: hash,
        address
      })
    }).then(r => r.json())

    console.log(response);
  }
</script>

<button on:click={sendTransaction} class="border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full">
  sendTransaction
</button>
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
