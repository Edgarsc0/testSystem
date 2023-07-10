let accumulatedData = [];

export default function handler(req, res) {
    const receivedData = req.body;
    const ip=req.headers;
    console.log(ip);
    console.log(receivedData);
    // Agregar los datos de la solicitud actual a los datos acumulados
    accumulatedData.push(receivedData);

    // Verificar si se han recibido todas las solicitudes esperadas
    const totalRequests = req.body.totalRequests;
    console.log(totalRequests);
    if (accumulatedData.length == parseInt(totalRequests)) {
        // Completar el proceso con los datos acumulados
        const unifiedArray = accumulatedData.reduce((result, current) => {
            return result.concat(current);
        }, []);

        // Restablecer los datos acumulados para futuras solicitudes
        accumulatedData = [];

        res.status(200).json({ unifiedArray });
    } else {
        res.status(200).json({ message: 'Solicitud parcial recibida',ip:ip});
    }
}
