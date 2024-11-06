self.addEventListener('push', (event) => {
    const { title, body, icon } = event.data.json();
    const options = {
        body: body,
        icon: icon,
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});
