import {urlBase64ToUint8Array} from '../../app/page'

export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [swRegistration, setSwRegistration] = useState(null);
    const [message, setMessage] = useState('');

    // Register service worker if supported
    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            registerServiceWorker();
        }
    }, []);

    // Function to register service worker
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js', {
                scope: '/',
                updateViaCache: 'none'
            });

            console.log('Service Worker registered:', registration);
            setSwRegistration(registration);

            // Check if already subscribed
            const sub = await registration.pushManager.getSubscription();
            setSubscription(sub);
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    // Function to subscribe to push notifications
    async function subscribeToPush() {
        if (!swRegistration) {
            console.error('Service Worker not registered.');
            return;
        }

        try {
            const sub = await swRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                ),
            });

            console.log('User subscribed:', sub);
            setSubscription(sub);
            await subscribeUser(sub); // Send subscription to backend
        } catch (error) {
            console.error('Subscription failed:', error);
        }
    }

    // Function to unsubscribe from push notifications
    async function unsubscribeFromPush() {
        await subscription?.unsubscribe();
        setSubscription(null);
        await unsubscribeUser();
    }

    if (!isSupported) {
        return <p>Push notifications are not supported in this browser.</p>;
    }

    return (
        <div>
            <h3>Push Notifications</h3>
            {subscription ? (
              <>
                <p>You are subscribed to push notifications.</p>
                <button onClick={unsubscribeFromPush}>Unsubscribe</button>
                <input
                  type="text"
                  placeholder="Enter notification message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendTestNotification}>Send Test</button>
              </>
            ) : (
                <>
                  <p>You are not subscribed to push notifications.</p>
                  <button onClick={subscribeToPush}>Subscribe</button>
                </>
            )}
        </div>
    );
}