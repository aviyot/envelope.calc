import Vue from "vue";
import Vuex from "vuex";
import intialState from "./intialState";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //strict: process.env.NODE_ENV !== 'production',
  state: { ...intialState },
  plugins: [
    (store) => {
      store.subscribe((mutation, state) => {
        localStorage.setItem("store", JSON.stringify(state));
      });
    },
  ],
  getters: {
    timeDur: () => (startTime, endTime) => {
      const MILISECOND_DAY = 86400000;
      let _startTime = new Date();
      let _endTime = new Date();
      let startTimeArr = startTime.split(":");
      let endTimeArr = endTime.split(":");

      _startTime.setHours(+startTimeArr[0]);
      _startTime.setMinutes(+startTimeArr[1]);
      _endTime.setHours(+endTimeArr[0]);
      _endTime.setMinutes(+endTimeArr[1]);

      let milisecondDur = _endTime.getTime() - _startTime.getTime();
      if (milisecondDur < 0) milisecondDur += MILISECOND_DAY;

      return new Date(milisecondDur);
    },
    hourMinuteFormat: (state, getters) => (startTime, endTime) => {
      let houres = getters.timeDur(startTime, endTime).getUTCHours();
      let minutes = getters.timeDur(startTime, endTime).getMinutes();

      if (houres < 10) houres = "0" + houres;
      if (minutes < 10) minutes = "0" + minutes;
      return `${houres}:${minutes}`;
    },
    amountPerTime: (state, getters) => (startTime, endTime, speed) => {
      const MILISECOND = 60000;
      const SECOND = 60;
      let minutes = getters.timeDur(startTime, endTime) / MILISECOND;

      return ((minutes * speed) / SECOND).toFixed(0);
    },
    addTimes: () => (totalTime, startTime) => {
      const HOUR = 24;
      const MINUTE = 60;

      let timeDur = totalTime.split(":");
      let timeDurHoures = +timeDur[0];
      let timeDurMinutes = +timeDur[1];

      startTime = startTime.split(":");
      let startTimeHoures = +startTime[0];
      let startTimeMinutes = +startTime[1];
      let endTimeHor =
        timeDurHoures +
        startTimeHoures +
        Math.floor((timeDurMinutes + startTimeMinutes) / MINUTE);
      endTimeHor = endTimeHor % HOUR;
      let endTimeMin = (timeDurMinutes + startTimeMinutes) % MINUTE;

      if (endTimeHor < 10) endTimeHor = "0" + endTimeHor;
      if (endTimeMin < 10) endTimeMin = "0" + endTimeMin;
      return endTimeHor + ":" + endTimeMin;
    },

    subTimes: () => (totalTime, endTime) => {
      const HOUR = 24;
      const MINUTE = 60;
      let timeDur = totalTime.split(":");
      let timeDurHoures = +timeDur[0];
      let timeDurMinutes = +timeDur[1];

      endTime = endTime.split(":");
      let endTimeHoures = +endTime[0];
      let endTimeMinutes = +endTime[1];

      let startTimeHor = endTimeHoures - timeDurHoures;

      if (startTimeHor < 0) startTimeHor = HOUR + startTimeHor;

      let startTimeMin = endTimeMinutes - timeDurMinutes;
      if (startTimeMin < 0) {
        startTimeMin = MINUTE + startTimeMin;
        startTimeHor--;
        if (startTimeHor < 0) startTimeHor = HOUR + startTimeHor;
      }

      if (startTimeHor < 10) startTimeHor = "0" + startTimeHor;
      if (startTimeMin < 10) startTimeMin = "0" + startTimeMin;
      return startTimeHor + ":" + startTimeMin;
    },

    getTotalHours: () => (timeFormat) => {
      const MINUTE = 60;
      let hourMinute = timeFormat.split(":");
      let lotalHours = +hourMinute[0] + +hourMinute[1] / MINUTE;
      return lotalHours;
    },
    calcSpeed: (state, getters) => (totalAmount, totalTime) => {
      return Math.round(totalAmount / getters.getTotalHours(totalTime));
    },
    calcTime: (state) => {
      const MINUTE = 60;
      let totalAmount = state.timeCalc.totalAmount;
      let speed = state.timeCalc.speed;
      let hours = Math.trunc(totalAmount / speed);
      let minutes = Math.round(
        (totalAmount / speed - Math.trunc(totalAmount / speed)) * MINUTE
      );

      if (hours < 10) hours = "0" + hours;
      // if (hours > 23) alert("time duration above 24 Houres");
      if (minutes < 10) minutes = "0" + minutes;
      return hours + ":" + minutes;
    },
    packageThickness: () => (packageAmount) => {
      return (store.getters.envelopeThickness * packageAmount * 2).toFixed(1);
    },

    ratioInvoiceEnvelope: (state) => {
      const { envelopesAmount, invoicesAmount } = state.order;
      return (invoicesAmount / envelopesAmount).toFixed(2);
    },
    envelopeThickness: (state) => {
      let envelopesAmount = state.order.envelopesAmount;
      let rationInvoice = state.order.invoicesAmount / envelopesAmount;
      let rationZruphot = state.order.zruphotAmount / envelopesAmount;
      const {
        envelopeThickness,
        foldsEnvelopeTop,
        foldsEnvelopeButtom,
        invoiceThickness,
        zruphotThickness,
        foldsInvoice,
        glueThickness,
      } = state.thicknessParameter;

      const { zruphotPages } = state.order;
      let sideGlue = Number(glueThickness);
      let inEnvelopeThikness =
        invoiceThickness * foldsInvoice * rationInvoice +
        zruphotThickness * zruphotPages * rationZruphot;
      if (inEnvelopeThikness > glueThickness) sideGlue = 0;
      else inEnvelopeThikness = 0;

      0.5 *
        (envelopeThickness * foldsEnvelopeTop +
          sideGlue +
          inEnvelopeThikness +
          glueThickness +
          envelopeThickness * foldsEnvelopeButtom +
          sideGlue +
          inEnvelopeThikness);
      return (
        0.5 *
        (envelopeThickness * foldsEnvelopeTop +
          sideGlue +
          inEnvelopeThikness +
          glueThickness +
          envelopeThickness * foldsEnvelopeButtom +
          sideGlue +
          inEnvelopeThikness)
      );
    },
    boardSize: (state) => {
      return state.board.boardSize;
    },

    envelopePackageAmount: (state) => {
      return (
        Math.round(
          state.board.thickness / store.getters.envelopeThickness / 2
        ) * 2
      );
    },
    envelopesBetweenAmount: (state) => {
      return state.board.orderUntil - state.board.orderFrom + 1;
    },
    roundTo: () => (number, roundNum, type) => {
      if (type == "ceil") return Math.ceil(number / roundNum) * roundNum;
      if (type == "floor") return Math.floor(number / roundNum) * roundNum;
      if (type == "round") return Math.round(number / roundNum) * roundNum;
    },

    //פונקציה לחישוב כמות החבילות שיהיה לי במשטח
    packageAmount: () => (envelopePackageAmount) => {
      const packageAmount =
        store.getters.envelopesBetweenAmount / envelopePackageAmount;
      const fullPackageAmount = Math.floor(packageAmount);
      const lastPackageEnvelopesAmount =
        store.getters.envelopesBetweenAmount % envelopePackageAmount;

      return {
        fullPackageAmount,
        lastPackageEnvelopesAmount,
      };
    },
    isEqualMax: () => {
      return store.getters.maxAmount === store.getters.envelopesBetweenAmount;
    },
    maxEnvelopesOnBoard: (state) => (floor) => {
      return (
        floor *
        state.board.boardSize *
        2 *
        Math.ceil(
          store.getters.envelopesBetweenAmount /
            (floor * state.board.boardSize * 2)
        )
      );
    },
    maxAmount: (state) => {
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

    calcPackageFullFloor: (state) => (floor) => {
      let packageFullFloor = Math.ceil(
        store.getters.envelopesBetweenAmount /
          (floor * state.board.boardSize * 2)
      );

      return packageFullFloor;
    },

    // calcPackageFullFloor  החלפתי אותה בפונקציה אחרת
    packageFullFloor: (state) => {
      return Math.ceil(
        store.getters.envelopesBetweenAmount /
          (store.getters.calBoardFloors.fullFloors * state.board.boardSize * 2)
      );
    },

    calBoardFloors: (state) => {
      let fullFloors = 0;
      let floors =
        store.getters.envelopesBetweenAmount /
        (state.board.boardSize * store.getters.envelopePackageAmount);

      fullFloors = Math.round(floors);

      if (fullFloors === 0) fullFloors = 1;
      return {
        fullFloors,
        floors,
      };
    },
    totalEnvelope: (state) => {
      return state.machine.untilEnvelope - state.machine.fromEnvelope + 1;
    },
    calcPackageHeight: (state) => {
      return (
        (store.getters.envelopeThickness * store.getters.totalEnvelope) /
        10 /
        state.board.boardSize
      );
    },
    calcEnvelopesOnBoard: (state) => {
      const HIGHT_BOARD = 294;
      return (
        (HIGHT_BOARD * state.board.boardSize) / store.getters.envelopeThickness
      );
    },
    calcAmount: (state) => {
      state.amountCalc.to;
    },
  },
  mutations: {
    restState(state) {
      localStorage.setItem("store", JSON.stringify({ ...intialState }));
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    },

    restThicknessState(state) {
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
    upateStartTime(state, startTime) {
      state.machine.start = startTime;
    },
    updateEndTime(state, endTime) {
      state.machine.end = endTime;
    },

    //START AMOUNT CALC
    updateAmountCalcSpeed(state, speed) {
      state.amountCalc.speed = speed;
    },
    updateAmountCalcStartTime(state, startTime) {
      state.amountCalc.startTime = startTime;
    },
    updateAmountCalcEndTime(state, endTime) {
      state.amountCalc.endTime = endTime;
    },
    updateAmountCalcTotalTime(state, totalTime) {
      state.amountCalc.totalTime = totalTime;
    },
    updateAmountCalcFromAmount(state, fromAmount) {
      state.amountCalc.fromAmount = fromAmount;
    },
    updateAmountCalcUntilAmount(state, untilAmount) {
      state.amountCalc.untilAmount = untilAmount;
    },
    updateAmountCalcTotalAmount(state, totalAmount) {
      state.amountCalc.totalAmount = totalAmount;
    },
    updateAmountCalcTimeUpdate(state, timeUpdate) {
      state.amountCalc.timeUpdate = timeUpdate;
    },
    updateAmountCalcAmountUpdate(state, amountUpdate) {
      state.amountCalc.amountUpdate = amountUpdate;
    },
    //END AMOUNT CALC

    //START TIME CALC
    updateTimeCalcSpeed(state, speed) {
      state.timeCalc.speed = speed;
    },
    updateTimeCalcStartTime(state, startTime) {
      state.timeCalc.startTime = startTime;
    },
    updateTimeCalcEndTime(state, endTime) {
      state.timeCalc.endTime = endTime;
    },
    updateTimeCalcTotalTime(state, totalTime) {
      state.timeCalc.totalTime = totalTime;
    },
    updateTimeCalcFromAmount(state, fromAmount) {
      state.timeCalc.fromAmount = fromAmount;
    },
    updateTimeCalcUntilAmount(state, untilAmount) {
      state.timeCalc.untilAmount = untilAmount;
    },
    updateTimeCalcTotalAmount(state, totalAmount) {
      state.timeCalc.totalAmount = totalAmount;
    },
    updateTimeCalcTimeUpdate(state, timeUpdate) {
      state.timeCalc.timeUpdate = timeUpdate;
    },
    updateTimeCalcAmountUpdate(state, amountUpdate) {
      state.timeCalc.amountUpdate = amountUpdate;
    },
    //END TIME CALC

    //START SPEED CALC
    updateSpeedCalcSpeed(state, speed) {
      state.speedCalc.speed = speed;
    },
    updateSpeedCalcStartTime(state, startTime) {
      state.speedCalc.startTime = startTime;
    },
    updateSpeedCalcEndTime(state, endTime) {
      state.speedCalc.endTime = endTime;
    },
    updateSpeedCalcTotalTime(state, totalTime) {
      state.speedCalc.totalTime = totalTime;
    },
    updateSpeedCalcFromAmount(state, fromAmount) {
      state.speedCalc.fromAmount = fromAmount;
    },
    updateSpeedCalcUntilAmount(state, untilAmount) {
      state.speedCalc.untilAmount = untilAmount;
    },
    updateSpeedCalcTotalAmount(state, totalAmount) {
      state.speedCalc.totalAmount = totalAmount;
    },
    updateSpeedCalcTimeUpdate(state, timeUpdate) {
      state.speedCalc.timeUpdate = timeUpdate;
    },
    updateSpeedCalcAmountUpdate(state, amountUpdate) {
      state.speedCalc.amountUpdate = amountUpdate;
    },
    //END SPEED CALC

    updtaEnvelopeThickness(state, envelopeThickness) {
      state.thicknessParameter.envelopeThickness = envelopeThickness;
    },
    updateInvoiceThickness(state, invoiceThickness) {
      state.thicknessParameter.invoiceThickness = invoiceThickness;
    },
    updateZruphotThickness(state, zruphotThickness) {
      state.thicknessParameter.zruphotThickness = zruphotThickness;
    },
    updateGlueThickness(state, glueThickness) {
      state.thicknessParameter.glueThickness = glueThickness;
    },
    updateFromEnvelope(state, fromEnvelope) {
      state.machine.fromEnvelope = fromEnvelope;
    },
    updateUntilEnvelope(state, untilEnvelope) {
      state.machine.untilEnvelope = untilEnvelope;
    },
    toggleDisplayComp(state) {
      state.componentDisplay.distribution = !state.componentDisplay
        .distribution;
    },
    resetZruphot(state) {
      (state.order.zruphotAmount = 0), (state.order.zruphotPages = 1);
    },
  },
});
