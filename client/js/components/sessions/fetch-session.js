//rename to fetch session
function fetchSession() {
    return axios
        .get('/api/sessions')
        .then((response) => {
            //store session
            setSession(response.data);
            return response.data;
        })
}
