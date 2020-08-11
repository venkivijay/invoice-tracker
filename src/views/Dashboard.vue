<template>
  <section
    id="dashboard"
    class="min-w-screen min-h-screen flex items-center justify-center px-5 pb-5 pt-20"
  >
    <div
      class="rounded shadow-xl overflow-hidden w-full md:flex p-3"
      style="max-width:900px; background:rgba(256,256,256,15%)"
    >
      <div
        class="flex flex-col w-full justify-center md:w-1/2 rounded pr-0 sm:pr-2"
        :class="totalInvoice ? '' : 'md:w-full'"
      >
        <div
          class="flex justify-center w-full py-3"
          :class="totalInvoice ? '' : 'flex-col-reverse items-center'"
        >
          <p v-if="!totalInvoice" class="pt-4 sm:pt-0">No records found</p>
          <button
            v-if="!showFilterForm && !currentUser.isAdmin"
            @click="toggleInvoiceModal"
            class="bg-white hover:bg-gray-200 text-black shadow-md font-bold py-2 px-4 rounded-full"
          >New Invoice</button>
          <button
            v-if="totalInvoice && !showFilterForm"
            @click="toggleFilterForm"
            class="bg-white hover:bg-gray-200 text-black shadow-md font-bold py-2 px-4 rounded-full ml-6"
          >Filter</button>
          <!-- Filter Form -->
          <form v-if="showFilterForm" class="grid gap-4 mx-3">
            <div class="border rounded p-2 col-start-1 bg-gray-200">
              <label class="block text-gray-700 text-xs font-bold" for="fromDate">From Date</label>
              <input
                v-model="filter.fromDate"
                class="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                type="date"
                name="fromDate"
                id="fromDate"
              />
            </div>
            <div class="border rounded p-2 col-end-3 col-span-1 bg-gray-200">
              <label class="block text-gray-700 text-xs font-bold" for="toDate">To Date</label>
              <input
                v-model="filter.toDate"
                class="shadow appearance-none border text-xs rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
                type="date"
                name="toDate"
                id="toDate"
              />
            </div>
            <div class="col-start-3 flex flex-col justify-center">
              <button
                @click.prevent="handleFilterCancel"
                class="bg-gray-300 hover:bg-gray-500 py-2 px-2 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
                  viewBox="0 0 213.74 213.74"
                >
                  <path
                    d="M6.706 56.867c9.127 9.143 27.097 26.989 38.971 38.759 6.402 6.347 6.429 16.649.054 23.024L6.124 158.267s-13.179 14.653-.147 27.658l20.641 20.641s14.957 15.229 28.86 1.311l39.096-38.585c6.418-6.331 16.834-6.347 23.263-.038l38.889 38.144s14.805 13.94 28.702 0l21.56-20.56s13.902-15.724 1.327-28.272l-39.15-39.161c-6.375-6.375-6.424-16.758-.114-23.187l37.421-38.139s14.816-14.811.457-29.164c0 0-4.879-5.238-10.905-11.699-6.021-6.462-16.48-17.351-25.041-17.215-4.194.065-8.942 1.681-13.679 6.429l-38.079 39.058a16.022 16.022 0 01-22.898.114L68.466 17.569C62.113 11.179 51.034 1.154 42.321.464c-4.71-.37-9.866.745-14.37 5.254-12.108 12.113-21.86 22.746-21.86 22.746s-13.744 14.049.615 28.403z"
                    fill="#010002"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
        <TheTable
          :isAdmin="currentUser.isAdmin"
          v-if="totalInvoice"
          :invoices="filteredInvoice"
          @editInvoice="handleEditInvoice"
          :users="users"
        ></TheTable>
      </div>

      <div
        v-if="totalInvoice"
        class="w-full md:w-1/2 text-gray-600 flex flex-col justify-between pl-0 sm:pl-2"
      >
        <div class="flex flex-no-wrap my-6 md:my-0 overflow-x-scroll sm:overflow-hidden">
          <StatsCard
            title="Total Invoices"
            :value="totalInvoice"
            startColor="#00CEC255"
            endColor="#551A9255"
          ></StatsCard>
          <StatsCard
            title="Total Amount"
            :value="totalAmount"
            startColor="#00CEC255"
            endColor="#551A9255"
          ></StatsCard>
          <StatsCard
            title="Average amount"
            :value="avgAmount"
            startColor="#00CEC255"
            endColor="#551A9255"
          ></StatsCard>
        </div>
        <div
          v-if="currentUser.isAdmin"
          class="bg-transparent text-sm text-gray-500 leading-none border-2 border-gray-300 rounded-full flex justify-center mx-auto my-2"
        >
          <button
            @click="handleChartViewToggle"
            :class="toggleChartView?'active':''"
            class="inline-flex items-center transition-colors font-semibold duration-300 ease-in focus:outline-none hover:text-black focus:text-black rounded-l-full px-4 py-2"
          >
            <span>Name</span>
          </button>
          <button
            :class="toggleChartView?'':'active'"
            @click="handleChartViewToggle"
            class="inline-flex items-center transition-colors duration-300 font-semibold ease-in focus:outline-none hover:text-black focus:text-black rounded-r-full px-4 py-2"
          >
            <span>Date</span>
          </button>
        </div>
        <TheBarChart
          :chart-data="chartData"
          class="w-full bg-white rounded shadow-lg"
          style="height:75%"
        ></TheBarChart>
      </div>
    </div>
    <TheModal
      :editMode="editMode"
      :invoiceDetails="invoiceDetails"
      v-if="showInvoiceModal"
      @toggleModal="toggleInvoiceModal"
      :showModal="showInvoiceModal"
    />
    <Loading v-if="loading" />
  </section>
