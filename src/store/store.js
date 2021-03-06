import Vue from "vue";
import Vuex from "vuex";
import intialState from "./intialState";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //strict: process.env.NODE_ENV !== 'production',
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
    packageThickness: () => (packageAmount)=> {
      return (
        store.getters.envelopeThickness *
        packageAmount *
        2
      ).toFixed(1);
    },

    ratioInvoiceEnvelope : state => {
      const {envelopesAmount,invoicesAmount} = state.order
       return (invoicesAmount/ envelopesAmount).toFixed(2); 
    },
    envelopeThickness: state => {
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
        glueThickness
      } = state.thicknessParameter;

      
      const { zruphotPages } = state.order;
      let sideGlue = Number(glueThickness);
      let inEnvelopeThikness =  invoiceThickness * foldsInvoice * rationInvoice +
      zruphotThickness * zruphotPages * rationZruphot;
      if(inEnvelopeThikness > glueThickness)
          sideGlue = 0;
      else
         inEnvelopeThikness = 0;

         0.5 * (envelopeThickness * foldsEnvelopeTop + sideGlue + inEnvelopeThikness + glueThickness +
          envelopeThickness * foldsEnvelopeButtom + sideGlue + inEnvelopeThikness )
      return (
          0.5 * (envelopeThickness * foldsEnvelopeTop + sideGlue + inEnvelopeThikness + glueThickness +
               envelopeThickness * foldsEnvelopeButtom + sideGlue + inEnvelopeThikness )
      );
 
      /* return (
        0.5 *
          envelopeThickness *
          (foldsEnvelopeTop + foldsEnvelopeButtom + glueThickness) +
          invoiceThickness * foldsInvoice * rationInvoice +
          zruphotThickness * zruphotPages * rationZruphot +
        0.5 * glueThickness
      ); */
    },
    boardSize: state => {
      return state.board.boardSize;
    }, 

    envelopePackageAmount: state => {

      return Math.round((state.board.thickness / store.getters.envelopeThickness)/2)*2;

    },
    envelopesBetweenAmount: state => {
      return state.board.orderUntil - state.board.orderFrom + 1;
    },
    roundTo : ()=>(number,roundNum , type) => {
      if(type=="ceil")
         return  Math.ceil(number/roundNum) * roundNum
     if(type=="floor")
        return  Math.floor(number/roundNum) * roundNum
     if(type=="round")
        return  Math.round(number/roundNum) * roundNum
    },

    //פונקציה לחישוב כמות החבילות שיהיה לי במשטח 
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
    maxEnvelopesOnBoard : state => floor => {
      return (
        floor * state.board.boardSize *
        2 *
        Math.ceil(
          store.getters.envelopesBetweenAmount /
            (floor * state.board.boardSize * 2)
        )
      );
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
    
    calcPackageFullFloor : (state) => floor =>{

      let packageFullFloor = Math.ceil(
        store.getters.envelopesBetweenAmount /
          (floor * state.board.boardSize * 2))

      return packageFullFloor;

    },

    // calcPackageFullFloor  החלפתי אותה בפונקציה אחרת
    packageFullFloor: state => {
           
      return Math.ceil(
        store.getters.envelopesBetweenAmount /
          (store.getters.calBoardFloors.fullFloors * state.board.boardSize * 2)
      )
    },

    calBoardFloors: state => {
      let fullFloors = 0;
      let floors =
        store.getters.envelopesBetweenAmount /
        (state.board.boardSize * store.getters.envelopePackageAmount);
   
        fullFloors = Math.round(floors);
    
    
      if (fullFloors === 0)  fullFloors = 1;
      return {
        fullFloors,
        floors
      };
    },
    totalEnvelope : state => {
       return state.machine.untilEnvelope - state.machine.fromEnvelope + 1;
     
    },
    calcPackageHeight : state => {
      return (store.getters.envelopeThickness*store.getters.totalEnvelope/10)/state.board.boardSize
    },
    calcEnvelopesOnBoard : state => {
      const HIGHT_BOARD = 294;
      return (HIGHT_BOARD * state.board.boardSize) /store.getters.envelopeThickness
    }
  },
  mutations: {
    restState(state) {
      localStorage.setItem("store", JSON.stringify({...intialState }));
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem("store")))
      );
    },
   /*  restDataState(state) {

    }, */
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
    }
    ,
    upateStartTime(state, startTime){
      state.machine.start = startTime;
    },
    updateEndTime(state,endTime){
      state.machine.end = endTime
    },

    updtaEnvelopeThickness(state, envelopeThickness){
      state.thicknessParameter.envelopeThickness = envelopeThickness;
    },
    updateInvoiceThickness(state, invoiceThickness){
      state.thicknessParameter.invoiceThickness = invoiceThickness;
    },
    updateZruphotThickness(state,zruphotThickness) {
      state.thicknessParameter.zruphotThickness = zruphotThickness;
    },
    updateGlueThickness(state,glueThickness){
      state.thicknessParameter.glueThickness = glueThickness;
    },
    /*
      envelopeThickness: 0.088,
    invoiceThickness: 0.07,
    zruphotThickness: 0.1,
    foldsInvoice: 2,
    foldsEnvelopeTop: 3,
    foldsEnvelopeButtom: 2,
    zruphotPages: 0,
    glueThickness: 0.16 
     */
  updateFromEnvelope(state,fromEnvelope){
         state.machine.fromEnvelope = fromEnvelope;
  },
  updateUntilEnvelope(state,untilEnvelope){
    state.machine.untilEnvelope = untilEnvelope;
},
/* updateTotalEnvelope(state,totalEnvelope){
  state.machine.totalEnvelope = totalEnvelope;
}, */
    toggleDisplayComp(state){
      state.componentDisplay.distribution = !state.componentDisplay.distribution;
    },
    resetZruphot(state){
      state.order.zruphotAmount = 0,
      state.order.zruphotPages = 1;
    }
  }
});
