<template>
<div>
  <div class="bg-gray-800 pb-32">
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="border-b border-gray-700">
          <div class="flex items-center justify-between h-16 px-4 sm:px-0">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow">
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900">Dashboard</a>

                  <!-- <a href="#" class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Settings</a> -->

                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>

    </nav>
    <!-- <header class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-white">
          Dashboard
        </h1>
      </div>
    </header> -->
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <div class="bg-white border shadow-xl rounded-lg shadow px-5 py-6 sm:px-6">
       <router-view></router-view>
      </div>
      <!-- /End replace -->
    </div>
  </main>
</div>
</div>

</template>

<script>
export default {
  name: "OpenSearch",
};
</script>

<style>
@import "~@/assets/style.css";
</style>