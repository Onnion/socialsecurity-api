const _ = require("lodash");

function googleMapsExportData(data){
    console.log(JSON.parse(JSON.stringify(data[0])))
    let result = _.flatMap(data, function(n){
        return {
                    "position": JSON.parse(n.posicao_ocorrencia), 
                    "title":    n.titulo_ocorrencia,
                    "icon":     n.icone_ocorrencia
                }
    })
    console.log(result)
    return result
}

module.exports = {
    export: googleMapsExportData
};