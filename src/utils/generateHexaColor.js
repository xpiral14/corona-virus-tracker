function generateHexaColor() {
    let possibleCharacteres = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
    let hexaColor = "";
    for (let i = 0; i < 6; i++) {
      hexaColor += possibleCharacteres[Math.floor(Math.random() * 6) + 1];
    }
    return "#" + hexaColor;
  }
  