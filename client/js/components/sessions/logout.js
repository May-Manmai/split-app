function logout() {
    axios.delete("/api/sessions").then(() => {
        renderAppWithoutSession();
    });
}