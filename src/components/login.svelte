<script>
  import { fade } from "svelte/transition";

  let show = false
  let sumbitted = false
  let name = ''
  let email = ''

  $: done = name !== '' && email !== ''

  const toggleShow = () => {
    show = !show
  }
  const onSubmit = (e) => {
    alert('submitted')
    fetch('https://rasult22.pockethost.io/api/collections/avatar_whitelist/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email
      })
    })
    sumbitted = true
  }
</script>
<button class="login-bg border block text-[16px] font-semibold border-[#5ABEFB] text-white py-[13px] px-[30px] rounded-full" on:click={toggleShow}>
  Login
</button>
{#if show}
  <div transition:fade class="bg-[#091720] w-[100vw] h-[100vh] fixed left-0 top-0 sm:translate-x-[-20%]">
    <div class="max-w-[1264px] mx-auto sm:px-4 md:px-6">
        <div class="flex justify-between py-12 sm:py-6 items-center">
          <img class="max-w-[206px]" width="206" src="/optimized/logo.webp" alt="logo">
          <svg class="cursor-pointer sm:w-[32px]" on:click={toggleShow} xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
            <path d="M11.25 33.75L33.75 11.25M11.25 11.25L33.75 33.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      {#if !sumbitted}
        <div class="flex mt-[72px] sm:mt-[2vh] items-center justify-center space-x-[110px] sm:px-0 px-[80px]">
          <div>
            <div class="text-[48px] sm:text-[32px] sm:text-center font-semibold leading-[120%]">
              Whitelist <br/>
              application
            </div>
            <div class="text-[20px] sm:text-center sm:text-[17px] mt-[16px]">
              Get access to avatars one of the first!
            </div>
            <form on:submit|preventDefault={onSubmit} class="rounded-lg mt-[24px] w-full max-w-sm">
              <div class="mb-4">
                <label for="name" class="block text-gray-400 text-sm mb-2">Name</label>
                <input bind:value={name} type="text" id="name" class="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-6">
                <label for="email" class="block text-gray-400 text-sm mb-2">E-mail</label>
                <input bind:value={email} type="email" id="email" class="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500" />
              </div>
              <div class="mb-4">
                <button disabled={!done} type="submit" class="w-full disabled:opacity-55 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Submit
                </button>
              </div>
              <div class="mb-4">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-500" />
                  <span class="ml-2 text-gray-400 text-sm">Stay up to date with all project news</span>
                </label>
              </div>
              <p class="text-gray-500 text-[14px]">
                By authorizing, you agree to the <a href="#" class="underline text-blue-500 hover:text-blue-400">License Agreement</a> and <a href="#" class="underline text-blue-500 hover:text-blue-400">Privacy Policy</a>
              </p>
            </form>
          </div>
          <div class="sm:hidden md:hidden">
            <img class="max-w-[496px]" width="496" src="/optimized/whitelist-img.webp" alt="">
          </div>
        </div>
      {:else}
        <div class="flex flex-col min-h-[80vh] justify-center py-12 items-center">
          <div class="text-[48px] sm:text-[24px] font-semibold leading-[120%]">
            Application submitted!
          </div>
          <button on:click={() => {
            toggleShow()
            sumbitted = false
            name = ''
            email = ''
            }} class="mt-8 px-8 disabled:opacity-55 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Ok
          </button>
        </div>
      {/if}
    </div>
  </div>
{/if}