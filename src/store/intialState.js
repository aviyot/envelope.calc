export default {

componentDisplay : {
  distribution:true
},
  order: {
    envelopesAmount: 10000,
    invoicesAmount: 10000,
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
    thickness: 75,
    boardSize: 16,
    orderFrom: 1,
    orderUntil: 10000
  },
  machine: {
    speedConveyor: 10000,
    start:"12:00",
    end:"13:45"
  },
  thicknessParameter: {
    envelopeThickness: 0.08,
    invoiceThickness: 0.09,
    zruphotThickness: 0.1,
    foldsInvoice: 2,
    foldsEnvelopeTop: 3,
    foldsEnvelopeButtom: 2,
    zruphotPages: 0,
    glueThickness: 0.16
  }
};
