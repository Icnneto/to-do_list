async function teste () {
    const url = 'https://api-db-connect-frontend.vercel.app/api/editais';

    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error('Response status: ' + response.status);
        }

        const json = await response.json();
        console.log(json);

    } catch (error) {
        console.error(error.message)
    }
};

teste();