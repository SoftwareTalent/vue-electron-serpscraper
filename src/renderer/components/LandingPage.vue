<template>
  <div>
    <div v-show="showWarning" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        ->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <!-- Heroicon name: exclamation -->
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline"
              >
                Deactivate account
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Closing this window will stop the ongoing process. Are you
                  sure ?
                </p>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              @click.prevent.default="stopSearch"
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Confirm
            </button>
            <button
              @click.prevent.default="showWarning = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="z-40 fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end"
    >
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="showNotification"
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
        >
          <div class="p-4">
            <div class="flex items-center">
              <div class="w-0 flex-1 flex justify-between">
                <p class="w-0 flex-1 text-sm font-medium text-gray-900">
                  {{ notificationMsg }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="showNotification = false"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="sr-only">Close</span>
                  <!-- Heroicon name: x -->
                  <svg
                    class="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <form class="space-y-8 divide-y divide-gray-200">
      <div class="space-y-8 divide-y divide-gray-200">
        <div class="pt-2">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Google Search Scraper
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              Here you can setup a new scraping job
            </p>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >
                Country:
              </label>
              <div class="mt-1">
                <select
                  v-model="selectedCountry"
                  id="country"
                  name="country"
                  autocomplete="country"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option :value="country" v-for="country in countries">
                    google.{{ country }}
                  </option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >
                Number of Results:
              </label>
              <div class="mt-1">
                <select
                  v-model="numResults"
                  id="results"
                  name="results"
                  autocomplete="results"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >
                Number of pages:
              </label>
              <div class="mt-1">
                <select
                  v-model="numPages"
                  id="numPages"
                  name="numPages"
                  autocomplete="numPages"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >
                Delay:
              </label>
              <div class="mt-1">
                <select
                  v-model="delay"
                  id="delay"
                  name="delay"
                  autocomplete="delay"
                  class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="random">Random Delay</option>
                  <option value="0">No delay</option>
                  <option value="5000">5 seconds</option>
                  <option value="10000">10 seconds</option>
                  <option value="20000">20 seconds</option>
                  <option value="30000">30 seconds</option>
                  <option value="45000">45 seconds</option>
                  <option value="60000">60 seconds</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="street_address"
                class="block text-sm font-medium text-gray-700"
              >
                Keywords (One per line, Max: 25)
              </label>
              <div class="mt-1">
                <textarea
                  v-model="keywords"
                  id="keywords"
                  name="keywords"
                  rows="6"
                  class="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5 flex justify-between items-center">
        <div class="text-gray-400 text-sm">
          <span class="font-bold">Note:</span> Abusing this tool may result in Google blocking your IP. <a href="" class="underline"> Learn more</a>
        </div>
        <div class="">
          <button
            v-if="!scrapeStarted"
            @click.prevent.default="search"
            type="submit"
            class="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-normal font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start
          </button>
          <button
            v-else
            @click.prevent.default="stopSearch"
            type="button"
            class="bg-white py-2 px-6 border border-gray-300 rounded-md shadow-sm text-normal font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Stop
          </button>
        </div>
      </div>
    </form>
    <div v-show="panelOpen" class="fixed inset-0 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <section
          class="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16"
          aria-labelledby="slide-over-heading"
        >
          <!--
            Slide-over panel, show/hide based on slide-over state.

            Entering: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-full"
              To: "translate-x-0"
            Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
              From: "translate-x-0"
              To: "translate-x-full"
          -->
          <transition
            enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            enter-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
            leave-class="translate-x-0"
            leave-to-class="translate-x-full"
          >
            <div v-show="panelOpen" class="w-screen max-w-md">
              <div
                class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"
              >
                <div class="px-4 sm:px-6">
                  <div class="flex items-start justify-between">
                    <div class="block">
                      <h2
                        id="slide-over-heading"
                        class="text-lg font-medium text-gray-900"
                      >
                        Scraping results
                      </h2>
                      <p class="text-xs mt-1 text-gray-500">This may take several seconds, or several minutes, depending on the delay you've chosen and how many keywords you're searching for.</p>
                    </div>
                    
                    <div class="ml-3 h-7 flex items-center">
                      <button
                        @click="stopSearch"
                        class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span class="sr-only">Close panel</span>
                        <svg
                          class="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-2 relative flex-1 px-4 sm:px-6">
                  <button
                    v-if="!isPaused"
                    @click.prevent.default="pauseSearch"
                    type="submit"
                    class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Pause
                  </button>
                  <button
                    v-else="!isPaused"
                    @click.prevent.default="resumeSearch"
                    type="submit"
                    class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Resume
                  </button>
                  <button
                    
                    @click.prevent.default="exportToCsv"
                    type="submit"
                    class="w-full mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Export to Csv
                  </button>
                  <textarea
                    id="results"
                    name="results"
                    rows="17"
                    class="text-sm shadow focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                    >{{ getFormattedResults }}</textarea
                  >
                  <div class="text-xs mt-6">
                    Please use <a href="https://seoblueprint.com/scraper-terms/" @click.prevent.default="openUrl('https://seoblueprint.com/scraper-terms/')" class="underline font-medium text-purple-600">responsibly</a>. Created for members of <img src="../assets/branding.jpg" class="inline-block align-middle" width="30%" height="40%" alt="" srcset="">
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </section>
      </div>
    </div>
    <div id="notification" v-if="showUpdateNotification" >
      <p id="message">
        {{ updateMessage }}
        <br>
        {{ downloadMessage }}
      </p>
      <button class="px-4 font-medium py-2 rounded shadow bg-indigo-600 text-white" id="close-button" @click="closeUpdateNotification">
        Close
      </button>
      <button class="ml-2 px-4 font-medium py-2 rounded shadow bg-green-600 text-white" id="restart-button" @click="restartApp" v-if="showRestartBtn" >
        Restart
      </button>
    </div>
  </div>
</template>

<script>
import { ipcRenderer, shell } from "electron";
const {BrowserWindow, dialog} = require('electron').remote
import { writeFileSync } from 'fs'
import { Parser } from 'json2csv'

export default {
  name: "landing-page",
  components: {},
  data() {
    return {
      countries: ["com", "fr", "de", "co.uk", "es", 'be', 'ae'],
      scrapeStarted: false,
      selectedCountry: "com",
      keywords: "",
      delay: "random",
      numPages: 1,
      numResults: 10,
      panelOpen: false,
      notificationMsg: "",
      showNotification: false,
      showRestartBtn: false,
      downloadMessage: '',
      updateMessage: '',
      showUpdateNotification: false,
      results: [],
      currentKeyword: "",
      showWarning: false,
      isPaused: false,
    };
  },
  mounted() {
    ipcRenderer.on("scrape-result", (event, data) => {
      const { keyword, link, title } = data;
      this.showNotification = true;
      this.notificationMsg = `Processing keyword: ${this.currentKeyword}`;
      if (this.currentKeyword !== keyword) {
        this.currentKeyword = keyword;
      }
      this.results.push({keyword, link, title});
      console.log(this.results, 'res')
    });

    ipcRenderer.on("scrape-state", (event, data) => {
      console.log("hello");
      this.scrapeStarted = data.status;

      if (this.scrapeStarted === false) {
        this.showNotification = false;
        this.notificationMsg = "";
        this.showNotification = true;
        this.notificationMsg = `Job finished: ${this.results.length} links`;
      } else {
        this.panelOpen = true;
      }
    });

    ipcRenderer.on('update_available', () => {
      this.showUpdateNotification = true
      ipcRenderer.removeAllListeners('update_available')
      this.updateMessage = 'A new update is available. Downloading now...'
    })
    ipcRenderer.on('download-progress', (event, message) => {
      this.showUpdateNotification = true
      this.updateMessage = 'A new update is available. Downloading now...'
      this.downloadMessage = message
    })
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded')
      this.updateMessage = 'Update Downloaded. It will be installed on restart. Restart now?'
      this.downloadMessage = ''
      this.showRestartBtn = true
      this.showUpdateNotification = true
    })
  },
  computed: {
    getFormattedResults() {
      console.log(this.results.map(item => item.link).join("\n").trim())
      return this.results.map(item => item.link).join("\n").trim();
    },
  },
  methods: {
    closeUpdateNotification () {
      this.showUpdateNotification = false
    },
    restartApp () {
      ipcRenderer.send('restart_app')
    },
    async exportToCsv () {
      const currentWindow = BrowserWindow.getFocusedWindow()
      const {filePath} = await dialog.showSaveDialog(currentWindow)
      if (filePath) {
        
        const json2csvParser = new Parser({ fields: ['keyword', 'title', 'link'] })
        const csv = json2csvParser.parse(this.results)
        writeFileSync(filePath + '.csv', csv)
        alert('File exported')
      }
    },
    openUrl (url) {
      shell.openExternal(url)
    },
    async search() {
      this.results = [];

      const keywords = this.keywords
        .split(/\r?\n/)
        .filter((item) => item.length > 0);
      console.log(keywords);

      if (keywords.length === 0) {
        this.showNotification = true;
        this.notificationMsg = "Missing keywords";
        return;
      }

      if (keywords.length > 25) {
        this.showNotification = true;
        this.notificationMsg = "The limit is 25 keywords, please try again with less keywords.";
        return;
      }
      
      if (this.delay === 0) {
        const alertRes = window.confirm('Warning: Not having a delay puts you at greater risk of Google blocking your IP address and requiring a captcha validation')

        if (!alertRes) {
          return;
        }
      }

      ipcRenderer.send("start-scrape", {
        data: {
          countries: this.countries,
          scrapeStarted: this.scrapeStarted,
          selectedCountry: this.selectedCountry,
          keywords: keywords,
          delay: this.delay,
          numPages: this.numPages,
          numResults: this.numResults,
        },
      });
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    pauseSearch() {
      console.log("pause");
      ipcRenderer.send("pause-scrape", true);
      this.isPaused = true;
    },
    resumeSearch() {
      console.log("resume");
      ipcRenderer.send("resume-scrape", true);
      this.isPaused = false;
    },
    stopSearch() {
      if (this.showWarning) {
        ipcRenderer.send("stop-scrape", true);
        this.showWarning = false;

        return;
      }

      if (!this.scrapeStarted && this.panelOpen) {
        this.panelOpen = false;
        return;
      }

      if (this.showWarning === false && this.scrapeStarted) {
        this.showWarning = true;
        return;
      }
    },
    getOpenPanelClasses() {
      return {};
    },
  },
};
</script>

<style>
#notification {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 500px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>

