import axios from 'axios';

const API_ENDPOINT = '/api/testArrays';

const sendPartialRequests = async (data) => {
    console.log(data);
    const halfLength = Math.ceil(data.length / 2);
    const firstHalf = data.slice(0, halfLength);
    const secondHalf = data.slice(halfLength);

    try {
        const {data}= await axios.post(API_ENDPOINT, {totalRequests:2,data:firstHalf});
        console.log(data);
        console.log('Primera mitad enviada:', firstHalf);
    } catch (error) {
        console.error('Error al enviar la primera mitad:', error);
    }

    try {
        const { data }= await axios.post(API_ENDPOINT, {totalRequests:2,data:secondHalf});
        console.log('Segunda mitad enviada:', secondHalf);
        console.log(data);
    } catch (error) {
        console.error('Error al enviar la segunda mitad:', error);
    }
};

const MyComponent = () => {
    const handleSendRequests = () => {
        const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        sendPartialRequests(randomArray);
    };

    return (
        <div>
            <button onClick={handleSendRequests}>Enviar solicitudes parciales</button>
        </div>
    );
};

export default MyComponent;
