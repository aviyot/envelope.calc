export default {

componentDisplay : {
  distribution:false,
  fullFloor:true,
  coumputedFloor:false,
  zrophot:false,
  tab:1,
  floorTab:1,
  drawer:false
},
  order: {
    envelopesAmount: 1,
    invoicesAmount: 1,
    zruphotAmount: 0,
    zruphotPages: 1
  },
  dist: [
    {
      name: "S",
      orderFrom: 1,
      orderUntil: 1000
    },
    {
      name: "N",
      orderFrom: 1,
      orderUntil: 1000
    },
    {
      name: "I",
      orderFrom: 1,
      orderUntil: 10000
    },
    {
      name: "M",
      orderFrom: 1,
      orderUntil: 10000
    }
  ],
  board: {
    thickness: 80,
    boardSize: 16,
    orderFrom: 1,
    orderUntil: 10000
  },
  machine: {
    speedConveyor: 10000,
    start:"12:00",
    end:"12:05",
    fromEnvelope:1,
    untilEnvelope:5000,
    totalEnvelope:null
  },
  thicknessParameter: {
    envelopeThickness: 0.088,
    invoiceThickness: 0.08,
    zruphotThickness: 0.1,
    foldsInvoice: 2,
    foldsEnvelopeTop: 3,
    foldsEnvelopeButtom: 2,
    zruphotPages: 0,
    glueThickness: 0.16
  }
};
