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
    getTime :(state) => {
     let startTime = new Date();
     let endTime = new Date();
     let startTimeArr = state.machine.start.split(":");
     let endTimeArr = state.machine.end.split(":");

     startTime.setHours(+startTimeArr[0]);
     startTime.setMinutes(+startTimeArr[1]);
     endTime.setHours(+endTimeArr[0]);
     endTime.setMinutes(+endTimeArr[1]);
    
    let timeDur = new Date(endTime.getTime() - startTime.getTime());
      
       return {
        timeDur,
        hour:timeDur.getUTCHours(),
        minute:timeDur.getMinutes()
      } 
    },
    envelopesPerTime : (state)=> {
     const MILISECOND = 60000;
     const SECOND = 60;
     let minutes = store.getters.getTime.timeDur/MILISECOND;
     let speedConveyor = state.machine.speedConveyor;

     return (minutes * speedConveyor / SECOND).toFixed(1);
    },
    packageThickness: () => {
      return (
        store.getters.envelopeThickness *
        store.getters.packageFullFloor *
        2
      ).toFixed(1);
    },

    ratioInvoiceEnvelope : state => {
      const {envelopesAmount,invoicesAmount} = state.order
       return (invoicesAmount/ envelopesAmount).toFixed(2); 
    },
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
    boardSize: state => {
      return state.board.boardSize;
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
    packageAmount: () => envelopePackageAmount => {
      const packageAmount =
        store.getters.envelopesBetweenAmount / envelopePackageAmount;
      const fullPackageAmount = Math.floor(packageAmount);
      const lastPackageEnvelopesAmount =
        store.getters.envelopesBetweenAmount % envelopePackageAmount;
      return {
        fullPackageAmount,
        lastPackageEnvelopesAmount
      };
    },
    isEqualMax: () => {
      return store.getters.maxAmount === store.getters.envelopesBetweenAmount;
    },
    maxAmount: state => {
      return (
        store.getters.calBoardFloors.fullFloors *
        state.board.boardSize *
        2 *
        Math.ceil(
          store.getters.envelopesBetweenAmount /
            (store.getters.calBoardFloors.fullFloors *
              state.board.boardSize *
              2)
        )
      );
    },

    packageFullFloor: state => {
      return Math.ceil(
        store.getters.envelopesBetweenAmount /
          (store.getters.calBoardFloors.fullFloors * state.board.boardSize * 2)
      );
    },

    calBoardFloors: state => {
      let fullFloors = 0;
      let floors =
        store.getters.envelopesBetweenAmount /
        (state.board.boardSize * store.getters.envelopePackageAmount);
      if (floors - Math.floor(floors) > 0.5) {
        fullFloors = Math.ceil(floors);
      } else {
        fullFloors = Math.floor(floors);
      }

      if (fullFloors === 0) fullFloors = 1;
      return {
        fullFloors,
        floors
      };
    }
  },
  mutations: {
    restState(state) {
      localStorage.setItem("store", JSON.stringify({ ...intialState }));
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    },
    initialiseStore(state) {
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
      state.machine.speedConveyor = speedConveyor;
    },
    toggleDisplayComp(state){
      state.componentDisplay.distribution = !state.componentDisplay.distribution;
    }
  }
});
