import Vue from "vue";
import Vuex from "vuex";
import intialState from "./intialState";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: { ...intialState },
  plugins: [
    store => {
      store.subscribe((mutation, state) => {
        localStorage.setItem("store", JSON.stringify(state));
      });
    }
  ],
  getters: {
    envelopeThickness: state => {
      let envelopesAmount = state.order.envelopesAmount;
      let ratioInvoice = state.order.invoicesAmount / envelopesAmount;
      let rationZruphot = state.order.zruphotAmount / envelopesAmount;
      const {
        envelopeThickness,
        foldsEnvelopeTop,
        foldsEnvelopeButtom,
        invoiceThickness,
        zruphotThickness,
        foldsInvoice,
        glueThickness
      } = state.thicknessParameter;
      const { zruphotPages } = state.order;

      return (
        0.5 *
          envelopeThickness *
          (foldsEnvelopeTop + foldsEnvelopeButtom + glueThickness) +
        invoiceThickness * foldsInvoice * ratioInvoice +
        zruphotThickness * zruphotPages * rationZruphot +
        0.5 * glueThickness
      );
    },

    envelopePackageAmount: state => {
      let ep = state.board.thickness / store.getters.envelopeThickness;

      if (ep - Math.floor(ep) > 0.5) ep = Math.ceil(ep);
      else ep = Math.floor(ep);

      if (ep % 2) --ep;
      return ep;
    },
    envelopesBetweenAmount: state => {
      return state.board.orderUntil - state.board.orderFrom + 1;
    },
    calBoardFloors: () => (
      envelopePackageAmount,
      boardSize,
      envelopesAmount
    ) => {
      let fullFloors = 0;
      let floors = 0;
      floors = envelopesAmount / (boardSize * envelopePackageAmount);
      if (floors - Math.floor(floors) > 0.5) {
        fullFloors = Math.ceil(floors);
      } else {
        fullFloors = Math.floor(floors);
      }

if(fullFloors === 0)
   fullFloors = 1;
      return {
        fullFloors,
        floors
      };
    }
  },
  mutations: {
    restState(state) {
      localStorage.setItem("store", JSON.stringify({...intialState}));
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    },
    initialiseStore(state) {
     console.log("intialze");
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    updateEnvelopesAmount(state, envelopesAmount) {
      state.order.envelopesAmount = envelopesAmount;
    },
    updateInvoicesAmount(state, invoicesAmount) {
      state.order.invoicesAmount = invoicesAmount;
    },
    updateZruphotAmount(state, zruphotAmount) {
      state.order.zruphotAmount = zruphotAmount;
    },
    updateZruphotPages(state, zruphotPages) {
      state.order.zruphotPages = zruphotPages;
    },
    updateThickness(state, thickness) {
      state.board.thickness = thickness;
    },
    updateBoardSize(state, boardSize) {
      state.board.boardSize = boardSize;
    },
    updateOrderFrom(state, orderFrom) {
      state.board.orderFrom = orderFrom;
    },
    updateOrderUntil(state, orderUntil) {
      state.board.orderUntil = orderUntil;
    },
    updateSpeedConveyor(state, speedConveyor) {
      state.board.speedConveyor = speedConveyor;
    }
  }
});
