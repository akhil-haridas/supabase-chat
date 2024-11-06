import React, { useEffect, useState } from 'react';
import { AppLogo, ChatMessages, Users, Profile, Message } from '../components';

interface ChatPageProps {
    user: any;
}
const urlBase64ToUint8Array = (base64String: any) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

import io from "socket.io-client";

io("https://notification-webpush.onrender.com"); 

const ChatPage: React.FC<ChatPageProps> = ({ user }) => {

    const [subscription, setSubscription] = useState(null);

    console.log("subscription ::", subscription);

    // Request permission to send notifications
    useEffect(() => {
        if ("Notification" in window && "serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/service-worker.js")
                .then((registration) => {
                    console.log("Service Worker registered");
                    return registration.pushManager.getSubscription();
                })
                .then((existingSubscription) => {
                    console.log("existingSubscription ::", existingSubscription);

                    if (existingSubscription) {
                        console.log("Existing subscription found, unsubscribing...");
                        // Unsubscribe the existing subscription if it exists
                        existingSubscription.unsubscribe()
                            .then(() => {
                                console.log("Unsubscribed from the existing subscription");
                                return navigator.serviceWorker.ready.then((registration) =>
                                    registration.pushManager.subscribe({
                                        userVisibleOnly: true,
                                        applicationServerKey: urlBase64ToUint8Array(
                                            "BJ4EwHWUsuUNRgHRn_bgNtjXAhIlGZeXtmQB9JdjTHinygmzIGBl9GYIih09IotP3v7k3qESo9RVh825jXUHSZg"
                                        ),
                                    })
                                );
                            })
                            .then((newSubscription: any) => {
                                if (newSubscription) {
                                    setSubscription(newSubscription);
                                    console.log("New subscription created:", newSubscription);
                                    // Send the subscription to the backend
                                    fetch("https://notification-webpush.onrender.com/subscribe", {
                                        method: "POST",
                                        body: JSON.stringify(newSubscription),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    })
                                        .then((response) => {
                                            if (response.ok) {
                                                console.log("Subscription successfully sent to backend.");
                                            } else {
                                                console.error("Failed to send subscription to backend.");
                                            }
                                        })
                                        .catch((err) => {
                                            console.error("Error sending subscription to backend:", err);
                                        });
                                }
                            })
                            .catch((err) => {
                                console.error("Error unsubscribing from existing subscription:", err);
                            });
                    } else {
                        console.log("No existing subscription found.");
                        return navigator.serviceWorker.ready.then((registration) =>
                            registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array(
                                    "BJ4EwHWUsuUNRgHRn_bgNtjXAhIlGZeXtmQB9JdjTHinygmzIGBl9GYIih09IotP3v7k3qESo9RVh825jXUHSZg"
                                ),
                            })
                        );
                    }
                })
                .then((newSubscription: any) => {
                    if (newSubscription) {
                        setSubscription(newSubscription);
                        console.log("New subscription created:", newSubscription);
                        // Send the subscription to the backend
                        fetch("https://notification-webpush.onrender.com/subscribe", {
                            method: "POST",
                            body: JSON.stringify(newSubscription),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then((response) => {
                                if (response.ok) {
                                    console.log("Subscription successfully sent to backend.");
                                } else {
                                    console.error("Failed to send subscription to backend.");
                                }
                            })
                            .catch((err) => {
                                console.error("Error sending subscription to backend:", err);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error with service worker or push manager", error);
                });
        }
    }, []);

    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                    <AppLogo />
                    <Profile user={user} />
                    <Users />
                </div>
                <div className="flex flex-col flex-auto h-full p-6">
                    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                        <ChatMessages />
                        <Message />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
