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
    prodTab: null,
  },
  order: {
    envelopesAmount: 1,
    invoicesAmount: 1,
    zruphotAmount: 0,
    zruphotPages: 1,
  },
  packaging: [
    {
      num: 1,
      type: "board",
      amount: {
        from: 0,
        until: 0,
        distType: [],
      },
    },
  ],
  dist: [
    {
      name: "S",
      orderFrom: 1,
      orderUntil: 1000,
      amount: 0,
    },
    {
      name: "N",
      orderFrom: 1,
      orderUntil: 1000,
      amount: 0,
    },
    {
      name: "I",
      orderFrom: 1,
      orderUntil: 10000,
      amount: 0,
    },
    {
      name: "M",
      orderFrom: 1,
      orderUntil: 10000,
      amount: 0,
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
    totalTime: null,
    fromEnvelope: 1,
    untilEnvelope: 5000,
    totalEnvelope: null,
  },
  amountCalc: {
    speed: 1000,
    totalTime: "00:00",
    startTime: "00:00",
    endTime: "00:00",
    totalAmount: 1,
    fromAmount: 1,
    untilAmount: 1,
    timeUpdate: "end",
    amountUpdate: "from",
  },
  timeCalc: {
    speed: 10000,
    totalTime: "01:00",
    startTime: "07:00",
    endTime: "08:00",
    totalAmount: 10000,
    fromAmount: 1,
    untilAmount: 10000,
    timeUpdate: "end",
    amountUpdate: "from",
  },
  speedCalc: {
    speed: 10000,
    totalTime: "01:00",
    startTime: "07:00",
    endTime: "12:00",
    totalAmount: 1,
    fromAmount: 1,
    untilAmount: 10000,
    timeUpdate: "end",
    amountUpdate: "from",
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
