function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const numeroAleatorio = getRndInteger(0, 10);
  const parOuImpar = process.argv[2];
  const numero = process.argv[3];
  
  const total = Number(numero) + Number(numeroAleatorio)
  
  if(!parOuImpar || !numero) {
      console.log("Por favor, digite PAR/ÍMPAR e um NÚMERO")
  } else {
      if(total % 2 === 0 && parOuImpar === "par") {
          console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${total}. Você ganhou!`)
      } else if(total % 2 === 1 && parOuImpar === "par") {
          console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${total}. Você perdeu!`)
      } else if(total % 2 === 0 && parOuImpar === "impar") {
          console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${total}. Você perdeu!`)
      } else if(total % 2 === 1 && parOuImpar === "impar") {
          console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${total}. Você ganhou!`)
      }
  }