</template>

<script>
import TheModal from "../components/TheModal";
import TheTable from "../components/TheTable";
import TheBarChart from "../components/TheBarChart";
import StatsCard from "../components/StatsCard";
import Loading from "../components/Loading";
import { firestore, auth } from "firebase";
import moment from "moment";

export default {
  name: "Dashboard",
  components: {
    TheModal,
    TheTable,
    TheBarChart,
    StatsCard,
    Loading,
  },
  data: function () {
    return {
      toggleChartView: true,
      currentUser: { isAdmin: false, displayName: "", uid: "" },
      editMode: false,
      invoices: [],
      invoiceDetails: {},
      showFilterForm: false,
      showInvoiceModal: false,
      chartData: {},
      filter: {
        fromDate: null,
        toDate: null,
      },
      users: [],
      loading: false,
    };
  },
  methods: {
    handleChartViewToggle: function () {
      this.toggleChartView = !this.toggleChartView;
    },

    toggleInvoiceModal: function () {
      this.editMode = false;
      this.showInvoiceModal = !this.showInvoiceModal;
    },
    toggleFilterForm: function () {
      this.showFilterForm = !this.showFilterForm;
    },
    handleEditInvoice: function (id) {
      this.editMode = true;
      this.invoiceDetails = this.filteredInvoice.filter(
        (invoice) => invoice.id == id
      )[0];
      this.showInvoiceModal = !this.showInvoiceModal;
    },
    handleFilterCancel: function () {
      this.filter.fromDate = null;
      this.filter.toDate = null;
      this.toggleFilterForm();
    },
    populateUsers: function (users) {
      this.users = users;
    },
    populateChartData: function () {
      if (this.toggleChartView && !this.isAdmin) {
        let temp = {};
        this.filteredInvoice
          .map((invoice) => {
            return moment(invoice.timestamp.toDate()).format("DD-MM-YYYY");
          })
          .forEach((date) => {
            temp[date] = temp[date] ? temp[date] + 1 : 1;
          });
        this.chartData = {
          labels: Object.keys(temp),
          datasets: [
            {
              label: "Data One",
              borderWidth: 1,
              barThickness: 10,
              data: Object.values(temp),
              backgroundColor: "#1F8BB0",
            },
          ],
        };
      } else {
        let temp = {};
        this.filteredInvoice
          .map((invoice) => {
            return invoice.UID;
          })
          .forEach((UID) => {
            temp[UID] = temp[UID] ? temp[UID] + 1 : 1;
          });

        this.chartData = {
          labels: Object.keys(temp).map((UID) => {
            let matchedUser = this.users.filter((user) => user.UID == UID);
            return matchedUser.length ? matchedUser[0].displayName : null;
          }),
          datasets: [
            {
              label: "Data One",
              borderWidth: 1,
              barThickness: 10,
              data: Object.values(temp),
              backgroundColor: "#1F8BB0",
            },
          ],
        };
      }
    },
  },
  computed: {
    totalInvoice: function () {
      return this.filteredInvoice.length;
    },
    totalAmount: function () {
      return this.filteredInvoice
        .map((invoice) => invoice.amount)
        .reduce((acc, e) => acc + e, 0);
    },
    avgAmount: function () {
      return Math.round(this.totalAmount / this.totalInvoice);
    },
    filteredInvoice: function () {
      if (
        moment(this.filter.fromDate).isValid() &&
        moment(this.filter.toDate).isValid()
      ) {
        let fromDate = moment(this.filter.fromDate);
        let toDate = moment(this.filter.toDate);
        return this.invoices.filter((invoice) => {
          return moment(invoice.timestamp.toDate()).isBetween(
            fromDate,
            toDate,
            "dates",
            "[]"
          );
        });
      } else {
        return this.invoices;
      }
    },
  },
  watch: {
    filteredInvoice: function () {
      this.populateChartData();
    },
    toggleChartView: function () {
      this.populateChartData();
    },
  },
  created() {
    this.loading = true;
    firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((ref) => {
        let data = ref.data();
        this.currentUser.displayName = data.name;
        this.currentUser.isAdmin = data.isAdmin;
        this.currentUser.uid = auth().currentUser.uid;
        //if admin fetch all invoices (reactive)
        if (data.isAdmin == true) {
          // fetch user displaynames only if the current user is admin
          firestore()
            .collection("users")
            .get()
            .then((refs) => {
              refs.docs.forEach((user) => {
                let data = user.data();
                this.users.push({
                  UID: user.id,
                  displayName: data.name,
                });
              });
              firestore()
                .collection("invoices")
                .onSnapshot((snapShot) =>
                  snapShot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                      let { name, timestamp, amount, UID } = change.doc.data();
                      let invoice = {
                        UID: UID,
                        id: change.doc.id,
                        name: name,
                        timestamp: timestamp,
                        amount: amount,
                      };
                      this.invoices.push(invoice);
                      this.loading = false;
                    } else {
                      let changeId = change.doc.id;
                      let index = this.invoices.findIndex((invoice) => {
                        return invoice.id == changeId;
                      });
                      if (change.type === "removed")
                        this.invoices.splice(index, 1);
                      if (change.type === "modified") {
                        let {
                          name,
                          timestamp,
                          amount,
                          UID,
                        } = change.doc.data();
                        this.invoices.splice(index, 1, {
                          UID: UID,
                          id: change.doc.id,
                          name: name,
                          timestamp: timestamp,
                          amount: amount,
                        });
                      }
                    }
                  })
                );
            });
        }
        // if user fetch only invoices that match their uid (reactive)
        //need to implement DRY
        else {
          firestore()
            .collection("invoices")
            .where("UID", "==", this.currentUser.uid)
            .onSnapshot((snapShot) =>
              snapShot.docChanges().forEach((change) => {
                if (change.type === "added") {
                  let { name, timestamp, amount, UID } = change.doc.data();
                  let invoice = {
                    UID: UID,
                    id: change.doc.id,
                    name: name,
                    timestamp: timestamp,
                    amount: amount,
                  };
                  this.invoices.push(invoice);
                  this.loading = false;
                } else {
                  let changeId = change.doc.id;
                  let index = this.invoices.findIndex((invoice) => {
                    return invoice.id == changeId;
                  });
                  if (change.type === "removed") this.invoices.splice(index, 1);
                  if (change.type === "modified") {
                    let { name, timestamp, amount, UID } = change.doc.data();
                    this.invoices.splice(index, 1, {
                      UID: UID,
                      id: change.doc.id,
                      name: name,
                      timestamp: timestamp,
                      amount: amount,
                    });
                  }
                }
              })
            );
        }
      });
    setTimeout(() => (this.loading = false), 5000);
  },
  mounted() {
    this.populateChartData();
  },
};
</script>

<style scoped>
form {
  grid-template-columns: repeat(2, minmax(0, 1fr)) fit-content(10%);
  overflow: hidden;
}
.active {
  @apply bg-gray-300;
  border-radius: 9999px;
}
</style>
