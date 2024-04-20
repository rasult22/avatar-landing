<script>
  import { fade,blur } from "svelte/transition";
  let lang = 'en'
  let show = false
</script>
<svelte:body on:click={() => show = false}></svelte:body>
<div class="relative">
  <button on:click={(e) => {
    e.preventDefault()
    e.stopPropagation()
    show = !show
  }} class="lang-selector-bg border border-[#5ABEFB] py-[5px] px-[10px] rounded-[20px]">
      {#if lang === 'ru'}
      <div in:blur class="flex text-[16px] font-bold space-x-1 items-center">
        <img width="25" height="25" src="/ru.svg" alt="Русский язык">
        <span>
          RU
        </span>
      </div>
      {:else if lang === 'en'}
      <div in:blur class="flex text-[16px] font-bold space-x-1 items-center">
        <img width="25" height="25" src="/en.svg" alt="English">
        <span>
          EN
        </span>
      </div>
      {/if}
  </button>
  {#if show }
    <button transition:fade={{duration: 100}} class="absolute z-30 min-w-[103px] top-[100%] left-0 lang-selector-bg border border-[#5ABEFB] py-[10px] px-[20px] rounded-[20px]">
      <button on:click={() => lang ='en'} class="flex text-[20px] font-bold space-x-2 items-center border-b pb-2">
        <img width="25" height="25" class="w-[25px]" src="/en.svg" alt="English">
        <span>
          EN
        </span>
      </button>
      <button on:click={() => lang ='ru'} class="flex text-[20px] font-bold space-x-2 items-center border-b mt-[15px] pb-2">
        <img width="25" height="25" class="w-[25px]" src="/ru.svg" alt="Русский язык">
        <span>
          RU
        </span>
      </button>
    </button>
  {/if}
</div>