<template>
  <article>
    <div
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative w-auto my-6 mx-auto max-w-sm px-6">
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
        >
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
          >
            <h3 class="text-lg font-semibold">{{editMode?"Edit Invoice":"Create new invoice"}}</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              @click="toggleModal"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >×</span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="text-center text-red-500 font-semibold" v-if="error">{{error}}</p>
            <form class="px-8 pb-3 pt-3">
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                <input
                  v-model.trim="invoice.name"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="date">Date</label>
                <input
                  v-model="invoice.date"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
                  type="date"
                  name="date"
                  id="date"
                />
              </div>
              <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">Amount</label>
                <input
                  v-model.number="invoice.amount"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-teal-500"
                  type="number"
                  name="amount"
                  id="amount"
                />
              </div>
            </form>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end pt-3">
            <button
              class="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-2 mb-1"
              type="button"
              style="transition: all .15s ease"
              @click="handleInvoiceCancel"
            >Cancel</button>
            <button
              class="text-teal-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="submit"
              style="transition: all .15s ease"
              @click="editMode?handleInvoiceEdit():handleInvoiceSubmit()"
            >{{editMode?"Update":"Submit"}}</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <Loading v-if="loading"/>
  </article>
</template>

<script>
import { firestore, auth } from "firebase";
import Loading from "../components/Loading";

import moment from "moment";

export default {
  name: "TheModal",
  data: function () {
    return {
      loading:false,
      error: "",
      invoice: this.editMode
        ? {
            name: this.invoiceDetails.name,
            date: moment(this.invoiceDetails.timestamp.toDate())
              .format("YYYY-MM-DD")
              .toLocaleString()
              .split(",")[0],
            amount: this.invoiceDetails.amount,
            id: this.invoiceDetails.id,
          }
        : {
            name: "",
            date: moment().format("YYYY-MM-DD"),
            amount: 0,
            id: "",
          },
    };
  },
  components:{Loading},
  props: {
    showModal: Boolean,
    editMode: Boolean,
    invoiceDetails: Object,
  },
  methods: {
    toggleModal: function () {
      this.$emit("toggleModal");
    },
    handleInvoiceCancel: function () {
      this.toggleModal();
    },
    resetInvoice: function () {
      this.invoice.name = "";
      this.invoice.date = moment().format("DD-MM-YYYY");
      this.invoice.amount = 0;
    },
    handleInvoiceSubmit: function () {
      
      if (this.invoice.name == "") {
        this.error = "Name can't be empty";
      } else {
        // Create new invoice
        this.loading=true
        firestore()
          .collection("invoices")
          .doc()
          .set({
            name: this.invoice.name,
            timestamp: firestore.Timestamp.fromDate(
              new Date(this.invoice.date)
            ),
            amount: this.invoice.amount || 0,
            UID: auth().currentUser.uid,
          })
          .then(() => {
            this.loading=false;
            this.toggleModal();
            this.resetInvoice();
          })
          .catch((err) => console.log(err));
      }
    },
    handleInvoiceEdit: function () {
      //Find and update the edited value alone
      if (this.invoice.name != this.invoiceDetails.name) {
        if (this.invoice.name != "") {
          firestore()
            .collection("invoices")
            .doc(this.invoice.id)
            .update({ name: this.invoice.name });

        } else {
          this.error = "Name can't be empty";
        }
        this.toggleModal();
      }
      if (this.invoice.amount != this.invoiceDetails.amount) {
        firestore()
          .collection("invoices")
          .doc(this.invoice.id)
          .update({ amount: this.invoice.amount || 0 });
        this.toggleModal();
      }
      if (
        firestore.Timestamp.fromDate(new Date(this.invoice.date)) !=
        this.invoiceDetails.timestamp
      ) {
        firestore()
          .collection("invoices")
          .doc(this.invoice.id)
          .update({
            date: firestore.Timestamp.fromDate(new Date(this.invoice.date)),
          });
        this.toggleModal();
      }
    },
  },
};
</script>

<style>
</style>

