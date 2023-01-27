console.log("Iniciando Aplicativo!")

const value = process.argv[2]
if(!value) {
    console.log("Precisa inserir uma informação!")
}else { console.log(value)}