<template>
  <div class="overflow-x-scroll m-1 rounded shadow-lg bg-white">
    <table class="text-center w-full p-3">
      <thead class="flex w-full border">
        <tr class="flex w-full">
          <th v-if="isAdmin" class="p-4 w-1/4 text-sm font-semibold">User</th>
          <th class="p-4 w-1/4 text-sm font-semibold">Name</th>
          <th class="p-4 w-1/4 text-sm font-semibold">Date</th>
          <th class="p-4 w-1/4 text-sm font-semibold">Amount</th>
          <th v-if="!isAdmin" class="p-4 w-1/4 text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody
        class="flex flex-col items-center overflow-y-scroll overflow-x-hidden w-full"
        style="max-height:55vh"
      >
        <tr v-for="{id,name,timestamp,amount,UID} in invoices" :key="id" class="flex w-full mb-4">
          <td
          v-if="isAdmin"
            class="p-2 w-1/4 text-gray-900 text-center text-sm leading-normal"
          >{{getDisplayName(UID)}}</td>
          <td class="p-2 w-1/4 text-gray-900 text-center text-sm leading-normal">{{name}}</td>
          <td
            class="p-2 w-1/4 text-gray-900 whitespace-no-wrap text-center text-sm"
          >{{date(timestamp)}}</td>
          <td class="p-2 w-1/4 text-gray-900 whitespace-no-wrap text-center text-sm">{{amount}}</td>
          <td v-if="!isAdmin" class="p-2 mr-2 md:mr-0 w-1/4 whitespace-no-wrap">
            <button
              @click.prevent="editInvoice(id)"
              class="bg-gray-300 hover:bg-gray-400 py-2 px-2 mr-2 rounded-full"
            >
              <svg
                class="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 510 510"
              >
                <linearGradient
                  id="c"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="145.971"
                  x2="231.334"
                  y1="-1.69"
                  y2="-1.69"
                >
                  <stop offset="0" stop-color="#ff7044" />
                  <stop offset="1" stop-color="#f92814" />
                </linearGradient>
                <linearGradient
                  id="d"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="193.426"
                  x2="136.671"
                  y1="13.442"
                  y2="-54.349"
                >
                  <stop offset="0" stop-color="#ff7044" stop-opacity="0" />
                  <stop offset="1" stop-color="#ffa425" />
                </linearGradient>
                <linearGradient
                  id="e"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="214.579"
                  x2="232.972"
                  y1="-47.112"
                  y2="18.577"
                >
                  <stop offset="0" stop-color="#f92814" stop-opacity="0" />
                  <stop offset="1" stop-color="#c1272d" />
                </linearGradient>
                <linearGradient id="a">
                  <stop offset="0" stop-color="#f9f7fc" />
                  <stop offset="1" stop-color="#f0ddfc" />
                </linearGradient>
                <linearGradient
                  id="f"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="142.004"
                  x2="236.26"
                  xlink:href="#a"
                  y1="55.305"
                  y2="55.305"
                />
                <linearGradient
                  id="g"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="190.78"
                  x2="175.015"
                  y1="90.583"
                  y2="12.807"
                >
                  <stop offset="0" stop-color="#f0ddfc" stop-opacity="0" />
                  <stop offset=".289" stop-color="#c8b7e0" stop-opacity=".289" />
                  <stop offset=".592" stop-color="#a595c8" stop-opacity=".592" />
                  <stop offset=".84" stop-color="#8f81b8" stop-opacity=".84" />
                  <stop offset="1" stop-color="#8779b3" />
                </linearGradient>
                <linearGradient
                  id="h"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="183.714"
                  x2="184.529"
                  xlink:href="#a"
                  y1="39.174"
                  y2="58.33"
                />
                <linearGradient
                  id="i"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="120.217"
                  x2="247.874"
                  y1="566.363"
                  y2="566.363"
                >
                  <stop offset="0" stop-color="#ffdaaa" />
                  <stop offset=".421" stop-color="#ffd8a8" />
                  <stop offset=".652" stop-color="#fed1a0" />
                  <stop offset=".836" stop-color="#fdc592" />
                  <stop offset=".995" stop-color="#fcb47f" />
                  <stop offset="1" stop-color="#fcb37e" />
                </linearGradient>
                <linearGradient
                  id="j"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="208.638"
                  x2="108.791"
                  y1="571.197"
                  y2="555.432"
                >
                  <stop offset="0" stop-color="#ffdaaa" stop-opacity="0" />
                  <stop offset=".251" stop-color="#ffe7c8" stop-opacity=".251" />
                  <stop offset=".554" stop-color="#fff4e6" stop-opacity=".554" />
                  <stop offset=".815" stop-color="#fffcf8" stop-opacity=".815" />
                  <stop offset="1" stop-color="#fff" />
                </linearGradient>
                <linearGradient id="b">
                  <stop offset="0" stop-color="#ffda45" />
                  <stop offset="1" stop-color="#ffa425" />
                </linearGradient>
                <linearGradient
                  id="k"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="120.217"
                  x2="247.874"
                  xlink:href="#b"
                  y1="312.846"
                  y2="312.846"
                />
                <linearGradient
                  id="l"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="152.333"
                  x2="253.766"
                  xlink:href="#b"
                  y1="311.738"
                  y2="311.738"
                />
                <linearGradient
                  id="m"
                  gradientUnits="userSpaceOnUse"
                  x1="256.277"
                  x2="182.277"
                  y1="302.396"
                  y2="177.396"
                >
                  <stop offset="0" stop-color="#ffda45" stop-opacity="0" />
                  <stop offset="1" stop-color="#fcee21" />
                </linearGradient>
                <linearGradient
                  id="n"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="180.192"
                  x2="212.764"
                  y1="625.326"
                  y2="625.326"
                >
                  <stop offset="0" stop-color="#7e8595" />
                  <stop offset="1" stop-color="#555a66" />
                </linearGradient>
                <linearGradient
                  id="o"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="225.222"
                  x2="142.717"
                  y1="189.123"
                  y2="12.551"
                >
                  <stop offset="0" stop-color="#ffda45" stop-opacity="0" />
                  <stop offset="1" stop-color="#b53759" />
                </linearGradient>
                <linearGradient
                  id="p"
                  gradientTransform="rotate(45 255.213 355.381)"
                  gradientUnits="userSpaceOnUse"
                  x1="183.714"
                  x2="184.529"
                  xlink:href="#a"
                  y1="82.841"
                  y2="101.996"
                />
                <path
                  d="M477.824 113.926l-81.75-81.75 28.493-28.493a12.575 12.575 0 0115.683-1.691 224.76 224.76 0 0167.757 67.757 12.575 12.575 0 01-1.691 15.683z"
                  fill="url(#c)"
                />
                <path
                  d="M477.824 113.926l28.493-28.493a12.548 12.548 0 001.746-2.204 12.52 12.52 0 00-1.538-3.479 224.76 224.76 0 00-67.757-67.757 12.575 12.575 0 00-15.683 1.691l-22.751 22.751z"
                  fill="url(#d)"
                />
                <path
                  d="M508.008 69.75a224.672 224.672 0 00-9.36-13.448 15.337 15.337 0 01-3.458 5.316l-34.837 34.837 17.471 17.471 28.493-28.493a12.575 12.575 0 001.691-15.683z"
                  fill="url(#e)"
                />
                <path
                  d="M436.44 163.826l48.122-48.123a4.798 4.798 0 000-6.786l-83.48-83.48a4.798 4.798 0 00-6.786 0L346.174 73.56z"
                  fill="url(#f)"
                />
                <path d="M370.412 49.261v180.593l90.403-90.342-90.327-90.327z" fill="url(#g)" />
                <path
                  d="M457.921 137.475l-85.396-85.396c-4.277-4.278-4.277-11.213 0-15.491 4.278-4.278 11.213-4.278 15.491 0l85.396 85.396c4.277 4.278 4.277 11.213 0 15.491-4.278 4.278-11.213 4.278-15.491 0z"
                  fill="url(#h)"
                />
                <path
                  d="M45.257 374.477L.461 499.788c-2.167 6.063 3.688 11.918 9.751 9.751l125.312-44.796c25-25-65.267-115.267-90.267-90.266z"
                  fill="url(#i)"
                />
                <path
                  d="M67.105 395.234L1.181 505.396c-.106.178-.184.354-.274.531 1.673 3.112 5.442 4.994 9.306 3.613l125.312-44.796c.193-.193.359-.402.538-.603 7.434-29.218-44.532-88.437-68.958-68.907z"
                  fill="url(#j)"
                />
                <path
                  d="M444.069 156.198L135.523 464.743a27.969 27.969 0 00-4.459-5.797c-11.044-11.044-28.954-11.044-39.998 0-.498.498 1.427-1.546 1.427-1.546 9.594-11.111 9.119-27.907-1.434-38.46s-27.349-11.029-38.46-1.434c0 0-2.044 1.925-1.546 1.427 11.044-11.044 11.044-28.954 0-39.998a27.969 27.969 0 00-5.797-4.459L353.802 65.931z"
                  fill="url(#k)"
                />
                <path
                  d="M418.882 131.012L92.493 457.401c9.594-11.111 9.119-27.907-1.434-38.46s-27.349-11.029-38.46-1.434L378.988 91.118z"
                  fill="url(#l)"
                />
                <path
                  d="M51.054 418.934c-.498.498 1.546-1.427 1.546-1.427 11.111-9.594 27.907-9.119 38.46 1.434s11.029 27.349 1.434 38.46c0 0-1.925 2.044-1.427 1.546 11.044-11.044 28.954-11.044 39.998 0a27.969 27.969 0 014.459 5.797l308.545-308.545-79.53-79.53-308.68 308.68c5.887 10.737 4.291 24.489-4.805 33.585z"
                  fill="url(#m)"
                />
                <path
                  d="M25.755 484.245a62.831 62.831 0 00-15.649-11.438L.46 499.789c-2.168 6.063 3.688 11.918 9.751 9.751l26.982-9.645a62.768 62.768 0 00-11.438-15.65z"
                  fill="url(#n)"
                />
                <path d="M339.553 80.121l.211 180.442 90.191-90.192-90.326-90.326z" fill="url(#o)" />
                <path
                  d="M427.045 168.351l-85.396-85.396c-4.278-4.278-4.278-11.213 0-15.49 4.278-4.278 11.213-4.278 15.49 0l85.396 85.396c4.278 4.278 4.278 11.213 0 15.49-4.277 4.278-11.213 4.278-15.49 0z"
                  fill="url(#p)"
                />
              </svg>
            </button>
            <button
              @click.prevent="deleteInvoice(id)"
              class="bg-gray-300 hover:bg-gray-400 py-2 px-2 rounded-full"
            >
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M313.231 75.005C311.947 56.866 296.779 42.5 278.319 42.5h-46.803c-18.46 0-33.628 14.366-34.912 32.505l-17.349 10-17.754-10C163.299 37.416 193.947 7.5 231.491 7.5h46.852c37.544 0 68.192 29.916 69.99 67.505l-17.419 10z"
                  fill="#a29aa5"
                />
                <path
                  d="M165.35 55h39.38c-4.62 5.49-7.59 12.42-8.13 20l-17.34 10-17.76-9.99c.33-6.98 1.66-13.7 3.85-20.01zM348.33 75.01l-17.42 10L313.23 75a34.86 34.86 0 00-8.12-20h39.37a71.223 71.223 0 013.85 20.01z"
                  fill="#766d78"
                />
                <path
                  d="M349.062 504.5H162.938c-31.469 0-57.619-24.127-59.979-55.34L79.5 152.861l175.418-23.776L432.5 152.861 409.042 449.16c-2.36 31.213-28.51 55.34-59.98 55.34z"
                  fill="#a29aa5"
                />
                <path d="M432.5 152.86l-1.56 19.68H81.06l-1.56-19.68 175.42-23.77z" fill="#a29aa5" />
                <path
                  d="M432.5 152.86l-177.58-23.77-163.193 22.113-12.556-1.629 23.79 299.586c2.36 31.21 28.51 55.34 59.98 55.34h25c-31.47 0-57.62-24.13-59.98-55.34l-20.193-255.042c-.921-11.632 8.27-21.579 19.938-21.579H430.94z"
                  fill="#766d78"
                />
                <path
                  d="M450.945 152.542H61.055c-5.506 0-9.97-4.464-9.97-9.97v-.156c0-37.23 30.181-67.412 67.412-67.412h275.007c37.23 0 67.412 30.181 67.412 67.412v.156c-.001 5.507-4.465 9.97-9.971 9.97z"
                  fill="#a29aa5"
                />
                <g fill="#766d78">
                  <path
                    d="M81.09 142.42v.15c0 5.51 4.46 9.97 9.96 9.97h-30c-5.5 0-9.96-4.46-9.96-9.97v-.15c0-37.23 30.18-67.41 67.41-67.41h30c-37.23 0-67.41 30.18-67.41 67.41zM256 450.486c-10.012 0-18.128-8.116-18.128-18.128V225.004c0-10.012 8.116-18.128 18.128-18.128s18.128 8.116 18.128 18.128v207.354c0 10.012-8.116 18.128-18.128 18.128zM342.277 450.487c-.481 0-.966-.019-1.453-.058-9.98-.792-17.43-9.525-16.637-19.505L340.64 223.57c.792-9.98 9.52-17.431 19.505-16.637 9.98.792 17.43 9.525 16.637 19.505l-16.453 207.354c-.754 9.492-8.691 16.695-18.052 16.695zM169.723 450.487c-9.362 0-17.299-7.202-18.052-16.695l-16.453-207.354c-.792-9.98 6.657-18.713 16.637-19.505 9.978-.805 18.713 6.656 19.505 16.637l16.453 207.354c.792 9.98-6.657 18.713-16.637 19.505-.487.04-.972.058-1.453.058z"
                  />
                </g>
                <g>
                  <path
                    d="M393.503 67.505h-38.351C349.862 29.121 317.399 0 278.344 0H273.5c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h4.844c30.79 0 56.493 22.502 61.625 52.505h-20.353C315.078 48.808 298.131 35 278.318 35h-46.803c-19.812 0-36.759 13.808-41.297 32.505h-20.353C174.998 37.502 200.702 15 231.491 15h7.009c4.143 0 7.5-3.357 7.5-7.5S242.643 0 238.5 0h-7.009c-39.056 0-71.518 29.121-76.809 67.505h-36.186c-41.307 0-74.912 33.605-74.912 74.912v.156c0 9.632 7.837 17.469 17.47 17.469h11.49l22.934 289.684c1.285 16.995 8.909 32.735 21.467 44.321C129.494 505.624 145.827 512 162.938 512h186.125c17.11 0 33.443-6.376 45.991-17.953 12.558-11.586 20.182-27.326 21.465-44.295l22.936-289.71h11.49c9.633 0 17.47-7.837 17.47-17.469v-.156c0-41.307-33.605-74.912-74.912-74.912zM231.516 50h46.803c11.541 0 21.579 7.238 25.611 17.505h-98.023C209.937 57.238 219.976 50 231.516 50zm170.047 398.595c-2.052 27.143-25.114 48.405-52.5 48.405H162.938c-27.387 0-50.448-21.262-52.503-48.432L87.592 160.042h336.816zm51.852-306.022a2.472 2.472 0 01-2.47 2.469H61.055a2.472 2.472 0 01-2.47-2.469v-.156c0-33.035 26.877-59.912 59.912-59.912h275.006c33.035 0 59.912 26.877 59.912 59.912z"
                  />
                  <path
                    d="M256 457.985c14.131 0 25.628-11.497 25.628-25.628V301.602c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v130.756c0 5.86-4.768 10.628-10.628 10.628s-10.628-4.768-10.628-10.628V225.004c0-5.86 4.768-10.628 10.628-10.628s10.628 4.768 10.628 10.628v41.598c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-41.598c0-14.131-11.497-25.628-25.628-25.628s-25.628 11.497-25.628 25.628v207.354c0 14.13 11.497 25.627 25.628 25.627zM340.224 457.904c13.931 1.189 26.531-9.57 27.582-23.52l4.161-52.445a7.5 7.5 0 00-14.953-1.185l-4.161 52.444c-.436 5.788-5.659 10.25-11.436 9.754-5.706-.334-10.324-5.75-9.755-11.436l16.453-207.353c.464-5.843 5.612-10.221 11.436-9.755 5.704.335 10.325 5.75 9.755 11.436l-9.515 119.909a7.5 7.5 0 006.884 8.069c4.103.318 7.741-2.754 8.069-6.883l9.515-119.909c1.373-13.71-9.766-26.769-23.521-27.575-14.074-1.128-26.457 9.432-27.576 23.521L316.709 430.33c-1.374 13.707 9.767 26.769 23.515 27.574zM139.329 373.064c.328 4.128 3.948 7.218 8.069 6.883a7.5 7.5 0 006.884-8.069l-11.588-146.033c-.464-5.841 3.912-10.971 9.764-11.436 5.678-.582 11.094 4.06 11.427 9.754l16.453 207.355c.569 5.689-4.051 11.1-9.761 11.436-5.856.457-10.972-3.984-11.43-9.755l-2.034-25.637c-.327-4.129-3.926-7.199-8.069-6.884a7.5 7.5 0 00-6.884 8.069l2.034 25.638c1.05 13.947 13.648 24.705 27.576 23.521 13.754-.806 24.893-13.866 23.521-27.574l-16.453-207.355c-.806-13.748-13.869-24.914-27.576-23.52-14.087 1.118-24.639 13.488-23.521 27.575z"
                  />
                </g>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { firestore } from "firebase";
import moment from "moment";
export default {
  name: "TheTable",
  props: {
    invoices: Array,
    isAdmin: Boolean,
    users: Array,
  },
  methods: {
    deleteInvoice: function (id) {
      firestore()
        .collection("invoices")
        .doc(id)
        .delete()
        .catch((err) => console.log(err));
      // .then((msg) => console.log(msg))
    },
    editInvoice: function (id) {
      this.$emit("editInvoice", id);
    },
    date: function (timestamp) {
      return moment(timestamp.toDate()).format("DD-MM-YYYY");
    },
    getDisplayName: function (UID) {
      if (this.users.length) {
        let matchedUser = this.users.filter((user) => user.UID == UID);
        return matchedUser.length ? matchedUser[0].displayName : null;
      }
    },
  },
};
</script>

<style>
td {
  @apply my-auto;
}
</style>