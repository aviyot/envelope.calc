export default {
  componentDisplay: {
    distribution: false,
    fullFloor: true,
    coumputedFloor: false,
    zrophot: false,
    tab: 1,
    floorTab: 1,
    drawer: false,
    dialog: false,
  },
  order: {
    envelopesAmount: 1,
    invoicesAmount: 1,
    zruphotAmount: 0,
    zruphotPages: 1,
  },
  packaging : [{
    num:1,
    type:"board",
    amount : {
      from:0,
      until:0,
      distType:[]
    }
  }],
  dist: [
    {
      name: "S",
      orderFrom: 1,
      orderUntil: 1000,
      amount:0
    },
    {
      name: "N",
      orderFrom: 1,
      orderUntil: 1000,
      amount:0
    },
    {
      name: "I",
      orderFrom: 1,
      orderUntil: 10000,
      amount:0
    },
    {
      name: "M",
      orderFrom: 1,
      orderUntil: 10000,
      amount:0
    },
  ],
  board: {
    thickness: 80,
    boardSize: 16,
    orderFrom: 1,
    orderUntil: 10000,
  },
  machine: {
    speedConveyor: 10000,
    start: "12:00",
    end: "12:05",
    fromEnvelope: 1,
    untilEnvelope: 5000,
    totalEnvelope: null,
  },
  thicknessParameter: {
    envelopeThickness: 0.09,
    invoiceThickness: 0.08,
    zruphotThickness: 0.1,
    foldsInvoice: 2,
    foldsEnvelopeTop: 3,
    foldsEnvelopeButtom: 2,
    zruphotPages: 0,
    glueThickness: 0.16,
  },
};
